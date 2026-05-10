# Hossam Center Developer Handoff

This project is the public website for Hossam Maintenance Center, a Honda-focused automotive maintenance center. It is based on the Tailnext template, but the live site is customized around Honda service pages, static marketing content, markdown blog posts, sitemap generation, dark mode, and reusable Tailwind widgets.

## Current Stack

- Framework: Next.js App Router, React 19, TypeScript.
- Styling: Tailwind CSS 3, Tailwind Typography, global styles in `src/assets/styles/base.css`.
- UI/state: React client components, `next-themes` for dark mode, `tailwind-merge`.
- Icons: `@tabler/icons-react`.
- Content: TypeScript data modules under `src/shared/data`, plus markdown files under `src/content`.
- Blog parsing: `gray-matter` and `markdown-it`.
- HTTP client: `axios`, currently available as a dependency but not used for a live API integration.
- Sitemap: `next-sitemap`, triggered by the `postbuild` script.
- Package manager: npm with `package-lock.json`.

Use Node.js `20.9.0` or newer for this dependency set. The original `engines` field allows Node `>=18.17.0`, but Next 16 requires Node `20.9.0+`.

## Security And Dependency State

`npm audit` is clean at the time of this handoff.

The audit cleanup included:

- Updating `next` to `^16.3.0-canary.18` because the latest stable Next version in this environment still pulled a vulnerable nested PostCSS copy.
- Updating `eslint-config-next` to the matching `^16.3.0-canary.18`.
- Updating root `postcss` to `^8.5.14`.
- Running `npm audit fix` to clear fixable transitive issues such as `fast-uri` and Babel transform advisories.
- Removing Storybook runtime/tooling packages from `package.json` because `@storybook/nextjs` pulled a vulnerable webpack crypto polyfill chain through `elliptic`, and there is no non-vulnerable `elliptic` release currently available.
- Keeping `.npmrc` with `legacy-peer-deps=true` because the temporary Next canary can sit outside some packages' stable peer ranges.

The legacy `.storybook/` and `src/stories/` files are still present as reference/template material, but they are no longer part of installable tooling, lint, or TypeScript checks. Re-enable Storybook only after choosing a version/toolchain that does not reintroduce npm audit findings.

Revisit the Next canary once a stable Next release includes `postcss@8.5.10` or newer.

## Common Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
npm run prettier:check
npm audit
```

Notes:

- `npm run dev` runs `next dev --webpack`.
- `npm run build` runs `next build --webpack`, then `next-sitemap` through `postbuild`.
- `npm run start` runs the production server on port `3003`.
- `npm run lint` checks active app/source files and intentionally excludes legacy Storybook files.
- This app currently does not read application environment variables.

## Project Map

Root files:

- `next.config.js`: Next config, trailing slash/base path from `SITE`, remote image allowlist, strict mode, webpack mode.
- `next-sitemap.config.js`: sitemap and robots generation using `SITE.origin` and `SITE.basePathname`.
- `eslint.config.mjs`: ESLint 9 flat config using Next core web vitals and TypeScript rules.
- `tailwind.config.js`: Tailwind theme, content globs, and typography plugin setup.
- `postcss.config.js`: Tailwind and Autoprefixer PostCSS setup.
- `.npmrc`: temporary peer resolver setting for the Next canary.

Source layout:

- `app/`: App Router pages, route groups, root layout, and page metadata.
- `app/(pages)/`: static marketing pages such as about, contact, FAQs, pricing, and service pages.
- `app/(blog)/`: markdown-backed blog listing and detail routes.
- `app/(legal)/`: privacy and terms pages.
- `src/components/`: reusable atoms, common components, and page widgets.
- `src/shared/data/`: site, navigation, footer, page, service, FAQ, and contact data.
- `src/content/`: markdown blog, privacy, and terms content.
- `src/utils/`: permalink helpers, post loading helpers, and small utilities.
- `src/assets/`: local images and global CSS.
- `public/`: favicon, logo assets, and service hero videos.
- `.storybook/` and `src/stories/`: legacy Storybook/template files retained for reference only.

## Configuration

Primary site config lives in `src/config.js`:

- `SITE.name`
- `SITE.origin`
- `SITE.basePathname`
- `SITE.trailingSlash`
- `SITE.title`
- `SITE.description`

Navigation, announcement, footer links, social links, and contact/footer details live in `src/shared/data/global.data.tsx`.

Remote images are allowlisted in `next.config.js`:

- `images.unsplash.com`
- `source.unsplash.com`
- `res.cloudinary.com`
- `lh3.googleusercontent.com`

If a new remote image host is used in `next/image`, add it to `next.config.js`.

## Routes

Primary public routes:

- `/`
- `/about`
- `/services`
- `/services/Maintenance`
- `/services/Spare-Parts`
- `/services/Radar-Calibration`
- `/services/Car-Computer-Diagnostic`
- `/services/Computer-Software-Update`
- `/blog`
- `/[slug]` for markdown blog posts
- `/contact`
- `/faqs`
- `/pricing`
- `/privacy`
- `/terms`

Blog slugs are generated from markdown file names in `src/content/blog`.

## Content Model

Most page copy is data-driven:

- Home: `src/shared/data/pages/home.data.tsx`
- Services listing: `src/shared/data/pages/services.data.tsx`
- Service detail pages: one data file per service under `src/shared/data/pages/`
- About: `src/shared/data/pages/about.data.tsx`
- Contact: `src/shared/data/pages/contact.data.tsx`
- FAQ: `src/shared/data/pages/faqs.data.tsx`
- Pricing: `src/shared/data/pages/pricing.data.tsx`

Markdown content:

- Blog posts: `src/content/blog/*.md`
- Privacy policy: `src/content/privacy/privacy.md`
- Terms: `src/content/terms/terms.md`

The post loader in `src/utils/posts.js` reads markdown from disk at build time, parses frontmatter with `gray-matter`, and caches the loaded post list in memory.

## Forms

The contact form components render inputs and local UI state only. There is no backend submission, email sending, CRM integration, validation endpoint, or spam protection wired in right now.

If real lead capture is needed, add a server-side endpoint or external form service, then add validation, bot protection, error states, success states, and privacy/consent handling.

## Storybook Status

Storybook files remain in the repo, but Storybook packages and scripts were removed to keep `npm audit` at zero vulnerabilities. The previous Storybook setup also referenced addons that were not listed in `package.json`.

Do not assume `npm run storybook` exists. If Storybook is needed again, rebuild that setup deliberately and run `npm audit`, `npm run lint`, and `npm run build` afterward.

## Verification Checklist

Before handing off a change:

1. Run `npm audit`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Test `/`, `/about`, `/services`, `/contact`, `/blog`, `/privacy`, and `/terms`.
5. Test each service detail route.
6. Open at least one blog post generated from `src/content/blog`.
7. Confirm dark mode toggle, mobile navigation, service dropdown, images, and videos work.
8. Confirm `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt` are regenerated after build when route/content changes affect SEO.

## Troubleshooting

- Audit reports Next/PostCSS again: check whether stable Next now includes `postcss@8.5.10` or newer. If yes, move back to stable Next and verify install, lint, and build.
- Audit reports Storybook/elliptic again: Storybook tooling was likely reintroduced. Choose a patched Storybook setup before committing it.
- Build fails on missing image host: add the remote host to `next.config.js`.
- Blog page misses a post: check the markdown file extension, frontmatter, and `src/utils/posts.js`.
- Sitemap uses the wrong domain: update `SITE.origin` in `src/config.js`.
- Contact form does not submit: expected for the current implementation; no backend is connected.
