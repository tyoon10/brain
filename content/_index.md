---
title: BRAIN NYC
type: landing

sections:
  # ---- HERO ----
  - block: hero
    id: hero
    content:
      title: "BRAIN"
      text: |-
        **Business Roundtable for AI & Innovation in NYC**

        New York City's first inter-university AI network — uniting the graduate AI communities of Columbia, NYU, Cornell Tech, and Yale into shared infrastructure for hackathons, workshops, founder matchmaking, and industry partnerships.
      cta:
        label: View Events
        url: '#events'
      cta_alt:
        label: Partner With Us
        url: '#contact'
    design:
      background:
        color: '#0a0a0f'
        text_color_light: true
      spacing:
        padding: ["120px", "0", "100px", "0"]

  # ---- PARTNER SCHOOLS ----
  - block: markdown
    id: schools
    content:
      title: Partner Schools
      text: |-
        <div class="logo-grid">
          <a href="https://business.columbia.edu" target="_blank" rel="noopener">
            <img src="/media/logos/cbs.png" alt="Columbia Business School" class="partner-logo">
          </a>
          <a href="https://www.stern.nyu.edu" target="_blank" rel="noopener">
            <img src="/media/logos/nyu-stern.png" alt="NYU Stern" class="partner-logo">
          </a>
          <a href="https://www.tech.cornell.edu" target="_blank" rel="noopener">
            <img src="/media/logos/cornell-tech.png" alt="Cornell Tech" class="partner-logo">
          </a>
          <a href="https://som.yale.edu" target="_blank" rel="noopener">
            <img src="/media/logos/yale-som.png" alt="Yale School of Management" class="partner-logo">
          </a>
        </div>
    design:
      spacing:
        padding: ["60px", "0", "20px", "0"]

  # ---- SPONSORS ----
  - block: markdown
    id: sponsors
    content:
      title: Sponsors & Partners
      text: |-
        <div class="logo-grid sponsor-grid">
          <a href="https://anthropic.com" target="_blank" rel="noopener">
            <img src="/media/logos/anthropic.svg" alt="Anthropic" class="sponsor-logo">
          </a>
          <a href="https://lovable.dev" target="_blank" rel="noopener">
            <img src="/media/logos/lovable.svg" alt="Lovable" class="sponsor-logo">
          </a>
          <a href="https://eliseai.com" target="_blank" rel="noopener">
            <img src="/media/logos/elise.png" alt="EliseAI" class="sponsor-logo">
          </a>
          <a href="https://hebbia.ai" target="_blank" rel="noopener">
            <img src="/media/logos/hebbia.png" alt="Hebbia" class="sponsor-logo">
          </a>
          <a href="https://manus.im" target="_blank" rel="noopener">
            <img src="/media/logos/manus.png" alt="Manus" class="sponsor-logo">
          </a>
          <a href="https://bizcrush.com" target="_blank" rel="noopener">
            <img src="/media/logos/bizcrush.png" alt="BizCrush" class="sponsor-logo">
          </a>
        </div>

        <p class="partner-cta">Interested in sponsoring BRAIN events? <a href="#contact">Get in touch</a>.</p>
    design:
      spacing:
        padding: ["20px", "0", "60px", "0"]

  # ---- EVENTS ----
  - block: collection
    id: events
    content:
      title: Events
      subtitle: "Hackathons, workshops, mixers, and more — across NYC"
      text: ""
      count: 6
      filters:
        folders:
          - event
      sort_by: Date
      sort_ascending: true
      archive:
        enable: true
        text: "See all events"
    design:
      view: card
      columns: "2"
      spacing:
        padding: ["60px", "0", "60px", "0"]

  # ---- CONTACT ----
  - block: contact
    id: contact
    content:
      title: Partner With Us
      text: |-
        BRAIN connects NYC-based companies with a curated, cross-school graduate AI community. Sponsor a workshop, host an office visit, or explore a partnership.
      email: brain@brainyc.org
    design:
      columns: "2"
      spacing:
        padding: ["60px", "0", "80px", "0"]
---
