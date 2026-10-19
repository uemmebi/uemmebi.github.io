# Umberto Alinei — Portfolio

An English-language portfolio for Umberto Alinei, with an Apple-inspired layout, native system typography, a color portrait, academic projects, light/dark themes, reduced-motion support and an optional Stripe coffee link.

## Run locally

Install Node.js 24 LTS, then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite, normally http://localhost:5173. Keep the terminal running. Press Ctrl+C to stop.

## Production

```sh
npm run build
npm run preview
```

The production files are in `dist/`. The existing GitHub Pages workflow builds and deploys pushes to `main`. Assets use relative paths to support deployment beneath `/Portfolio/`.

See [PORTFOLIO.md](PORTFOLIO.md) for project structure, interface details and deployment instructions.
