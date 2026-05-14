# mobile — Professional Skill

> **TIER**: 2 | **TRIGGER**: Mobile app development, React Native, Flutter, iOS, Android
> **PURPOSE**: Build mobile apps that are fast, responsive, and feel native

---

## Trigger Conditions

```
APPLY WHEN:
  □ Developing mobile apps (iOS, Android, cross-platform)
  □ Mobile-specific UX patterns
  □ Mobile performance optimization
  □ Native module integration
  □ App store submission
  □ Push notifications
  □ Offline-first mobile architecture

SKIP WHEN:
  □ Web application (→ professional/frontend)
  □ Expert-level mobile architecture (→ expert/system-design)
  □ Native-only performance tuning (→ specialized/performance)
  □ Mobile security hardening (→ specialized/security)
```

---

## Actions

### Step 1: Define the Mobile Architecture

```
□ iOS only, Android only, or cross-platform?
□ Cross-platform: React Native vs Flutter vs Capacitor (and why)
□ What is the state management strategy?
□ What is the navigation strategy?
□ Is offline-first needed? (local data + sync)
□ What native features are needed? (camera, GPS, push)
□ What is the API communication strategy? (REST, GraphQL, websockets)
□ What are the platform-specific requirements?

□ Cross-platform: faster development, slightly worse native feel.
□ Native: best performance, higher cost, platform expertise needed.
□ React Native: JavaScript/TypeScript, large ecosystem, bridge overhead.
□ Flutter: Dart, best cross-platform UI, less mature ecosystem.
```

### Step 2: Design for Mobile Constraints

```
□ Memory: mobile devices have limited RAM (optimize images, lazy load).
□ Battery: background processes drain battery (minimize background work).
□ Network: cellular is slower and less reliable (optimize payloads, offline).
□ Screen: small screens need focused, prioritized content.
□ Input: touch is less precise than mouse (bigger touch targets).
□ Orientation: support portrait/landscape or lock? (per screen).
□ Fragmentation: many screen sizes, OS versions, hardware capabilities.

□ Mobile-first design: start with the most constrained device.
□ Performance matters more on mobile: 60fps is critical.
□ Network failures are normal: design for offline.
```

### Step 3: Build the UI Layer

```
□ Use platform-native components where possible.
□ Implement navigation with deep linking support.
□ Handle safe areas (notch, home indicator, status bar).
□ Support dark mode and system themes.
□ Optimize images: appropriate size, format, lazy loading.
□ Implement pull-to-refresh and infinite scroll.
□ Handle keyboard events (scroll to input, dismiss on submit).
□ Test on real devices, not just simulators.

□ Platform conventions: iOS uses certain patterns, Android others.
□ Cross-platform: don't fight the platform, embrace conventions.
□ Accessibility: support VoiceOver/TalkBack, Dynamic Type, high contrast.
```

### Step 4: Implement State Management

```
□ Local UI state: useState/useReducer (minimal, local).
□ Shared state: context, state management library.
□ Server state: caching, synchronization, optimistic updates.
□ Persistence: local storage for offline, preferences.
□ Form state: managed, validated, error handling.

□ Server state is different from local state: caching, refetching, mutations.
□ Optimistic updates: update UI immediately, rollback on error.
□ Persistence: what's saved locally, what's fetched fresh?
□ Large state: paginate, virtualize, don't render everything.
```

### Step 5: Optimize for Performance

```
□ 60fps animations and scrolling (jank is noticeable on mobile).
□ Lazy load images and heavy components.
□ Memoize expensive computations.
□ Virtualize long lists (react-native's FlatList, Flutter's ListView).
□ Minimize bridge crossings (for cross-platform).
□ Optimize startup time (lazy load, defer non-critical work).
□ Profile on real devices: simulators are not accurate.
□ Monitor memory: don't leak, use proper cleanup.

□ FPS is measurable. Profile with DevTools, not guess.
□ Images are usually the bottleneck. Optimize aggressively.
□ JS thread in cross-platform is a bottleneck. Minimize work there.
```

### Step 6: Handle Mobile-Specific Features

```
□ Push notifications: permission flow, handling, deep links.
□ Offline mode: queue operations, sync when online.
□ Background processing: limited, battery-conscious.
□ Permissions: request at time of use, handle denial gracefully.
□ Biometric auth: fingerprint, face ID.
□ Deep linking: handle URLs from external sources.
□ In-app purchases: store guidelines, receipt validation.

□ Permissions: ask when needed, not upfront. Explain why.
□ Offline: show cached data, queue mutations, sync when online.
□ Push: respect notification settings, don't spam.
```

---

## Outputs

```
## Mobile Architecture

### Platform
|| Platform | Strategy | Rationale |
||----------|----------|-----------|
|| iOS | [native/cross-platform] | [why] |
|| Android | [native/cross-platform] | [why] |

### State Management
|| Type | Tool | Scope |
||------|------|-------|
|| UI state | [tool] | local |
|| Shared state | [tool] | app-wide |
|| Server state | [tool] | API layer |
|| Persistence | [tool] | local |

### Navigation
|| Library | Deep Linking | Nested Navs |
||---------|-------------|-------------|
|| [library] | [yes/no] | [yes/no] |

### Performance Targets
|| Metric | Target | Monitoring |
||--------|--------|------------|
|| Startup | < [N]s | [tool] |
|| Scrolling | 60fps | [tool] |
|| Memory | < [N]MB | [tool] |

### Platform-Specific
|| Feature | iOS | Android |
||---------|-----|--------|
|| Push | [impl] | [impl] |
|| Biometric | [impl] | [impl] |
|| Offline | [impl] | [impl] |

### App Store Readiness
□ App icon and screenshots
□ Privacy policy URL
□ Store listing copy
□ Testing on real devices
□ Beta testing (TestFlight/Play Store)
□ Crash reporting
□ Analytics (opt-in)
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Performance | 60fps scrolling on real device | Optimize rendering |
| Offline | App works offline with cached data | Add offline support |
| Permissions | Graceful handling of denied permissions | Fix flows |
| Accessibility | VoiceOver/TalkBack works | Test accessibility |
| Battery | No excessive background drain | Optimize background work |
| App Store | Meets store guidelines | Fix before submission |

---

## Common Mistakes

```
❌ Not testing on real devices (simulators are misleading)
❌ Rendering too much data (use virtualization)
❌ Unoptimized images (wrong size, format, not lazy loaded)
❌ Blocking the JS thread (animations on JS, not native)
❌ Poor offline experience (crashes when network drops)
❌ Asking for all permissions upfront
❌ Not handling keyboard properly
❌ Ignoring dark mode
❌ Not supporting different screen sizes
❌ Ignoring platform conventions (feels "wrong" to users)
```
