---
title: "Turso: SQLite-Based Serverless Database Platform (2026)"
description: "Turso brings SQLite to the cloud with libSQL, edge replication, and vector search. Learn about the database-per-user architecture, pricing, and Turso vs Neon vs PlanetScale."
category: databases
tags: [turso, libsql, sqlite serverless, edge database, database per user]
focus_keyword: "turso"
meta_title: "Turso: SQLite-Based Serverless Database Platform (2026)"
meta_description: "Turso brings SQLite to the cloud with libSQL, edge replication, and vector search. Learn about the database-per-user architecture, pricing, and Turso vs Neon vs PlanetScale."
last_updated: 2026-01-20
version: "libSQL v0.24.x"
status: stable
license: "Apache 2.0 (libSQL core), Proprietary (Turso Cloud)"
quick_answer: "Turso is a serverless database platform built on libSQL (an open-source SQLite fork). Enables 'database-per-user' architecture with unlimited databases, edge replication, and native vector search with DiskANN indexing."
research_date: 2026-01-20
related: ["sqlite", "neon", "planetscale", "upstash", "cloudflare-d1", "supabase", "drizzle-orm", "prisma"]
capabilities: ["libsql-engine", "edge-replication", "database-per-user", "vector-search-diskann", "embedded-replicas", "mvcc-concurrency", "concurrent-writes", "live-materialized-views"]
best_for: ["multi-tenant-saas", "edge-applications", "ai-agent-memory", "offline-first-apps", "database-per-user-architecture"]
avoid_for: ["complex-triggers-requiring-determinism", "vacuum-dependent-workloads", "applications-needing-right-join"]
pricing: "Developer: $5/month (500 active DBs, 2.5B rows read, 9GB storage). Scaler: Custom. Free: 500M rows read/month, 1GB storage, 3 active databases."
search_intent: informational
---

# Turso: SQLite-Based Serverless Database Platform (2026)

## Quick Answer

**Turso** commercializes libSQL, an open-source fork of SQLite designed for the cloud. Unlike traditional databases that require connection pooling, Turso uses HTTP for access—making it ideal for serverless and edge environments. Its "database-per-user" architecture allows unlimited databases with costs based only on active usage, enabling multi-tenant SaaS platforms that were previously economically infeasible.

## What is Turso?

Turso was founded on the premise that SQLite—the world's most deployed database—needed to evolve faster than its "open source, closed contribution" development model allowed. libSQL is a hard fork that maintains compatibility with the SQLite file format while adding cloud-native features: networking, encryption, vector search, and concurrent writes.

### The libSQL Engine

| Feature | SQLite | libSQL |
|---------|--------|--------|
| **Contribution Model** | Closed (core team only) | Open (community) |
| **Networking** | None | HTTP/WebSocket server mode |
| **Vector Search** | None | Native with DiskANN |
| **Concurrency** | Single-writer | MVCC + experimental concurrent writes |
| **Language** | C | Rust rewrite in progress |

### Core Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Primary   │────▶│   Edge       │────▶│  Embedded   │
│  (Source)   │ WAL │  Replicas    │     │  Replica    │
└─────────────┘     └──────────────┘     └─────────────┘
      ▲                                            │
      │                            HTTP/fetch       │
      └────────────────────────────────────────────┘
                         Application
