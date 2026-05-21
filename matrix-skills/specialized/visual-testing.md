---
name: visual-testing
description: Browser-based visual testing with Chrome DevTools MCP, screenshot evidence collection, responsive breakpoint validation
type: skill
version: 1.0
tier: 3 | TRIGGER: ui, visual, screenshot, css, layout, responsive, accessibility, component, design-system
updated: 2026-04-25
---

# Visual Testing Skill

> **PURPOSE**: Browser-based visual testing using Chrome DevTools MCP for screenshot evidence and responsive validation
> **TRIGGERS**: UI changes, CSS modifications, responsive design work, accessibility verification
> **INTEGRATION**: See `rules/PHASE-GATE.md § G-VISUAL` for gate requirements

---

## OVERVIEW

Visual testing captures the actual rendered output of UI components across different viewport sizes and states. This provides concrete evidence for Mailbox submissions and enables automated regression detection.

### Tools Required

| Tool | Purpose |
|------|---------|
| Chrome DevTools MCP | Browser automation, screenshot capture |
| Playwright (optional) | Alternative browser automation |
| Puppeteer (optional) | Alternative browser automation |

---

## CHROME DEVTOOLS MCP SETUP

### Installation

```bash
# Install Chrome DevTools MCP server
npm install -g @anthropic/mcp-server-chrome-devtools

# Configure in your MCP settings
# ~/.{TOOL}/mcp_settings.json or equivalent
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-chrome-devtools"]
    }
  }
}
```

### Available Tools

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to URL |
| `browser_snapshot` | Get page structure |
| `browser_take_screenshot` | Capture screenshot |
| `browser_console_messages` | Get console logs |
| `browser_mouse_click` | Click element |

---

## SCREENSHOT CAPTURE WORKFLOW

### 1. Setup Browser Session

```
1. NAVIGATE to target page
2. WAIT for page load
3. VALIDATE page structure
```

### 2. Capture Breakpoint Screenshots

```
FOR each breakpoint:
  1. SET viewport size:
     - Mobile: 375x667 (iPhone SE)
     - Tablet: 768x1024 (iPad)
     - Desktop: 1440x900 (standard)
     - Wide: 1920x1080 (large)
  2. WAIT for layout to settle
  3. TAKE screenshot with naming: {component}-{breakpoint}.png
  4. VALIDATE no visual overflow
```

### 3. Screenshot Naming Convention

```
{component-name}-{breakpoint}-{state}.png

Examples:
  - navbar-mobile-default.png
  - navbar-tablet-scrolled.png
  - card-desktop-hover.png
  - modal-mobile-open.png
```

### 4. Organize Evidence

```
./reports/{topic}/screenshots/
├── 00-index.md              # Screenshot manifest
├── navbar/
│   ├── navbar-mobile.png
│   ├── navbar-tablet.png
│   └── navbar-desktop.png
├── cards/
│   └── ...
└── modals/
    └── ...
```

---

## RESPONSIVE BREAKPOINT VALIDATION

### Breakpoint Matrix

| Breakpoint | Width | Height | Device |
|------------|-------|--------|--------|
| xs | < 576px | - | Mobile S |
| sm | 576-767px | - | Mobile L |
| md | 768-991px | - | Tablet |
| lg | 992-1199px | - | Desktop S |
| xl | 1200-1399px | - | Desktop M |
| xxl | ≥ 1400px | - | Desktop L |

### Validation Checklist

```
□ Viewport resize works correctly
□ No horizontal overflow
□ Typography scales appropriately
□ Touch targets ≥ 44px on mobile
□ Images resize without distortion
□ Navigation collapses to hamburger at md
□ Modals are usable on all breakpoints
□ No content hidden by fixed headers
```

---

## VISUAL DIFF APPROACH

### Baseline Strategy

```
1. CAPTURE baseline screenshots (first run)
2. STORE baseline in version control or artifact storage
3. COMPARE new screenshots against baseline
4. FLAG differences for review
```

### Diff Tools

| Tool | Pros | Cons |
|------|------|------|
| Playwright screenshot | Built-in diff | Requires Playwright |
| pixelmatch | Lightweight | Manual integration |
| puppeteer-to-jpeg | Simple | No built-in diff |
| BackstopJS | Full visual regression | Complex setup |

### Diff Thresholds

```
ACCEPTABLE: Minor anti-aliasing differences
ACCEPTABLE: Sub-pixel layout shifts
FLAGGED: Color changes
FLAGGED: Missing elements
FLAGGED: Layout breaks
FLAGGED: Content truncation
```

---

## SCREENSHOT EVIDENCE FOR MAILBOX

### Required Evidence Format

When submitting UI changes via Mailbox, include:

```markdown
## Visual Evidence

### Screenshots
| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Navbar | [navbar-mobile.png](./screenshots/navbar-mobile.png) | [navbar-tablet.png](./screenshots/navbar-tablet.png) | [navbar-desktop.png](./screenshots/navbar-desktop.png) |
| Card | [card-mobile.png](./screenshots/card-mobile.png) | [card-tablet.png](./screenshots/card-tablet.png) | [card-desktop.png](./screenshots/card-desktop.png) |

### Validation Status
- [x] No horizontal overflow on any breakpoint
- [x] Touch targets ≥ 44px on mobile
- [x] Typography legible at all sizes
- [x] Images load correctly

### Screenshot Location
`./reports/{topic}/screenshots/`
```

---

## ACCESSIBILITY VERIFICATION

### Visual Accessibility Checklist

```
□ Color contrast ≥ 4.5:1 (WCAG AA)
□ Focus indicators visible
□ No information conveyed by color alone
□ Text resizable to 200% without loss
□ Animations respect prefers-reduced-motion
□ No content flashes >3 times per second
```

### Tools

| Tool | Purpose |
|------|---------|
| axe DevTools | Automated accessibility audit |
| Lighthouse | Accessibility score |
| Color Oracle | Color blindness simulation |

---

## COMMON ISSUES

### Layout Problems

| Issue | Cause | Fix |
|-------|-------|-----|
| Horizontal scroll | Width > 100% | Check flexbox overflow |
| Overlapping elements | z-index conflict | Adjust stacking |
| Hidden content | overflow: hidden | Check overflow settings |
| Squashed elements | flex-shrink: 1 | Set flex-shrink: 0 |

### Responsive Problems

| Issue | Cause | Fix |
|-------|-------|-----|
| Large images | No max-width | Set max-width: 100% |
| Tiny text | rem/em issues | Check root font size |
| Untouchable buttons | Too small | Set min-height: 44px |

---

## QUICK REFERENCE

```bash
# Quick test command structure
npx @anthropic/mcp-server-chrome-devtools capture \
  --url http://localhost:3000 \
  --breakpoints mobile,tablet,desktop \
  --output ./screenshots \
  --name my-component
```

---

## G-VISUAL GATE INTEGRATION

This skill implements the visual testing requirements for `rules/PHASE-GATE.md § G-VISUAL`:

|| Gate | Criterion | How This Skill Addresses |
|------|----------|--------------------------|
| G-VISUAL-01 | Screenshots captured | See `## SCREENSHOT CAPTURE WORKFLOW` above |
| G-VISUAL-02 | No layout breaks | See `## RESPONSIVE BREAKPOINT VALIDATION` above |
| G-VISUAL-03 | Touch targets verified | See `## ACCESSIBILITY VERIFICATION` checklist |
| G-VISUAL-04 | Evidence archived | See `## SCREENSHOT EVIDENCE FOR MAILBOX` format |

---

**Skill loaded** — Visual testing ready for browser-based UI validation.
