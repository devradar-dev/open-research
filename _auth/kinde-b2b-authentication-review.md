---
title: "Kinde Review: B2B SaaS Authentication with Built-in Billing"
description: "Kinde review covering B2B authentication, organizations, feature flags, billing integration, and pricing. The SaaS auth platform."
category: auth
tags: [kinde authentication, saas authentication, b2b identity platform, feature flags auth, billing integration]
focus_keyword: "Kinde Authentication"
meta_title: "Kinde Review: B2B SaaS Authentication with Built-in Billing"
meta_description: "Kinde review covering B2B authentication, organizations, feature flags, billing integration, and pricing. The SaaS auth platform."
last_updated: 2026-01-20
version: "Latest"
status: stable
license: "Commercial (SaaS)"
quick_answer: "Kinde is a B2B-focused authentication platform that consolidates identity, billing, and feature flags into a single token-based workflow. With native Organizations, RBAC, and Stripe integration, it's the 'SaaS starter kit' for modern applications."
research_date: 2026-01-20
related: ["Next.js", "Python", "React", "Supabase", "Stripe", "Auth0"]
capabilities: ["Email/Password with breached password detection", "OTP (Email/SMS)", "Social OAuth (15+)", "SAML/OIDC (Enterprise SSO)", "Organizations (B2B)", "Native RBAC", "Built-in Feature Flags", "Integrated Billing", "Row-Level Security (Supabase)"]
best_for: ["B2B SaaS Startups", "Applications Requiring Enterprise SSO", "Projects Wanting Consolidated Billing/Auth", "Teams Using Next.js/Python/React"]
avoid_for: ["B2C Consumer Apps (no anonymous users)", "Apps Requiring Passkeys", "On-Premise Deployments", "High-Security Regulated Enterprises"]
pricing: "Free: 10,500 MAU. Pro: $25/mo (10,500 included + metered). Scale: $250/mo (unlimited MAU). Enterprise: Custom ($250/mo+)."
search_intent: informational
---

# Kinde Review: B2B SaaS Authentication with Built-in Billing

## Quick Answer

Kinde is a **B2B-focused authentication platform** engineered to address the modern SaaS infrastructure challenge. By consolidating identity management, billing entitlements, and feature flags into a single JWT-based workflow, Kinde eliminates the need for separate Auth + Billing + Feature Flag vendors. With native Organizations, RBAC, and Stripe integration, it's the **"SaaS starter kit"** for modern applications.

## Executive Summary

Kinde has positioned itself at the intersection of identity and business infrastructure. Unlike traditional CIAM providers that focus solely on authentication, Kinde recognizes that for SaaS platforms, authentication is the **foundational layer of business infrastructure**—upon which monetization, feature rollouts, and multi-tenancy are built.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Kinde |
| **Documentation** | kinde.com |
| **Primary Category** | B2B SaaS Authentication |
| **Architecture** | Polyglot infrastructure layer |
| **Key Differentiator** | Built-in billing and feature flags |

## Authentication Architecture

### The "Trust Heuristic"

Kinde treats "Username" as distinct from email with **case-insensitive normalization**—preventing homograph confusion where attackers create visually similar usernames.

### Passwordless-First Philosophy

| Method | Implementation |
|--------|----------------|
| **OTP (Email/SMS)** | Exclusively OTP-based (rejects magic links for security) |
| **Origin-Bound SMS** | Appends domain tag (e.g., @bound_domain.xxx) for iOS/Android auto-extraction |
| **BYOP for SMS** | Bring Your Own Provider (Twilio) for production (prevents markup) |
| **Email Verification** | Mandatory for all accounts (even username-only) |

### Federated Identity & Trust Model

| Provider Type | Trust Model |
|---------------|-------------|
| **Trusted** | Google (email auto-verified, auto-linked) |
| **Untrusted** | LinkedIn, Twitter/X (requires manual verification) |

## The SDK Ecosystem

### Polyglot Infrastructure

Kinde maintains comprehensive SDKs across backend, frontend, and mobile:

| Platform | SDK Type | Status |
|----------|----------|--------|
| **Node.js/TS** | @kinde-xyz | Official |
| **Next.js** | @kinde-xyz | Official (App Router + Pages Router) |
| **Remix** | @kinde-xyz | Official |
| **Nuxt** | @kinde-xyz | Official |
| **SvelteKit** | @kinde-xyz | Official |
| **Express** | @kinde-xyz | Official |
| **Apollo GraphQL** | @kinde-xyz | Official |
| **Python (Flask/FastAPI)** | kinde-python | Official |
| **Java** | kinde-java | Official |
| **PHP** | kinde-php | Official |
| **.NET** | kinde-dotnet | Official |
| **iOS (Swift)** | kinde-ios | Official |
| **Android (Kotlin)** | kinde-android | Official |
| **React Native** | kinde-react-native | Official |
| **Flutter** | kinde-flutter | Official |

