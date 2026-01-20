---
title: "PlanetScale: Serverless Database Platform Built on Vitess"
description: "PlanetScale offers serverless MySQL and PostgreSQL with horizontal sharding, non-blocking schema changes, and vector search. Learn pricing, features, and how PlanetScale compares."
category: databases
tags: [planetscale, serverless mysql, vitess database, mysql sharding, planetscale postgres]
focus_keyword: "planetscale"
meta_title: "PlanetScale: Serverless Database Platform Built on Vitess"
meta_description: "PlanetScale offers serverless MySQL and PostgreSQL with horizontal sharding, non-blocking schema changes, and vector search. Learn pricing, features, and how PlanetScale compares."
last_updated: 2026-01-20
version: "Vitess 23, MySQL 8.4"
status: stable
license: "PlanetScale Terms (Platform), Apache 2.0 (Drivers)"
quick_answer: "PlanetScale is a serverless database platform built on Vitess (MySQL) and Raft (Postgres). Offers horizontal sharding, non-blocking schema changes via 'ghost tables', and SPANN vector indexing."
research_date: 2026-01-20
related: ["mysql", "postgresql", "vitess", "neon", "turso", "prisma", "drizzle", "aws-aurora", "google-cloud-sql", "cockroachdb", "neki-postgres-sharding"]
capabilities: ["vitess-powered-sharding", "non-blocking-schema-changes", "database-branching", "spann-vector-algorithm", "connection-pooling", "foreign-key-support", "planet-scale-metal", "read-only-regions", "developer-experience-cli", "database-insights"]
best_for: ["high-scale-mysql-applications", "multi-tenant-platforms", "teams-needing-git-workflow", "applications-requiring-zero-downtime-schema-changes"]
avoid_for: ["applications-needing-complex-sql-analytic-queries", "projects-without-migration-budget", "simple-databases"]
pricing: "Scaler Pro (ARM64): $30/month base (PS-10). Entry tier: $5/month (PS-5, single-node). Metal: Custom pricing. Storage: $1.50/GB over 10GB. Read-only regions: 40% of production branch cost."
search_intent: informational
---

# PlanetScale: Serverless Database Platform Built on Vitess

## Quick Answer

**PlanetScale** is a serverless database platform built on Vitess for MySQL and Raft for PostgreSQL. It offers horizontal sharding, non-blocking schema changes via ghost tables, and the SPANN vector indexing algorithm. The database branching workflow enables Git-like collaboration for schema evolution.

## What is PlanetScale?

PlanetScale commercializes Vitess, the database scaling technology developed at YouTube to handle massive scale. By abstracting Vitess complexity behind a developer-friendly interface, PlanetScale brings hyperscale database capabilities to every application.

### The Vitess Architecture

**VTGate: The Intelligent Proxy**
- Stateless proxy handling connection pooling
- Routes queries to appropriate shards automatically
- Protects database from connection storms

**VTTable: The Sidecar Guardian**
- Runs alongside each MySQL instance
- Parses and validates queries before execution
- Protects against toxic queries

**VReplication: The Data Movement Engine**
- Enables zero-downtime resharding
- Streams WAL for Change Data Capture
- Powers online schema migrations

### Key Innovations

### Non-Blocking Schema Changes

PlanetScale's "Ghost Table" mechanism enables zero-downtime DDL:

1. **Ghost Table Creation:** Create shadow table with new schema
2. **Backfill & Sync:** Copy data while replicating ongoing changes
3. **Atomic Cutover:** Swap tables with instant reversion capability

### Database Branching

```bash
# Create branch for feature development
pscale branch create my-db feature-login

# Apply schema changes
pscale db execute SQL_FILE schema.sql --branch feature-login

# Open deploy request
pscale deploy-request create my-db feature-login
```

## PlanetScale for MySQL

### Sharding Model

**Keyspaces & VSchema:**
- **Unsharded:** Single database (standard)
- **Sharded:** Distributed via VSchema sharding keys
- **Transparent:** Application queries remain unchanged

**Foreign Key Support:**
- **Unsharded DBs:** Full FK support (since early 2024)
- **Sharded DBs:** FK allowed only if shard-scoped (both tables on same shard)

### SPANN Vector Algorithm

PlanetScale uses SPANN (Space-Partitioned ANN) for MySQL vector search:

| Feature | Description |
|--------|-------------|
| **Architecture** | Centroids in memory, vectors on disk (NVMe) |
| **Memory Efficiency** | ~15% of raw data size |
| **Quantization** | bfloat16 (default), 1-bit binary, Product Quantization |
| **Search Type** | Hybrid: semantic + SQL filters combined |

```sql
SELECT product_id, name, price
FROM products
WHERE category = 'electronics' AND price < 500
ORDER BY DISTANCE(embedding, TO_VECTOR('[0.1, 0.5, ...]'))
LIMIT 10;
```

## PlanetScale for PostgreSQL

### Raft-Based Architecture

Launched in 2025, PlanetScale Postgres uses:

- **Consensus:** Raft algorithm (similar to Patroni)
- **Availability:** 1 Primary + 2 Replicas across 3 AZs
- **Performance:** Local NVMe storage for low latency
- **Extensions:** PostGIS, pgvector, pg_duckdb, MotherDuck, UUIDv7

### Neki: Future Sharding

PlanetScale is developing **Neki**, a sharding engine for Postgres:
- Purpose-built for horizontal Postgres scaling
- Similar VTess-like routing principles
- Addresses the main Postgres scalability gap

### Extension Support

