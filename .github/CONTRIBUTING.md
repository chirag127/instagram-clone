# Contributing to InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp

We enthusiastically welcome contributions to **InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp**! This project thrives on community collaboration, and your input is invaluable. By contributing, you help us build a more robust, feature-rich, and high-performance visual content sharing platform.

Please note that this project operates under a set of professional standards and a strict Code of Conduct. We expect all contributors to uphold these principles, ensuring a positive and productive environment for everyone.

## 🤝 Code of Conduct

To foster an open and welcoming environment, we pledge to make participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

All contributors are expected to adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html). Violations can be reported by contacting the project maintainers.

## 🤔 How Can I Contribute?

There are many ways to contribute, not just by writing code!

### 🐞 Reporting Bugs

If you find a bug, please help us by [opening an issue](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D%3A+). A good bug report should include:

*   A clear, concise description of the bug.
*   Steps to reproduce the behavior.
*   Expected outcome vs. actual outcome.
*   Screenshots or animated GIFs if applicable.
*   Your operating system and browser version.

### ✨ Suggesting Enhancements

Have an idea for a new feature or an improvement? We'd love to hear it! Please [open an issue](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5BFeature%5D%3A+) with:

*   A clear and detailed description of the proposed enhancement.
*   The problem it solves or the benefit it brings.
*   Any mockups or examples if applicable.

### ✍️ Contributing Code

Ready to dive into the codebase? Follow these steps to get started with contributing code:

## 🚀 Setting Up Your Development Environment

To contribute code, you'll need to set up your local development environment.

### Prerequisites

Ensure you have the following installed:

*   **Git**: For version control.
*   **Node.js** (LTS version, e.g., 20.x or newer): For the JavaScript runtime.
*   **pnpm** (preferred package manager): Install via `npm install -g pnpm`.

### Installation Steps

1.  **Fork the repository** on GitHub: [https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/fork](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/fork)
2.  **Clone your forked repository** to your local machine:
    bash
    git clone https://github.com/YOUR_USERNAME/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp.git
    cd InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp
    
3.  **Install dependencies** using pnpm:
    bash
    pnpm install
    
4.  **Run the development server**:
    bash
    pnpm dev
    
    This will start the Vite development server, usually accessible at `http://localhost:5173`.

## 🌳 Branching Strategy

We use a feature-branch workflow. Please create a new branch for each feature or bug fix you work on, based off the `main` branch.

bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name-or-bugfix/issue-number


## 📝 Commit Messages

We enforce the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This helps with automatic changelog generation and semantic versioning. Examples:

*   `feat: add user profile page`
*   `fix: resolve login authentication issue`
*   `docs: update README with new setup instructions`
*   `refactor(auth): simplify token refresh logic`

## 📐 Architectural & Coding Guidelines

### Architecture: Feature-Sliced Design (FSD)

This project adheres to the [Feature-Sliced Design (FSD)](https://feature-sliced.design/) methodology. Please familiarize yourself with FSD principles to ensure your contributions align with the project's modular and scalable structure. Key aspects include:

*   **Layers:** Shared, Entities, Features, Widgets, Pages, App.
*   **Slices:** Each layer contains slices representing distinct domains.
*   **Public API:** Modules expose clear public APIs.

### Principles

We follow core software engineering principles:

*   **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
*   **DRY**: Don't Repeat Yourself.
*   **YAGNI**: You Ain't Gonna Need It.

### Coding Style & Formatting

We use **Biome** for strict linting and formatting. Ensure your code is formatted and linted before submitting a pull request.

bash
pnpm lint        # Check for linting errors
pnpm format      # Format code automatically
pnpm lint:fix    # Fix linting errors automatically


### TypeScript Usage

All new code should be written in TypeScript, leveraging strict typing to enhance code quality and maintainability. Avoid `any` type where possible and ensure interfaces/types are well-defined.

## 🧪 Testing Guidelines

Thorough testing is crucial for maintaining the stability and reliability of InstaFlow.

### Unit and Integration Tests (Vitest)

We use **Vitest** for fast unit and integration testing. Ensure new features have adequate test coverage, and bug fixes include a regression test.

bash
pnpm test        # Run all tests
pnpm test:watch  # Run tests in watch mode


### End-to-End Tests (Playwright)

For critical user flows, we utilize **Playwright** for end-to-end testing. If your changes affect core user journeys, consider adding or updating Playwright tests.

## 📬 Pull Request Guidelines

When you're ready to submit your contribution, please open a [pull request](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/compare) to the `main` branch of the main repository. A good pull request should:

1.  **Reference the issue** it addresses (e.g., `Fixes #123`, `Closes #456`).
2.  Provide a **clear and concise description** of the changes.
3.  Include **screenshots or a GIF** if your changes involve UI updates.
4.  Ensure all **tests pass** (`pnpm test`).
5.  Ensure **linting and formatting checks pass** (`pnpm lint`).
6.  Be **focused** on a single feature or bug fix.

After submission, maintainers will review your pull request, provide feedback, and may request changes. We aim for timely reviews and appreciate your patience.

## 📄 License

By contributing to InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp, you agree that your contributions will be licensed under its **CC BY-NC 4.0** license. You can find the full license details in the [LICENSE](https://github.com/chirag127/InstaFlow-Visual-Content-Sharing-Platform-Fullstack-WebApp/blob/main/LICENSE) file.

## 🙏 Thank You!

Thank you for considering contributing to InstaFlow! Your efforts make a difference, and we're excited to collaborate with you to build an exceptional visual content sharing platform.