# Security Policy for InstaFlow

**InstaFlow is committed to the highest standards of security.** We believe in responsible disclosure and appreciate the efforts of security researchers who help us improve our security posture.

## 1. BLUF (Bottom Line Up Front)

InstaFlow follows a **Zero Trust** security model, mandates secure coding practices, and encourages responsible disclosure of vulnerabilities. All security-related issues are treated with the utmost urgency.

## 2. Supported Versions

We actively patch and maintain the **latest stable version** of InstaFlow. Security fixes are also backported to the **previous major version** for a limited time.

## 3. Vulnerability Reporting

We encourage security researchers to report vulnerabilities in accordance with this policy. To report a security vulnerability, please:

1.  **Do NOT** post in public issue trackers or forums.
2.  **Email:** Send a detailed report to our dedicated security team at `security@instaflow.example.com`.

Your report should include:

*   A clear description of the vulnerability.
*   Affected version(s) of InstaFlow.
*   Steps to reproduce the vulnerability.
*   Any proof-of-concept code or exploit details.
*   Your suggested remediation, if any.

We will acknowledge receipt of your report within **48 hours** and will provide an estimated timeline for a fix.

## 4. Disclosure Policy

*   **Responsible Disclosure:** We aim to provide a fix or mitigation for reported vulnerabilities before they are publicly disclosed.
*   **Timeline:** We request that you **do not publicly disclose** any vulnerability for **90 days** after reporting it to us. This allows us sufficient time to develop and deploy a fix.
*   **Coordinated Disclosure:** We will work with reporters to coordinate the public disclosure of vulnerabilities once a fix is available.

## 5. Security Best Practices (DevSecOps Protocol)

InstaFlow adheres to the following security principles:

*   **Zero Trust:** All interactions, internal and external, are distrusted by default. Authentication and authorization are rigorously enforced.
*   **Input Validation:** All user inputs, API requests, and external data are strictly validated and sanitized to prevent injection attacks (OWASP Top 10 2025).
*   **Secure Defaults:** Configurations are set to the most secure defaults.
*   **Principle of Least Privilege:** Users and services are granted only the minimum permissions necessary to perform their intended functions.
*   **Secure Dependencies:** We regularly audit our dependencies for known vulnerabilities and update them promptly. SBOMs (Software Bill of Materials) are generated and managed.
*   **Fail Fast:** Invalid states or unexpected conditions will result in immediate error propagation to prevent unpredictable behavior.
*   **Encryption:** Sensitive data is encrypted at rest and in transit using industry-standard algorithms.

## 6. What is NOT Considered a Security Issue


*   Denial-of-Service (DoS) vulnerabilities that are not triggered by a specific, high-impact exploit.
*   Lack of security headers (e.g., CSP, HSTS) unless they can be directly exploited.
*   Version disclosure of server software, frameworks, or other components.
*   Social engineering attacks.
*   Community-contributed code or integrations that have not been vetted and integrated into the core product.

## 7. Acknowledgements

We are grateful to the security community for their contributions to making InstaFlow safer. When appropriate, we may publicly acknowledge researchers who discover and responsibly report significant vulnerabilities.

## 8. Contact

For any questions regarding this security policy, please contact `security@instaflow.example.com`.
