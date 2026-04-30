import { BlankSectionContentType, ContentProps } from '@optimizely/cms-sdk';
import {
  OptimizelyGridSection,
  getPreviewUtils,
  StructureContainerProps,
} from '@optimizely/cms-sdk/react/server';
import { BlankSectionDisplayTemplateDT } from '@/content-types/displayTemplates/BlankSectionDisplayTemplate';

const sectionSpacingMap: Record<string, string> = {
  none: 'py-0',
  small: 'py-4',
  medium: 'py-8',
  large: 'py-16',
};

const colorSchemeMap: Record<string, string> = {
  light: '',
  dark: 'section-dark bg-background text-foreground',
  muted: 'section-muted bg-background text-foreground',
};

const rowGapMap: Record<string, string> = {
  none: 'mb-0',
  small: 'mb-2',
  medium: 'mb-4',
  large: 'mb-8',
};

const columnGapMap: Record<string, string> = {
  none: 'gap-0',
  small: 'gap-2',
  medium: 'gap-4',
  large: 'gap-8',
};

const elementGapMap: Record<string, string> = {
  none: 'gap-0',
  small: 'gap-1',
  medium: 'gap-3',
  large: 'gap-6',
};

const verticalAlignmentMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const borderSidesMap: Record<string, string> = {
  none: '',
  top_only: 'border-t',
  bottom_only: 'border-b',
  top_and_bottom: 'border-y',
  start_only: 'border-l',
  end_only: 'border-r',
  both_sides: 'border-x',
  all_sides: 'border',
};

function getBorderClasses(sides: string | undefined, type: string | undefined): string {
  const sidesKey = sides ?? 'none';
  if (sidesKey === 'none') return '';
  const typeClass = type === 'dashed' ? 'border-dashed' : '';
  return [borderSidesMap[sidesKey], typeClass, 'border-border'].filter(Boolean).join(' ');
}

const widthMap: Record<string, { sectionPadding: string; innerClass: string }> = {
  default:    { sectionPadding: 'px-4 md:px-6 lg:px-8', innerClass: 'max-w-7xl mx-auto w-full' },
  full_width: { sectionPadding: '',                      innerClass: 'w-full' },
  narrow:     { sectionPadding: 'px-4 md:px-6 lg:px-8', innerClass: 'max-w-3xl mx-auto w-full' },
};

const columnPaddingMap: Record<string, string> = {
  none: 'p-0',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-8',
};

type BlankSectionProps = {
  content: ContentProps<typeof BlankSectionContentType>;
  displaySettings?: ContentProps<typeof BlankSectionDisplayTemplateDT>;
};

export default function BlankSection({ content, displaySettings }: BlankSectionProps) {
  const { pa } = getPreviewUtils(content);

  const sectionSpacing = sectionSpacingMap[displaySettings?.sectionSpacing ?? 'medium'];
  const colorScheme = colorSchemeMap[displaySettings?.colorScheme ?? 'light'];
  const colGap = displaySettings?.columnGap ?? 'medium';
  const elemGap = displaySettings?.elementGap ?? 'medium';
  const rowGap = displaySettings?.rowGap ?? 'medium';
  const width = widthMap[displaySettings?.width ?? 'default'];

  return (
    <section
      className={`vb:grid relative w-full ${sectionSpacing} ${colorScheme} ${width.sectionPadding} overflow-visible`}
      {...pa(content)}
    >
      <div className={width.innerClass}>
        <OptimizelyGridSection
          nodes={content.nodes}
          row={(props) => <Row {...props} colGap={colGap} rowGap={rowGap} />}
          column={(props) => <Column {...props} elemGap={elemGap} />}
        />
      </div>
    </section>
  );
}

function Row({ children, node, displaySettings, colGap, rowGap }: StructureContainerProps & { colGap: string; rowGap: string }) {
  const { pa } = getPreviewUtils(node);
  const rowSpacing = rowGapMap[rowGap];
  const colGapClasses = columnGapMap[colGap];
  const verticalAlignment = verticalAlignmentMap[displaySettings?.verticalAlignment as string ?? 'stretch'];
  const border = getBorderClasses(displaySettings?.borderSides as string, displaySettings?.borderType as string);
  const borderPadding = border ? 'p-4' : '';
  return (
    <div
      className={`vb:row flex flex-row ${colGapClasses} ${rowSpacing} ${verticalAlignment} ${border} ${borderPadding} last:mb-0`}
      {...pa(node)}
    >
      {children}
    </div>
  );
}

function Column({ children, node, displaySettings, elemGap }: StructureContainerProps & { elemGap: string }) {
  const { pa } = getPreviewUtils(node);
  const gapClasses = elementGapMap[elemGap];
  const columnSpacing = displaySettings?.columnSpacing as string ?? 'none';
  const border = getBorderClasses(displaySettings?.borderSides as string, displaySettings?.borderType as string);
  const padding = border && columnSpacing === 'none' ? 'p-4' : columnPaddingMap[columnSpacing];
  const hideOnMobile = displaySettings?.hideOnMobile === 'hide' ? 'hidden md:flex' : 'flex';
  const hideOnTablet = displaySettings?.hideOnTablet === 'hide' ? 'md:hidden lg:flex' : '';
  return (
    <div
      className={`vb:col flex-1 flex-col ${gapClasses} ${padding} ${hideOnMobile} ${hideOnTablet} ${border} min-w-0`}
      {...pa(node)}
    >
      {children}
    </div>
  );
}