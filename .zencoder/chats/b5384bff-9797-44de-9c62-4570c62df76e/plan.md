# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature

### [x] Step: Implementation

Implement the task according to the technical specification and general engineering best practices.

1. Added `cookie-parser` to `backEcommerce/package.json`.
2. Used `cookie-parser` in `backEcommerce/app.js`.
3. Updated `auth.controller.js` to ensure consistent cookie settings and fix hardcoded `secure: false`.
4. Refactored `App.tsx` to use `AuthContext` for reactive authentication state.
5. Suggested increasing `ACCESS_TOKEN_EXPIRY` to `15m`.