## Business Infrastructure Layer

### Integrated Billing (Token-Based Entitlements)

Kinde's unique advantage: **billing state is embedded in the identity token**:

- **Token-Based Entitlements**: Access Token includes billing tier (Free/Pro/Enterprise)
- **Metered Usage**: Report usage events; aggregated for invoicing
- **Frictionless Upgrades**: Hitting usage limit triggers immediate payment modal

### Native Feature Flagging

- **JWT Delivery**: Flags delivered as claims within Access Token
- **Targeting**: Flags targeted at users, organizations, or cohorts
- **Org-Scoped**: Org-specific features via org_code context

## Enterprise B2B Architecture

### Organization-Centric Model

| Feature | Details |
|---------|---------|
| **Contextual Authentication** | Users authenticate into specific organizations (org_code parameter) |
| **Scoped Tokens** | Access Token scoped to target organization |
| **Flattened Permissions** | Simple array of permission strings in JWT (zero DB lookups) |
| **Role-Based Access Control** | Hierarchical RBAC (Permissions vs Roles) |
| **Token Flattening** | Permissions flattened into JWT for backend authorization |

## Pricing

### Growth Gap Pricing Model

| Plan | Price | MAU Limit | Notes |
|------|-------|----------|-------|
| **Free** | $0/mo | Up to 10,500 MAU | Higher than Auth0/Clerk free limits |
| **Pro** | $25/mo | Uncapped (metered) | Flat fee + metered usage |
| **Scale** | $250/mo | Uncapped | Unlocks SAML, dedicated support |
| **Enterprise** | Custom | Uncapped | Custom SLAs and contracts |

### MAU Calculation

An MAU is any user who has signed in or refreshed their token within the billing period. **Inactive users don't count** toward the quota.

## Comparison

### Kinde vs. Auth0

| Aspect | Kinde | Auth0 |
|--------|-------|-------|
| **Free MAU Limit** | 10,500 (higher) | 7,500 (B2C) |
| **B2B Pricing** | SSO included (Pro) | Capped at 3-5 connections |
| **Business Features** | Built-in billing/flags | Requires add-ons |
| **Setup Speed** | Faster implementation | More complex setup |
| **Backend Support** | Python, Go, PHP, Java | JavaScript-focused |

### Kinde vs. Clerk

| Aspect | Kinde | Clerk |
|--------|-------|-------|
| **B2B Focus** | Native organizations | Organizations (Enhanced add-on) |
| **Backend SDKs** | Python, Go, PHP, Java | Node.js-focused |
| **Pricing Model** | Flat fee + metered | Per-user tiers |
| **Enterprise SSO** | Native (Pro tier) | Paid add-on |

### Kinde vs. Supabase Auth

| Aspect | Kinde | Supabase Auth |
|--------|-------|---------------|
| **Architecture** | Overlay on top of Postgres | Tightly coupled to Postgres |
| **Enterprise Features** | SAML, Billing, Flags out-of-box | Available (Enterprise) |
| **Integration** | Works with any backend | Best with Supabase projects |

## Limitations

1. **No Passkey Support**: As of late 2025, no FIDO2/WebAuthn support
2. **No Anonymous Users**: Email anchor required for all accounts
3. **No On-Premise**: SaaS-only, no self-hosting option
4. **No Device Trust**: No granular device posture assessment

## Best For

- **B2B SaaS Startups**: Native multi-tenancy support without feature fragmentation
- **Next.js/Python/React Teams**: First-class SDK support across modern stack
- **Applications Requiring Enterprise SSO**: Home Realm Discovery for Azure AD/Okta
- **Teams Wanting Consolidated Billing**: Eliminates Auth + Stripe + LaunchDarkly complexity

## Avoid For

- **B2C Consumer Apps**: No anonymous users, email requirement creates friction
- **High-Security Regulated Enterprises**: No on-premise, no device trust
- **Projects Needing Passkeys**: Not yet supported
- **Pure Mobile Apps**: SDKs available but web-optimized architecture

## Conclusion

Kinde represents a **generational shift** in the CIAM market—moving beyond authentication commodity to establish itself as a **"Business Operating System" for SaaS applications**. By architecturally unifying identity, billing, and feature management, Kinde offers drastic efficiency gains for developers building B2B platforms.

**Verdict**: Kinde is the **definitive choice** for B2B SaaS startups using modern stacks (Next.js, Python, React) who need enterprise SSO and want to avoid stitching together separate billing and feature flag providers.

---

*Last Updated: January 20, 2026*
*Research Source: Kinde Authentication Provider Research*
