# housam-honda — project rules (FRONTEND-STANDARD-V1.0)

Standard: Reporting99/devops `frontend-standard/FRONTEND-STANDARD-V1.0.md`.

- Routes `app/[lang]/` (exception: root `app/`, no `src/app`); components `src/components/`; page data `src/shared/data/`; config `src/config.js`; locale redirect in `middleware.ts`.
- SEO: `src/lib/{page-metadata,page-jsonld,schema,schema-refs,canonical-url,hreflang-validation,seo-content}.ts`; guards `npm run validate:seo`, `validate:sitemap-url-invariants`. No CMS.
- Lockfile `package-lock.json` is committed (it was gitignored; production installed from an untracked copy).
- Runtime today: root pm2 `next start -p 3003` in-place — known risk; do not change process management in frontend work.
- Commands (Node ≥18.17 per engines; production 20.20.2, npm): `npm run typecheck` · `npm run lint` · `npm test` · `npm run build` (`--webpack`).
- Never: redesign, change URLs/metadata/JSON-LD/hreflang, expose env values, claim done without command output.

Compliance: `node <devops checkout>/frontend-standard/check.mjs .` from this directory: 8/8 mandatory expected, or only the exceptions listed above.
