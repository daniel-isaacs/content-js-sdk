import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { ArticlePageCT } from '@/content-types/page/ArticlePage';
import Image from 'next/image';

type Props = {
  content: ContentProps<typeof ArticlePageCT>;
};

export default function ArticlePage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {src(content.featuredImage) && (
        <div className="relative w-full h-64 md:h-112 mb-10 rounded-xl overflow-hidden shadow-md">
          <Image
            src={src(content.featuredImage)!}
            alt={getAlt(content.featuredImage, 'Featured image')}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            {...pa('featuredImage')}
          />
        </div>
      )}

      <h1
        className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8"
        {...pa('heading')}
        data-epi-edit='heading'
      >
        {content.heading}
      </h1>

      <hr className="border-border mb-8" />

      {content.body && (
        <div className="prose prose-lg max-w-none" {...pa('body')}>
          <RichText content={content.body?.json} />
        </div>
      )}
    </article>
  );
}