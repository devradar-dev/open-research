---
title: "PostHog: Open Source Product Analytics Platform"
description: "Explore PostHog: all-in-one product analytics, session replay, and feature flags. Compare with Amplitude and learn self-hosted deployment."
category: dev-tools
tags: [posthog, product analytics, posthog vs amplitude, open source analytics, session replay tool]
focus_keyword: "PostHog"
meta_title: "PostHog: Open Source Product Analytics Platform"
meta_description: "Explore PostHog: all-in-one product analytics, session replay, and feature flags. Compare with Amplitude and learn self-hosted deployment."
last_updated: 2026-01-20
version: "Latest (Cloud v1.41+, Self-hosted MIT)"
status: stable
license: "MIT (Self-hosted), Fair Source (Cloud)"
quick_answer: "PostHog is an open-source Product OS combining analytics, session replay, feature flags, and data warehousing. Free tier: 1M events/mo, 5k session replays. Self-hosted MIT option for data sovereignty."
research_date: 2026-01-20
related: ["Amplitude", "Mixpanel", "Heap", "ClickHouse", "Kafka", "Figma", "Vercel"]
capabilities: ["Product analytics", "Session replay", "Feature flags", "A/B testing", "Data warehouse (CDP)", "HogQL (SQL dialect)", "Self-hosted option", "Web analytics"]
best_for: ["Product-focused teams", "Startups wanting unified platform", "Data-sovereign organizations", "Teams consolidating analytics stack"]
avoid_for: ["Teams wanting zero infrastructure (self-hosted complex)", "Long-term data warehousing beyond 90 days", "Simple event tracking without full analytics needs"]
pricing: "Free: 1M events, 5k replays, 1M flag requests/mo. Pay-as-you-go: usage-based. Enterprise: $2,000/mo + usage (SSO, SLA, audit logs)."
search_intent: informational
---

# PostHog: Open Source Product Analytics Platform

## Quick Answer

PostHog is an **open-source Product OS** that unifies product analytics, session replay, feature flags, and data warehousing into a single platform. With ClickHouse-powered analytics, HogQL SQL dialect, and MIT-licensed self-hosting, PostHog eliminates the need for separate tools while offering data sovereignty for regulated industries.

## Executive Summary

PostHog represents a paradigm shift from fragmented telemetry tools to a **unified platform** for the entire product development lifecycle. The platform's architectural decisions—specifically ClickHouse for analytical core and the Hog/HogQL ecosystem—provide performance and flexibility advantages over legacy analytics providers.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | PostHog |
| **Latest Cloud Version** | v1.41.0+ (400% ingestion performance improvement) |
| **Self-Hosted License** | MIT |
| **Data Warehouse** | ClickHouse (columnar OLAP) |

## Core Architecture

### The Unified Paradigm

PostHog's infrastructure utilizes a heterogeneous stack:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Analytical Engine** | ClickHouse | Sub-second multi-dimensional filtering |
| **Event Pipeline** | Apache Kafka | Ingestion buffering, asynchronous queuing |
| **Metadata Layer** | PostgreSQL | Users, teams, configurations |
| **Cache/Session** | Redis | Real-time caching, state management |
| **Object Store** | MinIO | Large blob storage (session replays) |
| **Proxy Layer** | Caddy | Request routing, SSL, load balancing |

### Deployment Modalities

| Model | Hardware Requirements | Best For |
|-------|----------------------|----------|
| **Cloud (SaaS)** | None | Teams wanting managed convenience |
| **Self-Hosted (MIT)** | 16GB RAM, 4 vCPUs, 30GB+ storage | Data sovereignty, cost control |

**Note**: Kubernetes support was sunsetted for open-source tier in 2023; Docker Compose now recommended.

## Developer Ecosystem

### SDK Support Matrix

| SDK Category | Supported Features | Platforms | Release Cadence |
|--------------|-------------------|-----------|-----------------|
| **Client-Side Web** | Autocapture, Replay, Flags, Surveys | JS, React, Next.js, Vue | Weekly/Daily |
| **Mobile SDKs** | Flags, Events, Error Tracking | Android, iOS, Flutter, RN | Monthly |
| **Server-Side** | Flags, Group Analytics, Events | Node, Python, Go, Ruby | Monthly |

### Autocapture

PostHog's defining feature for client-side SDKs:

| Capability | Description |
|------------|-------------|
| **Automatic Tracking** | Every click, page view, input change captured without manual instrumentation |
| **Zero Implementation** | Immediate time-to-insight for new deployments |
| **Privacy Controls** | Configurable to capture only specific elements |

### Edge Runtime Compatibility

| Challenge | Solution |
|-----------|----------|
| **Batching failures** | Use `captureImmediate` method |
| **Configuration** | Set `flushAt: 1` and `flushInterval: 0` |

## The Customer Data Platform (CDP)

### Real-Time Ingestion Transformations

