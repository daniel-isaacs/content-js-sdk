import { displayTemplate } from '@optimizely/cms-sdk';

/**
 * Section Settings
 */
export const BlankSectionDisplayTemplateDT = displayTemplate({
  key: 'BlankSectionDisplayTemplate',
  contentType: 'BlankSection',
  displayName: 'Section Settings',
  isDefault: true,
  settings: {
      colorScheme: {
        displayName: 'Color Scheme',
        editor: 'select',
        sortOrder: 0,
        choices: {
          light: {
            displayName: 'Light (default)',
            sortOrder: 0,
          },
          dark: {
            displayName: 'Dark',
            sortOrder: 1,
          },
          muted: {
            displayName: 'Muted',
            sortOrder: 2,
          },
        },
      },
      sectionSpacing: {
        displayName: 'Section Padding',
        editor: 'select',
        sortOrder: 1,
        choices: {
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 0,
          },
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      rowGap: {
        displayName: 'Row Gap',
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
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      columnGap: {
        displayName: 'Column Gap',
        editor: 'select',
        sortOrder: 3,
        choices: {
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 0,
          },
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      elementGap: {
        displayName: 'Element Gap (within columns)',
        editor: 'select',
        sortOrder: 4,
        choices: {
          medium: {
            displayName: 'Medium (default)',
            sortOrder: 0,
          },
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large',
            sortOrder: 3,
          },
        },
      },
      width: {
        displayName: 'Width',
        editor: 'select',
        sortOrder: 5,
        choices: {
          default:    { displayName: 'Default (default)', sortOrder: 0 },
          full_width: { displayName: 'Full width',        sortOrder: 1 },
          narrow:     { displayName: 'Narrow',            sortOrder: 2 },
        },
      },
    },
});
