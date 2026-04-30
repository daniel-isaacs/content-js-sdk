import { contentType, displayTemplate } from '@optimizely/cms-sdk';

/**
 * Hero Block
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


/**
 * Hero Settings
 */
export const HeroBlockDisplayTemplateDT = displayTemplate({
  key: 'HeroBlockDisplayTemplate',
  contentType: 'HeroBlock',
  displayName: 'Hero Settings',
  isDefault: true,
  settings: {
      height: {
        displayName: 'Height',
        editor: 'select',
        sortOrder: 0,
        choices: {
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 0,
          },
          short: {
            displayName: 'Short',
            sortOrder: 1,
          },
          tall: {
            displayName: 'Tall',
            sortOrder: 2,
          },
          fullscreen: {
            displayName: 'Full screen',
            sortOrder: 3,
          },
        },
      },
      textAlignment: {
        displayName: 'Text Alignment',
        editor: 'select',
        sortOrder: 1,
        choices: {
          center: {
            displayName: 'Center (default)',
            sortOrder: 0,
          },
          left: {
            displayName: 'Left',
            sortOrder: 1,
          },
          right: {
            displayName: 'Right',
            sortOrder: 2,
          },
        },
      },
      overlayOpacity: {
        displayName: 'Image Overlay',
        editor: 'select',
        sortOrder: 2,
        choices: {
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 0,
          },
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          light: {
            displayName: 'Light',
            sortOrder: 2,
          },
          dark: {
            displayName: 'Dark',
            sortOrder: 3,
          },
        },
      },
    },
});
