---
title: The Stack Isn't the Heart of the Project. People Are.
publishDate: 2025-07-20 00:00:00
img: https://cdn.pixabay.com/photo/2017/12/16/01/42/madrid-3021998_1280.jpg
img_alt: A city street in Madrid, Spain — a metaphor for how many separate people and systems come together to keep a project moving.
description: A stack won't save a project whose team can't communicate. Here's what the research on psychological safety and team topology actually says about why people, not tools, decide software outcomes.
tags:
- code culture
- psychological safety
- team topologies
- human engineering
---

A stack won't save a project. Plenty of well-engineered systems have shipped nowhere because the team behind them couldn't agree on a direction. As developers we argue about frameworks, databases, and patterns constantly — but the evidence on what actually predicts delivery points somewhere else: the people and how they interact.

The quote that gets me every time is the same one that opens this article: *"The stack isn't the heart of the project. People are."* It sounds like a platitude. The research suggests it's closer to a measured fact.

### The Tech Is the Means, Not the End

The tech stack is the set of tools and languages you use to build. It matters — it determines what's easy to build, where performance bottlenecks live, and how hard hiring is. But a high-end guitar doesn't make a musician.

The important qualifier: a stack is *autonomous* in the sense that it can't compensate for a failing team. Two teams with identical stacks and dramatically different outcomes are a common enough observation that it's become a trope. The difference isn't usually raw skill; it's how decisions get made, whether people feel safe to disagree, and whether the team shares a mental model of what it's building.

### What the Research Actually Says

The strongest evidence for "people over stack" isn't anecdote — it's two decades of measurement.

**Psychological safety is the single strongest predictor of high-performing teams.** In Google's [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness), a multi-year study of more than 180 teams, psychological safety — the shared belief that it's safe to take risks, ask questions, and admit mistakes — came out as the #1 predictor of team effectiveness, ahead of individual talent and seniority. That's not a motivational slogan; it's an empirical finding.

**Team structure drives communication load.** _Team Topologies_ (Matthew Skelton and Manuel Pais) argues that how you organize teams — their size, their boundaries, their interaction modes — is itself a design decision. A stack backed by high-performance software can still deliver poorly if teams are shaped such that every change requires long coordination chains. The book's premise is that **organizational design is a first-class engineering concern**, not a HR one.

**Culture predicts delivery performance, not the other way around.** The [DORA studies](https://dora.dev/research/) — the largest longitudinal research on software delivery, run for over a decade by researchers like Nicole Forsgren, Jez Humble, and Gene Kim — consistently find that a "generative" organizational culture (trust, information sharing, blame-free handling of failure) correlates with higher software delivery performance and lower burnout. The finding that culture predicts throughput matters more than which tools you chose is precisely the "people over stack" thesis, stated as data.

In short: the stack is a constraint and an enabler, but it's the **allocation of attention, trust, and decision-making** among the people that determines outcomes.

### A Real Project, a Real Decision

In one recent project, our team had to make a genuinely technical call: migrate to microservices, or keep a clean monolith. The debate was framed as a technical one — coupling, scaling, deployment. But the resolution had almost nothing to do with the code.

It came down to:

- Whether the team shared enough context to own the change.
- What the realistic maintenance cost was given *our* staffing, not a hypothetical one.
- Whether the team had the emotional and cognitive bandwidth to absorb that complexity right now.

The architecture decision was, in practice, a **team-capacity and communication decision wearing a technical costume.** That's the real lesson. Good technical choices respect the team's actual shape.

### The Critical Analysis

Emphasizing the human side of engineering has real benefits, and real costs you should be honest about:

- **Benefits:** more resilient teams, decisions that stick (because everyone understands them), and knowledge that spreads rather than pooling in one person.
- **Risks:** it can look "less technical" in an org that rewards individual heroics; it's harder to justify to stakeholders who want a timeline, not a culture conversation; and it requires deliberate, ongoing effort — there's no one-and-done fix.

The risk worth naming: "people" is not an excuse to avoid engineering rigor. The point is that both matter, and the human dimension is the one that gets skipped.

### What to Do Differently

You can act on this today, without a big initiative:

- **Make it safe to ask questions.** Count how many times someone said "I don't know" or "why are we doing this" in your last planning session. If it's close to zero, that's a signal, not a virtue.
- **Check who actually decides.** Is the person with the loudest opinion making the call, or the person with the best context?
- **Design the team, not just the architecture.** Sketch who talks to whom, not just which component calls which.
- **Bias toward smaller coordination surfaces.** This is the practical payoff of Team Topologies: fewer people needing to sync = faster, less brittle delivery.

Next time you start a project, run the stack conversation and the *team* conversation together. The first decides what you can build; the second decides whether you'll finish.

#### Sources & Further Reading

- [Google re:Work — Understanding team effectiveness (Project Aristotle)](https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness)
- [Team Topologies — team structure and cognitive load](https://teamtopologies.com/)
- [DORA — State of DevOps research](https://dora.dev/research/)
- [Accelerate — The Science of Lean Software and DevOps (IT Revolution)](https://itrevolution.com/product/accelerate/)
