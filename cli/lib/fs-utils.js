/**
 * File system utilities for the CLI installer.
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { ROOT } = require('./config');
const { progressState, updateProgress } = require('./progress');

const MAX_COPIED_FILES_TRACKED = 10000;

/**
 * Log error to progress state
 */
function logError(operation, filePath, error) {
    progressState.errors.push({
        operation,
        path: filePath,
        error: error.message || String(error),
        timestamp: new Date().toISOString()
    });
}

/**
 * Get estimated file count from cache or fallback heuristic.
 * Avoids a full tree traversal just to size the progress bar.
 */
function getEstimatedFileCount() {
    try {
        const cachePath = path.join(ROOT, '.install-cache.json');
        const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        if (data && typeof data.fileCount === 'number' && data.fileCount > 0) {
            return Math.ceil(data.fileCount * 1.1); // 10% headroom for growth
        }
    } catch (_) { /* no cache yet */ }
    return 5500; // reasonable default for a fresh install
}

/**
 * Persist actual file count so the next install can skip tree traversal.
 */
function saveInstallCache() {
    try {
        fs.writeFileSync(
            path.join(ROOT, '.install-cache.json'),
            JSON.stringify({ fileCount: progressState.current, timestamp: Date.now() })
        );
    } catch (_) { /* ignore write failures */ }
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function copyWithReplace(src, dest, replacements = {}, trackProgress = true) {
    if (!fs.existsSync(src)) return 0;
    ensureDir(dest);
    let count = 0;

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        // Skip hidden files and node_modules
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        
        // Skip symbolic links for security (prevents path traversal attacks)
        if (entry.isSymbolicLink()) {
            if (process.env.DEBUG) {
                console.log(`  ⚠️ Skipping symlink: ${entry.name}`);
            }
            continue;
        }

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            count += copyWithReplace(srcPath, destPath, replacements, trackProgress);
        } else {
            try {
                // Apply replacements for text files
                const textExtensions = ['.md', '.txt', '.json', '.mdc', '.yaml', '.yml', '.toml'];
                const ext = path.extname(entry.name).toLowerCase();

                if (textExtensions.includes(ext)) {
                    let content = fs.readFileSync(srcPath, 'utf8');
                    // Sort keys by length (longer first) to prevent partial replacements
                    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
                    for (const search of keys) {
                        content = content.replaceAll(search, replacements[search]);
                    }
                    fs.writeFileSync(destPath, content);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }

                // Set file permissions: rules/ files are restricted, others are standard
                const perm = destPath.includes(`${path.sep}rules${path.sep}`) ? 0o600 : 0o644;
                fs.chmodSync(destPath, perm);
                
                // Track copied file for verification (bounded)
                if (progressState.copiedFiles.length < MAX_COPIED_FILES_TRACKED) {
                    progressState.copiedFiles.push(destPath);
                }
                
                // Update progress
                if (trackProgress) {
                    updateProgress(entry.name);
                }
                
                count++;
            } catch (e) {
                logError('copy', srcPath, e);
                if (process.env.DEBUG) {
                    console.warn(`\n  ⚠️ Could not copy ${entry.name}: ${e.message}`);
                }
            }
        }
    }
    return count;
}

function copyFileWithReplace(src, dest, replacements = {}, trackProgress = true) {
    if (!fs.existsSync(src)) return false;

    ensureDir(path.dirname(dest));

    try {
        let content = fs.readFileSync(src, 'utf8');
        const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
        for (const search of keys) {
            content = content.replaceAll(search, replacements[search]);
        }
        
        fs.writeFileSync(dest, content);

        // Set file permissions: rules/ files are restricted, others are standard
        const perm = dest.includes(`${path.sep}rules${path.sep}`) ? 0o600 : 0o644;
        fs.chmodSync(dest, perm);

        // Track copied file for verification (bounded)
        if (progressState.copiedFiles.length < MAX_COPIED_FILES_TRACKED) {
            progressState.copiedFiles.push(dest);
        }
        
        // Update progress
        if (trackProgress) {
            updateProgress(path.basename(dest));
        }
        
        return true;
    } catch (e) {
        logError('copy', src, e);
        if (process.env.DEBUG) {
            console.warn(`\n  ⚠️ Could not copy ${path.basename(src)}: ${e.message}`);
        }
        return false;
    }
}

