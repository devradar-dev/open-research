---
title: "Weaviate: Open Source Vector Database for AI and RAG (2026)"
description: "Weaviate is an AI-native vector database with HNSW indexing, hybrid search, and multi-modal support. Learn about architecture, hosting, and Weaviate vs Pinecone vs pgvector."
category: databases
tags: [weaviate, vector database, ai database, rag database, semantic search]
focus_keyword: "weaviate"
meta_title: "Weaviate: Open Source Vector Database for AI and RAG (2026)"
meta_description: "Weaviate is an AI-native vector database with HNSW indexing, hybrid search, and multi-modal support. Learn about architecture, hosting, and Weaviate vs Pinecone vs pgvector."
last_updated: 2026-01-20
version: "Weaviate v1.35+"
status: stable
license: "BSD 3-Clause (Open Source)"
quick_answer: "Weaviate is an open-source AI-native vector database written in Go. Features HNSW indexing, hybrid BM25+vector search, modular vectorization, and multi-tenant capabilities. Self-hosted or managed cloud options."
research_date: 2026-01-20
related: ["pinecone", "pgvector", "postgresql", "qdrant", "milvus", "chromadb", "elastic", "redis"]
capabilities: ["hnsw-indexing", "hybrid-search-rrf", "multi-model-vectorization", "real-time-indexing", "crud-operations", "multi-tenancy", "rbac", "graphql-rest-apis"]
best_for: ["production-rag-applications", "semantic-search", "multi-modal-search", "enterprise-ml-deployments", "self-hosted-vector-requirements"]
avoid_for: ["primary-transactional-database", "browser-only-apps", "applications-requiring-strong-acid-transactions"]
pricing: "Cloud: Per vector-dimension stored. Self-hosted: Free (infrastructure only). Serverless: Pay-per-query. Dedicated: Custom pricing. Free sandbox: 400K vectors, 14-day limit."
search_intent: informational
---

# Weaviate: Open Source Vector Database for AI and RAG (2026)

## Quick Answer

**Weaviate** is an AI-native open-source vector database built in Go. Unlike general-purpose databases with bolted-on vector support, Weaviate treats vectors as first-class citizens with dedicated indexing (HNSW/Flat/Dynamic), hybrid search (BM25 + semantic), and modular vectorization. Version 1.35+ introduces advanced features like ACORN filtering, Rotational Quantization (RQ), and improved consistency models.

## What is Weaviate?

Weaviate defines itself as "AI-native"—meaning the architecture is fundamentally optimized for vector similarity search from the ground up. Written in Go for high concurrency, Weaviate stores both JSON objects and their vector representations, enabling retrieval of actual content immediately after vector search without querying a secondary database.

### The Hybrid Data Model

```json
{
  "class": "Article",
  "properties": [
    {
      "name": "title",
      "dataType": ["text"]
    },
    {
      "name": "content",
      "dataType": ["text"]
    },
    {
      "name": "embedding",
      "dataType": ["number[]"]
    }
  ],
  "vectorIndexType": "hnsw",
  "vectorizer": "text2vec-openai"
}
```

### Storage Architecture

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Object Store** | LSM Tree | JSON documents + inverted indices |
| **Vector Store** | HNSW Graph | Fast ANN search |
| **Commit Log** | WAL | Durability and recovery |

## Key Features

### Vector Indexing

| Index Type | Use Case | Performance | Memory |
|------------|----------|-------------|--------|
| **HNSW** | Production workloads | O(log N) search | High (graph in RAM) |
| **Flat** | Small datasets, 100% recall | O(N) brute force | Low (no graph) |
| **Dynamic** | Multi-tenant with varying sizes | Auto-switches | Adapts |

**HNSW Parameters**:
- `maxConnections`: Max links per node (default: 16)
- `efConstruction`: Index build quality (default: 200)
- `ef`: Search depth (dynamic with `dynamicEf`)

### Hybrid Search with RRF

Weaviate combines dense (vector) and sparse (BM25) search:

```
Score = 1 / (k + rank_dense) + 1 / (k + rank_sparse)
```

```graphql
{
  Get {
    Article(
      hybrid: {
        query: "machine learning"
        alpha: 0.5  # 0=pure BM25, 1=pure vector
      }
    ) {
      title
      _additional {
        score
      }
    }
  }
}
```

### ACORN Filtering

**Problem**: Standard vector filtering either pre-filters (disconnects graph) or post-filters (wastes compute).

**Solution**: ACORN (Automatic Constraint Optimization for Retrieval Networks) allows HNSW traversal to "jump" over non-matching nodes, maintaining high recall with restrictive filters.

### Vector Quantization

| Technique | Compression | Use Case |
|------------|-------------|----------|
| **Product Quantization (PQ)** | Significant | General compression |
| **Binary Quantization (BQ)** | 32x | High-dimensional vectors |
| **Scalar Quantization (SQ)** | 4x (float32 → int8) | Balance |
| **Rotational Quantization (RQ)** | High retention | v1.34+ feature |

### Multi-Vector Support

Since v1.24, objects can have multiple named vectors:

```json
{
  "title": "Product Page",
  "titleVector": [0.1, 0.2, ...],
  "descriptionVector": [0.3, 0.4, ...],
  "imageVector": [0.5, 0.6, ...]
}
```

Enables multi-modal retrieval strategies.

## Weaviate vs Competitors

### Weaviate vs Pinecone

| Feature | Weaviate | Pinecone |
|---------|----------|----------|
| **Architecture** | Open source + cloud | Managed service only |
| **Indexing** | HNSW, Flat, Dynamic | HNSW only |
| **Object Storage** | Built-in JSON | Metadata only (40KB limit) |
| **Hybrid Search** | Native BM25+vector | Sparse reranking |
| **Self-Host** | Full control | Not available |

