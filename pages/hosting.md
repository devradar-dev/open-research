---
layout: default
title: Hosting
permalink: /hosting/
---

<h1>🌐 Hosting Platforms</h1>
<p class="intro">Analysis of deployment platforms, hosting providers, and DevOps tools.</p>

<div class="card-grid">
{% for item in site.hosting %}
    <a href="{{ item.url }}" class="card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        {% if item.version %}<span class="badge">v{{ item.version }}</span>{% endif %}
    </a>
{% endfor %}
</div>
