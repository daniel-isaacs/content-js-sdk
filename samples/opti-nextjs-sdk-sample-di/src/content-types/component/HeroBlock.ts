import { contentType } from '@optimizely/cms-sdk';

/**
 * Hero
 */
export const HeroBlockCT = contentType({
  key: 'HeroBlock',
  displayName: 'Hero Block',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    Heading: { type: 'string', displayName: 'Heading', localized: true, group: 'Information', sortOrder: 10, format: 'shortString' },
    SubHeading: { type: 'string', displayName: 'Sub-Heading', localized: true, group: 'Information', sortOrder: 20, format: 'shortString' },
    HeroImage: { type: 'contentReference', displayName: 'Hero Image', group: 'Information', sortOrder: 30, allowedTypes: ['_image'] },
  },
});