### Weaviate vs pgvector (PostgreSQL)

| Feature | Weaviate | pgvector |
|---------|----------|----------|
| **Optimization** | AI-native from ground up | Extension to relational DB |
| **Indexing** | HNSW with advanced tuning | HNSW, IVFFlat |
| **Object Storage** | Co-located vectors | Separate table |
| **Consistency** | Tunable (BASE) | ACID (Serializable) |
| **Scaling** | Horizontal sharding | Vertical + Citus |

### Weaviate vs Qdrant

| Feature | Weaviate | Qdrant |
|---------|----------|--------|
| **Language** | Go | Rust |
| **Storage** | LSM tree | WAL + Segment storage |
| **Payload Indexing** | Inverted indices | Payload indexing |
| **Filtration** | ACORN optimized | Filterable index |

## Platform Support

### SDK Ecosystem

| Language | SDK | Protocol | Notes |
|----------|-----|----------|-------|
| **Python** | v4 (gRPC) | Binary | Preferred for data science |
| **TypeScript** | v3 (gRPC) / v2 (REST) | Binary/HTTP | v3 not browser-compatible |
| **Go** | Official | gRPC | High-fidelity, same language |
| **Java** | v6 | gRPC | Android compatible |

### Browser and Edge

**The Browser Gap**: Weaviate v3 SDK relies on gRPC and cannot run natively in browsers.

**Solutions**:
1. **Backend-for-Frontend (BFF)**: Proxy requests through backend API
2. **v2 SDK**: REST-only (deprecated but browser-compatible)
3. **Cloudflare Workers**: Use v2 SDK or REST (v3 has compatibility issues)

### Mobile Platforms

| Platform | SDK | Status |
|----------|-----|--------|
| **iOS (Swift)** | None | REST API via URLSession |
| **Android** | Java v6 | Compatible with JVM |
| **Flutter** | None | REST via http/dio packages |
| **React Native** | None | REST via fetch |

## Hosting Options

### Weaviate Cloud

| Deployment | Pricing Model | Use Case |
|------------|--------------|----------|
| **Serverless** | Per vector-dimension | Variable workloads |
| **Dedicated** | Custom pricing | Enterprise, SLAs |
| **BYOC** | Control plane fee | Data residency (VPC) |
| **Sandbox** | Free | Testing (14-day limit) |

### Self-Hosted

| Method | Complexity | Use Case |
|--------|------------|----------|
| **Docker Compose** | Low | Local development |
| **Kubernetes** | Medium | Production scaling |
| **Embedded** | Low | Testing, CI/CD |

**Embedded Weaviate**:
```python
from weaviate.embedded import EmbeddedOptions

client = weaviate.Client(
    embedded_options=EmbeddedOptions(
        persistence_data_path="./data"
    )
)
# Spawns local binary, dies with process
```

## Consistency Model

Weaviate uses a hybrid consistency approach:

| Data Type | Consistency | Algorithm |
|-----------|-------------|------------|
| **Metadata** | Strong | Raft consensus |
| **Objects** | Tunable | Leaderless replication |

**Write Consistency Levels**:
- **ONE**: Fastest, lowest consistency
- **QUORUM**: Balanced (majority of replicas)
- **ALL**: Highest consistency, lowest availability

**CAP Theorem**: AP for data, CP for metadata.

## Use Cases: Best For

- **Production RAG**: Integrated generative modules + hybrid search
- **Semantic Search**: Enterprise search with understanding
- **Multi-Modal**: Image+text search via multi2vec modules
- **Recommendation Systems**: "More like this" functionality
- **Self-Hosting Requirement**: Full control, no vendor lock-in

## Use Cases: Avoid For

- **Primary Transactional Database**: No multi-row ACID transactions
- **Browser-Only Apps**: No official browser SDK (v3)
- **Massive Blob Storage**: Store files in S3, not Weaviate blobs
- **Strong Consistency Requirements**: Eventual consistency for data

## Operational Limits

| Limit | Value |
|-------|-------|
| **Max Dimensions** | 65,535 |
| **Max Query Results** | 10,000 (QUERY_MAXIMUM_RESULTS) |
| **Sandbox Vectors** | ~400K (varies by dimension) |
| **Blob Size** | No hard limit (anti-pattern >1MB) |

## FAQ

### Is Weaviate free?

Weaviate core is open-source (BSD 3-Clause) and free to self-host. Weaviate Cloud offers managed pricing based on vector-dimensions stored. A free sandbox exists for testing (400K vectors, 14-day limit).

### Does Weaviate support hybrid search?

Yes, Weaviate natively combines BM25 keyword search with vector similarity search using Reciprocal Rank Fusion (RRF). The `alpha` parameter controls the weighting between text and vector scores.

### Can I run Weaviate in Cloudflare Workers?

Weaviate v3 SDK has compatibility issues with Cloudflare Workers due to gRPC dependencies. Use the legacy v2 SDK (REST) or make REST API calls from Workers to a Weaviate backend.

### What is the difference between HNSW and Flat indexes?

HNSW (Hierarchical Navigable Small World) offers O(log N) search with high recall but uses more memory. Flat performs brute-force O(N) search with 100% recall and minimal memory, suitable for small datasets.

### Does Weaviate support multi-tenancy?

Yes, Weaviate supports multi-tenancy via tenant isolation within collections. Each tenant can have its own isolated data with optional per-tenant vector indexes.

---

**Related Technologies:** [Pinecone](/pinecone), [PostgreSQL](/postgresql), [Qdrant](/qdrant), [Milvus](/milvus), [Redis](/redis)
