# Stride Template

> **⚠️ Work in Progress:** This template is currently under active development.

A Next.js template inspired by the [Alloy MVC Template](https://github.com/episerver/templates), showcasing composition (experiences) with the latest Optimizely CMS JavaScript SDK.

This starter template comes with pre-built components and examples for building headless applications using Optimizely's composition (experience) features, styled with Tailwind CSS and fully typed with TypeScript.

## Prerequisites

You need a CMS instance with Graph installed. Both local and SaaS instances are supported.

1. Log in to your Optimizely CMS admin interface.
2. Navigate to **Settings** → **API Keys**.
3. Create a new API key.
5. Navigate to **Settings** → **Set Access Rights**.
6. Ensure the root is selected and **Apply settings for all subitems** is checked.
7. Add full permissions for the API key.
8. Save access rights.
4. Create a copy of `.env.example` and rename it to `.env`, then fill out all the environment variables.

Sync all configuration to the CMS:

```bash
npm run config:push
# or
yarn config:push
# or
pnpm config:push
# or
bun config:push
```

## Import Content

1. Navigate to **Settings** → **Import Data**
2. Upload the `ExportedFile.episerverdata` file from this template directory
3. Select the root in **Select content destination**.
4. Ensure **Update existing content items with matching ID** is checked.
5. Click **Begin Import**.

This will import all the pre-configured pages, components, and content structure needed for this template.

## Run Template

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.
