/**
 * Progress tracking and display for the CLI installer.
 */

const path = require('node:path');

/**
 * Progress tracking state
 */
const progressState = {
    total: 0,
    current: 0,
    phase: '',
    errors: [],
    startTime: 0,
    copiedFiles: [],
    removedPaths: [],
    lastDraw: 0,          // Throttle draws
    lastPercent: -1       // Track last drawn percent
};

// Check if stdout is a TTY (interactive terminal)
const isTTY = process.stdout.isTTY;

/**
 * Reset progress state for new operation
 */
function resetProgress() {
    progressState.total = 0;
    progressState.current = 0;
    progressState.phase = '';
    progressState.errors = [];
    progressState.startTime = Date.now();
    progressState.copiedFiles = [];
    progressState.removedPaths = [];
    progressState.lastDraw = 0;
    progressState.lastPercent = -1;
}

/**
 * Draw progress bar in terminal (real-time single line update)
 * @param {number} current - Current progress
 * @param {number} total - Total items
 * @param {boolean} force - Force draw regardless of throttle
 */
function drawProgress(current, total, force = false) {
    if (total === 0) return;
    
    const percent = Math.min(100, Math.round((current / total) * 100));
    const now = Date.now();
    
    // Throttle: only draw every 50ms OR when percent changes OR forced
    if (!force && percent === progressState.lastPercent && (now - progressState.lastDraw) < 50) {
        return;
    }
    
    const prevPercent = progressState.lastPercent;
    progressState.lastDraw = now;
    progressState.lastPercent = percent;
    
    const width = 40;
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    
    // Unicode progress bar characters
    const filledChar = '█';
    const emptyChar = '░';
    
    const bar = filledChar.repeat(filled) + emptyChar.repeat(empty);
    const stats = `${current.toLocaleString()}/${total.toLocaleString()}`;
    const elapsed = ((now - progressState.startTime) / 1000).toFixed(1);
    
    const line = `  ${bar} ${percent}% (${stats}) ${elapsed}s`;
    
    if (isTTY) {
        // Real TTY: clear line and rewrite on same line
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(line);
    } else {
        // Non-TTY (piped): only print on percent milestones
        if (percent % 10 === 0 && percent !== prevPercent) {
            console.log(line);
        }
    }
}

/**
 * Update progress counter (no draw - for batch updates)
 */
function updateProgress(phase) {
    progressState.current++;
    progressState.phase = phase;
    drawProgress(progressState.current, progressState.total);
}

/**
 * Complete progress bar and move to next line
 */
function completeProgress() {
    if (progressState.total > 0) {
        drawProgress(progressState.total, progressState.total, true);
        console.log(''); // New line after progress bar
    }
    // Lazy require to break circular dependency with fs-utils
    const { saveInstallCache } = require('./fs-utils');
    saveInstallCache();
}

function formatNumber(num) {
    return num.toLocaleString();
}

module.exports = {
    progressState,
    isTTY,
    resetProgress,
    drawProgress,
    updateProgress,
    completeProgress,
    formatNumber,
};
