---
title: "RPI Framework: Research, Plan, Implement in AI Coding"
publishDate: 2026-09-08 00:00:00
img: https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Artificial_Intelligence_%28AI%29_and_Robotics_exhibition_at_the_Heinz_Nixdorf_MuseumsForum.jpg/1920px-Artificial_Intelligence_%28AI%29_and_Robotics_exhibition_at_the_Heinz_Nixdorf_MuseumsForum.jpg
img_alt: A view of the artificial intelligence and robotics exhibition at the Heinz Nixdorf MuseumsForum.
description: "The RPI framework (Research, Plan, Implement) turns chaotic AI-assisted coding into predictable delivery. Learn how the three phases and the FAR/FACTS validation gates work."
tags:
- RPI Framework
- AI Coding
- Agentic Engineering
- Prompting
- Software Development
---

**RPI** — short for **Research, Plan, Implement** — is a three-phase framework for working with AI coding assistants. Instead of asking an AI to "build a feature" and hoping for the best, you force the work through two controlled checkpoints before any code is written. The idea is simple: give the AI a structured job, validate its output at each stage, and only then let it write code.

The result is a workflow that trades a little speed for much better reliability. Fewer hallucinated libraries, less scope creep, and code that passes its own tests the first time — usually.

### What Is the RPI Framework?

