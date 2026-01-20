---
title: "Biome: The Rust-Based JS Toolchain Replacing ESLint & Prettier"
description: "Biome is a fast Rust-based toolchain unifying formatting, linting, and import sorting. Learn how Biome compares to ESLint/Prettier and how to migrate."
category: dev-tools
tags: [biome js, biome linter, biome formatter, biome vs eslint, biome vs prettier, rust toolchain]
focus_keyword: "Biome"
meta_title: "Biome: The Rust-Based JS Toolchain Replacing ESLint & Prettier"
meta_description: "Biome is a fast Rust-based toolchain unifying formatting, linting, and import sorting. Learn how Biome compares to ESLint/Prettier and how to migrate."
last_updated: 2026-01-20
version: "v2.x"
status: stable
license: "Apache 2.0 / MIT"
quick_answer: "Biome is a unified Rust-based toolchain that combines linting, formatting, and import organization. Up to 25x faster than Prettier and 15-20x faster than ESLint with 97% Prettier compatibility. Ideal for monorepos and greenfield projects."
research_date: 2026-01-20
related: ["ESLint", "Prettier", "Rome", "Rust", "TypeScript", "GritQL"]
capabilities: ["Formatter (97% Prettier compatible)", "Linter (280+ rules)", "Import organizer", "GritQL plugin system", "Monorepo support", "CST parsing"]
best_for: ["Greenfield Projects (Modern Stack)", "Monorepos suffering from slow builds", "Teams checking performance", "Projects using React/Next.js"]
avoid_for: ["Legacy projects with highly specific custom rules not in Biome", "Teams needing extensive type-aware linting (use typescript-eslint)", "Projects requiring Java/.NET/PHP official SDKs"]
pricing: "Free (Open Source). Commercial support packages available for enterprise."
search_intent: informational
---

# Biome: The Rust-Based JS Toolchain Replacing ESLint & Prettier

## Quick Answer

Biome is a **unified Rust-based toolchain** that combines linting, formatting, and import organization into a single binary. Born from the Rome project, Biome offers **25x faster formatting** than Prettier and **15-20x faster linting** than ESLint through its Concrete Syntax Tree (CST) architecture and multi-threading. With 97% Prettier compatibility and 280+ lint rules, it's the definitive choice for modern web development teams prioritizing performance and simplicity.

## Executive Summary

Biome (formerly Rome) emerged from the community fork of the Rome project after its commercial backing ceased. The project has matured into a production-ready alternative to the fragmented ESLint + Prettier ecosystem, winning the JSNation Productivity Booster Award in 2024 and surpassing 800,000 weekly downloads by late 2025.

### Key Specifications

| Attribute | Details |
|-----------|---------|
| **Official Name** | Biome |
| **Latest Version** | v2.x (stable) |
| **Backend Language** | Rust |
| **License** | Apache 2.0 (Core), MIT (SDKs) |
| **Sponsorship** | Depot and Netlify |

## Core Architecture

### The Concrete Syntax Tree (CST) Advantage

Biome's performance dominance stems from its parsing strategy:

| Parser Type | Description |
|-------------|-------------|
| **AST (Traditional)** | Abstracts away whitespace, comments, parentheses. Loses fidelity for formatting recovery. |
| **CST (Biome)** | Preserves full fidelity including every whitespace, comment, and syntactic nuance. |

**Benefits of CST:**
1. **Lossless Formatting**: Comments and idiosyncratic formatting preserved
2. **Error Recovery**: Generates valid trees from malformed code for feedback during active editing
3. **Single-Pass Architecture**: Code parsed once, shared across formatter, linter, and import analyzer

### Unified Parsing = Memory Efficiency

In a typical ESLint + Prettier setup:
- ESLint parses code (for linting)
- Prettier parses code again (for formatting)
- TypeScript compiler may parse a third time

**Biome**: One parse, one CST shared across all tools, drastically reducing memory overhead and CPU cycles.

## Features

### The Biome Formatter

| Feature | Details |
|---------|---------|
| **Prettier Compatibility** | 97% compatible output |
| **Default Indentation** | Tabs (accessibility-focused) |
| **Option Philosophy** | Fewer options than Prettier (canonical format) |
| **Performance** | <50ms for files that take Prettier 1-2 seconds |

### The Biome Linter

280+ rules organized into categories:

| Category | Purpose | Examples |
|----------|---------|----------|
| **Correctness** | Guaranteed bugs | noUnreachable, useExhaustiveDependencies |
| **Style** | Consistent patterns | useConst, noShoutyConstants |
| **Complexity** | Convolution detection | noExtraBooleanCast |
| **Suspicious** | Likely unintended | noDoubleEquals |
| **Security** | Vulnerabilities | noDangerouslySetInnerHtml |
| **Nursery** | Experimental rules | Opt-in testing of new rules |

