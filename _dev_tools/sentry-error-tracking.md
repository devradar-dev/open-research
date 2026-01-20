---
title: "Sentry: Error Tracking & Performance Monitoring"
description: "Discover Sentry: error tracking and performance monitoring. Learn setup, compare with Rollbar/DataDog, and explore session replay capabilities."
category: dev-tools
tags: [sentry error tracking, error monitoring, sentry vs rollbar, javascript error tracking, application performance monitoring]
focus_keyword: "Sentry"
meta_title: "Sentry: Error Tracking & Performance Monitoring"
meta_description: "Discover Sentry: error tracking and performance monitoring. Learn setup, compare with Rollbar/DataDog, and explore session replay capabilities."
last_updated: 2026-01-20
version: "Latest (Cloud v2025+)"
status: stable
license: "FSL (Fair Source License), MIT/BSD (SDKs)"
quick_answer: "Sentry is the leading developer-first observability platform for error tracking, performance monitoring, and session replay. Free tier: 1 user, 5k errors, 50 replays. Team: $26/mo (50k errors)."
research_date: 2026-01-20
related: ["Datadog", "New Relic", "Rollbar", "Bugsnag", "LogRocket", "PostHog", "React", "Next.js"]
capabilities: ["Error tracking", "Performance monitoring", "Session replay", "Release tracking", "Issue workflows", "Stack trace grouping", "Alerting", "Self-hosted option"]
best_for: ["Frontend and mobile monitoring", "Full-stack applications", "Mobile/Game Devs", "Teams wanting developer-first tooling"]
avoid_for: ["Long-term data warehousing (30-90 day retention)", "Infrastructure monitoring (use Datadog)", "Teams wanting 100% capture (head-based sampling)"]
pricing: "Developer: $0 (1 user, 5k errors). Team: $26/mo (50k errors). Business: $80/mo (50k errors, SSO). Enterprise: Custom (data residency, priority support)."
search_intent: informational
---

# Sentry: Error Tracking & Performance Monitoring

## Quick Answer

Sentry is the **leading developer-first observability platform**, evolving from niche crash reporting into a comprehensive ecosystem encompassing error tracking, performance monitoring, session replay, and continuous profiling. By correlating qualitative user experience data (session replays) with quantitative metrics (distributed tracing), Sentry distinguishes itself from infrastructure-centric APM tools like Datadog.

## Executive Summary

The modern observability landscape has shifted from simple log aggregation to a multifaceted discipline where Sentry dominates the **developer-first** category. The platform's ability to link frontend visual stutters to backend database lock issues provides a level of insight that disjointed tools cannot match.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Platform Focus** | Developer-first (vs. Operations-first) |
| **Architecture** | Event-based structured JSON objects |
| **Core Insight** | Links errors to git commits (Suspect Commits) |
| **Licensing** | FSL (Fair Source License) for platform, MIT/BSD for SDKs |

## Core Architecture

### The Ingestion Pipeline

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Relay** | Rust service | Authentication, rate limiting, data normalization |
| **Kafka** | Message broker | High-throughput event buffering |
| **ClickHouse (Snuba)** | Column-oriented DBMS | Lightning-fast aggregations over billions of events |
| **Symbolicator** | Service | Maps minified code to source (Source Maps, dSYMs) |

### Event-Based Monitoring Model

Unlike traditional logging (string text files), Sentry captures structured **Events**:

| Event Component | Description |
|----------------|-------------|
| **Stack Trace** | Runtime error state |
| **Breadcrumbs** | Timeline of events leading to crash |
| **Local Variables** | Application memory state |
| **User Context** | User ID, email, custom data |
| **Environment Tags** | Release, environment, custom tags |

## Core Features

### Error Monitoring & Crash Reporting