| Transformation Type | Use Case |
|---------------------|----------|
| **PII Hashing** | SHA-256 transformation of email addresses |
| **GeoIP Enrichment** | Adding geographic metadata based on IP |

**Performance Monitoring**: Transformations consuming excessive memory/execution time are automatically quarantined.

### Destinations & Batch Exports

| Destination Type | Examples | Latency |
|------------------|----------|----------|
| **Real-Time Hook** | Slack, Discord, Webhooks | < 1 second |
| **CDP Destination** | Braze, Intercom, Hubspot | Seconds |
| **Batch Export** | BigQuery, S3, Snowflake | Hourly/Daily |

## Programming in PostHog

### HogQL: High-Performance SQL

| Feature | Details |
|---------|---------|
| **Purpose** | Direct SQL access to PostHog data model |
| **Transparency** | Every insight convertible to underlying HogQL query |
| **Power** | Join events with person properties, calculate custom metrics |

### The Hog Programming Language

| Characteristic | Details |
|----------------|---------|
| **Influenced By** | SQL with procedural constructs |
| **Array Indexing** | 1-indexed (consistent with ClickHouse SQL) |
| **Assignment** | `:=` operator (since `=` and `==` reserved for SQL equality) |
| **Sandboxing** | Heavily sandboxed to prevent memory leaks and unpredictable code |

## Feature Management

### Flag Evaluation Runtimes

| Runtime | Use Case | Details |
|---------|----------|---------|
| **Server-side** | Sensitive rollouts, backend configs | Prevents exposure of flag logic to client |
| **Client-side** | UI/UX experiments | Immediate feedback without network round-trip |
| **All (Default)** | Combined evaluation | Balances security and UX |

### Statistical Experimentation

| Capability | Details |
|------------|---------|
| **Assignment** | Automatic user assignment to flag variants |
| **Goal Tracking** | Progress toward business KPI (e.g., "Signed Up") |
| **Statistical Significance** | Calculated using raw ClickHouse event data |

## Platform Support

### Framework Integration

| Framework | Status |
|-----------|--------|
| **React / Next.js** | First-class support |
| **Remix** | Loader/action patterns |
| **Nuxt** | Vue.js based framework |
| **SvelteKit** | Svelte-based framework |
| **Express** | Standard Node.js server |
| **FastAPI** | Python async framework |
| **Django** | Python full-stack |
| **Rails** | Ruby on Rails via ActionMailer |
| **Laravel** | PHP framework |
| **Phoenix** | Elixir framework |
| **Spring Boot** | Java support |
| **Hono** | Edge-optimized framework |

## Security & Compliance

### Supply Chain Integrity

| Incident | Details |
|---------|---------|
| **2025 NPM Attack** | Malicious nx package with backdoor |
| **Exploit** | pull_request_target trigger, exfiltration of POSTHOG_BOT_PAT |
| **Remediation** | Stricter controls on external PR interactions |

### Privacy & Compliance

| Feature | Details |
|---------|---------|
| **Data Residency** | Separate US and EU regions (GDPR compliance) |
| **Self-Hosting** | Zero-trust telemetry option |
| **SOC 2 Type II** | Certified (Cloud platform) |

## Pricing

| Tier | Target | Features | Cost Structure |
|------|---------|----------|----------------|
| **Free** | Startups | 1M events, 5k replays, 1M flag requests | $0 |
| **Pay-as-you-go** | Scaling teams | Unlimited projects, 7yr retention | Usage-based |
| **Enterprise** | Large corporations | SAML, audit logs, standard support | $2,000/mo + Usage |
| **Self-Hosted (MIT)** | Privacy-first orgs | Complete data control | Infrastructure costs |

## Best For

- **Product-Focused Teams**: Replacing multiple tools (analytics, flags, replays)
- **Startups**: Generous free tier for rapid prototyping
- **Data Sovereignty**: Self-hosted MIT option for regulated industries
- **Full-Stack TypeScript**: Deep integration with modern stack

## Avoid For

- **Zero Infrastructure Teams**: Self-hosted requires operational expertise
- **Long-Term Data Warehousing**: Default retention 30-90 days (not for 1-year compliance)
- **Simple Event Tracking**: Overkill for basic analytics needs

## Limitations

1. **Self-Hosted Complexity**: 16GB+ RAM requirement for production
2. **Ecosystem Security**: Open source has supply chain vulnerabilities
3. **Retention Limits**: Default retention shorter than enterprise requirements

## Conclusion

PostHog has established itself as the **cornerstone of the developer tool ecosystem** by successfully unifying disparate product management functions. Its technical decisions—ClickHouse for analytics, HogQL for querying—provide performance advantages.

**Verdict**: Choose PostHog for unified product analytics, session replay, and feature flags. The self-hosted MIT option is ideal for data sovereignty. Choose legacy tools (Amplitude, Mixpanel) if you need specialized statistical modeling or zero infrastructure.

---

*Last Updated: January 20, 2026*
*Research Source: PostHog Developer Tool Research*
