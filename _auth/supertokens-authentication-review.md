---
title: "SuperTokens Review: Open-Source Auth with Token Theft Detection"
description: "SuperTokens review covering rotating refresh tokens, self-hosting, PostgreSQL setup, pricing, and migration from Auth0/Firebase."
category: auth
tags: [supertokens, open source authentication, self-hosted auth, rotating refresh tokens, auth microservice]
focus_keyword: "SuperTokens"
meta_title: "SuperTokens Review: Open-Source Auth with Token Theft Detection"
meta_description: "SuperTokens review covering rotating refresh tokens, self-hosting, PostgreSQL setup, pricing, and migration from Auth0/Firebase."
last_updated: 2026-01-20
version: "Core v11.3.0, Node.js v24.0.0"
status: "stable (v4)"
license: "Apache 2.0 / MIT (SDKs)"
quick_answer: "SuperTokens is an open-source authentication platform featuring rotating refresh tokens with token theft detection. Self-hosted free forever for core features, or managed service from $0.02/MAU. Ideal for data sovereignty and cost scaling."
research_date: 2026-01-20
related: ["PostgreSQL", "Next.js", "React", "Node.js", "Docker", "Supabase"]
capabilities: ["Email/Password", "Magic Links", "OTP (Email/SMS)", "Social OAuth", "Passkeys (WebAuthn)", "MFA (TOTP, WebAuthn, SMS)", "Account Linking", "RBAC (UserRoles)", "Rotating Refresh Tokens", "Token Theft Detection"]
best_for: ["Greenfield Projects (Node.js, Go, Python, PostgreSQL)", "High-Compliance Industries (FinTech, HealthTech)", "Cost-Sensitive Scaling (1M+ users)", "Teams Wanting Data Sovereignty"]
avoid_for: ["Small Teams with Legacy Codebases (PHP/Java)", "Teams Wanting Zero-Infrastration Auth", "Projects Using MySQL/MongoDB (must migrate to Postgres)"]
pricing: "Self-Hosted: Free (unlimited MAU). Managed: 5,000 free + $0.02/MAU. Add-ons: MFA ($0.01/MAU), Account Linking ($0.005/MAU min $100/mo)."
search_intent: informational
---

# SuperTokens Review: Open-Source Auth with Token Theft Detection

## Quick Answer

SuperTokens is an **open-source authentication platform** featuring a unique **rotating refresh token system** with built-in token theft detection. It offers self-hosted free-forever core features with unlimited users, or a managed service starting at $0.02/MAU. By consolidating PostgreSQL v13+ as its sole database, SuperTokens simplifies operations while providing enterprise-grade security.

## Executive Summary

SuperTokens addresses the "buy vs. build" dilemma by providing a **"Backend-in-the-Middle"** architecture. The application backend retains sovereignty over user sessions while SuperTokens Core handles the cryptographic heavy lifting—password hashing, JWT signing, and session management.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | SuperTokens |
| **Latest Core Version** | v11.3.0 (supports SAML, enhanced telemetry) |
| **Node.js SDK** | v24.0.0 |
| **Database Requirement** | PostgreSQL v13.0+ (exclusive as of Core v11.0.0) |
| **Licenses** | Apache 2.0 (Core), MIT (SDKs) |

## Core Architecture

### The Tripartite Structure

SuperTokens separates concerns into three components:

| Component | Purpose | Communication |
|-----------|---------|---------------|
| **Frontend SDK** | Renders UI, stores tokens, manages refresh | Communicates with Application Backend only |
| **Backend SDK** | Orchestrates auth, overrides logic, extends Core | Communicates with SuperTokens Core |
| **SuperTokens Core** | Password hashing, JWT signing, session persistence | HTTP service (Java) |

This architecture ensures **network isolation**: the Core and Database can be placed in a private subnet, with only the Application Backend requiring network access.

### Database Strategy: PostgreSQL Pivot

