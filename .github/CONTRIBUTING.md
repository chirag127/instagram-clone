# Contribution Guidelines for InstaFlow

Welcome to the development community for **InstaFlow**! As an Apex-Architected project, we maintain strict adherence to Zero-Defect, High-Velocity, and Future-Proof principles. Your contributions help elevate this visual content sharing platform.

## 1. Architectural Alignment (The Apex Mandate)

All contributions must align with the established 2026 architectural standards, detailed in `AGENTS.md`. Key principles include:

*   **SOLID Compliance:** Every module, component, or function must exhibit high cohesion and low coupling.
*   **Feature-Sliced Design (FSD):** For front-end work, maintain strict feature boundaries (`layers/components/features`).
*   **CQS Enforcement:** Commands must mutate state; Queries must only read state. Never mix concerns.
*   **Zero-Error Standard:** Code must pass all Linter (`Biome`) and Test (`Vitest`/`Playwright`) suites before merging.

## 2. Development Environment Setup

Ensure your local environment mirrors the CI configuration:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp.git
cd InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp

# 2. Install dependencies (Assuming Node.js/Vite/TypeScript setup)
npm install

# 3. Run the full validation suite immediately
npm run validate # This executes linting, unit tests, and E2E checks
```

## 3. The Contribution Workflow

We enforce a disciplined workflow to maintain semantic versioning and high code quality.

### A. Branching Strategy

All development must occur on feature branches based off `main`. Use **Conventional Commits** for all messages.

*   **New Feature:** `feat/short-description`
*   **Bug Fix:** `fix/issue-id-short-description`
*   **Refactoring/Chore:** `refactor/name` or `chore/update-dependency`

### B. Commit Messages (Mandatory)

Use the Angular Commit Message Convention for clear change history archaeology:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

**Examples:**
*   `feat(auth): implement passwordless sign-in using WebAuthn`
*   `fix(feed): resolve infinite loop in data fetching query`

### C. Pull Requests (PRs)

1.  **Target Branch:** Always target `main`.
2.  **Linking:** Reference associated GitHub Issues (e.g., `Closes #123`) in the PR body.
3.  **Self-Review:** Before submission, review your changes against the **AI AGENT DIRECTIVES** (Section 4).
4.  **Template Use:** Complete the **Pull Request Template** located at `.github/PULL_REQUEST_TEMPLATE.md`.
5.  **Approvals:** Require at least one maintainer approval.

## 4. Architectural Validation & Self-Correction

Before opening a PR, ensure you have run the following commands successfully. Automated CI will re-run these checks, but local pre-validation saves collective time.

| Check Category | Command | Expectation |
| :--- | :--- | :--- |
| **Formatting/Linting** | `npm run format` | Zero format warnings applied. |
| **Unit Testing** | `npm run test:unit` | 100% pass rate. Strive for high coverage. |
| **E2E/Integration** | `npm run test:e2e` | All critical user flows pass. |
| **Security Scan** | `npm run audit` | No critical or high vulnerabilities detected. |

## 5. Reporting Issues

If you encounter bugs or wish to propose enhancements, please use the provided templates:

*   **Bug Reports:** Use `.github/ISSUE_TEMPLATE/bug_report.md`.
*   **Feature Requests:** Use the standard Issue template, detailing the *Why* (user problem) and *How* (proposed solution).

**Do not skip providing sufficient context or steps to reproduce.** Unreproducible reports will be closed immediately.

## 6. Security Disclosures

We take security seriously. If you discover a vulnerability, **DO NOT** open a public issue. Follow the guidelines in **`.github/SECURITY.md`** for responsible disclosure.

Thank you for helping build the future of visual storytelling with **InstaFlow**.