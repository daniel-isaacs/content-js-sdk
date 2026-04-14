import { displayTemplate } from '@optimizely/cms-sdk';

/**
 * Column Settings
 */
export const ColumnDisplayTemplateDT = displayTemplate({
  key: 'ColumnDisplayTemplate',
  nodeType: 'column',
  displayName: 'Column Settings',
  isDefault: true,
  settings: {
      columnSpacing: {
        displayName: 'Inner Padding',
        editor: 'select',
        sortOrder: 0,
        choices: {
          none: {
            displayName: 'None (default)',
            sortOrder: 0,
          },
          small: {
            displayName: 'Small',
            sortOrder: 1,
          },
          medium: {
            displayName: 'Medium',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      hideOnMobile: {
        displayName: 'Hide on Mobile',
        editor: 'select',
        sortOrder: 1,
        choices: {
          show: {
            displayName: 'Show (default)',
            sortOrder: 0,
          },
          hide: {
            displayName: 'Hide on mobile',
            sortOrder: 1,
          },
        },
      },
      hideOnTablet: {
        displayName: 'Hide on Tablet',
        editor: 'select',
        sortOrder: 2,
        choices: {
          show: {
            displayName: 'Show (default)',
            sortOrder: 0,
          },
          hide: {
            displayName: 'Hide on tablet',
            sortOrder: 1,
          },
        },
      },
    },
});