| Feature | Description |
|---------|-------------|
| **Contextual Capture** | Breadcrumbs: console logs, network requests, user interactions, navigation |
| **Grouping Algorithms** | Hash-based grouping of individual events into "Issues" |
| **Source Maps & Symbolication** | Symbolicator maps minified memory addresses to original source code |
| **Suspect Commits** | Links error spikes to specific git commits |
| **Code Owners** | Auto-assigns Jira tickets to developers who touched the file |

### Performance Monitoring (Distributed Tracing)

| Concept | Details |
|---------|---------|
| **Transaction Model** | High-level operation (page load) vs. Span (individual unit of work) |
| **Cross-Service Propagation** | W3C Trace Context standards for unified traces |
| **Web Vitals** | Automatic capture of LCP, FID, CLS (Google Core Web Vitals) |
| **Waterfall Visualization** | Visual representation of request latency breakdown |

### Session Replay

| Technology | Description |
|------------|-------------|
| **RRWeb Technology** | Records DOM mutations rather than video pixels |
| **Integration** | "Play" button on stack trace watches 30 seconds before crash |
| **Privacy Controls** | All text/images masked by default (PII compliance) |

### Continuous Profiling

| Feature | Description |
|---------|-------------|
| **Sampling Profiler** | Records stack instruction pointer at high frequency (100Hz) |
| **Flame Graphs** | Visualizes hot code paths (inefficient regex, JSON serialization) |
| **Why vs. What** | Profiling shows "why" slow, tracing shows "what" is slow |

## Platform Support

### The JavaScript & Web Ecosystem

| SDK | Platform | Key Features |
|-----|----------|--------------|
| **@sentry/browser** | Web | Foundation SDK |
| **@sentry/react** | React | Error Boundaries |
| **@sentry/nextjs** | Next.js | Vercel Edge Runtime, automatic instrumentation |
| **@sentry/bun** | Bun | Native HTTP server, transpiler support (late 2025) |
| **Vue / Angular / Svelte** | Frameworks | Component-aware stack traces |

### Mobile Development

| SDK | Platform | Unique Features |
|-----|----------|-----------------|
| **Android** | Java/Kotlin | ANR (Application Not Responding) tracking, NDK monitoring |
| **iOS (Cocoa)** | Swift/Obj-C | OOM (Out of Memory) tracking, dSYM support |
| **React Native / Flutter** | Hybrid | Dual-layer monitoring (JS/Dart + Native crashes) |

### Backend & Server-Side

| SDK | Features |
|-----|----------|
| **Python** | Django, Flask, FastAPI, Celery support, Python 3.13 compatibility |
| **Java / JVM** | Kotlin, Scala, Spring Boot, sentry-logback/log4j appenders |
| **PHP** | Laravel, Symfony support, ephemeral request handling |
| **Go / Rust** | Panic/crash capture, web framework hooks (Gin, Echo, Actix, tokio-tracing) |

### Gaming and Native

| SDK | Platform |
|-----|----------|
| **Unreal Engine / Unity** | C++/C# game engine crashes, minidump processing |
| **Electron** | Desktop crash reporting |
| **Windows / macOS** | WPF/.NET, macOS native apps |

## Licensing: The "Fair Source" Paradigm

| License Type | Scope |
|--------------|-------|
| **FSL (Functional Source License)** | Platform backend |
| **MIT / BSD** | SDKs (embedded in your app) |

### The FSL Model

| Restriction | Freedom |
|-------------|----------|
| Cannot create "Compiling Service" | Free for internal business use |
| No SaaS reselling | Apache 2.0 trigger after 2 years |

## Hosting: SaaS vs. Self-Hosted

### SaaS (sentry.io)

| Feature | Details |
|---------|---------|
| **Infrastructure** | Hosted on Google Cloud Platform |
| **Compliance** | SOC 2 Type II, ISO 27001, HIPAA |
| **Data Residency** | US and EU region options (GDPR) |

### Self-Hosted Sentry

