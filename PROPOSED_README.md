# InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp

![InstaFlow Hero Banner](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/docs/assets/instaflow-hero-banner.png?raw=true)

<p align="center">
  <!-- Build Status -->
  <a href="https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/ci.yml?style=flat-square&label=Build&branch=main" alt="Build Status">
  </a>
  <!-- Code Coverage -->
  <a href="https://codecov.io/gh/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp">
    <img src="https://img.shields.io/codecov/c/github/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp?style=flat-square&label=Code%20Coverage&token=YOUR_CODECOV_TOKEN" alt="Code Coverage">
  </a>
  <!-- Frontend Tech Stack -->
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript%20%7C%20Vite%20%7C%20TailwindCSS-blueviolet?style=flat-square" alt="Frontend Tech Stack">
  <!-- Backend Tech Stack (Assumption) -->
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20PostgreSQL-forestgreen?style=flat-square" alt="Backend Tech Stack">
  <!-- Lint/Format -->
  <img src="https://img.shields.io/badge/Lint/Format-Biome-informational?style=flat-square" alt="Lint/Format">
  <!-- License -->
  <a href="https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square" alt="License">
  </a>
  <!-- GitHub Stars -->
  <a href="https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/stargazers">
    <img src="https://img.shields.io/github/stars/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp?style=flat-square&label=Stars&color=yellow" alt="GitHub Stars">
  </a>
</p>

<p align="center">
  <a href="https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/stargazers">
    <img src="https://img.shields.io/badge/Star%20%E2%AD%90%20this%20Repo!-FFD700?style=for-the-badge&logo=github&logoColor=white" alt="Star this Repository">
  </a>
</p>


InstaFlow is a high-performance, open-source fullstack web application designed for seamless visual content sharing, blending modern frontend technologies with a robust, scalable backend. It provides a foundation for community-driven social platforms, emphasizing speed, extensibility, and a rich user experience.

## 🚀 Project Overview

InstaFlow emerges as a cutting-edge platform for users to share, discover, and interact with visual content in a dynamic and intuitive environment. Built with the latest web standards, it offers a modular and maintainable architecture, ready for rapid feature development and large-scale deployments.

### 🌟 Key Features

*   **Modern UI/UX:** Leveraging React, TypeScript, Vite, and TailwindCSS for a blazing-fast, responsive, and visually appealing interface.
*   **High Performance:** Optimized for speed and efficiency with Vite's build tooling and React's concurrent features.
*   **Scalable Architecture:** Adopts Feature-Sliced Design (FSD) for the frontend and Hexagonal Architecture for the backend, ensuring maintainability and future growth.
*   **Robust Backend:** Powered by Node.js/Express and PostgreSQL, designed for high-throughput data operations and real-time interactions.
*   **Community-Driven:** Built with extensibility in mind, fostering contributions and further development.
*   **Type-Safe Development:** Full end-to-end type safety with TypeScript, reducing bugs and improving code quality.

### 🗺️ Architecture

InstaFlow's architecture is meticulously designed for clarity, scalability, and maintainability. The frontend adheres to the **Feature-Sliced Design (FSD)** methodology, while the backend employs **Hexagonal Architecture** principles.

mermaid
graph TD
    subgraph Frontend (React/TypeScript/Vite/TailwindCSS)
        App[Application Entrypoint] --> Processes[Complex Scenarios]
        Processes --> Pages[Full Page Compositions]
        Pages --> Widgets[Composite UI Blocks]
        Widgets --> Features[Business Logic & UI Interactions]
        Features --> Entities[Domain-specific Data & UI]
        Entities --> Shared[Low-Level Utils, UI Kit, API Clients]
    end

    subgraph Backend (Node.js/Express/PostgreSQL)
        API[REST API / GraphQL] --> Application[Application Layer]
        Application --> Domain[Domain Core]
        Domain <--> Infrastructure[Database / External Services]
        API --> Infrastructure
    end

    User[User Interface] <--> App
    App <--> API


### 📦 Monorepo Structure

text
.github/
├── workflows/
│   └── ci.yml
├── CONTRIBUTING.md
├── ISSUE_TEMPLATE/
│   └── bug_report.md
├── PULL_REQUEST_TEMPLATE.md
└── SECURITY.md
apps/
├── web/                  # Frontend application (React, Vite, TypeScript, TailwindCSS)
└── api/                  # Backend API (Node.js, Express, PostgreSQL)
packages/
├── ui/                   # Shared UI components
└── types/                # Shared TypeScript types & interfaces
.gitignore
AGENTS.md
badges.yml
LICENSE
PROPOSED_README.md
README.md


## 📖 Table of Contents

