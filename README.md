# grounded-website

The landing page for [Grounded](https://github.com/ncecere/grounded), an open-source (MIT), multi-tenant RAG and agents platform: teams turn their documents and websites into knowledge bases and publish agents that answer only from them, with citations. The site is served at https://grounded.bitop.dev; the documentation lives in its own repository and site, https://docs.grounded.bitop.dev.

It's one long page plus a 404 page, with no pricing, sign-up, forms, cookies, tracking or third-party requests. The text describes Grounded **v0.4.0** and is checked against that release's README, changelog and design notes. `lib/site.ts` holds the version, the release day (set it when the release is tagged; the footer shows it) and the release links.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with `output: "export"`: `next build` writes plain static files to `out/`.
- React 19, TypeScript 5.9, [Tailwind CSS](https://tailwindcss.com) 4.
- Inter Variable, self-hosted from `@fontsource-variable/inter`.
- Node 22 and npm; every version is pinned in `package-lock.json`.
- nginx (alpine, pinned by digest) in the container.

## Brand tokens: `app/brand.css`

`app/brand.css` holds Grounded's colours (light and dark), radii, shadows and font stacks, copied from the app's theme (`web/src/components/ui/themes/neutral.css` and `styles/tokens.css` in the Grounded repository), and maps them to Tailwind v4 theme variables (`bg-brand-surface`, `text-brand-muted`, `bg-brand-primary`, `rounded-card`, `shadow-brand-2` and so on). The docs site ([grounded-docs](https://github.com/ncecere/grounded-docs), `app/brand.css`) uses **the same file, byte for byte**, so the two sites look like one product. Change it in both repositories together and check with `cmp`.

The theme follows the system (`prefers-color-scheme`); `data-theme="dark|light"` or `class="dark|light"` can force one.

## Screenshots

The page has named screenshot slots, listed in `lib/slots.json` with their alt text and captions. Screenshots come only from the public "Example University" set in `../grounded-assets/screenshots/` (see its `MANIFEST.md`); never use screenshots from anywhere else.

```sh
npm run images   # copy the screenshots that exist into public/images as WebP, record their sizes
npm run og       # rebuild public/og.png, the Open Graph card (uses the chat screenshot if present)
```

Commit the results (`public/images/`, `lib/screenshots.json`, `public/og.png`). A slot without a file shows a clearly marked placeholder with the expected file name. Set `SCREENSHOTS_DIR` to read from another directory.

## Local development

```sh
npm ci
npm run dev      # http://localhost:3000
```

## Build

```sh
npm run build    # static export to out/, then scripts/postbuild.mjs
```

`scripts/postbuild.mjs` hashes the inline scripts Next.js writes into the HTML and puts them in the Content-Security-Policy (`build/security-headers.conf`), so `script-src` needs no `'unsafe-inline'`. It fails the build if the output loads a script, style sheet or font from another origin.

To run the production image locally, read-only like in a cluster:

```sh
npm run docker   # builds the image and serves it on http://127.0.0.1:8080
```

## Container image and deployment

`.github/workflows/publish.yaml` builds the site on every pull request and push. On `main` it also builds and pushes a multi-arch (linux/amd64, linux/arm64) image:

- `ghcr.io/ncecere/grounded-website:<full commit SHA>`
- `ghcr.io/ncecere/grounded-website:latest`

The image is nginx serving `out/`:

- runs as user 101, listens on port **8080**, and answers `GET /healthz` with `ok`;
- works with a read-only root filesystem: the pid file and temp paths are under `/tmp`, so mount an `emptyDir` (or tmpfs) there;
- sends security headers (CSP, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP);
- caches hashed assets under `/_next/static/` for a year (`immutable`), other assets for an hour, and revalidates pages on every request.

Deployment (Flux, in the owner's homelab) lives outside this repository. New GHCR packages start private; make the package public, or pull it with a registry credential.

Dependabot opens one grouped pull request a week each for npm, GitHub Actions and the Docker base images.

## Licence

- **Code:** MIT, see [`LICENSE`](LICENSE).
- **Website text:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see [`LICENSE-CONTENT`](LICENSE-CONTENT).
- The Grounded mark comes from the Grounded repository (MIT). Inter is under the SIL Open Font License 1.1.
