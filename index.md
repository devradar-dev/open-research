---
layout: archive
title: "DevRadar Open Research"
permalink: /
---

![DevRadar Logo](/assets/icon.png){: .align-center}

# Technical Wikipedia for Developer Tools

Comprehensive knowledge base of in-depth technical research on modern development tools, frameworks, databases, and AI technologies.

## Featured Research

{% include group-by-array collection=site.ai_tools field="tags" %}

{% for tag in group_names %}
  {% assign items = group_items[forloop.index0] %}
  <h3>{{ tag }}</h3>
  {% for post in items %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}

## Browse by Category

| Category | Description |
|----------|-------------|
| [**AI Tools**](/open-research/ai-tools/) | Coding assistants, autonomous agents, AI-powered development |
| [**Frameworks**](/open-research/frameworks/) | Web frameworks, meta-frameworks, frontend libraries |
| [**Databases**](/open-research/databases/) | Relational databases, NoSQL, ORMs |
| [**Hosting**](/open-research/hosting/) | Cloud platforms, serverless, deployment services |
