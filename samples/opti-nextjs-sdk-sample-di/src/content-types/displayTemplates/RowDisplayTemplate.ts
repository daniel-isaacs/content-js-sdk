import { displayTemplate } from '@optimizely/cms-sdk';

/**
 * Row Settings
 */
export const RowDisplayTemplateDT = displayTemplate({
  key: 'RowDisplayTemplate',
  nodeType: 'row',
  displayName: 'Row Settings',
  isDefault: true,
  settings: {
      rowSpacing: {
        displayName: 'Bottom Spacing',
        editor: 'select',
        sortOrder: 0,
        choices: {
          none: {
            displayName: 'None',
            sortOrder: 0,
          },
          small: {
            displayName: 'Small',
            sortOrder: 1,
          },
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      verticalAlignment: {
        displayName: 'Vertical Alignment',
        editor: 'select',
        sortOrder: 1,
        choices: {
          start: {
            displayName: 'Top (default)',
            sortOrder: 0,
          },
          center: {
            displayName: 'Center',
            sortOrder: 1,
          },
          end: {
            displayName: 'Bottom',
            sortOrder: 2,
          },
          stretch: {
            displayName: 'Stretch',
            sortOrder: 3,
          },
        },
      },
    },
});
