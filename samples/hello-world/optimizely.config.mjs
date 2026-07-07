import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./src/components/**/*.tsx'],
  content: [
    {
      key: 'ArticleContent',
      displayName: 'Hello World Article',
      contentType: 'HelloWorld_Article',
    },
  ],
  applications: [
    {
      key: 'hello_world_app',
      entryPoint: 'ArticleContent',
      displayName: 'Hello World',
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
