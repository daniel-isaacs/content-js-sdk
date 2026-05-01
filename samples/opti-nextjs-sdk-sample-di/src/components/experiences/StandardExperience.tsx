import { BlankExperienceContentType, ContentProps } from '@optimizely/cms-sdk';
import {
  ComponentContainerProps,
  OptimizelyComposition,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';
import { StandardExperienceCT } from '@/content-types/experience/StandardExperience';

// Use BlankExperienceContentType for the composition shape (gives us `composition.nodes`),
// intersected with StandardExperienceCT for the SEO properties.
type Props = {
  content: ContentProps<typeof BlankExperienceContentType> & ContentProps<typeof StandardExperienceCT>;
};

function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div className="mb-2" {...pa(node)}>{children}</div>;
}

export default function StandardExperience({ content }: Props) {
  return (
    <div className="standard-experience">
      {content.Schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: content.Schema }}
        />
      )}
      <OptimizelyComposition
        nodes={content.composition?.nodes ?? []}
        ComponentWrapper={ComponentWrapper}
      />
    </div>
  );
}
