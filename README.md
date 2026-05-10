# Hossam Center Frontend

Public website for Hossam Maintenance Center, built with Next.js, React, TypeScript, Tailwind CSS, local data modules, markdown content, and sitemap generation.

Start with the full developer handoff:

- [DEVELOPER_HANDOFF.md](./DEVELOPER_HANDOFF.md)

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
npm audit
```

## Notes

- Use Node.js `20.9.0` or newer for Next 16.
- Development uses `next dev --webpack`.
- Production start uses port `3003`.
- `npm run build` also runs `next-sitemap`.
- Main site settings live in `src/config.js`.
- Navigation/footer/content data lives under `src/shared/data`.
- Blog, privacy, and terms content lives under `src/content`.
- The app currently does not require application environment variables.
- Storybook tooling was removed from `package.json` to keep npm audit clean; legacy story files remain for reference.
- `next` is temporarily on a patched canary release to keep `npm audit` clean until stable Next ships the nested PostCSS fix.
