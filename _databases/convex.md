---
title: "Convex: The Reactive Backend Platform for TypeScript Apps"
description: "Convex is a reactive database and backend platform that keeps your app in sync automatically. Features include real-time subscriptions, vector search, and TypeScript-first development."
category: databases
tags: [convex database, convex backend, reactive database, firebase alternative, typescript backend]
focus_keyword: "convex database"
meta_title: "Convex: The Reactive Backend Platform for TypeScript Apps"
meta_description: "Convex is a reactive database and backend platform that keeps your app in sync automatically. Features include real-time subscriptions, vector search, and TypeScript-first development."
last_updated: 2026-01-20
version: "1.16"
status: stable
license: "Convex License (FSL Apache 2.0)"
quick_answer: "Convex is a software-defined reactive backend platform combining database, API layer, cache, and state manager. Built for TypeScript with automatic real-time sync and built-in vector search."
research_date: 2026-01-20
related: ["firebase", "supabase", "mongodb-realm", "react", "nextjs", "tanstack-start", "prisma", "drizzle", "pinecone", "planetscale"]
capabilities: ["reactive-queries", "automatic-sync", "typescript-first", "vector-search-hnsw", "real-time-subscriptions", "serverless-functions", "action-mutations", "time-travel", "schema-validation", "embedded-replicas"]
best_for: ["collaborative-apps", "real-time-dashboards", "ai-native-applications", "rapid-product-iteration", "typescript-teams"]
avoid_for: ["legacy-sql-migrations", "multi-language-teams", "applications-requiring-direct-sql-access", "complex-analytical-queries"]
pricing: "Starter: Free (1M function calls, 0.5GB storage). Professional: $25/seat/month (25M function calls, 50GB storage). Overage: $2 per 1M function calls, storage $0.20/GB."
search_intent: informational
---

# Convex: The Reactive Backend Platform for TypeScript Apps

## Quick Answer

**Convex** is a software-defined reactive backend platform that combines database, API layer, cache, and state manager into a unified TypeScript system. It automatically keeps your app in sync through real-time subscriptions, includes built-in vector search for AI applications, and offers ACID transactions with optimistic concurrency control.

## What is Convex?

Convex represents a paradigm shift from traditional backend architectures. Instead of maintaining separate layers—a relational database, an in-memory cache, a search engine, and a WebSocket server—Convex consolidates all of these into a single platform managed through TypeScript code.

### Software-Defined Database Philosophy

Convex inverts the traditional application architecture by treating infrastructure decisions as application code:

- **Isomorphic TypeScript:** Backend logic written in TypeScript with full type inference
- **Transactional Integrity:** ACID-compliant transactions with optimistic concurrency
- **Eliminated ORM Layer:** Direct database access without translation overhead
- **Reactive by Default:** Every query is implicitly a live subscription

### Deterministic Execution Model

Convex functions run in a custom V8-based JavaScript runtime that ensures determinism:

- **Frozen Time:** Multiple calls to `Date.now()` return the same timestamp within a transaction
- **Seeded Randomness:** `Math.random()` uses a seeded PRNG for retry-safe execution
- **V8 Isolates:** Lightweight execution contexts eliminate cold start latency

## Key Features

### Reactive Queries & Subscriptions

Convex's reactivity is automatic. When using `useQuery` in React:

```typescript
function UserProfile({ userId }) {
  const user = useQuery(api.users.get, { userId });
  // UI updates automatically when database changes
}
```

The system tracks dependencies ("read set") and pushes updates via WebSocket whenever relevant data changes.

### Vector Search for AI

**Native Vector Indexing:**
- HNSW algorithm for Approximate Nearest Neighbor search
- 2 to 4096 dimensions supported
- Cosine similarity metric
- Metadata filtering for multi-tenant search

**RAG Workflow Integration:**
```typescript
// ctx.vectorSearch available in Actions
const results = await ctx.vectorSearch("documents", {
  vector: embedding,
  filter: q.eq("userId", user.id),
  limit: 10
});
```

### Transaction Model

| Function Type | Purpose | Timeout |
|---------------|---------|---------|
| **Queries** | Pure read functions, reactive | ~1 second CPU |
| **Mutations** | ACID write operations | ~1 second CPU |
| **Actions** | Side effects & external APIs | Up to 10 minutes |

### Data Types & Validation

Convex supports a rich type system with runtime validation:

| Type | Validator | JavaScript Equivalent |
|------|-----------|----------------------|
| ID | `v.id("tableName")` | `Id<"tableName">` (String) |
| String | `v.string()` | `string` (UTF-8) |
| Float64 | `v.number()` | `number` (IEEE 754) |
| Int64 | `v.int64()` | `bigint` |
| Boolean | `v.boolean()` | `true/false` |
| Bytes | `v.bytes()` | `ArrayBuffer` |
| Array | `v.array(T)` | `Array<T>` |
| Object | `v.object({...})` | Record<string, any> |

## Convex vs Competitors

### Convex vs Supabase

