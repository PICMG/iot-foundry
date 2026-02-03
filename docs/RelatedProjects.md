---
title: Related Projects
layout: default
---

## Related Projects

{% include diagram.html %}

Below are known implementation repositories associated with IoTFoundry.

{% for p in site.data.projects %}
<div class="project-entry">
  <div class="project-title">
    <a href="{{ p.url }}">{{ p.name }}</a>
    {% if p.repo %}
    <span class="project-badges">
      <a href="{{ p.url }}"><img src="https://img.shields.io/github/last-commit/{{ p.repo }}" alt="last commit"></a>
    </span>
    {% endif %}
  </div>
  <div class="project-description">{{ p.description }} (status: {{ p.status }})</div>
</div>
{% endfor %}

If you maintain a repository that should be listed here, please open a pull request adding it to `_data/projects.yml`.

