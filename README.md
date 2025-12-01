# InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp

![InstaFlow Banner](https://raw.githubusercontent.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/main/.github/assets/instaflow-hero-banner.png)

[![Build Status](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/actions/workflows/ci.yml/badge.svg)](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/actions/workflows/ci.yml)
[![Code Coverage](https://codecov.io/gh/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/branch/main/graph/badge.svg)](https://codecov.io/gh/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Linter_Formatter-Biome-000000?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Unit_Testing-Vitest-6E9AD6?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/E2E_Testing-Playwright-2F88F0?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp?style=flat-square&cacheSeconds=3600)](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/stargazers)

> Star ⭐ this Repo to show your support and join our community!

InstaFlow is a robust, open-source fullstack web application designed for visual content sharing, offering a scalable and performant foundation for community-driven social platforms. Built with modern web standards, it ensures high extensibility and a delightful user experience.

## 🚀 Project Overview
InstaFlow provides a comprehensive framework for developing dynamic social media applications, prioritizing clean architecture, high performance, and ease of maintenance. It is ideal for developers seeking a cutting-edge platform to build their next-generation content-sharing service.

## 📦 Architectural Design: Feature-Sliced Design (FSD)
InstaFlow adopts the **Feature-Sliced Design (FSD)** methodology for its frontend architecture, promoting a highly modular, scalable, and maintainable codebase. This approach ensures strict separation of concerns, clear dependencies, and predictable scaling.

mermaid
graph TD
    A[App Layer] --> B(Pages Layer)
    B --> C(Widgets Layer)
    C --> D(Features Layer)
    D --> E(Entities Layer)
    E --> F(Shared Layer)
    F -- Util/Config --> F


**Key Principles of FSD:**
*   **Layers:** Enforced hierarchy (`app` > `pages` > `widgets` > `features` > `entities` > `shared`). Dependencies only flow downwards.
*   **Slices:** Each layer is divided into logical "slices" (e.g., `user`, `post`, `auth`) to encapsulate related logic.
*   **Segments:** Within slices, code is organized into segments (`ui`, `model`, `api`, `lib`, `config`).

## 📋 Table of Contents
*   [🚀 Project Overview](#-project-overview)
*   [📦 Architectural Design: Feature-Sliced Design (FSD)](#-architectural-design-feature-sliced-design-fsd)
*   [📋 Table of Contents](#-table-of-contents)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🛠️ Development Standards](#️-development-standards)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Available Scripts](#available-scripts)
    *   [Core Development Principles](#core-development-principles)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#️-security)
*   [📝 License](#-license)

## 🤖 AI Agent Directives
<details>
<summary>Click to view AI Agent Directives</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This repository, `InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp`, is a fullstack web application with a strong frontend focus.

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend & Fullstack Foundation)**
    *   **Stack:** This project leverages **TypeScript 6.x (Strict Mode)**, **React 19 (Hooks-based)**, **Vite 7** (for bundling and development server), and **TailwindCSS v4** (for utility-first styling). For package management, `pnpm` is preferred.
    *   **Backend (Foundation):** While primarily focused on frontend, the "Fullstack" designation implies a robust backend. Future iterations or contributions should consider Node.js with a framework like Express or NestJS, leveraging TypeScript, adhering to RESTful or GraphQL principles.
    *   **Lint/Format:** **Biome** (for ultra-fast linting and formatting, replacing ESLint/Prettier for speed and integrated tooling).
    *   **Unit/Component Testing:** **Vitest** (fast, Vite-native testing framework).
    *   **End-to-End (E2E) Testing:** **Playwright** (for reliable, cross-browser automation and testing).
    *   **Architecture:** Adheres strictly to **Feature-Sliced Design (FSD)** for the frontend, promoting modularity, clear layer separation, and scalability. Backend architecture, when implemented, should lean towards **Modular Monolith** or **Hexagonal Architecture** principles.

*   **VERIFICATION COMMANDS:**
    *   **Install Dependencies:** `pnpm install`
    *   **Run Development Server:** `pnpm dev`
    *   **Build for Production:** `pnpm build`
    *   **Lint & Format Check:** `pnpm lint`
    *   **Run Unit Tests:** `pnpm test`
    *   **Run E2E Tests:** `pnpm test:e2e`

---

## 4. APEX NAMING CONVENTION (THE "STAR VELOCITY" ENGINE)
**Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>`
**Format:** `Title-Case-With-Hyphens`

**Example for this project:** `InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp`

*   **Product-Name:** `InstaFlow` (Distinct, evocative of instant flow/sharing)
*   **Primary-Function:** `Visual-Content-Sharing-Platform` (Clearly defines core functionality)
*   **Platform:** `Fullstack` (Indicates both frontend and backend components)
*   **Type:** `WebApp` (Specifies the application type)

---

## 5. DESIGN & DEVELOPMENT PRINCIPLES

*   **DRY (Don't Repeat Yourself):** Eliminate redundant code; abstract common functionalities.
*   **SOLID Principles:** Adhere to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **YAGNI (You Ain't Gonna Need It):** Implement only features that are currently required; avoid premature optimization or over-engineering.
*   **Test-Driven Development (TDD):** Write tests before code to ensure functionality and maintainability.
*   **Code Review Excellence:** Ensure all changes undergo rigorous peer review.
*   **Performance First:** Optimize for speed, responsiveness, and resource efficiency.
*   **Accessibility (A11y):** Design and implement with inclusive practices to ensure usability for all users.
*   **Security Best Practices:** Implement secure coding patterns; protect against common vulnerabilities (OWASP Top 10).
*   **Observability:** Integrate logging, tracing, and monitoring for proactive issue detection and resolution.

</details>

## 🛠️ Development Standards

### Prerequisites
Ensure you have the following installed:
*   **Node.js**: v18.x or higher
*   **pnpm**: v8.x or higher (`npm install -g pnpm`)
*   **Git**: Latest version

### Installation
To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp.git
    cd InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp
    

2.  **Install dependencies:**
    bash
    pnpm install
    

3.  **Start the development server:**
    bash
    pnpm dev
    
    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

### Available Scripts
In the project directory, you can run:

| Script              | Description                                                          |
| :------------------ | :------------------------------------------------------------------- |
| `pnpm dev`          | Runs the app in development mode.                                    |
| `pnpm build`        | Builds the app for production to the `dist` folder.                  |
| `pnpm preview`      | Serves the production build locally for testing.                     |
| `pnpm lint`         | Lints and formats code using Biome.                                  |
| `pnpm lint:fix`     | Lints and automatically fixes code using Biome.                      |
| `pnpm test`         | Runs unit/component tests with Vitest.                               |
| `pnpm test:e2e`     | Runs end-to-end tests with Playwright.                               |
| `pnpm test:e2e:ui`  | Runs Playwright E2E tests with UI mode.                              |

### Core Development Principles
*   **SOLID Principles:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Avoid redundancy; promote reusable components and logic.
*   **YAGNI (You Ain't Gonna Need It):** Focus on current requirements; resist over-engineering for future speculative needs.
*   **Atomic Commits:** Each commit should represent a single logical change.
*   **Clean Code:** Prioritize readability, simplicity, and maintainability.

## 🤝 Contributing
We welcome contributions to InstaFlow! Please see our [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed guidelines on how to get started, report bugs, and propose features. Your help makes this project better!

## 🛡️ Security
For information on security vulnerabilities and how to report them, please refer to our [SECURITY.md](.github/SECURITY.md) policy.

## 📝 License
This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License (CC BY-NC 4.0). See the [LICENSE](LICENSE) file for details.
