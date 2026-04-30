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
      borderSides: {
        displayName: 'Border Sides',
        editor: 'select',
        sortOrder: 3,
        choices: {
          none: { displayName: 'None (default)', sortOrder: 0 },
          top_only: { displayName: 'Top only', sortOrder: 1 },
          bottom_only: { displayName: 'Bottom only', sortOrder: 2 },
          top_and_bottom: { displayName: 'Top and bottom', sortOrder: 3 },
          start_only: { displayName: 'Start only (left)', sortOrder: 4 },
          end_only: { displayName: 'End only (right)', sortOrder: 5 },
          both_sides: { displayName: 'Both sides (left & right)', sortOrder: 6 },
          all_sides: { displayName: 'All sides', sortOrder: 7 },
        },
      },
      borderType: {
        displayName: 'Border Type',
        editor: 'select',
        sortOrder: 4,
        choices: {
          solid: { displayName: 'Solid (default)', sortOrder: 0 },
          dashed: { displayName: 'Dashed', sortOrder: 1 },
        },
      },
    },
});
