---
layout: default
title: Home
---

<section class="intro">
    <p>Welcome to the DevRadar Open Research Archive — a comprehensive knowledge base of in-depth technical research reports.</p>
    <p>This archive contains 100+ meticulously researched technical reports covering AI coding tools, web frameworks, databases, hosting platforms, and developer utilities.</p>
</section>

<section class="featured">
    <h2>Featured Research</h2>
    <div class="card-grid">
        <a href="{{ site.ai_tools.first.url }}" class="card">
            <span class="emoji">🤖</span>
            <h3>{{ site.ai_tools.first.title }}</h3>
            <p>{{ site.ai_tools.first.description }}</p>
        </a>
        {% for item in site.ai_tools limit:2 offset:1 %}
        <a href="{{ item.url }}" class="card">
            <span class="emoji">💻</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
        </a>
        {% endfor %}
        <a href="{{ site.frameworks.first.url }}" class="card">
            <span class="emoji">⚛️</span>
            <h3>{{ site.frameworks.first.title }}</h3>
            <p>{{ site.frameworks.first.description }}</p>
        </a>
    </div>
</section>
