---
title: "Flagsmith: Open Source Feature Flagging Platform Guide"
description: "Discover Flagsmith: open-source feature flagging with self-hosting, local evaluation, and flexible pricing. Compare with LaunchDarkly and learn setup."
category: dev-tools
tags: [flagsmith feature flags, feature flagging platform, remote configuration, flagsmith open source, flagsmith vs launchdarkly]
focus_keyword: "Flagsmith"
meta_title: "Flagsmith: Open Source Feature Flagging Platform Guide"
meta_description: "Discover Flagsmith: open-source feature flagging with self-hosting, local evaluation, and flexible pricing. Compare with LaunchDarkly and learn setup."
last_updated: 2026-01-20
version: "Latest"
status: stable
license: "BSD-3-Clause (Open Core)"
quick_answer: "Flagsmith is an open-source feature flagging platform with self-hosting, local evaluation for zero-latency, and request-based pricing. Free tier with 50,000 requests, $45/month for 1M requests."
research_date: 2026-01-20
related: ["LaunchDarkly", "Unleash", "Split", "PostHog", "Cloudflare Workers", "Vercel"]
capabilities: ["Feature flags", "A/B testing", "Remote config", "Local evaluation", "Multi-region SaaS", "Self-hosted option", "SDKs for all platforms"]
best_for: ["Regulated Industries (Finance/Healthcare)", "High-Frequency Trading / Real-Time Gaming", "Cross-Platform consistency", "Cost-conscious scaling"]
avoid_for: ["Content Management Systems (large JSON blobs)", "Complex Statistical Experimentation (requires external analytics)", "Ephemeral Edge Caching (inefficient with local eval)"]
pricing: "Free: 50,000 requests/mo. Start-Up: $45/mo (1M requests). Enterprise: Custom (5M+ requests, SAML, SLA)."
search_intent: informational
---

# Flagsmith: Open Source Feature Flagging Platform Guide

## Quick Answer

Flagsmith is an **open-source feature flagging and remote configuration platform** with a unique request-based pricing model that challenges the Monthly Active User (MAU) standard. Unlike competitors that enforce cloud-only models, Flagsmith offers a continuum from free SaaS to air-gapped on-premise deployments—making it ideal for regulated industries requiring data sovereignty.

## Executive Summary

Flagsmith operates under an **Open Core** business model with BSD-3-Clause licensing. The platform distinguishes itself through architectural flexibility, offering three deployment models (Hosted SaaS, Private Cloud, Self-Hosted) and two evaluation modes (Remote and Local) that serve different latency and consistency requirements.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Flagsmith |
| **Repository** | flagsmith/flagsmith (GitHub) |
| **License** | BSD-3-Clause (Open Core) |
| **Primary Category** | Feature Flag Management & Remote Configuration |

## Core Architecture

### The Tripartite Structure

| Component | Purpose | Communication |
|-----------|---------|---------------|
| **Frontend SDK** | Renders UI, stores tokens | Communicates with Application Backend only |
| **Backend SDK** | Orchestrates auth, overrides logic | Communicates with Flagsmith Core |
| **Flagsmith Core** | Password hashing, JWT signing | HTTP service (Python/Django + React) |

### Deployment Models

| Model | Cost Structure | Best For |
|-------|---------------|----------|
| **Hosted SaaS** | Free tier, then $45+/mo | Teams wanting zero infrastructure |
| **Private Cloud** | Subscription-based | Organizations needing isolation |
| **Self-Hosted** | Infrastructure costs only | Regulated industries, data sovereignty |

## Evaluation Modes

### Remote Evaluation (Client-Side SDKs)

**Environment**: Browsers, Mobile Apps, Desktop Apps

| Characteristic | Details |
|---------------|---------|
| **Security Model** | Client-side Environment Key (public) |
| **Mechanism** | SDK sends user data to API, API evaluates and returns flags |
| **Latency** | Network round-trip dependency |
| **Privacy** | Segmentation logic hidden from client |

**Supported Platforms**: JavaScript, React, React Native, Next.js (Client Components), Android (Kotlin), iOS (Swift), Flutter

### Local Evaluation (Server-Side SDKs)

**Environment**: Backend APIs, Microservices, Job Workers

| Characteristic | Details |
|---------------|---------|
| **Security Model** | Server-side Environment Key (secret) |
| **Mechanism** | Downloads Environment Document, evaluates locally in sub-millisecond |
| **Latency** | Zero network latency per check |
| **Polling** | Asynchronous polling (e.g., every 60 seconds) |

