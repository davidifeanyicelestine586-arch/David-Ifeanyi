# David Ifeanyi — Professional Portfolio

A factual, CV-linked portfolio for David Ifeanyi, a Mechatronics Engineering student developing practical software and web development capabilities through hands-on projects.

## Purpose

This repository is the presentation layer for David's documented technical work. Portfolio claims are intentionally conservative and are based on verified project documentation, GitHub evidence, and verified live projects.

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
  projects/
    tech-stack-architect/
      page.tsx
  globals.css
```

Portfolio content is currently kept close to the page implementation for the first build. As the project grows, content should be moved into typed data modules so new projects can be added without changing UI components.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate a production build

```bash
npm run build
npm run start
```

## Update portfolio content

Before changing any factual claim, verify it against:

1. Notion portfolio/project documentation
2. GitHub repository/source evidence
3. Verified live destination

Keep project status conservative. Code presence alone does not prove production functionality. Never turn a target into an achievement.

## Deploy

This is a standard Next.js application and can be deployed to a compatible Next.js hosting provider. No application secrets are required by the current portfolio implementation.

## Content principles

- No fabricated experience, metrics, clients, awards or credentials.
- Planned work is never presented as completed.
- Live status is only used after verification.
- Sensitive repository artifacts are never reproduced in portfolio content.
