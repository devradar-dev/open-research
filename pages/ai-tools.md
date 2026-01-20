---
layout: default
title: AI Tools
permalink: /ai-tools/
---

<h1>🤖 AI Tools</h1>
<p class="intro">Comprehensive research on AI coding tools, agents, and development assistants.</p>

<div class="card-grid">
{% for item in site.ai_tools %}
    <a href="{{ item.url }}" class="card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        {% if item.version %}<span class="badge">v{{ item.version }}</span>{% endif %}
    </a>
{% endfor %}
</div>
