---
name: Bug Report
about: Report a bug in the project
title: "Bug: "
labels: bug
assignees: ""

body:
  - type: markdown
    attributes:
      value: |+
        ## Report a Bug
        Please provide a clear and concise description of the bug. Include steps to reproduce, expected behavior, and actual behavior.

        ### System Information
        * **Project Version:** (e.g., `git rev-parse --short HEAD`)
        * **Operating System:** (e.g., Windows, macOS, Linux)
        * **Node.js Version:** (if applicable)
        * **Browser Version:** (if applicable)

--- ---

  - type: markdown
    attributes:
      value: |+
        ### Steps to Reproduce
        1. Go to '...' 
        2. Click on '....'
        3. Scroll up from page '...'
        4. See error

--- ---

  - type: markdown
    attributes:
      value: |+
        ### Expected Behavior
        A clear description of what you expected to happen.

--- ---

  - type: markdown
    attributes:
      value: |+
        ### Actual Behavior
        A clear description of what actually happened.

--- ---

  - type: markdown
    attributes:
      value: |+
        ### Screenshots / Logs / Reproducible Example
        If possible, add screenshots to help explain your problem, or any relevant logs or a link to a reproducible example.

--- ---

  - type: markdown
    attributes:
      value: |+
        ### Additional Context
        Add any other context about the problem here. For example, you can mention specific configurations or environment details.

--- ---

  - type: markdown
    attributes:
      value: |+
        ### AI Agent Directives Reference
        This bug report is being processed with the following AI agent directives. For detailed information, refer to the project's `AGENTS.md` file.

        * **Analysis Tier:** `gemini-3-pro-preview`
        * **Reasoning Tier:** `gemini-2.5-pro`
        * **Speed Tier:** `gemini-2.5-flash`
        * **Core Technologies:** Python 3.12+, uv, Ruff, Pytest
        * **Architecture:** Hexagonal Architecture
        * **Compliance:** Zero-Defect, High-Velocity, Future-Proof
