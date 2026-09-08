# Certification Badges Implementation

Status: SHIPPED (commit 8c7750c). Validated 2026-09-08: `CertBadges.astro` renders on home (`dist/<lang>/index.html` contains badge markup) and about page; badge assets resolve from `src/data/skills.ts`.

Leftover cleanup: `src/pages/[lang]/index.astro` still imports `certifications` directly but doesn't use it (the page goes through `CertBadges.astro`) — flagged as 1 of the 3 current `astro check` hints; safe to delete that import line.

## Overview
Added certification badges feature to the portfolio site displaying IBM, SkillUp Online, University of Alberta, and Credly badges on both the home page and about page.

## Files Modified

### Data Layer
- **src/data/skills.ts** - Updated `certifications` array with new certification entries including badge image paths, issuer, date, and featured flag

### Components
- **src/components/CertBadges.astro** (NEW) - Component for displaying certifications on home page with featured card + badge grid
- **src/components/ui/icon.astro** - Fixed `class` prop to actually apply to SVG element

### Pages
- **src/pages/[lang]/index.astro** - Added CertBadges component section
- **src/pages/[lang]/about.astro** - Updated certifications section with badge display and gradient halo hover effect

### Assets
- **public/assets/badges/** - Added badge images:
  - `ibm-logo.svg` - IBM 8-bar logo (official)
  - `ibm-logo-reverse.svg` - IBM reverse logo
  - `cloud-native-devops.png` - Credly badge for Cloud Native certification
  - `intro-systems-architecture.png` - Credly badge for Intro to Systems Architecture
  - `ualberta.png` - University of Alberta logo
  - Legacy SVGs (no longer used): `ibm-architect.svg`, `credly.svg`, `coursera.svg`, `skillup.svg`, `ualberta.svg`

### Translations
- **src/data/i18n.ts** - Added certification name translations in English and Spanish

## Badge Image Mapping

| Certification | Badge Image |
|--------------|-------------|
| IBM Systems and Solutions Architect (featured) | `/assets/badges/ibm-logo.svg` |
| Cloud Native, Microservices, Containers, DevOps, and Agile | `/assets/badges/cloud-native-devops.png` |
| Introduction to Systems Architecture | `/assets/badges/intro-systems-architecture.png` |
| Enterprise Data Architecture and Operations | `/assets/badges/cloud-native-devops.png` |
| Business Process Modeling, Analysis, and Improvement | `/assets/badges/ibm-logo.svg` (SkillUp/IBM partner) |
| IT Systems Design and Analysis | `/assets/badges/ibm-logo.svg` (SkillUp/IBM partner) |
| Software Processes and Agile Practices | `/assets/badges/ualberta.png` |

## Hover Effect
Both pages use the same gradient halo hover effect as HorizontalTimeline:
- `::before` pseudo-element with cyan→purple animated gradient
- `::after` inner mask with `var(--gradient-subtle)`
- Opacity transition on hover/focus-within
- Matches `.h-tl-card::before` pattern exactly

## Certification Data Structure
```typescript
export type Certification = {
  name: string;
  web: string;
  badge?: string;     // optional SVG/PNG badge path
  issuer?: string;
  date?: string;
  featured?: boolean; // only IBM Systems Architect is featured
};
```

## Layout

### Home Page (CertBadges.astro)
- Featured card (large) on left, badge grid on right (desktop)
- Stacked on mobile
- Arrow icon animates on hover

### About Page
- Featured cert card with margin-bottom: 0.5rem
- Compact badge grid wrapped in div.cert-grid with margin-top: 1.5rem
- Uses Grid component with variant="small"