### Safe vs. Unsafe Fixes

**Safe Fixes**: Automatically applied via `biome check --apply`
- Removing unused imports
- Converting let to const for immutable variables
- Standardizing quoting styles

**Unsafe Fixes**: Require explicit `--unsafe` flag
- Changing == to === (may break type coercion dependencies)
- Transformations that could alter runtime logic

## Language & Framework Support

| Platform | Support Status | Notes |
|----------|----------------|-------|
| **JavaScript/TypeScript** | Native | ES2024 and TypeScript 5.6 support |
| **JSON/JSONC** | Native | Comments and trailing commas in config files |
| **CSS** | Native | A11y and compatibility linting |
| **Vue** | Experimental | Template syntax gaps exist |
| **Svelte** | Experimental | Cross-boundary linting limitations |
| **Astro** | Experimental | Framework-specific template syntax in progress |
| **GraphQL** | Supported | Schema validation |
| **Markdown** | In Progress | Parser under development |
| **YAML** | In Early Stages | Umbrella issue for community contribution |

### Monorepo Support

Biome v2.x addresses monorepo complexity through **configuration nesting**:
- Root `biome.json` with inherited extends field
- Package-specific configs (e.g., `packages/ui/biome.json`)
- Overrides allow per-package rule customization

## Extensibility: GritQL

Biome v2.0 introduced GritQL, a specialized query language for source code:

```javascript
// Example: Finding console.log calls
console.log($message)
```

**Capabilities:**
- Pattern matching that ignores trivia (whitespace)
- Custom lint rules via `.grit` files
- Faster execution than JavaScript-based AST plugins

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| **npm** | Official | `npm install --save-dev --save-exact @biomejs/biome` |
| **yarn** | Official | `yarn add --dev --exact @biomejs/biome` |
| **pnpm** | Official | `pnpm add -D -E @biomejs/biome` |
| **Bun** | Official | `bun add -D -E @biomejs/biome` |
| **Deno** | Official | `deno add -D npm:@biomejs/biome` |
| **WASM** | Available | @biomejs/wasm-web, @biomejs/wasm-nodejs |

### Editor Ecosystem

| Editor | Support |
|--------|---------|
| **VS Code** | Official extension with Code Actions on Save |
| **IntelliJ IDEA** | Official JetBrains plugin |
| **Zed** | Native support (Rust-based alignment) |

## Comparison

### Biome vs. ESLint + Prettier

| Feature | Biome | ESLint + Prettier |
|---------|-------|-------------------|
| **Speed** | ~25x faster (Rust-based) | Node.js bottleneck |
| **Setup** | Unified, one binary, one config | Complex, multiple tools |
| **Fix Safety** | Strict (Safe vs. Unsafe) | Looser (auto-fix can break logic) |
| **Type Linting** | Basic (multi-file analysis v2.0) | Advanced (typescript-eslint mature) |
| **Ecosystem** | Growing (GritQL, ~280 rules) | Massive (thousands of plugins) |
| **Formatting** | Opinionated (tabs default) | Flexible (spaces default) |

### Migration Considerations

The `biome migrate` command translates `.eslintrc` and `.prettierrc` files:

| Challenge | Solution |
|-----------|----------|
| **Rule Parity** | ~80-90% coverage of recommended ESLint rules |
| **Ignore Patterns** | Manual port to `files.ignore` sections |
| **Inline Comments** | Regex replace `// eslint-disable` with `// biome-ignore` |

## Best For

- **Greenfield Projects**: Modern stacks (React/Next.js) without legacy debt
- **Monorepos**: Large codebases where slow CI times are critical blockers
- **Performance-Conscious Teams**: Teams experiencing "linting pause" in development
- **Cost-Sensitive Scaling**: Zero license fees with unlimited usage

## Avoid For

- **Legacy Projects**: Heavy customization with obscure ESLint plugins
- **Type-Aware Linting Dependence**: Deep typescript-eslint requirements not yet in Biome
- **HTML Super Language Production**: Vue/Svelte/Astro support still experimental

## Limitations

1. **Plugin Learning Curve**: GritQL requires learning new syntax vs. JavaScript API
2. **Experimental Language Support**: HTML super languages not feature-complete
3. **Type Inference Gap**: Doesn't yet match typescript-eslint's full depth

## Conclusion

Biome represents the **industrialization of web tooling** by moving from single-threaded JavaScript to multi-threaded Rust. For organizations struggling with slow CI times, complex toolchain maintenance, or inconsistent code quality, Biome offers a compelling, production-ready alternative.

**Verdict**: Choose Biome for greenfield projects, monorepos, and modern stacks (React/Next.js). Choose ESLint/Prettier for legacy projects with extensive custom plugin requirements or deep type-aware linting needs.

---

*Last Updated: January 20, 2026*
*Research Source: Biome Developer Tool Research*
