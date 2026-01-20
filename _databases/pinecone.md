---
title: "Neon: Serverless PostgreSQL with Branching and Vector Search"
description: "Neon is a serverless PostgreSQL platform with instant branching, scale-to-zero, and built-in vector search. Perfect for Vercel, Next.js, and modern development workflows."
category: databases
tags: [neon database, serverless postgres, neon postgres, edge postgres, postgres branching]
focus_keyword: "neon database"
meta_title: "Neon: Serverless PostgreSQL with Branching and Vector Search"
meta_description: "Neon is a serverless PostgreSQL platform with instant branching, scale-to-zero, and built-in vector search. Perfect for Vercel, Next.js, and modern development workflows."
last_updated: 2026-01-20
version: "PostgreSQL 16/17 compatible"
status: stable
license: "Apache 2.0 (Neon Serverless), PostgreSQL License"
quick_answer: "Neon is a serverless PostgreSQL platform with instant branching, scale-to-zero autoscaling, and built-in vector search via pgvector. Designed for Vercel, Next.js, and modern development workflows."
research_date: 2026-01-20
related: ["postgresql", "supabase", "aws-aurora-serverless", "planetscale", "vercel", "drizzle-orm", "prisma", "pgvector", "turso", "cloudflare-workers"]
capabilities: ["serverless-postgresql", "compute-storage-separation", "instant-branching", "time-travel", "scale-to-zero-autoscaling", "pgvector-support", "http-websocket-drivers", "neon-auth", "read-replicas", "bottomless-storage", "logical-replication"]
best_for: ["serverless-applications", "development-environments", "multi-tenant-saas", "edge-applications", "rapid-iteration-teams"]
avoid_for: ["write-heavy-analytics", "always-on-performance-critical", "applications-unable-to-tolerate-cold-starts", "complex-mysql-workload-migrations"]
pricing: "Consumption-based. Compute: ~$0.106 per CU-hour. Storage: $0.35 per GB-month. Free tier: 0.5GB storage, 100 CU-hours/month."
search_intent: informational
---

# Neon: Serverless PostgreSQL with Branching and Vector Search

## Quick Answer

**Neon** is a serverless PostgreSQL platform that fundamentally re-architecture's the database by separating compute from storage. It offers instant database branching, Time Travel recovery, scale-to-zero autoscaling, and built-in vector search via pgvector—all designed for modern development workflows with Vercel and Next.js.

## What is Neon?

Neon represents the "Postgres for the Cloud" era—treating the database not as a monolithic server but as an elastic utility that scales with demand. By decoupling storage from compute, Neon enables features previously impossible in traditional PostgreSQL deployments.

### The Split Architecture

Neon's architecture consists of three tiers:

**Tier 1: Safekeepers (Consensus)**
- Multi-Paxos consensus algorithm
- Immediate WAL ingestion for durability
- Quorum-based commit acknowledgment

**Tier 2: Pageservers (Compute)**
- Processes WAL into data pages
- Reconstructs pages on-demand for reads
- Ephemeral and replaceable

**Tier 3: Object Storage (S3)**
- Long-term retention for all data
- Bottomless storage with automatic tiering
- Pipelined uploads for 2x throughput improvement

## Key Features

### Instant Database Branching

Neon treats databases like code—enabling instant branching:

| Branch Type | Description | Use Case |
|------------|-------------|----------|
| **Schema-only** | Copy structure only | Clean test environments |
| **Data + Schema** | Full snapshot with data | Production debugging, staging |

**Time Travel** allows querying database state at any point within the retention window:

```sql
SELECT * FROM users AS OF '2023-01-01';
```

### Serverless Elasticity

**Autoscaling:**
- Compute measured in Compute Units (1 CU ≈ 1 vCPU + 4GB RAM)
- Dynamic scaling between min/max bounds (e.g., 0.25 to 16 CU)
- Automatic adjustment based on CPU/memory pressure

**Scale-to-Zero:**
- Suspends after 5 minutes of inactivity (default)
- Wake-up latency: 300ms - 2s
- **Recommendation:** Disable for production primary branches

### Vector Search (pgvector)

Neon includes native pgvector support for AI applications:

| Index Type | Use Case | Characteristics |
|------------|----------|------------------|
| **HNSW** | Production search | High recall, fast queries, more memory |
| **IVFFlat** | Faster builds | Lower recall, less memory, requires pre-populated data |

**Dimension Support:**
- Standard vectors: Up to 2,000 dimensions
- Half-precision (halfvec): Up to 4,000 dimensions
- Binary vectors: Up to 64,000 dimensions

## Neon vs Competitors

### Neon vs Supabase

| Feature | Neon | Supabase |
|---------|------|----------|
| **Architecture** | Storage-compute separation | Traditional Postgres instances |
| **Branching** | Instant metadata operation | Manual database clones |
| **Scale-to-Zero** | Native (5 min timeout) | Pause after 7 days inactivity |
| **Auth** | Neon Auth (Beta) | Supabase Auth (mature) |
| **Real-time** | Via logical replication | Native WebSocket system |

### Neon vs AWS Aurora Serverless v2

| Feature | Neon | Aurora Serverless v2 |
|---------|------|---------------------|
| **Scale-to-Zero** | Yes (true zero cost) | No (minimum ~$40/month) |
| **Branching** | Instant (metadata) | Clones take time/space |
| **Cold Start** | 300ms - 2s | Instant (kept warm) |
| **Vector Search** | pgvector included | Separate via Aurora PostgreSQL |

