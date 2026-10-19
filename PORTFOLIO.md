# Portfolio documentation

## Requirements

- Node.js 24 LTS
- npm

The site is a static Vite application with no backend or runtime credentials.

## Development

From the project directory:

```sh
npm ci
npm run dev
```

For a production build and local preview:

```sh
npm run build
npm run preview
```

## Structure

- `index.html`: introduction, projects, biography, education, certifications, contact, support and footer.
- `src/main.js`: theme switching, navigation, section transitions, dialogs, email copying and local time.
- `src/project-details.js`: project descriptions.
- `src/style.css`: typography, colors, layouts and responsive styles.
- `public/portrait.png`: portrait.
- `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png`: browser and touch icons.
- `vite.config.js`: relative asset paths for root and subpath deployment.

## Interface

The default theme is dark. An explicitly selected theme is stored in the browser. Navigation and dialogs support keyboard use, visible focus and reduced-motion preferences.

Typography uses the operating system's fonts: San Francisco on Apple platforms, with Helvetica/Arial-family fallbacks elsewhere. No external font service is required.

## External links

Contact links open the visitor's email application. Social links lead to the corresponding profiles. Optional support links open Stripe:

https://buy.stripe.com/aFaeVe1eAgys6gX68f53O00

The site does not collect card information or contain analytics, advertising trackers or contact forms.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` installs dependencies, builds the site and publishes `dist/` to GitHub Pages on pushes to `main`.

The relative asset base supports both the domain root and a subpath such as `/Portfolio/`.

## Design references

- [Swift-DocC typography](https://github.com/swiftlang/swift-docc-render/blob/c215689a67cec9742b7253befbd650b0d47973ea/src/styles/core/typography/_font-styles.scss)
- [Swift-DocC layout](https://github.com/swiftlang/swift-docc-render/blob/c215689a67cec9742b7253befbd650b0d47973ea/src/styles/core/_breakpoints.scss)
- [Swift-DocC navigation](https://github.com/swiftlang/swift-docc-render/blob/c215689a67cec9742b7253befbd650b0d47973ea/src/components/NavBase.vue)
