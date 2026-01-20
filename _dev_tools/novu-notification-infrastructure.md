---
title: "Novu: Open Source Notification Infrastructure Platform"
description: "Discover Novu: open-source notification infrastructure for email, SMS, push, and in-app. Learn workflow design, digest logic, and self-hosting."
category: dev-tools
tags: [novu notification infrastructure, novu open source, multi-channel notifications, notification workflow, novu vs courier]
focus_keyword: "Novu"
meta_title: "Novu: Open Source Notification Infrastructure Platform"
meta_description: "Discover Novu: open-source notification infrastructure for email, SMS, push, and in-app. Learn workflow design, digest logic, and self-hosting."
last_updated: 2026-01-20
version: "v3.11.x"
status: stable
license: "MIT (Core), Commercial (Enterprise features)"
quick_answer: "Novu is an open-source notification infrastructure platform unifying email, SMS, push, chat, and in-app notifications. Free tier: 10k events/mo. Self-hosted MIT license option for data sovereignty."
research_date: 2026-01-20
related: ["Courier", "Knock", "SendGrid", "Twilio", "Resend", "MongoDB", "Redis", "ClickHouse"]
capabilities: ["Multi-channel support (Email, SMS, Push, Chat, In-App)", "Digest engine", "Workflow orchestration", "Novu Framework (code-first)", "Provider abstraction", "Real-time WebSocket"]
best_for: ["Product engineers building multi-channel notifications", "Teams wanting open-source with data sovereignty", "Organizations needing complex workflow orchestration"]
avoid_for: ["Teams requiring zero infrastructure (self-hosted has operational overhead)", "Projects needing native mobile SDKs (Flutter community-maintained)", "Pure client-side only apps (requires backend)"]
pricing: "Free: 10,000 events/mo. Starter: ~$30/mo (30k events). Business: ~$250/mo (250k events). Enterprise: Custom."
search_intent: informational
---

# Novu: Open Source Notification Infrastructure Platform

## Quick Answer

Novu is an **open-source notification infrastructure** platform that unifies email, SMS, push, chat, and in-app notifications into a single abstraction layer. With its code-first Novu Framework, sophisticated digest engine, and self-hosting option under MIT license, Novu allows engineering teams to implement complex communication strategies without vendor lock-in.

## Executive Summary

Novu has positioned itself as the **preeminent open-source solution** for notification orchestration. Operating on an "Open Core" model, Novu provides a robust MIT-licensed community edition for self-hosting alongside a managed Cloud SaaS with enhanced reliability. The platform's v3.11.x release series represents a mature iteration focusing on security, developer experience, and scalability through polyglot persistence.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Novu |
| **Latest Version** | v3.11.2 (December 2025) |
| **Project Governance** | Open Source (MIT Core), Commercial (Enterprise) |
| **Architecture** | Microservices-based, event-driven |

## Core Architecture

### Microservices Composition

| Component | Responsibility |
|-----------|-----------------|
| **API Service** | Gateway for external interactions, schema validation, authentication |
| **Worker Service** | Operational nucleus executing workflow logic |
| **WebSocket Service** | Manages persistent connections for real-time in-app notifications |

### Polyglot Persistence Strategy

| Database | Purpose |
|----------|---------|
| **MongoDB** | Notification content, workflow templates, execution logs (schema flexibility) |
| **PostgreSQL** | Structural entities (tenant management, billing, org hierarchy) |
| **ClickHouse** | High-volume analytics (OLAP) for delivery stats, open rates |
| **Redis** | Queue backing (BullMQ), high-speed cache, digest state management |

## The Workflow Engine

### The Digest Engine

Addresses notification fatigue through intelligent aggregation:

| Feature | Description |
|---------|-------------|
| **Aggregation** | Collects multiple events into a single notification |
| **Time Windows** | Configurable duration (e.g., "every 24 hours") |
| **Count Thresholds** | Release when reaching specified event count |
| **State Management** | Redis maintains temporary digest window state |

### Dynamic Delays (v3.11.x)

| Capability | Details |
|------------|---------|
| **Static Delays** | "Wait 30 minutes" (legacy) |
| **Dynamic Delays** | Duration derived from trigger payload (e.g., "Send reminder 1 hour before event_time") |

## The Novu Framework: Code-First Approach

### GitOps Paradigm

Traditional workflows were designed in the Novu Dashboard UI. The **Novu Framework** reverses this:

```typescript
import { workflow } from '@novu/framework';
import { z } from 'zod';

export const onboardingWorkflow = workflow('onboarding-flow', async ({ step, payload }) => {
  await step.email('welcome-email', async (inputs) => {
    return {
      subject: `Welcome ${payload.userName}`,
      body: '<h1>Welcome to the platform</h1>',
    };
  });
}, {
  payloadSchema: z.object({ userName: z.string() })
});
```

**Benefits:**
- Workflow definitions live in application repository
- Same SDLC as rest of application
- Zod schema validation for runtime type safety

### Local Studio

| Feature | Details |
|---------|---------|
| **Command** | `npx novu dev` |
| **Function** | Spins local server (port 2022) with secure tunnel |
| **Benefit** | Test workflows and view logs locally without deployment |