**Supported Platforms**: Python, Java, .NET, Go, Node.js, Ruby, PHP, Rust, Elixir

**Impact**: Enables millions of evaluations per second with zero added network latency—ideal for high-frequency trading or real-time gaming backends.

## Database Strategy

Flagsmith self-hosted requires:

| Component | Purpose |
|-----------|---------|
| **Application Server** | Python/Django API + React Frontend |
| **Database** | PostgreSQL (ACID compliance, backup strategies) |
| **Orchestration** | Docker Compose (quick start), Helm Charts (production HA) |

## Platform Support

### Edge & Serverless Compatibility

| Platform | Support | Notes |
|----------|---------|-------|
| **Cloudflare Workers** | Native support via Edge API | Proximity to edge nodes minimizes RTT |
| **Vercel** | Next.js Middleware support | State propagation from server to client |
| **Vercel Edge Runtime** | Compatible | Use Edge API for reliability |

### SDK Ecosystem

| Platform | SDK Type | Status |
|----------|----------|--------|
| **Node.js/TS** | @flagsmith/sdk | Official |
| **Python** | flagsmith-python | Official |
| **Java** | flagsmith-java | Official |
| **.NET** | flagsmith-dotnet | Official |
| **Go** | flagsmith-go | Official |
| **Ruby** | flagsmith-ruby | Official |
| **PHP** | flagsmith-php | Official |
| **Rust** | flagsmith-rust | Official |
| **iOS (Swift)** | flagsmith-ios | Official |
| **Android (Kotlin)** | flagsmith-android | Official |
| **React Native** | flagsmith-react-native | Official |
| **Flutter** | flagsmith-flutter | Official |

## Pricing Analysis

### Request-Based Model

| Tier | Price | Usage Limit | Key Features |
|------|-------|-------------|--------------|
| **Free** | $0/mo | 50,000 requests | Unlimited flags/envs, A/B testing |
| **Start-Up** | $45/mo | 1,000,000 requests | Email support, scheduled flags, 2FA |
| **Enterprise** | Custom | 5M+ requests | RBAC, SAML/SSO, audit logs, SLA |

### Local Evaluation Loophole

For Server-side SDKs using Local Evaluation:
- Polling interval (e.g., once per minute) = only 1 request
- Unlimited flag evaluations within that minute = $0 additional cost

**Cost Efficiency**: Massive savings for high-throughput backend systems compared to per-evaluation billing.

### Comparative Analysis

| Provider | Pricing Model | Free Tier | Self-Hosted |
|----------|--------------|-----------|-------------|
| **Flagsmith** | API Requests | 50k req | Yes (BSD-3) |
| **LaunchDarkly** | MAU (Monthly Active Users) | Trial/Dev | No |
| **Unleash** | Seats (SaaS) / Seats (Ent) | Self-host only | Yes (Apache 2.0) |
| **Split** | MTU (Traffic) | Yes | No |

## Best For

- **Regulated Industries**: Finance/Healthcare requiring air-gapped deployments (HIPAA, FedRAMP)
- **High-Frequency Trading**: Sub-millisecond flag evaluation via Local Evaluation
- **Cross-Platform Consistency**: Unified Identity model ensures users see same feature state on all devices
- **Cost-Conscious Scaling**: Request-based pricing predictable for backend-heavy applications

## Avoid For

- **Content Management Systems**: 20KB limit on string values—not designed for large JSON blobs or HTML templates
- **Complex Statistical Experimentation**: Doesn't perform P-value calculation or Bayesian inference internally—integrate with Amplitude/Split
- **Ephemeral Edge Caching**: Local Evaluation inefficient on serverless (Lambda, Cloudflare Workers) where cache is cold-started

## Integrations

| Category | Tools |
|----------|-------|
| **Analytics** | Amplitude, Mixpanel, Segment, Heap, Google Analytics |
| **Observability** | Datadog, New Relic, Dynatrace, Sentry |
| **Developer Workflow** | GitHub (PR visibility), Terraform (GitOps) |

## Conclusion

Flagsmith offers a **flexible, developer-friendly approach** to feature flagging with its Open Core philosophy and request-based pricing. By rejecting the "one size fits all" cloud-only model, it serves engineering leaders in complex, regulated, or high-security environments.

**Verdict**: Choose Flagsmith for data sovereignty requirements, high-throughput backend systems, and cost-sensitive scaling. Consider LaunchDarkly if you need extensive built-in statistical modeling or zero-infrastructure managed service.

---

*Last Updated: January 20, 2026*
*Research Source: Flagsmith Developer Tool Research*