SuperTokens has **consolidated exclusively to PostgreSQL v13+**, deprecating MySQL and MongoDB support:
- **Performance**: Leverages JSONB for flexible user metadata and efficient indexing
- **Migration Requirement**: Existing MySQL/MongoDB users must migrate to PostgreSQL
- **Implication**: Teams using other DBs must maintain separate Postgres instance for auth

## Session Security: The Core Differentiator

### Rotating Refresh Tokens

SuperTokens implements a sophisticated security model to address session token theft:

1. **Dual Token System**: AccessToken (short-lived JWT) + RefreshToken (long-lived, opaque)
2. **Rotation on Use**: Every refresh generates a new RefreshToken, invalidating the old
3. **Theft Detection Logic**:
   - Attacker steals RT_1, uses it → System issues AccessToken_2 + RefreshToken_2
   - Legitimate user tries RT_1 → System detects fork → Revokes entire session family

**Result**: The attack window is reduced from "indefinite" to "until legitimate user refreshes their session."

### Cookie vs. Header-Based Authentication

| Mode | Target Environment | Transport | Pros | Cons |
|------|-------------------|-----------|------|------|
| **Cookie-Based** | Web Browsers | HttpOnly Cookies | High XSS security | Vulnerable to CSRF |
| **Header-Based** | Mobile Apps, CLI | Authorization Header | Immune to CSRF | Requires secure storage logic |

## Authentication Methods

### Supported Recipes (Modular Features)

| Recipe | Status | Details |
|--------|--------|---------|
| **Session Recipe** | TRUE | Foundation (access/refresh tokens) |
| **EmailPassword Recipe** | TRUE | Sign-up/sign-in with email/password |
| **Passwordless Recipe** | TRUE | Magic links + OTP (Email/SMS) |
| **ThirdParty (Social)** | TRUE | OAuth 2.0/OIDC (Google, GitHub, Apple, Facebook, Discord) |
| **MultiFactorAuth (MFA)** | TRUE | TOTP, WebAuthn, SMS/Email OTP |
| **UserRoles Recipe** | TRUE | Role-Based Access Control (RBAC) |
| **Account Linking** | TRUE | Merge social identities with email/password accounts |

## Database Schema Requirements

### PostgreSQL as Single Source of Truth

SuperTokens requires specific tables:

| Table | Purpose |
|-------|---------|
| **user** | Core user profiles |
| **session** | Active sessions |
| **email_verified** | Email verification tokens |
| **user_roles** | Role assignments |
| **user_roles** | Role definitions |
| **emailpassword_users** | Email/password credentials |
| **emailpassword_verify_email_token** | Magic link verification tokens |
| **thirdparty_users** | Social identity associations |
| **emailpassword_verify_email_token** | OTP verification tokens |
| **user_roles** | Role assignments |
| **emailpassword_verify_email_token** | OTP verification tokens |
| **user_roles** | Role definitions |
| **emailpassword_verify_email_token** | OTP verification tokens |

## Pricing Analysis

### Managed Service Pricing

| Tier | Price | MAU Limit | Notes |
|------|-------|----------|-------|
| **Free** | $0 | Up to 5,000 MAUs | Core auth features only |
| **Growth** | $0.02/MAU | Above 5,000 MAUs | Core auth features only |
| **Add-on Features** | Per MAU | - | MFA: $0.01/MAU (min $100/mo), Account Linking: $0.005/MAU (min $100/mo) |

### Self-Hosted Pricing

- **Core Features**: Free forever (unlimited MAU)
- **Paid Add-ons**: Account Linking ($0.01/MAU), MFA ($0.02/MAU)

### Comparative Cost Analysis