| Feature | Convex | Supabase |
|---------|--------|----------|
| Core Engine | Custom Reactive Database (Rust/V8) | PostgreSQL |
| Query Language | TypeScript / JavaScript | SQL / PostgREST |
| Reactivity | Ubiquitous (default) | Opt-in (Postgres replication) |
| Logic Layer | Integrated "Software-Defined" Backend | Edge Functions / DB Functions |
| Migration | Schema-as-Code (TypeScript) | SQL Migrations (Flyway/CLI) |

### Convex vs Firebase

| Feature | Convex | Firebase |
|---------|--------|----------|
| Type Safety | TypeScript-native | Manual type casting required |
| Query Power | Full JavaScript logic | Restricted OR queries, rigid sorting |
| Consistency | ACID transactions with OCC | Eventual consistency issues |
| Cost Predictability | Function calls based | Reads-based billing |

### Convex vs Traditional Stack (Prisma/Drizzle)

| Feature | Convex | Prisma/Drizzle + PostgreSQL |
|---------|--------|---------------------------|
| Maintenance | Single platform | DB + API + WebSocket server |
| Type Safety | End-to-end inferred | Generated types (Prisma) or inferred (Drizzle) |
| Real-time | Built-in subscriptions | Requires separate implementation |
| Migration | Harder from coupled logic | Easier (own the SQL schema) |

## Client Ecosystem

### Web (React, Next.js, TanStack Start)

- **React Hooks:** `useQuery`, `useMutation` with automatic connection management
- **Next.js:** Supports SSR preloading with client-side live updates
- **TanStack Start:** Deep integration for React Router ecosystem

### Mobile Support

**iOS (Swift):**
- Official `convex-swift` library with native concurrency
- SwiftUI integration via `.task` modifier
- AsyncSequence for reactive updates

**Android (Kotlin):**
- Official `android-convexmobile` library
- Kotlin Flow integration with Jetpack Compose

**Flutter Gap:**
- No official Flutter SDK as of 2026
- Community packages available via FFI wrapper
- Consider alternatives like Appwrite or Firebase for Flutter-first teams

### Deployment Models

**Convex Cloud:**
- Fully managed PaaS with auto-scaling
- 11 9's durability via AWS RDS
- Global distribution and dashboard

**Self-Hosted (Open Source):**
- Apache 2.0 licensed backend
- Docker deployment for data sovereignty
- Requires manual scaling and monitoring

## Use Cases: Best For

- **Collaborative applications:** Real-time sync with automatic conflict resolution
- **AI-native apps:** Built-in vector search with RAG workflow support
- **Rapid prototyping:** Zero backend boilerplate, schema-as-code
- **TypeScript teams:** End-to-end type safety across the stack
- **Multi-player games:** Low-latency state synchronization

## Use Cases: Avoid For

- **Non-TypeScript projects:** TypeScript is required for the backend logic
- **SQL-heavy analytics:** Not optimized for complex analytical queries
- **Legacy integrations:** Direct SQL access not available
- **Flutter-first projects:** No official SDK (consider Supabase instead)

## Pricing Structure (2026)

| Tier | Monthly Cost | Included Function Calls | Storage | Overage |
|------|--------------|------------------------|---------|---------|
| **Starter** | Free | 1 Million | 0.5 GB | N/A (Hard stop) |
| **Professional** | $25/seat | 25 Million | 50 GB | $2 per 1M calls |
| **Overages** | - | - | - | $0.20 per GB |

### Cost Considerations

- **Fan-out multiplier:** Each reactive update to 1,000 users = 1,000 function calls
- **Vector storage:** More expensive than standard storage ($0.50/GB)
- **Action compute:** Charged separately per GB-hour of execution

## Operational Limits

| Limit | Value |
|-------|-------|
| Transaction size | 16 MiB |
| Document size | 1 MiB |
| Max array elements | 8,192 per document |
| Nesting depth | 16 levels |
| Max vector indexes | 4 per table |
| Max indexes per table | 32 |

## Development Workflow

### Schema Definition

```typescript
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    active: v.boolean().default(true),
  })
    .index("by_email", ["email"])
    .index("by_active", ["active"]),
});
```

### Query Function

```typescript
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";

export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

### Mutation Function

```typescript
export const updateUser = mutation({
  args: { id: v.id("users"), name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { name: args.name });
  },
});
```

## FAQ

### Is Convex open source?

Yes, the Convex backend is open-source under the Apache 2.0 license. The managed cloud service offers additional features like dashboard and auto-scaling.

### Does Convex work with Flutter?

There is no official Flutter SDK. Community packages exist via Rust FFI but lack official support. Consider Supabase or Firebase for Flutter projects.

### Can I use Convex for mobile apps?

Yes, Convex has official SDKs for iOS (Swift) and Android (Kotlin). Mobile apps connect via HTTP/WebSocket, maintaining real-time sync.

### How does Convex handle offline mode?

Convex clients support optimistic updates for immediate UI feedback. When the device reconnects, changes are synchronized and conflicts are resolved automatically.

### Does Convex support SQL?

No, Convex uses TypeScript functions for data access rather than SQL. This provides type safety but requires learning the Convex query API.

---

**Related Technologies:** [Supabase](/supabase), [Firebase](/firebase), [Prisma](/prisma), [Drizzle ORM](/drizzle-orm), [PlanetScale](/planetscale), [Pinecone](/pinecone)
