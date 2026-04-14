import { contentType } from '@optimizely/cms-sdk';

/**
 * Article Page
 */
export const ArticlePageCT = contentType({
  key: 'ArticlePage',
  displayName: 'Article Page',
  baseType: '_page',
  mayContainTypes: ['*'],
  properties: {
    featuredImage: { type: 'contentReference', displayName: 'Featured Image', description: 'Image shown on the top of the page', group: 'Information', sortOrder: 0, allowedTypes: ['_image'] },
    heading: { type: 'string', displayName: 'Article Heading', localized: true, group: 'Information', sortOrder: 11, indexingType: 'searchable', format: 'shortString' },
    body: { type: 'richText', displayName: 'Article Body', localized: true, group: 'Information', sortOrder: 20, indexingType: 'searchable' },
  },
});
