# Tend

Tend is a personal AI agent lab for learning in public. The site brings
together field notes, interactive experiments, and systems worth shipping.

Live site: [www.fulafu.com](https://www.fulafu.com/)

## What is inside

- Field notes, interactive experiments, and build logs
- AI agent learning and personal archive collections
- Sitemap generation

## Stack

- Astro 6 and MDX
- React 19
- TypeScript

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The local development server runs at `http://localhost:4321/` by default.

Other commands:

```sh
npm run build
npm run preview
npm run astro -- --help
```

## Structure

```text
public/          Static assets
src/components/ Shared UI components
src/content/    Site content collections (field-notes, builds, games)
src/data/       Structured site data
src/layouts/    Page layouts
src/pages/      Site routes
src/styles/     Shared styles
```

## Deployment

Production runs on the `sv` server with Docker Compose. The web container serves the
Astro build, the comments container stores SQLite data, and the dedicated Cloudflare
Tunnel serves `www.fulafu.com`. The setup and backup commands are documented in
`server/README.md`.

The GitHub Pages workflow remains available as a static fallback build. It does not
hold comment data.

## Credits

The original Astro starter was based on
[Bear Blog](https://github.com/HermanMartinus/bearblog/).
