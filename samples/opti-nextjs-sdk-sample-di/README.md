# Optimizely CMS Sample Site

A Next.js sample site demonstrating integration with Optimizely CMS using the `@optimizely/cms-sdk`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- An Optimizely CMS instance
- Access to your CMS API keys (Settings → API Keys)

### Environment Setup

Copy `.env.template` to `.env` and fill in your values:

```bash
cp .env.template .env
```

| Variable | Description |
|---|---|
| `OPTIMIZELY_CMS_URL` | Base URL of your CMS instance, e.g. `https://example.cms.optimizely.com/` |
| `OPTIMIZELY_GRAPH_GATEWAY` | Content Graph endpoint. Defaults to `https://cg.optimizely.com/content/v2` |
| `OPTIMIZELY_GRAPH_SINGLE_KEY` | Content Graph read-only key (Settings → API Keys) |
| `OPTIMIZELY_CMS_CLIENT_ID` | API client ID for the CLI (Settings → API Keys → Create API key) |
| `OPTIMIZELY_CMS_CLIENT_SECRET` | API client secret for the CLI |
| `APPLICATION_HOST` | Public URL of this app, used for CMS webhooks/preview |

### Install & Run

```bash
npm install
npm run dev
```

The site runs at [https://localhost:3000](https://localhost:3000) (HTTPS is enabled by default for CMS preview compatibility).

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # Root route — loads CMS content for /
│   ├── [...slug]/page.tsx      # Dynamic route — loads CMS content by path
│   └── preview/page.tsx        # CMS visual editor preview mode
├── components/
│   ├── blocks/                 # CMS block components (CardBlock, HeroBlock, …)
│   ├── elements/               # CMS element components (TextElement, RichTextElement, …)
│   ├── experiences/            # CMS experience/section components
│   ├── pages/                  # CMS page-type components (ArticlePage, …)
│   └── layout/                 # Site chrome (SiteHeader, SiteFooter, …)
├── content-types/
│   ├── component/              # Content type + display template definitions
│   ├── page/                   # Page content type definitions
│   └── displayTemplates/       # Display template registry index + standalone templates
├── lib/
│   ├── config.ts               # Graph gateway URL helper
│   └── graphClient.ts          # Shared GraphClient factory
└── optimizely.ts               # SDK registry initialization (imported by layout.tsx)
```

---

## Adding a New Content Type

### Automated workflow

1. **Create the content type** in your CMS instance under **Content Types**. Define its properties and (for components) where it can be used in Visual Builder.

2. **Pull to code:**
   ```bash
   npx @optimizely/cms-cli config pull --output ./src/content-types --group
   ```

3. **Generate a component shell:**
   ```bash
   npm run scaffold MyBlock
   ```
   Creates `src/components/blocks/MyBlock.tsx` with imports, typed props, and a placeholder that renders all properties — enough to verify it works before replacing it.

4. **Add a display template** *(optional — skip if the content type has no Visual Builder settings)*. Display templates are defined in code, not in the CMS UI. Add it to the same file the CLI generated:
   ```ts
   // src/content-types/component/MyBlock.ts
   export const MyBlockCT = contentType({ ... }); // CLI-managed — push before next pull

   export const MyBlockDisplayTemplateDT = displayTemplate({
     key: 'MyBlockDisplayTemplate',
     contentType: 'MyBlock',
     displayName: 'My Block Settings',
     isDefault: true,
     settings: { ... },
   });
   ```

5. **Wire up the registries:**
   ```bash
   npm run sync
   ```
   Exports the CT, re-exports the DT, exports the component, and adds it to the resolver.

6. **Push to the CMS** *(required if you added or changed a display template)*:
   ```bash
   npx @optimizely/cms-cli config push ./optimizely.config.mjs
   ```

7. **Implement the component** — replace the scaffold in `src/components/blocks/MyBlock.tsx` with your real rendering logic. Use `CardBlock.tsx` or `HeroBlock.tsx` as a reference.

---

### Manual process (what's really happening)

The scripts above automate the repetitive parts. Here's what each step actually does, for cases where something needs to be done by hand.

#### Step 1 — Create the content type in the CMS UI

In your CMS instance, create the new content type under **Content Types**. Define its properties and (for blocks/components) where it can be used in Visual Builder.

#### Step 2 — Pull the content type to code

```bash
npx @optimizely/cms-cli config pull --output ./src/content-types --group
```

This generates or updates files in `src/content-types/`. For a component named `MyBlock`, it creates:

```
src/content-types/component/MyBlock.ts
```

exporting the content type definition:

```ts
export const MyBlockCT = contentType({ ... });
```

> **Note:** If you modify these files in code, push your changes to the CMS before the next pull — otherwise they will be overwritten:
> ```bash
> npx @optimizely/cms-cli config push ./optimizely.config.mjs
> ```

#### Step 3 — Export the content type

In `src/content-types/index.ts`, add an export:

```ts
export { MyBlockCT } from './component/MyBlock';
```

> `npm run sync` handles this automatically.

#### Step 4 — Define and export the display template (if applicable)

Display templates are defined in code and co-located with their content type. Add the display template to the same file the CLI generated:

```ts
// src/content-types/component/MyBlock.ts
export const MyBlockCT = contentType({ ... }); // CLI-managed — push before next pull

export const MyBlockDisplayTemplateDT = displayTemplate({
  key: 'MyBlockDisplayTemplate',
  contentType: 'MyBlock',
  displayName: 'My Block Settings',
  isDefault: true,
  settings: {
    // define your settings here
  },
});
```

Then re-export it from `src/content-types/displayTemplates/index.ts`:

```ts
export { MyBlockDisplayTemplateDT } from '../component/MyBlock';
```

> `npm run sync` handles the re-export automatically.

#### Step 5 — Push the display template to the CMS

```bash
npx @optimizely/cms-cli config push ./optimizely.config.mjs
```

This syncs your display template definition (and any content type changes) to the CMS so it appears in the Visual Builder settings panel.

#### Step 6 — Create the React component

Create `src/components/blocks/MyBlock.tsx`. The component receives `content` and optionally `displaySettings`:

```tsx
import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { MyBlockCT } from '@/content-types/component/MyBlock';
import { MyBlockDisplayTemplateDT } from '@/content-types/component/MyBlock';

type Props = {
  content: ContentProps<typeof MyBlockCT>;
  displaySettings?: ContentProps<typeof MyBlockDisplayTemplateDT>;
};

export default function MyBlock({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  // ...
}
```

> `npm run scaffold MyBlock` generates this shell automatically.

#### Step 7 — Export the component

In `src/components/index.ts`:

```ts
export { default as MyBlock } from './blocks/MyBlock';
```

> `npm run sync` handles this automatically.

#### Step 8 — Register the component

In `src/optimizely.ts`, add the component to the resolver:

```ts
initReactComponentRegistry({
  resolver: {
    // ...existing entries...
    MyBlock: components.MyBlock,
  },
});
```

> `npm run sync` handles this automatically.

The component is now fully wired up and will render wherever the CMS places a `MyBlock` instance.

---

## Component Scaffold Script

`scripts/scaffold-component.mjs` generates a React component shell for any content type that doesn't already have a matching `.tsx` file.

```bash
npm run scaffold              # scaffold all missing components
npm run scaffold MyBlock      # scaffold a specific content type
```

The generated component imports the content type (and display template if one is defined), types the props, and renders the content type name and each property — enough to verify it renders before replacing it with a real implementation:

```tsx
export default function MyBlock({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  return (
    <div className="p-4 border border-dashed border-border rounded text-sm">
      <p className="font-mono text-xs text-muted-foreground mb-2">MyBlock</p>
      <ul className="space-y-1">
        <li {...pa('title')}><span className="font-medium">title:</span> {content.title}</li>
        {/* TODO: <RichText content={content.body?.json} /> */}
        <li {...pa('body')}><span className="font-medium">body:</span> <span className="text-muted-foreground">[richText]</span></li>
      </ul>
    </div>
  );
}
```

The output directory is inferred from the content type name: `*Block` → `blocks/`, `*Element` → `elements/`, `*Page` → `pages/`, `*Experience`/`*Section` → `experiences/`. The script never overwrites an existing file.

After scaffolding, run `npm run sync` to export the component and register it in the resolver.

---

## Registry Sync Script

`scripts/sync-registries.mjs` keeps four registry files in sync with whatever the CLI deposited in `src/content-types/`. Run it after any `config pull`:

```bash
npm run sync
```

The script is **additive only** — it never removes entries.

| File | What it adds |
|---|---|
| `src/content-types/index.ts` | `export { MyBlockCT }` for each new `*CT` found in `component/` or `page/` |
| `src/content-types/displayTemplates/index.ts` | Re-export for each new `*DisplayTemplateDT` found co-located in `component/` or as a standalone file in `displayTemplates/` |
| `src/components/index.ts` | `export { default as MyBlock }` for each new `.tsx` found in `blocks/`, `elements/`, `pages/`, or `experiences/` |
| `src/optimizely.ts` | `MyBlock: components.MyBlock` resolver entry for each component that has a matching CT file |

> **Resolver entries:** The script only adds resolver entries for components whose filename matches a CT defined in code (e.g. `MyBlock.tsx` + `MyBlock.ts`). Components backed by SDK-provided content types — such as `BlankExperience` and `BlankSection` — are registered manually and are not touched.

---

## CMS Preview

The visual editor preview is handled by `src/app/preview/page.tsx`. It requires `OPTIMIZELY_CMS_URL` to be set and the app to be reachable from the CMS instance (use a tunnel like ngrok for local development).