*   [🚀 Project Overview](#--project-overview)
    *   [🌟 Key Features](#--key-features)
    *   [🗺️ Architecture](#%EF%B8%8F-architecture)
    *   [📦 Monorepo Structure](#-monorepo-structure)
*   [🛠️ Getting Started](#%EF%B8%8F-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Development Commands](#development-commands)
*   [🧪 Testing](#-testing)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#%EF%B8%8F-security)
*   [📜 License](#-license)
*   [🤖 AI Agent Directives](#-ai-agent-directives)


## 🛠️ Getting Started

Follow these steps to get InstaFlow up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

*   **Node.js**: v18.x or higher
*   **npm** or **Yarn** or **pnpm**: Your preferred package manager
*   **Docker** (optional, for backend services like PostgreSQL)

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp.git
    cd InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp
    

2.  **Install Frontend Dependencies:**
    bash
    cd apps/web
    npm install # or yarn install or pnpm install
    

3.  **Install Backend Dependencies:**
    bash
    cd ../api
    npm install # or yarn install or pnpm install
    

4.  **Set up Environment Variables:**
    Create `.env` files in `apps/web` and `apps/api` based on their respective `.env.example` templates.

5.  **Run Backend Services (e.g., PostgreSQL with Docker):**
    bash
    # Example: Start a PostgreSQL container
    docker run --name instaflow-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14
    # Run migrations (if applicable for backend)
    cd apps/api && npm run migrate
    

### Development Commands

| Command                      | Description                                                  |
| :--------------------------- | :----------------------------------------------------------- |
| `npm run dev` (in `apps/web`)  | Starts the frontend development server.                      |
| `npm run build` (in `apps/web`) | Builds the frontend for production.                          |
| `npm run start` (in `apps/api`) | Starts the backend API server.                               |
| `npm run lint`               | Runs Biome linter across the entire monorepo for all applicable files. |
| `npm run format`             | Runs Biome formatter across the entire monorepo.             |
| `npm run test` (in `apps/web`)  | Executes unit and component tests with Vitest.               |
| `npm run test:e2e` (in `apps/web`) | Runs end-to-end tests with Playwright.                       |


## 🧪 Testing

InstaFlow is committed to a high standard of code quality through comprehensive testing:

*   **Unit & Component Tests:** Implemented using `Vitest` in the `apps/web` directory.
*   **End-to-End (E2E) Tests:** Handled by `Playwright` to simulate user interactions across the full application flow.

To run tests:

bash
cd apps/web
npm run test
npm run test:e2e


## 🤝 Contributing

We welcome contributions to InstaFlow! Please refer to our [Contributing Guidelines](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/.github/CONTRIBUTING.md) for details on how to get involved.

## 🛡️ Security

Security is a top priority for InstaFlow. Please review our [Security Policy](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/.github/SECURITY.md) to understand how to report vulnerabilities.

## 📜 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/LICENSE).

## 🤖 AI Agent Directives

<details>
<summary>Click to view AI Agent Directives for InstaFlow</summary>

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
**Directives:** This project, `InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp`, is a modern web application.

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend)**
    *   **Stack:** This project leverages **TypeScript 6.x** (Strict Mode), **React 19+** with **Signals** for state management, **Vite 7** (powered by Rolldown) for blazing-fast development and optimized builds, and **TailwindCSS v4** for utility-first styling. The backend is anticipated to be a robust **Node.js/Express** microservice architecture with **PostgreSQL**.
    *   **Architecture:** Adheres strictly to the **Feature-Sliced Design (FSD)** methodology for scalable, maintainable, and highly decoupled frontend architecture. Backend follows **Hexagonal Architecture** principles for clear separation of business logic from infrastructure.
    *   **Lint/Test:** **Biome** is used for ultra-fast linting and formatting. **Vitest** for unit and component testing, and **Playwright** for robust end-to-end (E2E) testing across browser environments.
    *   **State Management:** Prioritize **Signals** for efficient and reactive state management in the frontend, adhering to the latest React best practices.
    *   **Data Fetching:** Utilize **TanStack Query** for efficient data fetching, caching, and synchronization, ensuring optimal UX.
    *   **Styling:** TailwindCSS v4.
    *   **Deployment Strategy:** Frontend deployed via **Vercel/Netlify**, Backend containerized with **Docker/Kubernetes**.

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Low Level) - *Not applicable.***

*   **SECONDARY SCENARIO C: DATA / AI / SCRIPTS (Python) - *Not applicable.***

---

## 4. APEX ARCHITECTURAL STANDARDS
*   **Frontend (Feature-Sliced Design - FSD):**
    *   **Layers:** `app`, `processes`, `pages`, `widgets`, `features`, `entities`, `shared`.
    *   **Rules:** Strict dependency flow (top-down), no cross-layer imports except from `shared`.
    *   **Modularity:** Each slice is a self-contained unit, promoting reusability and maintainability.
*   **Backend (Hexagonal Architecture):**
    *   **Core:** Domain logic, independent of external concerns.
    *   **Ports & Adapters:** Define interfaces (ports) for external interactions (e.g., database, API, messaging) and implement them with specific technologies (adapters).
    *   **Separation of Concerns:** Clear boundaries between application, domain, and infrastructure layers.
*   **API Design:** RESTful principles with GraphQL potential. Strong emphasis on clear contracts, versioning, and secure endpoints.

---

## 5. CODE QUALITY & PRINCIPLES
*   **SOLID Principles:** Ensure high cohesion and loose coupling.
*   **DRY (Don't Repeat Yourself):** Abstract common logic.
*   **YAGNI (You Aren't Gonna Need It):** Avoid premature optimization or unnecessary features.
*   **Clean Code:** Readability, maintainability, and testability are paramount.
*   **Type Safety:** Leverage TypeScript's full power to prevent runtime errors.

---

## 6. VERIFICATION COMMANDS & HEALTH CHECKS
*   **Install Dependencies:** `npm install` (for frontend), `npm install` or `pnpm install` in backend directories.
*   **Run Development Server:** `npm run dev` (for frontend).
*   **Build Project:** `npm run build` (for frontend).
*   **Lint & Format:** `npm run lint` & `npm run format` (utilizes Biome).
*   **Run Tests:** `npm run test` (Vitest), `npm run test:e2e` (Playwright).
*   **Health Check Endpoint (Backend):** `/health` or `/status` returning `200 OK`.

</details>
