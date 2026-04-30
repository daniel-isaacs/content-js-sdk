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
          stretch: {
            displayName: 'Stretch (default)',
            sortOrder: 0,
          },
          start: {
            displayName: 'Top',
            sortOrder: 1,
          },
          center: {
            displayName: 'Center',
            sortOrder: 2,
          },
          end: {
            displayName: 'Bottom',
            sortOrder: 3,
          },
        },
      },
      borderSides: {
        displayName: 'Border Sides',
        editor: 'select',
        sortOrder: 2,
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
        sortOrder: 3,
        choices: {
          solid: { displayName: 'Solid (default)', sortOrder: 0 },
          dashed: { displayName: 'Dashed', sortOrder: 1 },
        },
      },
    },
});
