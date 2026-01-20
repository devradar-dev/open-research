---
title: "RxDB: Reactive NoSQL Database for Local-First Applications (2026)"
description: "RxDB is a reactive JavaScript database for offline-first apps. Learn about NoSQL replication, local storage engines, vector search, and RxDB vs PowerSync vs Realm."
category: databases
tags: [rxdb, reactive database, local-first, offline-first, nosql javascript]
focus_keyword: "rxdb"
meta_title: "RxDB: Reactive NoSQL Database for Local-First Applications (2026)"
description: "RxDB is a reactive JavaScript database for offline-first apps. Learn about NoSQL replication, local storage engines, vector search, and RxDB vs PowerSync vs Realm."
last_updated: 2026-01-20
version: "RxDB 16.0+"
status: stable
license: "Apache 2.0 (Core), Commercial (Premium plugins)"
quick_answer: "RxDB is a reactive NoSQL database for JavaScript runtimes. Enables offline-first apps with local storage, real-time sync, and observable queries. No native iOS/Android SDKs—requires React Native or hybrid bridge."
research_date: 2026-01-20
related: ["power-sync", "supabase", "firebase-firestore", "realm", "sqlite", "turso", "convex", "indexeddb"]
capabilities: ["reactive-queries", "offline-first", "local-storage-abstraction", "replication-protocols", "schema-validation", "field-level-encryption", "crdt-conflict-resolution", "vector-search-utility"]
best_for: ["offline-first-pwa", "react-native-apps", "local-first-applications", "realtime-collaborative-apps"]
avoid_for: ["native-ios-apps-without-js-bridge", "native-android-apps-without-js-bridge", "large-scale-vector-search"]
pricing: "Open Source: Apache 2.0 (free). Premium: Paid plugins (Memory-Mapped Storage, Encryption)."
search_intent: informational
---

# RxDB: Reactive NoSQL Database for Local-First Applications (2026)

## Quick Answer

**RxDB** (Reactive Database) is a JavaScript/TypeScript NoSQL database designed for offline-first applications. It stores data locally (IndexedDB, SQLite, OPFS) and synchronizes with backend services via GraphQL, REST, or custom protocols. Unlike Firebase Realm, RxDB has no native iOS/Android SDKs—it requires a JavaScript runtime like React Native, Capacitor, or a web browser.

## What is RxDB?

RxDB implements the **Local-First** paradigm where the client device is the primary data store. All reads and writes execute immediately against local storage, ensuring zero-latency interaction regardless of network conditions. Synchronization with the backend occurs asynchronously in the background.

### The Reactive Model

RxDB leverages RxJS (Reactive Extensions for JavaScript) to emit data streams:

```typescript
import { createRxDatabase } from 'rxdb';
import { getRxStorageDenoKV } from 'rxdb/plugins/storage-denokv';

const db = await createRxDatabase({
  name: 'myapp',
  storage: getRxStorageDenoKV()
});

// Query returns an Observable
const query = db.todos.find({
  selector: { done: false }
});

// Subscribe for real-time updates
query.$.subscribe(todos => {
  console.log('Active todos:', todos);
});
```

## Key Features

### Storage Abstraction (RxStorage)

RxDB's storage layer is pluggable:

| Storage Engine | Runtime | Use Case | Performance |
|----------------|---------|----------|-------------|
| **IndexedDB** | Browser | General web apps | Widely supported, slower writes |
| **OPFS** | Browser | High-performance | Fast I/O, requires COOP/COEP headers |
| **SQLite** | React Native/Capacitor | Mobile | Native persistence, reliable |
| **Memory-Mapped** | Premium plugin | Read-heavy | Zero-latency reads, durability gap |
| **DenoKV** | Deno Deploy | Edge | Distributed storage |

### Schema and Validation

RxDB enforces JSON Schema validation:

```typescript
const todoSchema = {
  title: 'todo schema',
  version: 0,
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
    title: { type: 'string' },
    done: { type: 'boolean' },
    attachment: { type: 'string', encrypted: true }
  },
  required: ['id', 'title']
};

await db.addCollections({
  todos: { schema: todoSchema }
});
```

### EventReduce Algorithm

Reactive queries use EventReduce for efficiency:

- Processes only changed documents
- Avoids full dataset re-scans
- Maintains query results incrementally

This prevents UI jank on large datasets.

### Replication Protocols

RxDB integrates with various backends:

| Protocol | Backend | Use Case |
|----------|---------|----------|
| **CouchDB** | Apache CouchDB / Cloudant | Master-master replication |
| **GraphQL** | GraphQL API | Custom schemas, field selection |
| **Supabase** | PostgreSQL | Realtime via PostgREST + WebSocket |
| **Firestore** | Google Firestore | Cost reduction via caching |
| **WebRTC** | P2P | Serverless local sync |

### Conflict Resolution

**Standard Handlers**: Last-Write-Wins (default) or custom logic

**CRDT Plugin** (Conflict-Free Replicated Data Types):
- Stores operations (deltas) instead of final values
- Mathematical convergence guaranteed
- Operators: `$min`, `$max`, `$inc`, `$set`, `$push`, `$addToSet`

### Vector Search

RxDB supports vector search as a utility (not native indexing):

