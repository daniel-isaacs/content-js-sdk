import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: [
    './components/*.tsx',
    './components/**/*.tsx',
    './components/contracts/*.ts',
  ],
  propertyGroups: [],
  content: [
    {
      key: 'StartPageContent',
      displayName: 'Start Page',
      contentType: 'StartPage',
    },
  ],
  applications: [
    {
      key: 'stride_app',
      entryPoint: 'StartPageContent',
      displayName: 'Stride',
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
