import { contentType } from '@optimizely/cms-sdk';

/**
 * Hero
 */
export const HeroComponentCT = contentType({
  key: 'HeroComponent',
  displayName: 'Hero',
  baseType: '_component',
  properties: {
    Heading: { type: 'string', displayName: 'Heading', localized: true, group: 'Information', sortOrder: 10, format: 'shortString' },
    SubHeading: { type: 'string', displayName: 'Sub-Heading', localized: true, group: 'Information', sortOrder: 20, format: 'shortString' },
    HeroImage: { type: 'contentReference', displayName: 'Hero Image', group: 'Information', sortOrder: 30, allowedTypes: ['_image'] },
  },
});
