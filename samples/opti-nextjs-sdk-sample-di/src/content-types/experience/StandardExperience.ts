import { contentType } from '@optimizely/cms-sdk';

/**
 * Standard Experience
 * General-purpose Visual Builder experience.
 */
export const StandardExperienceCT = contentType({
  key: 'StandardExperience',
  displayName: 'Standard Experience',
  baseType: '_experience',
  mayContainTypes: ['*'],
  properties: {
    metaTitle:       { type: 'string', displayName: 'Meta Title',       localized: true, group: 'SEO', sortOrder: 10, format: 'shortString' },
    metaDescription: { type: 'string', displayName: 'Meta Description', localized: true, group: 'SEO', sortOrder: 20 },
    Schema:          { type: 'string', displayName: 'Schema',                            group: 'SEO', sortOrder: 30 },
  },
});