| Provider | Free Tier | Scale Cost (10k Users) | Data Sovereignty |
|----------|-----------|---------------------|-----------------|
| **SuperTokens (Self-Hosted)** | Unlimited Users | $0 (infrastructure only) | High (your DB) |
| **SuperTokens (Managed)** | 5,000 MAUs | ~$100 | Medium (dedicated env) |
| **Auth0** | 7,500 MAU (B2C) | High ($$$) | Low (vendor cloud) |
| **Clerk** | 10,000 MAU | ~$25 + overage | Low (vendor cloud) |

## Security & Compliance

### Attack Protection Suite (Beta)

| Feature | Description |
|---------|-------------|
| **Brute Force Detection** | Monitors login attempts per user/IP |
| **Impossible Travel** | Geolocation analysis (NY → Tokyo in 5 mins = suspicious) |
| **Bot Detection** | Behavioral analysis and header inspection |
| **Password Breach Detection** | HaveIBeenPwned integration |

### Compliance Readiness

| Compliance | Status |
|------------|--------|
| **SOC 2** | SuperTokens Inc. is SOC 2 Type 2 compliant (Managed Service) |
| **GDPR** | Supported (self-hosted ensures data residency) |
| **Zero Trust** | Architecture aligns with Zero Trust principles |

## Platform Support

### Backend Frameworks

| Framework | SDK Status | Notes |
|-----------|-----------|-------|
| **Node.js** | Active (v24.x) | Express, Fastify, Koa, Loopback, AWS Lambda adapters |
| **Python** | Active | Django, Flask, FastAPI |
| **Go** | Active | net/http, Gin, Echo, Fiber |
| **Java/.NET/PHP/Ruby** | No official SDK | Use Auth Microservice pattern |

### Frontend Frameworks

| Framework | SDK Status |
|----------|------------|
| **ReactJS** | Active |
| **Vanilla JS (Vue/Angular)** | Active |
| **Mobile** | iOS (Swift), Android (Kotlin), React Native, Flutter (Official) |

## Best For

- **Greenfield Projects (Modern Stack)**: Node.js, Go, Python, PostgreSQL
- **High-Compliance Industries**: FinTech, HealthTech requiring air-gapped deployments
- **Cost-Sensitive Scaling**: 1M+ users with $0 license fees
- **Teams Wanting Data Sovereignty**: User data stays in your database

## Avoid For

- **Small Teams with Legacy Codebases**: PHP/Java lack official SDKs (requires auth microservice)
- **Teams Wanting Zero-Infrastructure**: Self-hosted requires DevOps capacity
- **Projects Using MySQL/MongoDB**: Must migrate to PostgreSQL (or run separate Postgres for auth)

## Migration Strategies

### Lazy Migration (Seamless Transition)

For zero-downtime migration from Auth0/Firebase:

1. Setup: Configure both SuperTokens and legacy provider
2. Login Attempt: Check SuperTokens DB first
3. Fallback: If not found, verify against legacy provider
4. Migration: Import user and create SuperTokens session
5. **Result**: User experiences normal login, unaware of migration

## Limitations

1. **Database Lock-in**: PostgreSQL-only (no MySQL/MongoDB for Core)
2. **No Legacy SDKs**: No official PHP or Java backend SDKs
3. **Operational Overhead**: Requires maintenance for self-hosted Core
4. **No Native Webhooks**: Must implement custom listeners for event-driven architecture

## Conclusion

SuperTokens represents a **mature, highly technical solution** for identity management that specifically targets engineering teams requiring control. Its implementation of rotating refresh tokens and token theft detection offers a security baseline significantly higher than standard stateless JWT implementations.

The **PostgreSQL consolidation** simplifies operations but forces teams using other databases to maintain a separate Postgres instance solely for authentication.

**Verdict**: Choose SuperTokens for modern stacks (Node.js, Go, Python) with PostgreSQL. The "Free Forever" self-hosted tier is ideal for cost-sensitive scaling. Consider Clerk or Auth0 if you need official PHP/Java support or want zero-infrastructure authentication.

---

*Last Updated: January 20, 2026*
*Research Source: SuperTokens Authentication Provider Research*
