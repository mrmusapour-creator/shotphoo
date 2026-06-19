# SHOTPHOO

Production-ready starter for SHOTPHOO, a multilingual creative agency platform, marketplace, freelance hub, project intake system, admin dashboard, and PWA.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth-ready auth and RBAC helpers
- `next-intl`-style locale routing for English, Persian, and Arabic
- PWA manifest and service worker

## Run

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Use PostgreSQL for production. For local prototyping, point `DATABASE_URL` to any supported Prisma PostgreSQL database.

## Important Areas

- `app/[locale]/page.tsx`: premium homepage
- `app/[locale]/marketplace/page.tsx`: marketplace
- `app/[locale]/request-project/page.tsx`: smart project request form
- `app/[locale]/admin/page.tsx`: admin operating dashboard
- `app/api/project-requests/route.ts`: persisted project intake endpoint
- `prisma/schema.prisma`: complete commercial data model