## SDK Ecosystem

### Server-Side SDKs

| Language | Package | Status | Notes |
|----------|---------|--------|-------|
| **Node.js** | @novu/node / @novu/api | Official | Gold standard, full TypeScript support |
| **Python** | novu | Official | EventApi, SubscriberApi support |
| **Go** | go-novu | Official | High-performance, idiomatic struct-based |
| **PHP** | novu-php | Official | Standard PHP wrapper |
| **.NET** | Novu | Official | C# / ASP.NET Core integration |
| **Java** | novu-java | Community | May lag behind official SDKs |
| **Kotlin** | novu-kotlin | Community | Kotlin-specific syntax (coroutines) |
| **Ruby** | novu | Community | Ruby on Rails gem |
| **Laravel** | novu-laravel | Community | Laravel-specific wrapper |

### Client-Side and UI SDKs

| Platform | SDK | Status |
|----------|-----|--------|
| **React** | @novu/react | Official (flagship UI library) |
| **Vue.js** | @novu/js | Generic (must wrap manually) |
| **Angular** | Wrapper / @novu/js | Community wrapper, less frequent updates |
| **React Native** | Official | Handles mobile push token management |
| **Flutter** | flutter_novu | Community (not official) |
| **iOS (Swift)** | None | No official SDK |

### Edge Runtime Limitations

| Challenge | Solution |
|-----------|----------|
| **Node.js Dependencies** | Avoid @novu/node in edge functions |
| **Workaround** | Use native fetch API for direct REST API calls |
| **Build Flags** | nodejs_compat in Cloudflare wrangler.toml can help |

## Platform Support

### Integration & Ecosystem

| Channel | Providers |
|---------|-----------|
| **Email** | SendGrid, SES, Mailgun, React Email integration |
| **SMS** | Twilio, Telnyx, Plivo |
| **Push** | FCM (Android), APNS (iOS), Expo (React Native) |
| **Chat** | Slack, Microsoft Teams, Discord, Mattermost |

### Provider Overrides

```json
{
  "overrides": {
    "email": {
      "senderName": "Urgent Support"
    },
    "fcm": {
      "android": {
        "notification": {
          "sound": "critical_alert"
        }
      }
    }
  }
}
```

Allows platform-specific capabilities while maintaining unified API.

## Operational Deployment

### Novu Cloud (SaaS)

| Feature | Details |
|---------|---------|
| **Data Residency** | Separate US and EU environments (GDPR compliance) |
| **Reliability** | SLAs, autoscaling infrastructure |
| **Regions** | api.novu.co vs eu.api.novu.co |

### Self-Hosted Implementation

| Requirement | Specification |
|-------------|----------------|
| **Orchestration** | Kubernetes (recommended) over Docker Compose |
| **Databases** | HA Redis cluster, sharded MongoDB, optional Postgres |
| **Object Storage** | S3-compatible service (MinIO/AWS S3) for attachments/avatars |

**Enterprise Constraints**: SSO, Audit Logs, advanced RBAC require commercial license even when self-hosted.

## Pricing

| Tier | Cost | Volume Limit | Key Features |
|------|------|--------------|--------------|
| **Free** | $0/mo | 10,000 events | Unlimited subscribers, all channels |
| **Starter** | ~$30/mo | 30,000 events | No branding, 7-day retention |
| **Business** | ~$250/mo | 250,000 events | 90-day retention, unlimited team |
| **Enterprise** | Custom | Custom volume | SSO, SLA, audit logs |

### Comparative Analysis

| Platform | Free Tier | Pricing Model | Self-Hosted |
|----------|-----------|---------------|-------------|
| **Novu** | 10k events | Flat-rate buckets | Yes (MIT) |
| **Knock** | 10k events | Significant jump to ~$250/mo | No |
| **Courier** | Tiered | Per-notification ($0.005/msg) | No |

## Best For

- **Product Engineers**: Building multi-channel notification systems
- **Data Sovereignty**: Self-hosted MIT option for regulated industries
- **Complex Workflows**: Digest logic, multi-channel failover
- **Budget-Conscious Teams**: Free tier higher than some competitors

## Avoid For

- **Zero Infrastructure Teams**: Self-hosted requires DevOps capacity
- **Mobile-Only Projects**: Community Flutter SDK, no official Swift SDK
- **Simple Transactional Email**: Overkill for basic email needs

## Limitations

1. **Operational Overhead**: Self-hosted requires maintenance of multiple databases
2. **Mobile SDK Maturity**: Flutter community-maintained, no native iOS SDK
3. **Edge Compatibility**: Node.js SDK incompatible with Edge runtimes

## Conclusion

Novu has matured into a **sophisticated infrastructure platform** addressing the fragmentation of modern notification systems. The v3.11.x release and Novu Framework represent a pivot from UI-first to code-first/GitOps workflows.

**Verdict**: Choose Novu for open-source flexibility, data sovereignty requirements, and teams wanting unified multi-channel notifications without vendor lock-in.

---

*Last Updated: January 20, 2026*
*Research Source: Novu Developer Tool Research*
