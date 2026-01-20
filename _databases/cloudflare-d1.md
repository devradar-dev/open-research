---
title: "Cloudflare D1: Edge SQL Database for Serverless Apps (2026)"
description: "Cloudflare D1 is a serverless SQLite database built for edge computing. Learn about pricing, limits, vector search, and how to use D1 with Cloudflare Workers."
category: databases
tags: [cloudflare d1, cloudflare d1 database, sqlite edge database, serverless sql database, cloudflare workers database]
focus_keyword: "cloudflare d1"
meta_title: "Cloudflare D1: Edge SQL Database for Serverless Apps (2026)"
meta_description: "Cloudflare D1 is a serverless SQLite database built for edge computing. Learn about pricing, limits, vector search, and how to use D1 with Cloudflare Workers."
last_updated: 2026-01-20
version: "1.0"
status: stable
license: "Cloudflare ToS"
quick_answer: "Cloudflare D1 is a serverless SQLite database designed for edge computing. It offers read replication, Time Travel recovery, and vector search integration via Cloudflare Vectorize."
research_date: 2026-01-20
related: ["cloudflare-workers", "cloudflare-vectorize", "drizzle-orm", "wrangler", "sqlite", "neon", "planetscale", "turso"]
capabilities: ["sqlite-based", "serverless-edge-compute", "auto-scaling", "batch-transactions", "time-travel-pitr", "vectorize-integration", "read-replication", "jurisdiction-controls", "free-tier"]
best_for: ["edge-first-applications", "serverless-architectures", "multi-tenant-saas", "read-heavy-workloads", "global-applications"]
avoid_for: ["write-heavy-workloads", "complex-transactional-logic", "analytics-queries", "large-single-database-over-10gb"]
pricing: "Free tier with 5GB storage, 5M rows/day read, 100K rows/day write. Paid: $0.001 per million rows read, $1.00 per million rows written, $0.75 per GB-month storage."
search_intent: informational
---

# Cloudflare D1: Edge SQL Database for Serverless Apps

## Quick Answer

**Cloudflare D1** is a serverless SQLite database built specifically for edge computing. It provides a relational database primitive native to the Cloudflare Workers platform with automatic scaling, read replication, and Time Travel recovery. D1 is ideal for read-heavy, globally distributed workloads but has strict write throughput limits due to its single-threaded architecture.

## What is Cloudflare D1?

Cloudflare D1 represents a fundamental shift in database architecture for the distributed web. Unlike traditional databases that run as heavy, continuously running processes, D1 utilizes SQLite's lightweight embedded library, spinning up in milliseconds alongside the application code in Cloudflare Workers.

### Core Architecture

**SQLite-on-Edge Paradigm:**
- D1 uses the SQLite query engine, known for its reliability and minimal overhead
- Separates compute (query engine in Workers) from storage (persistent state in Durable Objects)
- Routes queries dynamically across the global network to minimize latency

**Durable Objects Foundation:**
- Every D1 database has exactly one active Durable Object instance handling writes
- Single-threaded execution ensures serialized writes without distributed consensus complexity
- Queue management handles concurrent write requests, returning overload errors when capacity is exceeded

**Micro-Database Scaling Model:**
- Supports up to 50,000 databases per account on paid plans
- Encourages database-per-tenant architecture for perfect isolation
- 10 GB per-database storage limit enforced by design

## Key Features

### Serverless & Auto-Scaling

- **Scale-to-zero** economics with no costs when queries aren't running
- **Automatic read replication** with intelligent request routing
- **Global distribution** across Cloudflare's edge network

### Data Management

| Feature | Description |
|---------|-------------|
| Time Travel | Point-in-time recovery within retention window (7 days free, 30 days paid) |
| Batch Transactions | Atomic multi-statement execution via `db.batch()` API |
| Import/Export | SQL file imports and R2 bucket exports |
| Jurisdiction Controls | Data residency compliance (EU, FedRAMP regions available) |

### Vector Search Integration

D1 integrates with **Cloudflare Vectorize** for AI workloads:

- **Hybrid RAG Architecture:** D1 stores ground truth content, Vectorize stores embeddings
- **Dimensions:** Up to 1536 dimensions for OpenAI compatibility
- **Distance Metrics:** Cosine Similarity, Euclidean Distance, Dot Product
- **Metadata Filtering:** Up to 10KiB metadata per vector for hybrid search

## Cloudflare D1 vs Competitors

### D1 vs SQLite

