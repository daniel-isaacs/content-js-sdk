import { contentType, displayTemplate } from '@optimizely/cms-sdk';

/**
 * Card Block
 */
export const CardBlockCT = contentType({
  key: 'CardBlock',
  displayName: 'Card Block',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    title: { type: 'string', displayName: 'Title', required: true, localized: true, group: 'Information', sortOrder: 0 },
    text: { type: 'richText', displayName: 'Text', localized: true, group: 'Information', sortOrder: 0 },
    linkText: { type: 'string', displayName: 'Link Text', localized: true, group: 'Information', sortOrder: 0 },
    linkUrl: { type: 'url', displayName: 'Link URL', group: 'Information', sortOrder: 0 },
    image: { type: 'contentReference', displayName: 'Image', group: 'Information', sortOrder: 0, allowedTypes: ['_image'] },
  },
});


/**
 * Card Layout
 */
export const CardBlockDisplayTemplateDT = displayTemplate({
  key: 'CardBlockDisplayTemplate',
  contentType: 'CardBlock',
  displayName: 'Card Layout',
  isDefault: true,
  settings: {
      imageLayout: {
        displayName: 'Image Layout',
        editor: 'select',
        sortOrder: 0,
        choices: {
          image_top: {
            displayName: 'Image top, text bottom (default)',
            sortOrder: 0,
          },
          image_bottom: {
            displayName: 'Image bottom, text top',
            sortOrder: 1,
          },
          image_left: {
            displayName: 'Image left, text right',
            sortOrder: 2,
          },
          image_right: {
            displayName: 'Image right, text left',
            sortOrder: 3,
          },
        },
      },
    },
});
