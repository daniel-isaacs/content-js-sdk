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
    featuredImage: { type: 'contentReference', displayName: 'Featured Image', description: 'Image shown on the top of the page', group: 'Information', sortOrder: 10, allowedTypes: ['_image'] },
    metaTitle: { type: 'string', displayName: 'Meta Title', group: 'seo', sortOrder: 10, format: 'shortString' },
    heading: { type: 'string', displayName: 'Article Heading', localized: true, group: 'Information', sortOrder: 20, indexingType: 'searchable', format: 'shortString' },
    metaDescription: { type: 'string', displayName: 'Meta Description', group: 'seo', sortOrder: 20 },
    body: { type: 'richText', displayName: 'Article Body', localized: true, group: 'Information', sortOrder: 30, indexingType: 'searchable' },
    Schema: { type: 'string', displayName: 'Schema', group: 'seo', sortOrder: 30 },
  },
});
