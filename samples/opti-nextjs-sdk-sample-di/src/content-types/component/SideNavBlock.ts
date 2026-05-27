import { contentType } from '@optimizely/cms-sdk';

/**
 * Side Nav
 */
export const SideNavBlockCT = contentType({
  key: 'SideNavBlock',
  displayName: 'Side Nav',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'Information', sortOrder: 10, format: 'shortString' },
    autoGenerate: { type: 'boolean', displayName: 'Auto Generate', group: 'Information', sortOrder: 20 },
    rootPage: { type: 'contentReference', displayName: 'Root Page', group: 'Information', sortOrder: 30, allowedTypes: ['_page', '_experience'] },
    navLinks: {
      type: 'array',
      items: { type: 'link' },
      sortOrder: 40,
    },
  },
});
