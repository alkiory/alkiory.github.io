---
title: Tolerance in the Workplace and the Programmer's Ego
publishDate: 2024-07-04 00:00:00
img: https://cdn.pixabay.com/photo/2020/04/16/09/30/shield-5049877_1280.jpg
img_alt: A shield on a neutral background — a metaphor for psychological safety and the defenses we build around our work.
description: Tolerance and ego in software teams aren't soft topics — they're measurable performance factors. What the research on psychological safety, blame, and learning says about keeping both in check.
tags:
- Communication
- Psychological safety
- Team culture
- Leadership
---

Collaboration is essential for software teams, but two forces quietly decide whether that collaboration actually works: how much tolerance the workplace tolerates for difference — of opinion, of background, of working style — and how the programmer's ego behaves when it's challenged. Neither is a "soft" topic. Both show up in delivery metrics.

### What Tolerance Actually Means Here

Tolerance in this context is not politeness. It's the working environment's capacity to absorb disagreement without punishing it: a junior saying "I think this design is wrong," a reviewer pushing back on a senior's PR, someone admitting they broke the build.

The research on this is unusually consistent. Google's [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness) found that **psychological safety** — the shared belief that the team is safe for interpersonal risk-taking — was the single strongest predictor of team effectiveness, ahead of individual talent or seniority. Amy Edmondson, whose work the study built on, defines it the same way in [The Fearless Organization](https://amycedmondson.com/the-fearless-organization/): it's not about being nice; it's about being able to say what needs saying.

Where tolerance is low, the failure mode is predictable: bad news travels slowly. Bugs get hidden, designs go unchallenged, and the same mistake gets made twice.

### The Programmer's Ego: A Double-Edged Sword

Ego in programming is often treated as a personality flaw. It's more useful to see it as a *resource with a failure mode*.

**The productive side** is real: confidence is what lets someone propose an unproven design, defend a technically correct but unpopular decision, or volunteer for the ugly refactor nobody wants. Teams with zero ego produce zero conviction.

**The failure mode** is when identity gets attached to code. Then feedback stops being information and becomes a threat. The classic symptoms:

- Treating a code review comment as a personal attack instead of a data point.
- Defending a design because *you* wrote it, not because it's the best option.
- Optimizing for looking smart instead of for being useful — the pattern that leads people to avoid asking "stupid" questions, which is exactly how knowledge gaps survive.

This isn't a programmer-specific pathology, but software amplifies it: the work is deeply individual and also deeply reviewable, so every commit is a public statement about your competence.

### What Actually Helps

The evidence points to structural fixes over personality fixes:

- **Separate the code from the coder in language.** "This function has a bug" lands differently than "you broke this." It sounds trivial; it changes what the other person can hear.
- **Make review norms explicit.** Teams that agree on what a review is *for* (the code, not the person) spend less energy litigating tone in every comment.
- **Reward the admission, not just the fix.** If the only visible recognition goes to heroics, people learn to hide problems. A blameless postmortem culture — the practice popularized in [the DevOps handbook literature](https://itrevolution.com/product/accelerate/) — works because it makes honesty cheaper than concealment.
- **Leaders go first.** A team lead who says "I got this wrong" in public does more for psychological safety than any poster. The behavior that gets modeled is the behavior that gets repeated.

### Where This Gets Hard

There's a genuine tension worth naming: tolerance without standards becomes mediocrity, and confidence without humility becomes arrogance. The goal isn't to remove ego or disagreement — it's to keep both pointed at the *problem* instead of at the *person*. A team that argues hard about designs and then ships without grudges is exactly the balance this is about.

#### Sources & Further Reading

- [Google re:Work — Understanding team effectiveness (Project Aristotle)](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness)
- [Amy Edmondson — The Fearless Organization](https://amycedmondson.com/the-fearless-organization/)
- [DORA — State of DevOps research](https://dora.dev/research/)
- [Accelerate — The Science of Lean Software and DevOps (IT Revolution)](https://itrevolution.com/product/accelerate/)
