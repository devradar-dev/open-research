---
layout: default
title: Databases
permalink: /databases/
---

# Databases

Research on databases, ORMs, and data persistence solutions.

## Databases

{% for item in site.databases %}
### [{{ item.title }}]({{ item.url }})
{{ item.description }}
{% endfor %}
