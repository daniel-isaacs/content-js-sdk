import { contentType } from '@optimizely/cms-sdk';

/**
 * Standard Experience
 */
export const StandardExperienceCT = contentType({
  key: 'StandardExperience',
  displayName: 'Standard Experience',
  baseType: '_experience',
  mayContainTypes: ['*'],
  properties: {
    leftRail: {
      type: 'array',
      displayName: 'Left Rail',
      items: { type: 'content', allowedTypes: ['_component'] },
    },
    rightRail: {
      type: 'array',
      displayName: 'Right Rail',
      items: { type: 'content', allowedTypes: ['_component'] },
    },
    metaTitle: { type: 'string', displayName: 'Meta Title', localized: true, group: 'seo', sortOrder: 10, format: 'shortString' },
    metaDescription: { type: 'string', displayName: 'Meta Description', localized: true, group: 'seo', sortOrder: 20 },
    Schema: { type: 'string', displayName: 'Schema', group: 'seo', sortOrder: 30 },
  },
});