| Feature | Cloudflare D1 | SQLite |
|---------|---------------|--------|
| Deployment | Serverless edge | Local file system |
| Scaling | Horizontal (50K DBs) | Vertical only |
| Replication | Automatic read replicas | Manual configuration |
| Vector Search | Via Vectorize | Requires extensions |

### D1 vs Neon PostgreSQL

| Feature | Cloudflare D1 | Neon |
|---------|---------------|------|
| Database Engine | SQLite | PostgreSQL |
| Transaction Model | Batch only | Full interactive transactions |
| Storage Limit | 10 GB per DB | Unlimited (bottomless) |
| Cold Start | Minimal | 300ms - 2s |

### D1 vs PlanetScale

| Feature | Cloudflare D1 | PlanetScale |
|---------|---------------|------------|
| Base Database | SQLite | MySQL (Vitess) |
| Write Scaling | Single-threaded | Horizontal sharding |
| Schema Changes | Manual SQL | Non-blocking online DDL |
| Branching | Not available | Database branching |

## Use Cases: Best For

- **Multi-tenant SaaS:** Database-per-tenant architecture with perfect isolation
- **Global content platforms:** Read-heavy workloads with distributed users
- **Edge-first applications:** Low-latency data access at the edge
- **Serverless APIs:** Scale-to-zero economics for variable traffic
- **AI-powered apps:** RAG architectures with Vectorize integration

## Use Cases: Avoid For

- **Write-heavy workloads:** Single-threaded writes limit throughput
- **Complex transactions:** No interactive transactions or BEGIN/COMMIT
- **Large single databases:** 10 GB hard limit per database
- **Analytics queries:** Full table scans are expensive and slow
- **Legacy ORMs:** TypeORM and Sequelize are incompatible

## Pricing Structure (2026)

| Metric | Free Tier | Paid Tier |
|--------|-----------|-----------|
| Storage | 5 GB total | $0.75 per GB-month (first 5 GB free) |
| Rows Read | 5 million / day | $0.001 per million (first 25B free) |
| Rows Written | 100,000 / day | $1.00 per million (first 50M free) |
| Restore | 7 days | 30 days retention |

### Cost Optimization Tips

1. **Index aggressively** to reduce rows read per query
2. **Use database-per-tenant** to avoid storage limits
3. **Batch writes** to minimize row write costs
4. **Enable scale-to-zero** for development environments

## Development Workflow

### Quick Start

```bash
# Create a D1 database
wrangler d1 create my-database

# Run migrations
wrangler d1 execute my-database --file=./schema.sql

# Query in Workers
const env = env || {};
const { prepare } = await env.DB.prepare("SELECT * FROM users WHERE id = ?");
const result = await prepare.bind(userId).first();
```

### Drizzle ORM Integration

Drizzle ORM is the recommended choice for D1:

```typescript
import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB);
    const users = await db.select().from(tables.users);
    return Response.json(users);
  }
}
```

## Operational Limits

| Limit | Value |
|-------|-------|
| Max storage per database | 10 GB |
| Max databases per account | 50,000 (paid) |
| Simultaneous connections per Worker | 6 |
| Max SQL statement length | 100 KB |
| Max bound parameters per query | 100 |
| Restore frequency | 10 per 10 minutes |

## FAQ

### Is Cloudflare D1 free?

D1 has a generous free tier with 5 GB storage, 5 million rows read per day, and 100,000 rows written per day. Paid usage begins when these limits are exceeded.

### Can I use D1 with mobile apps?

Mobile apps should not connect directly to D1. Use a Backend-for-Frontend (BFF) pattern: Mobile App -> HTTPS Request -> Cloudflare Worker -> D1 Binding.

### Does D1 support vector search?

D1 itself is relational, but integrates with Cloudflare Vectorize for vector similarity search and RAG applications.

### What happens when I hit the write limit?

When write throughput exceeds the Durable Object's capacity, D1 returns an "overloaded" error. Implement backpressure handling in your client application.

### Can I use Prisma with D1?

Prisma offers a driver adapter (@prisma/adapter-d1) currently in Preview. It uses a Wasm-based engine compatible with Workers, but has higher runtime overhead than Drizzle.

### How does D1 handle transactions?

D1 does not support interactive transactions (BEGIN/COMMIT). Use the `db.batch()` method to execute multiple statements as a single atomic unit.

---

**Related Technologies:** [Cloudflare Workers](/cloudflare-workers), [Drizzle ORM](/drizzle-orm), [Turso](/turso), [Neon](/neon), [PlanetScale](/planetscale)