```typescript
// Brute-force similarity search
const results = await myCollection
  .find({
    selector: {},
    sort: [(doc) => cosineDistance(doc.vector, queryVector)]
  })
  .exec();
```

| Approach | Performance | Use Case |
|----------|-------------|----------|
| **Brute Force** | O(N), ~765ms for 10K docs | Small datasets (<10K) |
| **Index Pre-filter** | Faster with scalar index filter | Hybrid approach |

**Limitation**: No HNSW/FAISS native indexing. Best for "Small Data" vector search, not millions of vectors.

## Platform Compatibility

### Mobile Support

| Platform | Support | Notes |
|----------|---------|-------|
| **React Native** | Official via SQLite adapter | Uses react-native-quick-sqlite |
| **Capacitor/Ionic** | Official via capacitor-sqlite | Bypasses WebView storage |
| **Native iOS (Swift)** | Not supported | Requires JS bridge |
| **Native Android (Kotlin)** | Not supported | Requires JS bridge |

### Edge Runtime

| Platform | Support | Notes |
|----------|---------|-------|
| **Vercel Edge** | Partial | HTTP-based replication only |
| **Cloudflare Workers** | Yes | Via D1 binding or storage adapter |
| **Deno Deploy** | Yes | Via DenoKV adapter |

### Server-Side

| Runtime | Support | Notes |
|---------|---------|-------|
| **Node.js** | Yes | Filesystem or SQLite storage |
| **Deno** | Yes | DenoKV storage adapter |
| **Bun** | Yes | Native compatibility |

## RxDB vs Competitors

### RxDB vs PowerSync

| Feature | RxDB | PowerSync |
|---------|------|-----------|
| **Data Model** | NoSQL (JSON) | SQL (SQLite) |
| **Language** | JavaScript/TypeScript | Dart (Flutter) + JS SDK |
| **Replication** | Protocol-agnostic | PostgreSQL-based |
| **CRDTs** | Plugin | Built-in |

### RxDB vs Realm

| Feature | RxDB | Realm |
|---------|------|--------|
| **Native SDKs** | None (JS only) | Swift, Kotlin, JS, .NET |
| **Reactivity** | RxJS-based | Built-in observation |
| **Sync Protocol** | Flexible | MongoDB Atlas required |
| **Open Source** | Apache 2.0 | Commercial + Apache 2.0 |

### RxDB vs Firebase Firestore

| Feature | RxDB | Firestore |
|---------|------|-----------|
| **Storage** | Local-first | Cloud-first with cache |
| **Offline** | Full offline mode | Offline with queue |
| **Query Language** | Mango/Mongo-like | Firestore query syntax |
| **Pricing** | Free (self-hosted) | Usage-based |

## Encryption and Security

### Field-Level Encryption

```typescript
const encryptedSchema = {
  properties: {
    ssn: {
      type: 'string',
      encrypted: true  // Auto-encrypted/decrypted
    }
  }
};
```

**Mechanism**:
- Uses browser's WebCrypto API
- Encrypted at rest in storage
- Cannot query encrypted fields (must decrypt first)

### Audit Logging

The Logger Plugin records all operations for compliance:
- Reads, writes, deletes
- Integration with Datadog, Sentry

## Performance Optimization

### Worker Offloading

Move database to WebWorker for smooth UI:

```typescript
await db.workerWorker();
// Queries run in background thread
```

### Sharding

Split collection across multiple storage instances:

```typescript
import { addRxStorageSharding } from 'rxdb/plugins/sharding';

const storage = addRxStorageSharding({
  storage: getRxStorageIndexedDB(),
  shards: 4  // Parallel I/O
});
```

## Use Cases: Best For

- **Offline-First PWAs**: Progressive Web Apps requiring zero-latency
- **React Native Apps**: Mobile apps with hybrid architecture
- **Collaborative Apps**: CRDTs for conflict-free editing
- **Real-Time Dashboards**: Observable queries auto-update UI

## Use Cases: Avoid For

- **Native iOS/Android Apps**: No Swift/Kotlin SDKs
- **Large-Scale Vector Search**: No native HNSW indexing
- **Simple Key-Value**: IndexedDB or localStorage sufficient

## FAQ

### Is RxDB free?

RxDB core is free and open-source (Apache 2.0). Premium plugins (Memory-Mapped Storage, Encryption) require commercial licensing.

### Does RxDB work with React Native?

Yes, RxDB works with React Native via the SQLite storage adapter. It uses react-native-quick-sqlite for native performance and data persistence.

### Can I use RxDB with Supabase?

Yes, RxDB has a Supabase replication plugin. It leverages PostgREST for CRUD operations and Supabase Realtime (WebSocket) for live updates.

### What is the difference between RxDB and PouchDB?

RxDB was originally forked from PouchDB but diverged significantly. RxDB adds reactive queries (RxJS), better TypeScript support, and additional storage engines. PouchDB focuses on CouchDB compatibility.

### Does RxDB support vector search?

RxDB supports vector search as a utility feature using JavaScript-based calculations. It's suitable for small datasets (<10K documents) but lacks native indexing for large-scale vector workloads.

---

**Related Technologies:** [PowerSync](/power-sync), [Supabase](/supabase), [Turso](/turso), [SQLite](/sqlite), [Convex](/convex)
