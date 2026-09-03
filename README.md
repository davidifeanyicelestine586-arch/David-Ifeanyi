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
  layout.tsx       # global metadata and document shell
  page.tsx         # portfolio content and page sections
  globals.css      # visual system and responsive styles
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Update portfolio content

Project, skill and journey content currently lives in `app/page.tsx`. Before changing a factual claim, verify it against:

1. Notion portfolio/project documentation
2. GitHub repository/source evidence
3. Verified live destination

Keep project status conservative. Code presence alone does not prove production functionality.

## Deploy

This is a standard Next.js application and can be deployed to a compatible Next.js hosting provider. The production build command is:

```bash
npm run build
```

No application secrets are required by the current portfolio implementation.

## Content principles

- No fabricated experience, metrics, clients, awards or credentials.
- Planned work is never presented as completed.
- Live status is only used after verification.
- Sensitive repository artifacts are never reproduced in portfolio content.