RPI is a mental model and a set of working practices for pair-building software with an LLM. It was formally written up by **Patrick Robinson**, a San Antonio-based staff engineer and AI technical coach, in his article [Introducing the RPI Strategy](https://patrickarobinson.com/blog/introducing-rpi-strategy/), and it's published as an open [repository of the methodology](https://github.com/patrob/rpi-strategy) on GitHub.

Robinson credits a talk on context engineering — [Advanced Context Engineering for Agents](https://www.youtube.com/watch?v=IS_y40zY-hc) by YC Root Access — as the spark for the framework. Related work points in the same direction: HumanLayer's [12-Factor Agents](https://www.youtube.com/watch?v=8kMaTybvDUw) talk catalogs patterns for reliable LLM applications, the [Agentic Engineering docs](https://path.kilo.ai/introduction/patterns/rpi/) document the same Research → Plan → Implement shape with a very similar example, and Microsoft's [HVE Core](https://microsoft.github.io/hve-core/docs/rpi/) documents an RPI variant that adds a final *Review* stage.

Because several teams formalized the same idea around the same time, "who invented RPI" is a reasonable question with a few reasonable answers. What's consistent across every version is the core discipline: **separate understanding from decision-making from execution**, and validate between each.

### How It Works: Three Phases, Two Gates

The framework breaks a coding task into three phases, each with a defined exit state. You should not half-enter the next phase until the previous one is genuinely complete.

#### Phase 1 — Research: Build Context & Insight

The goal is to convert an initial request into a structured understanding of the problem: who it affects, what code is involved, and what options exist. You document what exists today — you do *not* suggest changes, critique, or plan.

- **Reverse prompting:** rather than dumping all the requirements yourself, you let the AI ask clarifying questions one at a time ("Should this work from the file manager or the dashboard?" "Any file type restrictions?"). This surfaces assumptions you hadn't considered.
- **Document what exists:** map the affected files, capture how the feature works today, and flag open questions, all into a single markdown artifact (typically `rpi/[problem]/research.md`).
- **Validate with the FAR scale:** score the research document on **Factual** (based on actual code, not assumptions), **Actionable** (you know exactly what to build), and **Relevant** (it solves the real need). The pass threshold is **Factual ≥ 4, Actionable ≥ 3, Relevant ≥ 3, mean ≥ 4.00**, per the [FAR scale rubric](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md).

A human reviews the research doc before moving on. This decision — what the problem *actually* is — is too important to delegate.

#### Phase 2 — Plan: Decide What to Do & How

Now you turn the research into an executable path: a phased sequence of **atomic tasks**, each simple enough to be one command call or one file edit. Atomic tasks are the heart of the plan — they keep the AI on track, make progress easy to verify, and prevent the context window from overflowing.

- **Break it into phases and checkboxes:** e.g. Phase 1 "add bulk-selection UI", Phase 2 "create confirmation modal", Phase 3 "implement the backend API".
- **Validate with the FACTS scale:** each task should be **Feasible** (doable with available tools), **Atomic** (single responsibility), **Clear** (unambiguous), **Testable** (has success criteria), and **Scoped** (properly bounded). The pass threshold is **mean ≥ 3.00** across all five dimensions, per the [FACTS scale rubric](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/facts-scale.md).

The plan should be explicit enough that a fresh AI session — or a junior developer — could execute it without extra context.

#### Phase 3 — Implement: Ship & Learn

With a validated plan, implementation becomes deliberately boring and mechanical. The AI reads the plan, executes task by task, and you validate after each one.

- **Quality gates:** after every task, the build must compile, the linter must pass, and the tests must pass. If any gate fails, you stop and fix before moving on.
- **Checkboxes as checkpoints:** tasks in `plan.md` are ticked off as they complete. If the context window fills halfway, the checkboxes let the AI compact and resume exactly where it stopped.
- **Choose your feedback loop:** *task-by-task* for maximum control, *phase-by-phase* to balance speed and control, or *whole-plan* when you're confident in the plan.

### Why the Validation Scales Matter

The FAR and FACTS scales are the framework's guardrails. Without them, the three phases are just good advice. With them, failures get caught before they cost you hours:

| AI failure mode | How RPI prevents it |
|---|---|
| Context overflow | Atomic tasks keep work focused and bounded |
| Hallucination | FAR requires factual evidence, not guesses |
| Wrong problem solved | Research validates relevance before planning |
| Untestable code | FACTS requires clear success criteria |
| Scope creep | Atomic tasks and gates maintain boundaries |

The framework leans on what AI does well — pattern matching, boilerplate generation, following checklists — while humans keep the strategic decisions and the validation.

### How to Use RPI in Real Work

The practical recipe is short enough to start today:

1. **Pick one real ticket.** RPI is for multi-file, high-consequence work: refactors, migrations, feature additions, large upgrades, incident cleanup. Skip it for a one-line fix or a quick prototype — the validation overhead isn't worth it there.
2. **Research.** In a fresh session, prompt the AI to research the problem and ask clarifying questions one at a time. End with a `research.md` that maps affected files, and score it against FAR.
3. **Review the research yourself.** Confirm the problem framing before anyone plans a solution.
4. **Plan.** In a new session, feed the research doc. Ask for a phased plan of atomic tasks with checkboxes and success criteria. Score it against FACTS.
5. **Implement.** In yet another fresh session, execute the plan task by task, running build → lint → test after each. Tick the boxes as you go.
6. **Choose your loop.** Task-by-task if you want tight control, phase-by-phase for a faster rhythm.

**Sanity check on the cost.** A [case study in the Agentic Engineering docs](https://path.kilo.ai/introduction/patterns/rpi/) shows the trade-off clearly: removing a feature that touched 32 files took about 9 minutes of research, 4 minutes of planning, and 39 minutes of implementation — roughly 52 minutes total — with a build that passed on the first attempt and no review comments. That's slower than "just do it," but it's also *predictable and correct*, which is usually the point.

### A Concrete Example

Patrick Robinson's post uses the ticket *"Add ability for users to bulk delete their uploaded files."*

- **Research:** reverse-prompting surfaces questions you might have missed (where does the action live? any file-type restrictions? what about shared files?), then the AI maps the relevant code and writes a research doc that passes FAR.
- **Plan:** the AI produces a phased, atomic task list with checkboxes — add bulk-selection UI, build the confirmation modal with a file count, implement the backend delete API — and each phase passes FACTS.
- **Implement:** the AI works through tasks, validating build, tests, and lint after each, keeping you in control of decisions while it handles the mechanics.

### A Real Run: Adding Reading Time to This Blog

To make this concrete, let's run the cycle on a real task in this very blog's codebase — an Astro site with bilingual content (`en`/`es`). The task: **show an estimated reading time on every post.**

**Research.** I framed the problem and let the assistant probe it. A few reverse-prompting questions came up that I hadn't thought through: should the estimate come from the Markdown source or the rendered HTML? Should it be language-aware? What about posts full of code blocks — would a naive word count inflate the number? I mapped the relevant files and wrote them into a research doc:

```
F: 4  A: 4  R: 4  Mean: 4.00  --> PASS
```

The key factual discovery: the Content Layer API already exposes each post's Markdown body (`entry.body`) and the i18n dictionary already has a `blog` namespace for both languages. That means the feature is purely a build-time computation — no runtime JavaScript. Knowing what already existed kept me from over-building.

**Plan.** I turned the research into atomic tasks with checkboxes, each a single responsibility:

```
## Phase 1: Reading-time helper
- [x] Create src/lib/reading-time.ts (strips code, counts words, ~200 wpm)

## Phase 2: i18n strings
- [x] Add readingTime to es and en blog namespaces

## Phase 3: Render in the post hero
- [x] Import helper + translations in [slug].astro
- [x] Render the reading-time line
- [x] Add the .reading-time style

F: 5  A: 4  C: 4  T: 4  S: 4  Mean: 4.20  --> PASS
```

Notice the scope decision in the Plan phase: I deliberately marked displaying it on the blog index **cards** as *out of scope*. That kept the change small and testable instead of ballooning into a card redesign.

**Implement.** I executed the tasks in order, running the repo's quality gates after each. There's no unit-test runner configured here, so the gate is `astro check` (strict TypeScript) plus a full `astro build`. Both passed — 60 pages built — and the estimate rendered on both language variants:

- `/en/blog/...` → **7 min read**
- `/es/blog/...` → **8 min de lectura**

That's the payoff of the atomic tasks: the plan file itself became the progress tracker, and the build gate caught nothing because each change was small enough to reason about. The whole feature was three files and one new module.

### Where It Fits in the Bigger Picture

RPI is part of a wider shift in how teams use AI. The question is no longer "can the AI write code?" but "how do we direct it toward outcomes we can trust?" Frameworks like this one answer that by making the AI's work auditable: every phase produces an artifact, every artifact is scored, and the human reviews the important decisions.

It isn't a silver bullet, and it isn't the right tool for every task. But for the complex, multi-file work where AI coding assistants are most useful — and most likely to go off the rails — putting a little structure in front of the model pays for itself quickly.

#### Sources & Further Reading

- [Patrick Robinson — Introducing the RPI Strategy](https://patrickarobinson.com/blog/introducing-rpi-strategy/)
- [patrob/rpi-strategy — RPI Strategy for Agentic Engineering](https://github.com/patrob/rpi-strategy)
- [Agentic Engineering — Research, Plan, Implement (RPI)](https://path.kilo.ai/introduction/patterns/rpi/)
- [HumanLayer — 12-Factor Agents: Patterns of reliable LLM applications (Dex Horthy)](https://www.youtube.com/watch?v=8kMaTybvDUw)
- [YC Root Access — Advanced Context Engineering for Agents](https://www.youtube.com/watch?v=IS_y40zY-hc)
- [Microsoft HVE Core — Understanding the RPI Workflow](https://microsoft.github.io/hve-core/docs/rpi/)
