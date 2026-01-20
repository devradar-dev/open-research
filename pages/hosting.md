---
layout: default
title: Hosting
permalink: /hosting/
---

# Hosting Platforms

Analysis of deployment platforms, hosting providers, and DevOps tools.

## Platforms

{% for item in site.hosting %}
### [{{ item.title }}]({{ item.url }})
{{ item.description }}
{% endfor %}
