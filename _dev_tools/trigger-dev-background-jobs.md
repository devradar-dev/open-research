---
title: "Trigger.dev: Background Jobs Platform for TypeScript"
description: "Explore Trigger.dev: background jobs platform with durable execution. Build AI agents, workflows, and long-running tasks without timeouts."
category: dev-tools
tags: [trigger.dev, background jobs typescript, durable execution, trigger.dev vs inngest, serverless background tasks]
focus_keyword: "Trigger.dev"
meta_title: "Trigger.dev: Background Jobs Platform for TypeScript"
description: "Explore Trigger.dev: background jobs platform with durable execution. Build AI agents, workflows, and long-running tasks without timeouts."
last_updated: 2026-01-20
version: "v4.3.1"
status: stable
license: "Apache 2.0"
quick_answer: "Trigger.dev is a TypeScript background jobs platform with checkpoint-resume architecture eliminating timeouts. Free: $5/mo compute. Hobby: $10/mo. Pro: $50/mo. Managed infrastructure with warm starts."
research_date: 2026-01-20
related: ["Inngest", "Temporal", "Vercel", "Next.js", "Bun", "OpenAI", "LangChain"]
capabilities: ["Checkpoint-resume architecture", "No timeouts", "AI agent support", "Realtime streams", "Cron scheduling", "Batch triggers", "Framework integration", "Self-hosted option"]
best_for: ["Generative AI Agents", "Full-Stack TypeScript Teams", "Complex Business Processes", "Heavy Compute (video processing, data transformation)"]
avoid_for: ["High-Frequency Low-Latency Data Ingestion (use Kafka/Redis)", "Non-Node.js Workloads", "Simple fire-and-forget CRON tasks"]
pricing: "Free: $5/mo compute. Hobby: $10/mo (20 runs concurrency). Pro: $50/mo (200 runs concurrency). Enterprise: Custom."
search_intent: informational
---

# Trigger.dev: Background Jobs Platform for TypeScript

## Quick Answer

Trigger.dev is a **TypeScript-first background jobs platform** that eliminates serverless timeouts through its **Checkpoint-Resume architecture**. Unlike traditional queue systems or wrappers that inherit platform limitations, Trigger.dev v4 hosts the code on managed infrastructure, allowing tasks to run for days, weeks, or months while only paying for active compute time.

## Executive Summary

Trigger.dev's pivotal architectural shift from library (v2) to managed infrastructure provider (v3/v4) resolved the dual problems of serverless timeouts and double billing. By packaging and executing developer code on elastic worker fleets, Trigger.dev enables complex workflows—AI agents, drip campaigns, video processing—that were previously impossible on platforms like Vercel or AWS Lambda.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Trigger.dev |
| **Slug/Identifier** | trigger-dev |
| **Package Name** | @trigger.dev/sdk |
| **Current Version** | v4.3.1 |
| **License** | Apache 2.0 |

## Core Architecture

### The Checkpoint-Resume System

| Phase | Action |
|-------|--------|
| **Checkpoint** | Serialize current execution state (local variables, instruction pointer) |
| **Release** | Free physical worker node, consume zero resources during wait |
| **Resume** | Provision new worker (potentially different machine), restore state, continue |

**Result**: Tasks can span arbitrary durations (days, weeks, months) while only incurring costs for milliseconds of active CPU usage.

### Infrastructure Isolation

| Feature | Details |
|---------|---------|
| **Isolation** | Each task run in isolated Docker environment |
| **Machine Configurations** | small-1x (0.5 vCPU, 0.5GB RAM) to larger configs for heavy workloads |
| **Warm Starts** | Cloud tier maintains pool of pre-warmed containers for instant execution |

### Version Locking & Determinism

| Mechanism | Purpose |
|-----------|---------|
| **Immutable Snapshots** | Each deployment is a version-locked snapshot |
| **Child Task Consistency** | Children forced to use same version as parent (prevents interface mismatch) |
| **Fire-and-Forget Exception** | Background tasks use "Latest" version |

## Features

### Task Orchestration & Scheduling

| Mode | Description |
|------|-------------|
| **Regular Tasks** | Triggered ad-hoc via API |
| **Scheduled Tasks** | CRON scheduling managed by durable infrastructure |
| **Batch Triggers** | Up to 1,000 tasks in single request (fan-out) |

### Realtime Streams & AI Integration

