import { contentType, displayTemplate } from '@optimizely/cms-sdk';

/**
 * Text Element
 */
export const TextElementCT = contentType({
  key: 'TextElement',
  displayName: 'Text Element',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    text: { type: 'string', displayName: 'Text', localized: true, group: 'Information', sortOrder: 10, format: 'shortString' },
  },
});


/**
 * Text Element Display
 */
export const TextElementDisplayTemplateDT = displayTemplate({
  key: 'TextElementDisplayTemplate',
  contentType: 'TextElement',
  displayName: 'Text Element Display',
  isDefault: true,
  settings: {
      headingLevel: {
        displayName: 'Heading Level',
        editor: 'select',
        sortOrder: 0,
        choices: {
          plain: {
            displayName: 'Plain Text',
            sortOrder: 0,
          },
          h1: {
            displayName: 'Heading 1',
            sortOrder: 1,
          },
          h2: {
            displayName: 'Heading 2',
            sortOrder: 2,
          },
          h3: {
            displayName: 'Heading 3',
            sortOrder: 3,
          },
          h4: {
            displayName: 'Heading 4',
            sortOrder: 4,
          },
          h5: {
            displayName: 'Heading 5',
            sortOrder: 5,
          },
        },
      },
      alignment: {
        displayName: 'Alignment',
        editor: 'select',
        sortOrder: 1,
        choices: {
          left: {
            displayName: 'Left',
            sortOrder: 0,
          },
          center: {
            displayName: 'Center',
            sortOrder: 1,
          },
          right: {
            displayName: 'Right',
            sortOrder: 2,
          },
        },
      },
    },
});