| Extension | Purpose |
|-----------|---------|
| **PostGIS** | Geospatial data and queries |
| **pgvector** | Vector similarity search |
| **pg_duckdb** | OLAP analytics within Postgres |
| **MotherDuck** | Cloud data warehouse connection |

## PlanetScale vs Competitors

### PlanetScale vs Neon

| Feature | PlanetScale | Neon |
|---------|-----------|------|
| **Database Engine** | MySQL (Vitess) / Postgres (Raft) | PostgreSQL (Split architecture) |
| **Scaling Model** | Horizontal sharding | Vertical scaling + branching |
| **Schema Changes** | Non-blocking online DDL | Manual SQL migrations |
| **Branching** | Git-style deploy requests | Instant metadata branching |

### PlanetScale vs AWS Aurora

| Feature | PlanetScale | AWS Aurora |
|---------|-----------|-------------|
| **Underlying Tech** | Vitess (open source) | Proprietary storage engine |
| **Pricing** | Per-provisioned tier | Per-ACU consumption |
| **Vector Search** | SPANN (MySQL native) | Via Aurora PostgreSQL |
| **Sharding** | Built-in via Vitess | Requires manual partitioning |

### PlanetScale vs CockroachDB

| Feature | PlanetScale | CockroachDB |
|---------|-----------|-------------|
| **SQL Compatibility** | MySQL wire protocol | PostgreSQL wire protocol |
| **Sharding** | Vitess VSchema | Automatic range-based |
| **Consistency** | Configurable per query | Serializable by default |
| **Vector Index** | SPANN (disk-optimized) | C-SPANN (distributed) |

## Developer Experience

### Git-for-Data Workflow

PlanetScale revolutionizes database schema management:

```bash
# 1. Create branch
pscale branch create my-db feature-branch

# 2. Connect to branch in application
DATABASE_URL="pscale-branch-feature-branch..."

# 3. Make schema changes
pscale db execute SCHEMA.sql --branch feature-branch

# 4. Open deploy request
pscale deploy-request create my-db feature-branch

# 5. Review and merge
pscale deploy-request review my-db deploy-123
```

### Insights Dashboard

AI-powered database observability:

- **LLM Query Summaries:** Natural language explanation of slow queries
- **Index Recommendations:** Automatic suggestions for missing indexes
- **Performance Metrics:** p95/p99 latency, rows read/written

## Pricing Structure (2026)

### Scaler Pro (ARM64)

| Configuration | Monthly Cost | Specifications |
|----------------|-------------|----------------|
| **PS-5** | $5 | Single Node (Non-HA) |
| **PS-10 ARM** | $30 | Cluster (3 nodes, HA) |
| **PS-10 Intel** | $39 | Cluster (3 nodes, HA) |

### Additional Costs

- **Storage:** $1.50/GB over 10GB included
- **Read-Only Regions:** 40% of production branch cost
- **Developer Plan:** 1,440 branch hours/month included

### Entry Tier

- **$5/month** for PS-5 single-node
- 512MB RAM, 1/16 vCPU
- No HA (suitable for dev/test only)

## Operational Limits

| Limit | Value |
|-------|-------|
| **Max rows returned** | 100,000 (default) |
| **Transaction timeout** | 20 seconds |
| **OLAP mode** | Available via `SET workload=OLAP` |
| **Oplog access** | Restricted on Flex tiers |

## Platform Support

### ORMs & Drivers

**Drizzle ORM:**
```typescript
import { drizzle } from 'drizzle-orm/planetscale';
// First-class PlanetScale driver support
```

**Prisma:**
```prisma
datasource db {
  provider = "mysql"
  url      = env("PLANETSCALE_URL")
  replicas = ["aws_us_east_1"]
}
```

### Serverless & Edge

**Serverless Driver:**
```typescript
import { connect } from '@planetscale/database';
import { fetch } from 'planetcale-nodejs/connect';

const conn = connect({ connectionUrl });
// Fetch-based for serverless environments
```

## Use Cases: Best For

- **High-Scale MySQL Applications:** Horizontal sharding via Vitess
- **Multi-Tenant Platforms:** Database-per-tenant with isolation
- **Zero-Downtime Migrations:** Non-blocking schema changes
- **Teams Using Git:** Developers comfortable with branch/PR workflows
- **Vector Search + SQL:** Hybrid queries on MySQL data

## Use Cases: Avoid For

- **Simple Single-Database Apps:** Overkill for basic sites
- **Projects Without Migration Budget:** Manual migration required
- **Heavy Analytics Workloads:** Use dedicated OLAP warehouse
- **Applications Needing Complex SQL Analytic Queries**

## FAQ

### Is PlanetScale free?

PlanetScale offers a $5/month entry tier (PS-5, single-node). The free tier previously available has been replaced by this low-cost option.

### Does PlanetScale support PostgreSQL?

Yes, PlanetScale launched PlanetScale for Postgres in 2025. It uses Raft-based consensus and local NVMe storage for performance.

### What is Vitess?

Vitess is the database clustering technology developed by YouTube. PlanetScale commercializes Vitess to provide horizontal sharding for MySQL without application changes.

### How does PlanetScale handle schema changes?

PlanetScale uses "ghost tables" to apply schema changes without downtime. Changes are applied to a shadow table, data is backfilled, then tables are swapped atomically.

### Can I use PlanetScale with Prisma?

Yes, Prisma supports PlanetScale natively. Set `replicas` to configure read replicas for Prisma Accelerate caching.

---

**Related Technologies:** [MySQL](/mysql), [PostgreSQL](/postgresql), [Neon](/neon), [Turso](/turso), [Drizzle ORM](/drizzle-orm), [Prisma](/prisma), [CockroachDB](/cockroachdb)
