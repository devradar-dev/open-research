---
title: "Devstral 2 Review: Mistral's Agentic Coding Model (2026)"
description: "Devstral 2 analysis: Mistral's 123B agentic model with 72.2% SWE-bench score, tool-use capabilities, and 7x cost advantage. Compare Devstral vs Claude Sonnet for agents."
category: ai-tools
tags: [devstral-2, mistral-ai, agentic-coding, open-source, llm]
focus_keyword: "Devstral 2 AI agent"
meta_title: "Devstral 2 Review: Mistral's Agentic Coding Model (2026)"
meta_description: "Devstral 2 analysis: Mistral's 123B agentic model with 72.2% SWE-bench score, tool-use capabilities, and 7x cost advantage. Compare Devstral vs Claude Sonnet for agents."
last_updated: 2026-01-20
version: "Devstral 2 (123B) / Small 2 (24B)"
status: stable
quick_answer: "Devstral 2 is Mistral's 123B dense agentic model achieving 72.2% SWE-bench Verified. Features 256k context, tool-use optimization, and 7x cost efficiency vs Claude Sonnet. Small 2 (24B, Apache 2.0) enables local deployment."
research_date: 2026-01-20
related: [codestral, qwen-coder, deepseek-coder, claude-code]
best_for: [cost-efficient-agentic-workflows, local-deployment, open-source-advocates]
avoid_for: [users-requiring-gpt-5-reasoning, proprietary-saas-only-teams]
pricing: "$0.40/1M input (123B) or $0.10/1M input (24B)"
search_intent: informational
---

Devstral 2 is Mistral AI's **agentic coding model** family, available in 123B (dense) and 24B (multimodal) variants. Designed for **repository-scale reasoning** and **autonomous tool-use**, Devstral 2 achieves **72.2% SWE-bench Verified**—rivaling proprietary systems while remaining open-weight.

## Key Features

**Model Variants:**
- **Devstral 2 (123B)**: Flagship agentic model, 256k context, dense architecture
- **Devstral Small 2 (24B)**: Apache 2.0 licensed, multimodal (vision), 68.0% SWE-bench

**Technical Architecture:**
- **Dense Transformer**: Coherent repo-wide reasoning (avoids MoE routing fragmentation)
- **256k Context**: Ingests dozens of files, documentation, execution traces
- **Tekken Tokenizer**: Optimized for source code density

**Mistral Vibe CLI:**
- Native agentic interface with project-aware context scanning
- Multi-file orchestration, stateful terminal execution, grep/ripgrep search
- Zed editor integration, Agent Communication Protocol (ACP) support

**MCP Integration:**
- Supabase, Firecrawl, Pocketbase, GitHub Notifications, Terminal MCP
- DigitalOcean GPU droplets (HGX B300) for 123B hosting

**Licensing:**
- **123B**: Modified MIT (revenue cap: $20M/month → commercial license required)
- **24B**: Apache 2.0 (fully open, royalty-free)

## Best For
- Enterprises wanting 7x cost efficiency vs Claude Sonnet
- Privacy-sensitive teams requiring air-gapped deployment
- Open-source advocates avoiding proprietary lock-in
- Agentic workflows requiring multi-file coherence

## Avoid For
- Projects requiring GPT-5-level frontier reasoning
- Teams without ML infrastructure for self-hosting 123B
- Organizations requiring managed SaaS with guaranteed SLAs

## Related Tools
- **[Codestral](/codestral-mistral-coding-ai-review)**: Mistral's 22B coding LLM
- **[Qwen Coder](/qwen-coder-alibaba-coding-ai-review)**: Alibaba's open-source alternative
- **[DeepSeek Coder](/deepseek-coder-ai-model-review)**: Ultra-low-cost competitor
