---
layout: default
title: Frameworks
permalink: /frameworks/
---

<h1>⚛️ Frameworks</h1>
<p class="intro">In-depth analysis of web frameworks, meta-frameworks, and rendering strategies.</p>

<div class="card-grid">
{% for item in site.frameworks %}
    <a href="{{ item.url }}" class="card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        {% if item.version %}<span class="badge">v{{ item.version }}</span>{% endif %}
    </a>
{% endfor %}
</div>
