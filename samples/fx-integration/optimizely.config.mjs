import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./src/components/**.tsx'],
  content: [
    {
      key: 'BlankExperienceContent',
      displayName: 'FX Integration Experience',
      contentType: 'BlankExperience',
    },
  ],
  applications: [
    {
      key: 'fx_integration_app',
      entryPoint: 'BlankExperienceContent',
      displayName: 'FX Integration',
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
