import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { HeroBlockCT } from '@/content-types/component/HeroBlock';
import { HeroBlockDisplayTemplateDT } from '@/content-types/displayTemplates/HeroBlockDisplayTemplate';
import Image from 'next/image';

type Props = {
  content: ContentProps<typeof HeroBlockCT>;
  displaySettings?: ContentProps<typeof HeroBlockDisplayTemplateDT>;
};

const heightMap: Record<string, string> = {
  short:      'min-h-48',
  medium:     'min-h-96',
  tall:       'min-h-128',
  fullscreen: 'min-h-screen',
};

const overlayMap: Record<string, string> = {
  none:   '',
  light:  'bg-black/20',
  medium: 'bg-black/50',
  dark:   'bg-black/70',
};

const alignmentMap: Record<string, { container: string; text: string }> = {
  left:   { container: 'justify-start', text: 'text-left' },
  center: { container: 'justify-center', text: 'text-center' },
  right:  { container: 'justify-end',   text: 'text-right' },
};

export default function HeroBlock({ content, displaySettings }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const height    = heightMap[displaySettings?.height ?? 'medium'];
  const overlay   = overlayMap[displaySettings?.overlayOpacity ?? 'medium'];
  const alignment = alignmentMap[displaySettings?.textAlignment ?? 'center'];
  const hasImage  = !!src(content.HeroImage);

  return (
    <div className={`relative w-full ${height} flex items-center overflow-hidden rounded-lg ${hasImage ? '' : 'bg-primary'}`}>
      {hasImage && (
        <Image
          src={src(content.HeroImage)!}
          alt={getAlt(content.HeroImage, 'Hero image')}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          {...pa('HeroImage')}
        />
      )}

      {hasImage && overlay && (
        <div className={`absolute inset-0 ${overlay}`} />
      )}

      <div className={`relative z-10 w-full flex ${alignment.container} px-8 md:px-16 py-12`}>
        <div className={`max-w-2xl ${alignment.text}`}>
          {content.Heading && (
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${hasImage ? 'text-white' : 'text-primary-foreground'}`}
              {...pa('Heading')}
            >
              {content.Heading}
            </h1>
          )}
          {content.SubHeading && (
            <p
              className={`text-lg md:text-xl ${hasImage ? 'text-white/90' : 'text-primary-foreground/80'}`}
              {...pa('SubHeading')}
            >
              {content.SubHeading}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