### Neon vs PlanetScale

| Feature | Neon (Postgres) | PlanetScale (MySQL) |
|---------|----------------|-------------------|
| **Database Engine** | PostgreSQL 16/17 | MySQL (Vitess) |
| **Transactions** | Full ACID support | Limited (shard-scoped FK) |
| **Schema Changes** | Manual SQL migrations | Non-blocking online DDL |
| **Vector Search** | pgvector included | SPANN algorithm (MySQL-specific) |

## Edge & Serverless Integration

### Serverless Driver

Neon's `@neondatabase/serverless` driver solves the connection problem for serverless functions:

```typescript
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// HTTP mode for one-shot queries
const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

**Benefits:**
- No TCP handshake overhead
- Compatible with Vercel Edge, Cloudflare Workers
- WebSocket mode for session-based interactions

### Framework Integrations

**Next.js:**
```typescript
import { neon } from '@neondatabase/serverless';

// Server Actions compatible
const db = neon(process.env.DATABASE_URL);
```

**Drizzle ORM:**
```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const client = neon(process.env.DATABASE_URL);
export const db = drizzle(client);
```

### Cloudflare Workers

Neon integrates with Cloudflare via WebSocket mode:

```typescript
import { neon } from '@neondatabase/serverless/ws';

const sql = neon(process.env.DATABASE_URL_ws, {
  onconnection: () => console.log('Connected')
});
```

## Neon Auth (Beta)

Integrated authentication using Better Auth:

- **Auth Schema:** Dedicated `neon_auth` schema
- **Branching Support:** Auth data branches with databases
- **RLS Integration:** Leverages PostgreSQL Row Level Security

## Pricing Structure

### Consumption Model

| Component | Cost | Notes |
|-----------|------|-------|
| **Compute** | ~$0.106 per CU-hour | Charged only when active |
| **Storage** | $0.35 per GB-month | Includes branching deltas |
| **Restore** | $0.20 per GB-month | For Time Travel retention |

### Free Tier

- **0.5 GB** storage
- **100 CU-hours** per month (doubled from 50 in Oct 2025)
- **100 Projects** included

**Important:** Free tier cannot run 24/7. At 1 CU, this lasts ~4 days. Use scale-to-zero for development.

### Cost Optimization

**Development/Staging (66% savings):**
- Traditional RDS: Pays for 24 hours/day
- Neon: Pays only for active hours (e.g., 8 hours/day)

**Production:**
- Disable scale-to-zero to avoid cold start latency
- Use minimum 0.25 or 1 CU baseline

## Operational Limits

| Limit | Value |
|-------|-------|
| **Max autoscaling CU** | 16 (dynamic) / 56 (fixed) |
| **Cold start latency** | 300ms - 2s |
| **Write throughput** | >700 MiB/s (optimized) |
| **Replication slot** | Cannot scale-to-zero when enabled |

## Use Cases: Best For

- **Development Environments:** Scale-to-zero eliminates dev costs
- **Multi-Tenant SaaS:** Database-per-tenant without isolation concerns
- **Global Applications:** Read replicas close to users
- **CI/CD Pipelines:** Branch per PR for automated testing
- **Edge Applications:** HTTP/WebSocket drivers for serverless

## Use Cases: Avoid For

- **Write-Heavy Analytics:** Use dedicated OLAP warehouse instead
- **Performance-Critical Production:** Cold starts unacceptable without Always-On
- **MySQL Workloads:** Different SQL dialect, requires migration
- **Free 24/7 Services:** 100 CU-hours insufficient for always-on

## Development Workflow

### Quick Start

```bash
# Install Neon CLI
npm i -g @neondatabase/neon

# Create project
neon projects create my-app

# Create database
neon databases create my-app --project-id my-app-id

# Connect
neon connect --project-id my-app-id
```

### Drizzle Integration

```typescript
import { neon, neonConfig, neonSql } from '@neondatabase/drizzle';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
```

### Vector Index Creation

```sql
-- Enable pgvector
CREATE EXTENSION vector;

-- Create HNSW index
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)
);

CREATE INDEX documents_embedding_idx
ON documents
USING hnsw (embedding vector_cosine_ops);
```

## FAQ

### Is Neon free?

Neon offers a free tier with 0.5GB storage and 100 CU-hours per month. This is designed for development with scale-to-zero enabled, not 24/7 production.

### How does Neon scale to zero?

After 5 minutes of inactivity (configurable), Neon suspends compute. The next request triggers wake-up (300ms-2s latency). Storage costs continue regardless.

### Can I use Neon with Vercel?

Yes, Neon has first-class Vercel integration. The Neon serverless driver is optimized for Vercel Edge Functions and Vercel AI SDK.

### Does Neon support pgvector?

Yes, Neon includes pgvector support. Create HNSW or IVFFlat indexes for vector similarity search with 2,000+ dimensions support.

### What is Time Travel in Neon?

Time Travel allows querying database state as it existed at any point within the retention window (7 days free, 30 days paid). The Pageserver reconstructs page states from WAL history.

---

**Related Technologies:** [PostgreSQL](/postgresql), [Supabase](/supabase), [PlanetScale](/planetscale), [Drizzle ORM](/drizzle-orm), [Prisma](/prisma), [Turso](/turso), [Cloudflare D1](/cloudflare-d1)
