import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: [
    './src/components/*.tsx',
    './src/components/**/*.tsx',
    './src/components/contracts/*.ts',
  ],
  languages: ['fi', 'de', 'sp'],
  propertyGroups: [
    {
      key: 'SEO',
      displayName: 'SEO',
      sortOrder: 1,
    },
    {
      key: 'SiteSettings',
      displayName: 'Site Settings',
      sortOrder: 2,
    },
  ],
  content: [
    {
      key: 'StartContent',
      displayName: 'Start',
      contentType: 'Start',
    },
  ],
  applications: [
    {
      key: 'alloy_app',
      entryPoint: 'StartContent',
      displayName: 'Alloy',
      type: 'website',
      isDefault: true,
      useApplicationSpecificAssets: false,
      hosts: [
        {
          authority: 'localhost:3000',
          type: 'primary',
          preferredUrlScheme: 'https',
        },
      ],
      usePreviewTokens: true,
    },
  ],
});