```

## Key Features

### Database-Per-User Architecture

Turso inverts traditional multi-tenancy:

| Traditional (Postgres) | Turso |
|------------------------|-------|
| Single DB, tenant_id column | One DB per tenant |
| Application enforces isolation | Physical data isolation |
| Delete = UPDATE WHERE id | Delete = DROP DATABASE |

**Economic Impact**: With Database Freedom Day (mid-2025), Turso allows unlimited databases. Costs based on active databases only—enabling perfect isolation at negligible cost.

### Primary-Replica Model

- **Primary**: Single source of truth, handles all writes
- **Edge Replicas**: Distributed geographically, serve reads
- **WAL Replication**: Streams physical pages (not SQL statements)
- **Embedded Replicas**: Full local copy in application process

### Vector Search with DiskANN

Turso integrates vector search directly into the SQLite engine:

| Quantization | Compression | Use Case |
|--------------|-------------|----------|
| **FLOAT32** | None (4 bytes/dim) | High accuracy |
| **FLOAT16/BF16** | 2x smaller | Good balance |
| **FLOAT1BIT** | 32x smaller | Massive datasets |

**DiskANN Indexing**:
- Optimized for SSD storage (not RAM-bound like HNSW)
- Supports datasets larger than available memory
- Hybrid search with SQL filters

```sql
SELECT title, vector_distance_cos(embedding, '[0.1, 0.5, ...]') as distance
FROM movies
WHERE year > 2020 AND genre = 'Sci-Fi'
ORDER BY distance ASC
LIMIT 5;
```

### Concurrent Writes (Experimental)

SQLite traditionally allows only one writer. Turso adds:

- **MVCC**: Row-level versioning for non-blocking reads
- **BEGIN CONCURRENT**: Optimistic multi-writer transactions
- **Conflict Detection**: Check only at commit time

### Live Materialized Views (Experimental)

Based on DBSP (Incremental View Maintenance):

- Views update incrementally as data flows in
- No expensive full recomputations
- Real-time aggregation capabilities

## Turso vs Competitors

### Turso vs Neon

| Feature | Turso (libSQL) | Neon (Postgres) |
|---------|----------------|-----------------|
| **Engine** | SQLite fork | PostgreSQL |
| **Scaling** | Multi-tenant multi-database | Single DB with branching |
| **Vector Search** | DiskANN (disk-optimized) | pgvector (HNSW) |
| **Isolation** | Physical (per DB) | Logical (RLS/policies) |

### Turso vs PlanetScale

| Feature | Turso | PlanetScale |
|---------|-------|-------------|
| **Engine** | libSQL (SQLite) | Vitess (MySQL) |
| **Schema Changes** | Manual migrations | Non-blocking ghost tables |
| **Sharding** | Not applicable | Built-in horizontal sharding |
| **Complex Queries** | Limited (SQLite) | Full MySQL capability |

### Turso vs Cloudflare D1

| Feature | Turso | Cloudflare D1 |
|---------|-------|---------------|
| **Access** | Global (any platform) | Workers only |
| **Vector Search** | Native | Via Vectorize (separate) |
| **Replicas** | 30+ regions | Built-in to Workers |
| **Pricing** | Database-centric | Read/write operations |

## SDK Support

| Language | Package | Features |
|----------|---------|----------|
| **TypeScript/JS** | `@libsql/client` | HTTP, WebSocket, Local modes |
| **Rust** | `libsql` | Core crate, highest performance |
| **Go** | `libsql-client-go` | Backend services |
| **Python** | `libsql-client` | AI/ML integration |
| **Swift (iOS)** | `libsql-swift` | Native mobile support |
| **Kotlin (Android)** | `libsql-android` | Android-optimized |

### ORM Integration

| ORM | Integration | Notes |
|-----|-------------|-------|
| **Drizzle** | Native | First-class libSQL driver |
| **Prisma** | Via `@prisma/adapter-libsql` | Requires adapter |
| **Laravel** | Official support | Eloquent ORM integration |

### Serverless Driver

The HTTP-based driver works in restricted environments:

```typescript
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Fetch-based, works in Cloudflare Workers
const result = await client.execute('SELECT * FROM users');
```

## Pricing Structure

### Database Freedom Day (Mid-2025)

| Component | Developer Plan | Limits |
|-----------|----------------|--------|
| **Active Databases** | 500 included | Unlimited total databases |
| **Rows Read** | 2.5 billion/month | ~83 million/day |
| **Rows Written** | 25 million/month | ~833K/day |
| **Storage** | 9 GB total | $0.20/GB overage |
| **Cost** | $5/month | Active DBs only |

### Free Tier

- 3 active databases
- 1 GB storage
- 500 million rows read/month
- 5 million rows write/month

### Scalable Plans

- **Scaler**: For larger SaaS platforms
- **Pro**: Enterprise features
- **Overages**: $0.20 per extra active database

## Use Cases: Best For

- **Multi-Tenant SaaS**: Database-per-user isolation
- **AI Agents**: Instant provisioning, isolated memory
- **Edge Applications**: Global replicas, HTTP access
- **Offline-First Mobile**: Local SQLite + sync
- **High-Cardinality Multi-Tenancy**: Millions of small databases

## Use Cases: Avoid For

- **Complex Triggers**: Limited support in replicated configs
- **VACUUM-Dependent Workloads**: Handled by platform service layer
- **RIGHT JOIN Requirements**: Not supported (SQLite limitation)
- **Heavy Analytics**: Use dedicated OLAP warehouse

## Operational Limits

| Limit | Value |
|-------|-------|
| **Max Dimensions** | Unlimited (practical: depends on storage) |
| **Concurrent Writers** | Experimental (BEGIN CONCURRENT) |
| **Extensions** | Built-in only (Vector, Crypto, Fuzzy) |
| **Custom Extensions** | Not supported (cloud) |

## Development Workflow

```bash
# Install CLI
brew install tursodatabase/tap/turso

# Login
turso auth login

# Create database
turso db create my-app

# Create local replica
turso db replicate my-app my-app-local --location local

# Shell access
turso db shell my-app
```

## FAQ

### Is Turso free?

Turso offers a free tier with 3 active databases, 1GB storage, and 500M rows read/month. The Developer plan is $5/month for 500 active databases and 9GB storage.

### What is the difference between Turso and SQLite?

Turso is built on libSQL, an open-source SQLite fork. Key differences: HTTP access, edge replication, vector search, concurrent writes, and cloud-native features. Maintains SQLite file format compatibility.

### Can I use Turso with Prisma?

Yes, via the `@prisma/adapter-libsql` adapter. Prisma routes queries through the lightweight libSQL client. Schema migrations may require the Turso CLI.

### Does Turso support vector search?

Yes, Turso has native vector search using the DiskANN algorithm. Supports FLOAT32, FLOAT16, BFLOAT16, and aggressive FLOAT1BIT quantization (32x compression).

### What is Database Freedom Day?

Announced in mid-2025, Database Freedom Day changed Turso pricing to unlimited databases with costs based only on active usage. This enables database-per-user architectures at scale.

---

**Related Technologies:** [SQLite](/sqlite), [Neon](/neon), [PlanetScale](/planetscale), [Cloudflare D1](/cloudflare-d1), [Upstash](/upstash), [Drizzle ORM](/drizzle-orm)
