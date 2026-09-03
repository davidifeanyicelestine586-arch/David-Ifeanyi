# David Ifeanyi — Professional Portfolio

A factual, CV-linked portfolio for David Ifeanyi, a Mechatronics Engineering student developing practical software and web development capabilities through hands-on projects.

## Purpose

This repository is the presentation layer for documented technical work. Claims are kept conservative and are based on portfolio documentation, GitHub evidence and verified live projects.

## Stack

- Next.js 16
- React 19
- TypeScript
- CSS

## Structure

```text
app/
  layout.tsx
  page.tsx
  projects/page.tsx
  projects/tech-stack-architect/page.tsx
  globals.css
data/
  portfolio.ts
```

Project/profile content is centralized in `data/portfolio.ts`. UI components should consume this data rather than duplicating project facts.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm run start
```

## Updating content

Before changing a factual claim, verify it against:

1. Notion portfolio/project documentation
2. The relevant GitHub repository/source
3. The verified live destination, where applicable

Keep status labels conservative. Code presence does not prove production functionality. Targets are not achievements. Never add secrets, tokens, credentials or sensitive repository artifacts.

## Deployment

This is a standard Next.js application and can be deployed to a compatible Next.js hosting provider. No application secrets are required by the current portfolio implementation.

## Content principles

- No fabricated experience, metrics, clients, awards or credentials.
- Planned work is never presented as completed.
- Live status is only used after verification.
- The development journey is presented as evidence of progression, not as manufactured seniority.