| Feature | Details |
|---------|---------|
| **useRealtimeStream React Hook** | Subscribe to backend task updates via WebSocket |
| **Streaming Responses** | Long-running AI tasks stream LLM output to browser |
| **Human-in-the-Loop** | waitForToken pauses AI agent for human approval |
| **Retry Strategies** | Optimized for AI API rate limits |

### Platform Support

| Environment | Support | Notes |
|-------------|----------|-------|
| **Server / Backend** | Primary | Node.js, Bun execution environments |
| **Edge (Triggering)** | Compatible | Tasks run on Trigger.dev infrastructure, not edge |
| **Mobile / React Native** | Realtime Only | useRealtimeStream hooks for status/progress |
| **Web Client** | Not Supported | Trigger via backend API proxy |

### Framework Integration

| Framework | Status | Notes |
|-----------|--------|-------|
| **Next.js / Remix** | Deep Integration | Primary targets, trigger directory support |
| **NestJS** | Supported | Requires specific exception filter configuration |
| **Supabase** | Supported | Database Webhooks and Edge Functions triggers |
| **Vercel** | Integration | Marketplace integration, deployment sync |

## Pricing

### Consumption-Based Model

Billing occurs on active execution time—wait time is free.

| Tier | Cost | Included Usage | Concurrency |
|------|------|----------------|-------------|
| **Free** | $5/mo compute | $5/mo | 20 runs |
| **Hobby** | $10/mo | $10/mo | 50 runs |
| **Pro** | $50/mo | $50/mo | 200+ runs |
| **Enterprise** | Custom | 2M+ executions | Custom |

### Cost Analysis

| Scenario | Traditional (SQS + EC2) | Trigger.dev |
|----------|-------------------------|-------------|
| **Fixed Costs** | Paying 24/7 for workers | Pay per execution |
| **Operational** | High DevOps overhead | Zero maintenance |

## Durable Execution Comparison

### Trigger.dev vs. Temporal

| Aspect | Trigger.dev | Temporal |
|--------|-------------|----------|
| **Complexity** | Drop-in simplicity | Notoriously complex setup |
| **Philosophy** | Handles non-determinism naturally | Enforces strict determinism |
| **Use Case** | Product-focused, rapid iteration | Massive-scale mission-critical infrastructure |

### Trigger.dev vs. Inngest

| Aspect | Trigger.dev | Inngest |
|--------|-------------|---------|
| **Execution** | Hosts code on their infrastructure | Triggers code wherever hosted |
| **Complexity** | More powerful (no step timeout) | Easier adoption, but subject to host platform limits |

## Build System & Runtimes

| Runtime | Support | Build Extensions |
|---------|---------|------------------|
| **Node.js** | Default | Standard |
| **Bun** | First-class | Faster startup, performance benefits |
| **Python** | Supported via Extension | Python Extension installs pip packages |
| **FFmpeg** | Supported via Extension | Video/audio transcoding binaries |
| **Prisma** | Supported via Extension | Auto client generation |

## Best For

- **Generative AI Agents**: Workflows requiring long context, streaming responses, retry resilience
- **Full-Stack TypeScript Teams**: Next.js/Remix teams wanting zero infrastructure management
- **Complex Business Processes**: Billing systems, drip campaigns, logistics workflows
- **Heavy Compute**: Video processing, data transformation exceeding Lambda limits

## Avoid For

- **High-Frequency Data Streaming**: Ingesting millions of sensor readings/second (use Kafka/Redis)
- **Non-Node.js Workloads**: Go, Rust, Java backends not natively supported
- **Simple Fire-and-Forget**: Standard CRON is free and simpler for basic cleanup scripts

## Limitations

1. **Payload Limits**: 3MB limit on payloads (large data requires object storage)
2. **Ecosystem Lock**: Heavily optimized for TypeScript/JavaScript
3. **Self-Hosted Overhead**: Complex stack, no warm starts or auto-scaling

## Conclusion

Trigger.dev v4 represents the **maturation of the background jobs market**. By successfully productizing the complex computer science of durable execution into a developer-friendly TypeScript platform, it empowers engineers to build sophisticated, resilient applications without dedicated infrastructure teams.

**Verdict**: Choose Trigger.dev for AI agent orchestration, full-stack TypeScript teams, and applications requiring heavy compute or long-running workflows. The managed infrastructure model eliminates operational complexity while providing enterprise-grade reliability.

---

*Last Updated: January 20, 2026*
*Research Source: Trigger.dev Research Report*
