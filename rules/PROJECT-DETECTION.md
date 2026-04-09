---
schema-version: "1.0"
name: project-detection
category: dx
description: "Heuristic rules for auto-detecting project type, language, and framework"
version: "1.0"
---

# Project Detection Heuristics

> Agents MAY consult this file during Step 0 (context gathering) to auto-detect project type and apply smart defaults.
> Detection results are **advisory, not binding**. User-specified commands always override smart defaults.

---

## Detection Rules

| # | File/Pattern | Detected Type | Language | Framework | Confidence |
|---|-------------|---------------|----------|-----------|:----------:|
| 1 | `package.json` + `next.config.*` | web-app | TypeScript/JS | Next.js | HIGH |
| 2 | `package.json` + `angular.json` | web-app | TypeScript | Angular | HIGH |
| 3 | `package.json` + `vite.config.*` | web-app | TypeScript/JS | Vite | HIGH |
| 4 | `package.json` + `src/App.{jsx,tsx}` | web-app | TypeScript/JS | React | MEDIUM |
| 5 | `package.json` (no framework markers) | node-lib | JavaScript | Node.js | LOW |
| 6 | `pyproject.toml` or `setup.py` | python-pkg | Python | — | HIGH |
| 7 | `requirements.txt` + `manage.py` | web-app | Python | Django | HIGH |
| 8 | `requirements.txt` + `app.py` | web-app | Python | Flask | MEDIUM |
| 9 | `Cargo.toml` | rust-pkg | Rust | — | HIGH |
| 10 | `go.mod` | go-pkg | Go | — | HIGH |
| 11 | `pom.xml` or `build.gradle` | java-pkg | Java/Kotlin | Maven/Gradle | HIGH |
| 12 | `Gemfile` + `config/routes.rb` | web-app | Ruby | Rails | HIGH |
| 13 | `pubspec.yaml` | mobile-app | Dart | Flutter | HIGH |
| 14 | `*.xcodeproj` or `*.xcworkspace` | mobile-app | Swift/ObjC | iOS | HIGH |
| 15 | `docker-compose.yml` + `Dockerfile` | containerized | — | Docker | MEDIUM |
| 16 | `terraform/*.tf` | infra | HCL | Terraform | HIGH |

### Resolution

- Multiple matches → pick highest confidence; on tie → prefer framework-specific over generic.
- No match → type = `unknown`, apply no defaults.

---

## Smart Defaults

| Project Type | Test Command | Build Command | Lint Command | Dev Command |
|-------------|-------------|---------------|-------------|-------------|
| web-app (Next.js) | `npm test` | `npm run build` | `npm run lint` | `npm run dev` |
| web-app (Angular) | `ng test` | `ng build` | `ng lint` | `ng serve` |
| web-app (Vite/React) | `npm test` | `npm run build` | `npm run lint` | `npm run dev` |
| node-lib | `npm test` | `npm run build` | `npm run lint` | — |
| python-pkg | `pytest` | `python -m build` | `ruff check .` | — |
| web-app (Django) | `python manage.py test` | — | `ruff check .` | `python manage.py runserver` |
| web-app (Flask) | `pytest` | — | `ruff check .` | `flask run` |
| rust-pkg | `cargo test` | `cargo build` | `cargo clippy` | — |
| go-pkg | `go test ./...` | `go build ./...` | `golangci-lint run` | — |
| java-pkg (Maven) | `mvn test` | `mvn package` | `mvn checkstyle:check` | — |
| web-app (Rails) | `rails test` | — | `rubocop` | `rails server` |
| mobile-app (Flutter) | `flutter test` | `flutter build` | `flutter analyze` | `flutter run` |

---

## Override

User-specified commands in project config, environment variables, or command arguments **always** take precedence over smart defaults. Detection results should be presented as suggestions, never enforced silently.

---

## Extending

To add a new heuristic:
1. Add a row to the Detection Rules table with file pattern, type, confidence
2. Add corresponding Smart Defaults row
3. Prefer HIGH confidence markers (unique config files) over LOW (generic files)