| Component | Requirement |
|-----------|--------------|
| **Core Services** | 20-30 Docker containers |
| **Minimum Specs** | 4 CPU cores, 16GB RAM (realistic: 32-64GB RAM) |
| **Databases** | Kafka, ClickHouse, Redis, Postgres, Zookeeper |
| **Operational Burden** | No official support; community forums only |

## Pricing Structure

| Plan | Base Cost | Quotas Included | Target Audience |
|------|-----------|----------------|-----------------|
| **Developer** | $0/mo | 1 user, 5k errors, 1GB attachments, 50 replays | Solo developers, hobby projects |
| **Team** | $26/mo | Unlimited users, 50k errors, 5GB logs | Startups, small teams |
| **Business** | $80/mo | 50k errors, SSO, cross-project views | Mid-market companies |
| **Enterprise** | Custom | Custom quotas, data residency, priority support | Large organizations |

### Cost Control Strategies

| Strategy | Description |
|----------|-------------|
| **Client-Side Sampling** | `tracesSampleRate: 0.1` reduces costs 90% |
| **Inbound Filters** | Ignore legacy browsers, web crawlers, localhost |
| **Rate Limiting** | Hard limits per project to protect org quota |
| **Spike Protection** | Algorithm detects anomalies, drops excess events |

## Recent Updates (Late 2025 - Early 2026)

| Update | Details |
|--------|---------|
| **Logs Product (GA)** | Ingest logs via OpenTelemetry, contextual linking |
| **Seer AI Integration** | AI-assisted grouping, generative AI code fix suggestions |
| **Metrics Beta** | Custom metrics (counters, gauges, sets) |
| **Bun SDK** | @sentry/bun for Bun runtime |
| **Java SDK v8.29.0** | Feature flaging integrations, oversized event handling |

## Comparison

### Sentry vs. Datadog

| Aspect | Sentry | Datadog |
|--------|--------|---------|
| **Focus** | Developer-first code tool | Outside-in infrastructure tool |
| **Strengths** | Stack traces, source maps, mobile/frontend | Infrastructure monitoring, unified logs/metrics/traces |
| **Use Case** | Debugging application code | Monitoring infrastructure health |

### Sentry vs. LogRocket

| Aspect | Sentry | LogRocket |
|--------|--------|----------|
| **Focus** | Engineering (debugging) | Product (analytics) |
| **Strengths** | Replay with backend errors and tracing | Product analytics, conversion funnels |
| **Question** | "Why did the app crash?" | "Why did the user drop off?" |

## Best For

- **Frontend & Mobile**: Superior stack trace readability, source map handling
- **Full-Stack Applications**: Unified view across frontend, backend, mobile
- **Mobile/Game Devs**: Specialized support for ANR, NDK, dSYM symbolication
- **Teams Wanting Developer-First Tooling**: Focus on code over infrastructure

## Avoid For

- **Long-Term Data Warehousing**: Default retention 30-90 days (not for 1-year compliance)
- **Infrastructure Monitoring**: Use Datadog for CPU, RAM, Disk metrics
- **100% Capture Requirements**: Head-based sampling means some traces lost

## Limitations

| Limitation | Details |
|------------|---------|
| **Data Retention** | Short retention (30-90 days) for raw event payload |
| **Sampling Dilemma** | 10% sampling = 90% visibility loss |
| **Self-Hosted Resources** | Requires enterprise-grade hardware and SRE expertise |

## Conclusion

Sentry remains the **unparalleled leader** in application error tracking. Its evolution into broader observability—encompassing tracing, profiling, replays, and logs—demonstrates strategic intent to own the entire developer workflow.

**Verdict**: Sentry is a high-investment, high-reward tool. It requires effort to configure SDKs and upload source maps, but returns a level of code visibility that dramatically reduces mean-time-to-resolution for complex software defects.

---

*Last Updated: January 20, 2026*
*Research Source: Sentry Developer Tool Research*
