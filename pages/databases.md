---
layout: default
title: Databases
permalink: /databases/
---

<h1>🗄️ Databases</h1>
<p class="intro">Research on databases, ORMs, and data persistence solutions.</p>

<div class="card-grid">
{% for item in site.databases %}
    <a href="{{ item.url }}" class="card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        {% if item.version %}<span class="badge">v{{ item.version }}</span>{% endif %}
    </a>
{% endfor %}
</div>
