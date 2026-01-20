---
title: "Auth.js Guide: Runtime-Agnostic Authentication for Modern Web"
description: "Complete Auth.js guide covering NextAuth.js v4, Auth.js v5, and Better Auth succession. Learn Edge-compatible auth, OAuth, and self-hosted identity."
category: auth
tags: [auth.js, nextauth.js, better auth, next-auth, authentication library]
focus_keyword: "Auth.js"
meta_title: "Auth.js Guide: Runtime-Agnostic Authentication for Modern Web"
meta_description: "Complete Auth.js guide covering NextAuth.js v4, Auth.js v5, and Better Auth succession. Learn Edge-compatible auth, OAuth, and self-hosted identity."
last_updated: 2026-01-20
version: "v4.24.13 (v5 beta), Better Auth v1.4+"
status: stable
license: "MIT (Open Source)"
quick_answer: "Auth.js is a runtime-agnostic authentication library that evolved from NextAuth.js. It offers 80+ OAuth providers, database adapters, and Edge-compatible auth. Better Auth is now the recommended successor for new projects with native MFA and multi-tenancy."
research_date: 2026-01-20
related: ["Better Auth", "Next.js", "SvelteKit", "Prisma", "Drizzle ORM"]
capabilities: ["OAuth 2.0/OIDC (80+ providers)", "Email/Password", "Magic Links", "Passkeys (WebAuthn)", "Database Adapters", "JWT/Database sessions", "SAML support"]
best_for: ["Next.js Startups", "B2B SaaS", "Edge Deployments", "Teams wanting Own Your Auth"]
avoid_for: ["Native Mobile-First Apps", "Enterprise Legacy Integrations requiring LDAP"]
pricing: "Free (MIT license). Hidden costs: database storage, email delivery (SendGrid/Resend), engineering time for missing features."
search_intent: informational
---

# Auth.js Guide: Runtime-Agnostic Authentication for Modern Web

## Quick Answer

Auth.js (formerly NextAuth.js) is a runtime-agnostic authentication library that evolved from NextAuth.js. It offers 80+ OAuth providers, database adapters for self-hosted identity, and Edge-compatible authentication via standard Web APIs. For new projects in 2026, **Better Auth is the recommended successor**, offering native MFA, multi-tenancy, and type-safe schemas with CLI-driven setup.

## Executive Summary

The authentication ecosystem has undergone a significant transition. NextAuth.js v4 remains stable but tied to Node.js APIs. Auth.js v5 aimed to unify authentication across JavaScript (SvelteKit, Qwik, Express) but remains in beta after a protracted development period. Consequently, the maintainers have joined forces with **Better Auth**—a comprehensive, TypeScript-first framework that fills critical feature gaps.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Names** | Auth.js, NextAuth.js, Better Auth (successor) |
| **Latest Stable** | NextAuth.js v4.24.13 |
| **Latest Beta** | Auth.js v5.0.0-beta.30 |
| **Successor** | Better Auth v1.4.9+ |
| **Documentation** | authjs.dev (Legacy/Beta), better-auth.com |
| **License** | MIT (Open Source) |

## Core Architecture

### The Runtime Agnostic Shift (v5)

Auth.js v5 decoupled authentication logic from Node.js, replacing Node.js modules with Web Crypto API and standard Fetch API. This enables:
- **Portability**: Same code runs on Node.js, Deno, Bun, or Vercel Edge
- **Performance**: Reduced cold starts in serverless environments
- **Edge Compatibility**: Full support for Cloudflare Workers and Vercel Edge Functions

### The "Own Your Auth" Philosophy

Auth.js adheres to the principle that authentication data should reside in the developer's database, not external silos:
- **GDPR Compliance Advantages**: User data stays in your control
- **No Vendor Lock-in**: Migrate away from Auth.js without data export requests
- **Security Burden**: You handle database protection and encryption

## Authentication Methods

### Supported Methods

| Method | Status | Notes |
|--------|--------|-------|
| **Email + Password** | TRUE | Auth.js: Manual implementation required. Better Auth: Native with hashing/salting. |
| **Magic Link** | TRUE | Requires database adapter for verification tokens. Integrates with SMTP/API (Resend, SendGrid). |
| **Social Logins** | TRUE | 80+ providers via OAuth 2.0/OIDC (Google, GitHub, Apple, Facebook, etc.) |
| **SMS OTP** | FALSE (Core) | Better Auth: Yes via plugin. Auth.js: Custom provider implementation required. |
| **Passkeys (WebAuthn)** | TRUE | FIDO2 (TouchID, FaceID, YubiKey). Better Auth offers more robust plugin. |
| **SAML** | TRUE | Supported via BoxyHQ or Osso integration (OIDC bridging). |
| **Anonymous Login** | FALSE (Core) | Better Auth: Yes via Anonymous plugin. Auth.js: Complex manual logic required. |
| **MFA (TOTP)** | FALSE (Core) | Better Auth: Yes via Two-Factor plugin. |

