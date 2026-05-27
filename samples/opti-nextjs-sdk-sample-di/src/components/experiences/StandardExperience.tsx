import { BlankExperienceContentType, ContentProps } from '@optimizely/cms-sdk';
import {
  ComponentContainerProps,
  OptimizelyComposition,
  OptimizelyComponent,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';
import { StandardExperienceCT } from '@/content-types/experience/StandardExperience';

// Use BlankExperienceContentType for the composition shape (gives us `composition.nodes`),
// intersected with StandardExperienceCT for the SEO and layout properties.
type Props = {
  content: ContentProps<typeof BlankExperienceContentType> & ContentProps<typeof StandardExperienceCT>;
};

function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div className="mb-2" {...pa(node)}>{children}</div>;
}

export default function StandardExperience({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const hasLeft = (content.leftRail?.length ?? 0) > 0;
  const hasRight = (content.rightRail?.length ?? 0) > 0;
  const hasRails = hasLeft || hasRight;

  return (
    <div className="standard-experience">
      {content.Schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: content.Schema }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={hasRails ? 'flex gap-8 items-start' : undefined}>
          {hasLeft && (
            <aside className="w-64 shrink-0" {...pa('leftRail')}>
              {content.leftRail!.map((item, i) => (
                item && <OptimizelyComponent key={i} content={item} />
              ))}
            </aside>
          )}
          <div className="flex-1 min-w-0">
            <OptimizelyComposition
              nodes={content.composition?.nodes ?? []}
              ComponentWrapper={ComponentWrapper}
            />
          </div>
          {hasRight && (
            <aside className="w-64 shrink-0" {...pa('rightRail')}>
              {content.rightRail!.map((item, i) => (
                item && <OptimizelyComponent key={i} content={item} />
              ))}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
