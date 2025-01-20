# EduVocs - An interactive vocabulary database

EduVocs is an interactive database designed to address the challenges of interoperability and standardization in the education sector. Developed as part of the BIRD (Bildungsraum Digital) research and development project, EduVocs simplifies the search, reuse, and harmonization of controlled vocabularies, fostering connectivity across national and international educational services.

## Introduction

In an interconnected educational landscape, the absence of standardized vocabularies often results in fragmented solutions that hinder data exchange and collaboration.

EduVocs tackles this challenge by:

- Collecting, structuring, and making accessible existing controlled vocabularies.
- Facilitating communication among diverse stakeholders.
- Promoting harmonization within the educational sector.
- Reducing redundant efforts in vocabulary development.
- Enhancing interoperability and compatibility with global developments.
- Simplifying data exchange among various services.

EduVocs is a resource for exploring vocabularies from national and international educational projects, offering visibility and reusability for controlled vocabularies.

## Development

Every interested party is encouraged to contribute to this project.

### Frameworks

- [Svelte](https://svelte.dev/)

### Local server

Run the local development server:

```bash
npm run dev
```

To automatically open the app in a browser tab:

```bash
npm run dev -- --open
```

**Note:** This runs the development server powered by Vite (`vite dev`) to support code changes on-the-fly.

### Build for deployment

Bundle a production-ready build to `./dist`, optimizing the project for deployment based on Vite (`vite build`):

```bash
npm run build
```

### Preview for deployment

Preview the production-ready build from `./dist` locally using Vite (`vite preview`):

```bash
npm run preview
```

### Deployment

Deploy the app, e.g. with Vercel by using the `@sveltejs/adapter-vercel` (see [Documentation](https://svelte.dev/docs/kit/adapter-vercel)).

## Scripts

- **`dev`**: Starts the development server (`vite dev`).
- **`build`**: Builds the project for production (`vite build`).
- **`preview`**: Previews the production build locally (`vite preview`).
- **`check`**: Synchronizes SvelteKit and runs TypeScript checks using a custom `tsconfig` file.
- **`check:watch`**: Runs `check` in watch mode to dynamically validate changes.
- **`format`**: Formats the project files using Prettier.
- **`lint`**: Checks the project files for style and syntax issues using Prettier and ESLint.

## Contributions

We welcome contributions to the EduVocs project!

Examples of participation:

1. Submitting new vocabularies or suggestions for improvement.
2. Reporting issues and proposing fixes.
3. Enhancing the documentation or code.

Feel free to open a pull request or create an issue on GitHub.

Together, we can make EduVocs a cornerstone of interoperability in the educational sector!

## Authors

- [Steffen Rörtgen](https://github.com/sroertgen/)
- [Manuel Oellers](https://github.com/oellers/)