### Feature Comparison

| Feature Category | Auth.js (Legacy/Beta) | Better Auth (Successor) |
|-----------------|----------------------|----------------------|
| **Setup Experience** | Manual schema setup | CLI-driven schema generation |
| **MFA** | No native support | Native Two-Factor Plugin (TOTP, backup codes) |
| **Multi-Tenancy** | Manual implementation | Native Organization Plugin (Teams, Invites, Roles) |
| **Rate Limiting** | None | Built-in rate limiter |
| **Client SDKs** | React, Vue, Svelte | React, Vue, Svelte, Solid, Expo (Mobile), Vanilla JS |

## Integration Ecosystem

### Supported Frameworks

| Framework | Package | Integration |
|-----------|---------|-------------|
| **Next.js** | next-auth (v4) or next-auth (v5 beta) | App Router, Middleware support |
| **SvelteKit** | @auth/sveltekit | Hooks (hooks.server.ts) |
| **Express** | @auth/express | Middleware-based integration |
| **Qwik & SolidStart** | @auth/qwik, @auth/solid-start | Supported but less mature |
| **Nuxt** | @sidebase/nuxt-auth (Community) | Community integration |
| **React Native** | N/A (Official) | Better Auth: @better-auth/expo plugin |

### Database Support

| ORM/Database | Support |
|-------------|---------|
| **Prisma** | Official adapter |
| **Drizzle ORM** | Official adapter |
| **TypeORM** | Official adapter |
| **Sequelize** | Official adapter |
| **MongoDB** | Official adapter |
| **DynamoDB** | Official adapter |
| **Firebase** | Official adapter |
| **Supabase** | Official adapter |
| **Xata** | Official adapter |
| **Neon** | Official adapter |
| **PlanetScale** | Official adapter |

## Session Management

Auth.js forces a choice between two session strategies:

### JWT Strategy (Default)

- **Mechanism**: Session-token cookie contains entire session payload (signed/encrypted JWE)
- **Pros**: Zero database latency on session checks, infinitely scalable
- **Cons**: Difficult revocation (requires secret rotation or short expiry), 4KB cookie size limit

### Database Strategy

- **Mechanism**: Cookie contains Session ID, server looks up in Session table
- **Pros**: Instant revocation (delete the row), unlimited session data size
- **Cons**: Database read costs, latency penalties

## Mobile Limitations

Auth.js is fundamentally **web-centric**:

| Platform | Support Status |
|----------|----------------|
| **Web** | Excellent (Primary target) |
| **Mobile Web** | Excellent (Responsive) |
| **Mobile Native (iOS)** | Poor (No native Swift SDK) |
| **Mobile Native (Android)** | Poor (No native Kotlin SDK) |
| **API** | Good (REST endpoints for session validation) |

## Migration: Auth.js to Better Auth

Migration is not a "drop-in" replacement:

1. **Database Migration**: Run `npx @better-auth/cli generate` to create new tables
2. **Client Code Refactor**: Replace `useSession()` with `authClient.useSession()`
3. **Config Rewrite**: Convert auth.ts from provider array to Better Auth object format

## Pricing

### Cost Structure

| Component | Cost |
|-----------|------|
| **License** | Free (MIT Open Source) |
| **Paid Features** | None (Core Library) |
| **Database Costs** | Your responsibility |
| **Email Costs** | Your responsibility (SendGrid, Resend) |
| **Maintenance** | Engineering time for implementing missing features |

## Best For

- **Next.js Startups**: Better Auth is best-in-class for modern Next.js startups needing SaaS-like features
- **B2B SaaS**: Multi-Tenancy/Organization plugins make it ideal for B2B applications
- **Edge Deployments**: Both libraries utilize standard Web APIs for Cloudflare Workers/Vercel Edge
- **Teams Wanting "Own Your Auth"**: Data sovereignty and no vendor lock-in

## Avoid For

- **Native Mobile-First Apps**: Firebase or Supabase are superior (native SDKs)
- **Enterprise Legacy Integrations**: Complex LDAP, Active Directory, on-premise MFA (better: Auth0, Keycloak)

## Conclusion

NextAuth.js v4 remains a bastion of stability for existing applications. However, for any new development starting in 2026, **Better Auth is the definitive choice**. It fulfills the original promise of Auth.js—comprehensive, self-hosted, type-safe authentication—while delivering advanced features like MFA and multi-tenancy that developers previously had to build themselves.

**Verdict**: Use Better Auth for greenfield Next.js/B2B SaaS projects. Use Auth.js v4 if maintaining existing applications. Avoid Auth.js v5 beta for production.

---

*Last Updated: January 20, 2026*
*Research Source: Auth.js / NextAuth.js Research Report*
