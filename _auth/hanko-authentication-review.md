---
title: "Hanko Authentication: Passkey-First Identity Platform Review"
description: "Hanko review covering passkeys, passwordless auth, Flow API, self-hosting options, and startup pricing. The open-source Auth0 alternative."
category: auth
tags: [hanko authentication, passkey authentication, passwordless auth, webauthn provider, fido2 authentication]
focus_keyword: "Hanko Authentication"
meta_title: "Hanko Authentication: Passkey-First Identity Platform Review"
meta_description: "Hanko review covering passkeys, passwordless auth, Flow API, self-hosting options, and startup pricing. The open-source Auth0 alternative."
last_updated: 2026-01-20
version: "1.0+ (Flow API)"
status: stable
license: "AGPL-3.0 (Backend), MIT (Frontend/SDKs)"
quick_answer: "Hanko is a passkey-first authentication platform with open-source self-hosting, a Flow API state-machine for security, and a startup program offering 1M free MAUs. Ideal for passwordless migration and data-sovereign applications."
research_date: 2026-01-20
related: ["Auth0", "Clerk", "Keycloak", "WebAuthn", "FIDO2"]
capabilities: ["Passkeys (WebAuthn/FIDO2)", "Email OTP (Passwordless)", "Passwords with argon2id", "Social OAuth", "SAML SSO", "Privacy Mode (anti-enumeration)", "Flow API (state-machine)", "Self-hosting (Docker/K8s)"]
best_for: ["Passwordless Migration", "Data-Sovereign Applications", "Startups (1M MAU free)", "Organizations Requiring SAML"]
avoid_for: ["Teams Requiring Extensive Plugin Ecosystem", "Projects Needing Native Webhooks", "Those Wanting Google-Style Free Forever"]
pricing: "Free: 10,000 MAU. Pro: $29/mo (10,000 included + $0.01/MAU). Startup: 1M MAU free for eligible startups."
search_intent: informational
---

# Hanko Authentication: Passkey-First Identity Platform Review

## Quick Answer

Hanko is a **passkey-first** authentication platform that prioritizes phishing-resistant FIDO2/WebAuthn authentication. It offers open-source self-hosting (AGPL-3.0), a unique Flow API for security, and a generous startup program offering **1 million free MAUs**. Ideal for organizations migrating to passwordless authentication or requiring data sovereignty.

## Executive Summary

Hanko represents a paradigm shift in authentication—moving from legacy shared-secret models toward **cryptographic, passkey-first futures**. Built in Go with TypeScript frontend components, it provides specialized identity solutions for European markets (GDPR-compliant) with a focus on data minimalism and privacy engineering.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Hanko |
| **Official Website** | hanko.io |
| **Documentation** | docs.hanko.io |
| **Backend Language** | Go (66%) |
| **License** | AGPL-3.0 (Backend), MIT (Frontend/SDKs) |
| **Passkey Certification** | FIDO2 Certified |

## Core Architecture

### The Flow API (State-Machine Logic)

Hanko's defining innovation is the **Flow API**—a server-side state machine that centralizes authentication logic:

1. **Initialization**: Client requests flow (POST /flows), receives state object
2. **State Evaluation**: SDK examines active_actions (email input, passcode, WebAuthn ceremony)
3. **Action Execution**: User provides data, API processes and moves to next state
4. **Completion**: Success state issues signed JWT

**Security Benefit**: Prevents "client-side flow-skipping" attacks—the backend controls the authentication journey.

### "Passwords Optional" Model

Hanko enables gradual migration to passwordless:
- Users can set up passkeys and **delete their password** entirely
- Account recovery via email passcode if passkey is lost
- Removes attack vector while maintaining recovery path

## Authentication Methods

| Method | Type | Security | User Experience |
|--------|------|----------|-----------------|
| **Passkeys** | Passwordless | Public-key cryptography (phishing-resistant) | Biometric (FaceID/TouchID) or PIN |
| **Passcodes** | Passwordless | Time-sensitive OTP via email | No password to remember |
| **Passwords** | Legacy | argon2id hashing | Standard, familiar but vulnerable |
| **OAuth/OIDC** | Federated | Third-party identity delegation | "Sign in with Google/Apple/GitHub" |
| **SAML SSO** | Enterprise | XML-based identity assertion | Single sign-on for corporate environments |