function removeDir(dir, trackProgress = true) {
    const resolved = path.resolve(dir);
    const home = os.homedir();

    // Safety: prevent deletion of home directory or anything above it
    if (resolved === home || !resolved.startsWith(home + path.sep)) {
        throw new Error(`SAFETY: Refusing to delete ${resolved} — outside HOME boundary`);
    }

    // Safety: require at least 3 path segments below home
    // (e.g., ~/.claude/skills/agent-assistant is 3 deep, ~/.claude is only 1)
    const relativeDepth = resolved.slice(home.length).split(path.sep).filter(Boolean).length;
    if (relativeDepth < 3) {
        throw new Error(`SAFETY: Refusing to delete ${resolved} — too close to home directory (depth ${relativeDepth}, minimum 3)`);
    }

    if (fs.existsSync(dir)) {
        try {
            const stat = fs.lstatSync(dir);
            if (stat.isSymbolicLink()) {
                fs.unlinkSync(dir);
            } else {
                fs.rmSync(dir, { recursive: true, force: true });
            }
            progressState.removedPaths.push(dir);
            if (trackProgress) {
                updateProgress(`Removed ${path.basename(dir)}`);
            }
            return true;
        } catch (e) {
            logError('remove', dir, e);
            return false;
        }
    }
    return false;
}

/**
 * Remove a single file with tracking
 */
function removeFile(filePath, trackProgress = true) {
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            progressState.removedPaths.push(filePath);
            if (trackProgress) {
                updateProgress(`Removed ${path.basename(filePath)}`);
            }
            return true;
        } catch (e) {
            logError('remove', filePath, e);
            return false;
        }
    }
    return false;
}

/**
 * Remove only bundled agents from an agents directory, preserving user-custom agents.
 */
function removeBundledAgents(agentsDir) {
    const { BUNDLED_AGENTS } = require('./config');
    if (!fs.existsSync(agentsDir)) return 0;

    let removed = 0;
    for (const agentFile of BUNDLED_AGENTS) {
        const agentPath = path.join(agentsDir, agentFile);
        if (fs.existsSync(agentPath)) {
            if (removeFile(agentPath)) {
                removed++;
            }
        }
    }

    // Cleanup: Remove agents folder if empty
    try {
        const remaining = fs.readdirSync(agentsDir);
        if (remaining.length === 0) {
            removeDir(agentsDir, false);
        }
    } catch (e) {
        // Ignore
    }

    return removed;
}

/**
 * Atomically replace a directory: copy to temp → rename old → rename temp → cleanup.
 * Prevents crash-unsafe state where old dir is deleted but new copy is incomplete.
 *
 * @param {string} targetDir - The directory to replace
 * @param {Function} populateFn - Function(tempDir) that populates the temp directory. Must return file count.
 * @returns {number} File count from populateFn
 */
function safeReplaceDir(targetDir, populateFn) {
    const tempDir = targetDir + '.installing';
    const backupDir = targetDir + '.backup';

    // Clean up any leftovers from a previous failed install
    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
    if (fs.existsSync(backupDir)) {
        fs.rmSync(backupDir, { recursive: true, force: true });
    }

    // Step 1: Create temp dir and populate it
    ensureDir(tempDir);
    let count;
    try {
        count = populateFn(tempDir);
    } catch (e) {
        // Cleanup temp on failure
        fs.rmSync(tempDir, { recursive: true, force: true });
        throw e;
    }

    // Step 2: Swap directories atomically
    try {
        if (fs.existsSync(targetDir)) {
            fs.renameSync(targetDir, backupDir);
        }
        fs.renameSync(tempDir, targetDir);
    } catch (e) {
        // Attempt recovery: restore backup if swap failed
        if (!fs.existsSync(targetDir) && fs.existsSync(backupDir)) {
            try { fs.renameSync(backupDir, targetDir); } catch (_) { /* best effort */ }
        }
        // Clean up temp if it still exists
        if (fs.existsSync(tempDir)) {
            try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) { /* best effort */ }
        }
        throw e;
    }

    // Step 3: Remove backup on success
    if (fs.existsSync(backupDir)) {
        try { fs.rmSync(backupDir, { recursive: true, force: true }); } catch (_) { /* non-critical */ }
    }

    // Step 4: Fix tracked file paths — replace temp dir prefix with final target dir
    // so that verifyInstallation() checks the correct (renamed) paths
    for (let i = 0; i < progressState.copiedFiles.length; i++) {
        if (progressState.copiedFiles[i].startsWith(tempDir + path.sep)) {
            progressState.copiedFiles[i] = targetDir + progressState.copiedFiles[i].slice(tempDir.length);
        }
    }

    return count;
}

module.exports = {
    logError,
    getEstimatedFileCount,
    saveInstallCache,
    ensureDir,
    copyWithReplace,
    copyFileWithReplace,
    removeDir,
    removeFile,
    removeBundledAgents,
    safeReplaceDir,
};
