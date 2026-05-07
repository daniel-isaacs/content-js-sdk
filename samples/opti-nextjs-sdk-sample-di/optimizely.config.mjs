import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./src/content-types/index.ts', './src/content-types/displayTemplates/index.ts'],
  propertyGroups: [
    {
      key: 'layout',
      displayName: 'Layout',
      sortOrder: 15,
    },
    {
      key: 'meta',
      displayName: 'Meta',
      sortOrder: 20,
    },
    {
      key: 'seo',
      displayName: 'SEO',
      sortOrder: 25,
    },
  ],
});