## Security Features

### Privacy Mode (Anti-Enumeration)

Protects against email enumeration attacks:
- **Generic Responses**: Same response for login/registration regardless of account existence
- **Configurable**: Toggleable settings for controlling user account information disclosure

### Session Management

| Feature | Capability |
|---------|-------------|
| **Duration** | Configurable (1 minute to 1 month) |
| **Remote Revocation** | Users can terminate active sessions from other devices |
| **Flow Locking** | Prevents concurrent execution of same flow (race condition protection) |
| **Custom Claims** | Inject custom user metadata into session token |

## Deployment Models

### Hanko Cloud (Managed SaaS)

| Feature | Details |
|---------|---------|
| **Infrastructure** | Hosted in Europe (GDPR compliant) |
| **Updates** | Automatic security patches and feature updates |
| **Admin Dashboard** | Comprehensive web interface for configuration |

### Self-Hosting (Docker/Kubernetes)

| Requirement | Specification |
|------------|---------------|
| **Deployment Format** | Docker images, Kubernetes Helm Charts |
| **Primary Database** | PostgreSQL (recommended) |
| **Programming Language** | Go (Backend), TypeScript (Frontend) |
| **Security** | Supports strict Content Security Policies (CSP) via nonce properties |

## Pricing & Economic Analysis

### MAU-Based Pricing

| Tier | Price | Free MAUs | Overage Cost |
|------|-------|-----------|-------------|
| **Starter** | $0 | 10,000 | N/A (projects pause after 7 days inactivity) |
| **Pro** | $29/mo | 10,000 | $0.01 per MAU (reduced from $0.02) |
| **Enterprise** | Custom | Unlimited | Volume discounts |

### Startup Program (1M Free MAUs)

Hanko offers an aggressive startup program:
- **Eligibility**: < $500k ARR, < $1M raised
- **Benefit**: 1 million MAUs free
- **Includes**: 1-on-1 engineering consultancy and SEO backlinks

## Best For

- **Passwordless Migration**: Teams wanting to eliminate passwords without forcing it
- **Data-Sovereign Applications**: Organizations requiring user data stay in specific jurisdictions (GDPR)
- **Startups**: The 1M MAU free tier eliminates authentication as a cost center
- **Organizations with SAML**: Enterprise SSO support for corporate customers

## Avoid For

- **Teams Requiring Extensive Plugin Ecosystem**: Hanko focuses on core auth, not extensibility
- **Projects Needing Native Webhooks**: Until officially released (in triage as of Jan 2026)
- **Those Wanting Google-Style "Free Forever"**: Self-hosted free but requires infrastructure costs

## Comparison

### Hanko vs. Clerk

| Aspect | Hanko | Clerk |
|--------|-------|-------|
| **Data Ownership** | Self-hosted available | Clerk-hosted only |
| **Primary Focus** | Passkeys-first | Component-first UI |
| **Pricing** | 1M MAU free (startups) | 10k MAU free |
| **Open Source** | AGPL (Backend), MIT (Frontend) | Proprietary |

### Hanko vs. Auth0

| Aspect | Hanko | Auth0 |
|--------|-------|-------|
| **Complexity** | Streamlined, modern | Powerful but complex |
| **Pricing** | Per-MAU (cheaper at scale) | Per-MAU + high minimums |
| **Self-Hosting** | Native (Docker/K8s) | No (SaaS only) |

## Limitations

1. **No Native Webhooks**: Webhooks in progress but not yet built into core
2. **Mobile SDKs**: Proof-of-concept repos for iOS/Android, dedicated SDKs in development
3. **Organizations/Roles**: In progress but not yet feature-complete

## Conclusion

Hanko represents a **paradigm shift** toward passwordless authentication. Its Flow API provides a level of security and flexibility that is increasingly necessary in an age of automated phishing and credential stuffing attacks.

**Verdict**: Choose Hanko for passkey-first implementations, data-sovereign applications, and startups eligible for the 1M MAU free tier. Consider Clerk or Auth0 if you need extensive plugin ecosystems or native webhook support.

---

*Last Updated: January 20, 2026*
*Research Source: Hanko Authentication Provider Research*
