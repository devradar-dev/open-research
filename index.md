---
layout: home
title: "DevRadar Open Research"
permalink: /
---

## Explore Categories

<section class="explore-grid">
  <a href="{{ site.baseurl }}/ai-tools/" class="explore-card">
    <div class="explore-icon">🤖</div>
    <div class="explore-content">
      <h3>AI Tools</h3>
      <p>Coding assistants, autonomous agents, AI-powered development</p>
    </div>
    <span class="explore-arrow">→</span>
  </a>

  <a href="{{ site.baseurl }}/frameworks/" class="explore-card">
    <div class="explore-icon">⚛️</div>
    <div class="explore-content">
      <h3>Frameworks</h3>
      <p>Web frameworks, meta-frameworks, frontend libraries</p>
    </div>
    <span class="explore-arrow">→</span>
  </a>

  <a href="{{ site.baseurl }}/databases/" class="explore-card">
    <div class="explore-icon">🗄️</div>
    <div class="explore-content">
      <h3>Databases</h3>
      <p>Relational databases, NoSQL, ORMs, data persistence</p>
    </div>
    <span class="explore-arrow">→</span>
  </a>

  <a href="{{ site.baseurl }}/hosting/" class="explore-card">
    <div class="explore-icon">🚀</div>
    <div class="explore-content">
      <h3>Hosting</h3>
      <p>Cloud platforms, serverless, deployment services</p>
    </div>
    <span class="explore-arrow">→</span>
  </a>
</section>

<style>
  .explore-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin: 60px 0;
  }

  .explore-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: #F8F9FA;
    border: 1px solid rgba(4, 22, 93, 0.08);
    border-radius: 12px;
    padding: 24px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .explore-card:hover {
    background: #FFFFFF;
    border-color: rgba(227, 152, 127, 0.3);
    box-shadow: 0 4px 20px rgba(227, 152, 127, 0.15);
    transform: translateY(-2px);
  }

  .explore-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .explore-content {
    flex: 1;
  }

  .explore-content h3 {
    color: #04165D;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }

  .explore-content p {
    color: #6B7280;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.4;
  }

  .explore-arrow {
    color: #E3987F;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .explore-card:hover .explore-arrow {
    transform: translateX(4px);
  }

  @media (max-width: 640px) {
    .explore-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
