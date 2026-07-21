---
name: optimizely-setup
description: This skill should be used when the user asks to "set up Optimizely CMS SDK", "initialize the SDK from scratch", "configure the CMS client", "add content delivery", "integrate Optimizely CMS", "start a headless CMS project with Optimizely", "install the SDK", "create an Optimizely project", or mentions setting up the Optimizely CMS JavaScript SDK in a new or existing project.
---

# Setup Optimizely CMS SDK

Guide the user through setting up the Optimizely CMS JavaScript SDK using the `@optimizely/cms-create-app` CLI tool.

## Steps

1. **Determine setup mode** - Ask whether the user wants to create a new project or add SDK to an existing one
2. **Run create-app** - Execute the CLI tool with appropriate options
3. **Configure credentials** - Guide the user to fill in `.env` with their CMS credentials
4. **Verify installation** - Test the CLI connection

## Implementation

### 1. Determine Setup Mode

Ask the user which scenario applies:

- **New project from template**: Create a project using a pre-built Optimizely template (Next.js Starter, Next.js Stride, Next.js Alloy, or TanStack Start)
- **Fresh project**: Scaffold a brand-new Next.js or TanStack Start project, then automatically add Optimizely SDK
- **Existing project**: Add Optimizely CMS SDK to a project that already exists in the current directory

### 2. Run create-app

Based on the user's choice, run the appropriate command:

**New project from template:**

```bash
npx @optimizely/cms-create-app my-project --template <template-name>
```

Available templates:
- `nextjs-starter` — Minimal Next.js + Optimizely CMS
- `nextjs-stride` — Full demo site with Tailwind
- `nextjs-alloy` — Full demo site with Tailwind
- `tanstack-starter` — TanStack Start + Optimizely CMS

Optional flags:
- `--pm <npm|pnpm|yarn>` — Specify package manager
- `--skip-install` — Skip dependency installation

**Fresh project (interactive):**

```bash
npx @optimizely/cms-create-app
```

The CLI will prompt the user to choose a framework (Next.js or TanStack Start), then create the project and add Optimizely SDK automatically.

**Existing project:**

Run the CLI from within the project directory (where `package.json` exists). The CLI detects the existing project and offers the "Add Optimizely CMS to this project" option, which:

- Installs `@optimizely/cms-sdk` and `@optimizely/cms-cli`
- Creates `optimizely.config.mjs`
- Creates `.env` from template
- Creates `src/lib/optimizely.ts` client helper
- Creates catch-all page route (Next.js only)
- Adds `opti-push` script to `package.json`

```bash
npx @optimizely/cms-create-app
```

### 3. Configure Credentials

After the CLI finishes, guide the user to fill in the `.env` file with their CMS credentials:

```ini
# Base URL of your CMS instance
# Example: https://example.cms.optimizely.com/
OPTIMIZELY_CMS_URL=

# CLI client credentials for syncing manifest data
# Create in: CMS instance > Settings > API Keys > Create API key
OPTIMIZELY_CMS_CLIENT_ID=
OPTIMIZELY_CMS_CLIENT_SECRET=

# Content Graph authentication key
# Found in: CMS instance > Settings > API Keys
OPTIMIZELY_GRAPH_SINGLE_KEY=
```

**Important**: Remind the user to:
- Get credentials from their CMS instance: Settings → API Keys → Create API key
- Replace the placeholders with actual values
- Never commit .env to version control

**Environment-specific configuration**:
- **Production**: Use the variables above as-is. `OPTIMIZELY_CMS_URL` is required.
- **Test (cmstest)**: Remove `OPTIMIZELY_CMS_URL` and add these instead:
  - `OPTIMIZELY_CMS_API_URL=https://api.cmstest.optimizely.com`
  - `OPTIMIZELY_GRAPH_GATEWAY=https://staging.cg.optimizely.com/`

### 4. Verify Installation

Guide user to test the connection:

```bash
npx @optimizely/cms-cli login
```

**If authentication fails**, the user may be using a test environment or missing required variables. Guide them to:

1. Check if they need test environment (cmstest) configuration:
   - Add `OPTIMIZELY_CMS_API_URL=https://api.cmstest.optimizely.com`
   - Add `OPTIMIZELY_GRAPH_GATEWAY=https://staging.cg.optimizely.com/`
2. Verify all required variables are set (see "All Available Environment Variables" below)
3. Retry the login command

### 5. Add Missing Environment Variables (On Request)

When the user requests to "add all missing environment variables" or "add all possible variables", or when troubleshooting connection issues, reference this complete list of available environment variables:

```ini
# Base URL of your CMS instance
# Example: https://example.cms.optimizely.com/
OPTIMIZELY_CMS_URL=

# Content Graph endpoint
# Production (default): https://cg.optimizely.com/content/v2
# Test environment: https://staging.cg.optimizely.com/
OPTIMIZELY_GRAPH_GATEWAY=

# Content Graph authentication key
# Found in: CMS instance > Settings > API Keys
OPTIMIZELY_GRAPH_SINGLE_KEY=

# CLI client credentials for syncing manifest data
# Create in: CMS instance > Settings > API Keys > Create API key
OPTIMIZELY_CMS_CLIENT_ID=
OPTIMIZELY_CMS_CLIENT_SECRET=

# Feature Experimentation credentials (optional)
OPTIMIZELY_FX_SDK_KEY=
OPTIMIZELY_FX_ACCESS_TOKEN=

# Host of your application (optional)
APPLICATION_HOST=

# Base URL for CMS REST API endpoints
# Use instead of OPTIMIZELY_CMS_URL for test environments
# Test environment: https://api.cmstest.optimizely.com
OPTIMIZELY_CMS_API_URL=

# Required when CLI connects to local CMS with self-signed certificates
# NODE_TLS_REJECT_UNAUTHORIZED="0"
```

**Variable purposes**:

*Required for all environments:*
- `OPTIMIZELY_CMS_CLIENT_ID/SECRET` - Credentials for CLI to sync content type definitions
- `OPTIMIZELY_GRAPH_SINGLE_KEY` - Authentication for fetching content via Content Graph

*Production environment:*
- `OPTIMIZELY_CMS_URL` - Your CMS instance URL (e.g., `https://example.cms.optimizely.com/`)
- `OPTIMIZELY_GRAPH_GATEWAY` - Optional, defaults to `https://cg.optimizely.com/content/v2`

*Test environment (cmstest):*
- `OPTIMIZELY_CMS_API_URL` - Required instead of OPTIMIZELY_CMS_URL, set to `https://api.cmstest.optimizely.com`
- `OPTIMIZELY_GRAPH_GATEWAY` - Required, set to `https://staging.cg.optimizely.com/`

*Optional variables:*
- `OPTIMIZELY_FX_SDK_KEY/ACCESS_TOKEN` - Feature Experimentation integration
- `APPLICATION_HOST` - Your application's public URL
- `NODE_TLS_REJECT_UNAUTHORIZED` - Disable SSL validation for local development (security risk)

## Next Steps

After setup, inform the user they can:
- Add `import '@/lib/optimizely'` to their root layout
- Define content types using TypeScript in their components
- Sync types to CMS using `npx @optimizely/cms-cli push` or `npm run opti-push`
- Fetch content using the SDK's client utilities

## References

- [Installation Guide](https://github.com/episerver/content-js-sdk/blob/main/docs/1-installation.md)
- [Setup Guide](https://github.com/episerver/content-js-sdk/blob/main/docs/2-setup.md)
- [Modelling Guide](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md)
