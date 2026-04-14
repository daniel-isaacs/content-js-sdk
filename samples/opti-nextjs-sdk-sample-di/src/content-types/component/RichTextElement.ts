import { contentType } from '@optimizely/cms-sdk';

/**
 * Rich Text Element
 */
export const RichTextElementCT = contentType({
  key: 'RichTextElement',
  displayName: 'Rich Text Element',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    content: { type: 'richText', displayName: 'Content', localized: true, group: 'Information', sortOrder: 0 },
  },
});
