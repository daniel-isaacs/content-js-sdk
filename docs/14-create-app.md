# Create App

The `@optimizely/cms-create-app` CLI tool scaffolds new Optimizely CMS projects or adds Optimizely to existing ones.

## Quick start

```bash
npx @optimizely/cms-create-app
```

## Modes

| Mode | Description | When to use |
|------|-------------|-------------|
| **Template** | Create from a pre-configured starter | Starting a new project with examples and demo data |
| **Fresh** | Run `create-next-app` or `create-start`, then add Optimizely | Starting from a clean framework setup |
| **Scaffold** | Add Optimizely CMS to an existing project | Integrating CMS into your current codebase |

## SDK initialization (fresh & scaffold modes)

Template mode projects come with the SDK already initialized. For fresh and scaffold modes, you need to create an initialization file and import it in your root layout.

See the full guide in the [create-app README](../packages/optimizely-cms-create-app/README.md#sdk-initialization).

## Next steps

- [Installation](./1-installation.md) - Set up your development environment
- [Setup](./2-setup.md) - Configure the SDK and CLI
- [Modelling](./3-modelling.md) - Define your content types with TypeScript
