import { getClient } from '@optimizely/cms-sdk';
import { unstable_cache } from 'next/cache';
import { getNavigationItems, type NavigationItem } from './navigation';

export type SearchableContent = {
  key: string;
  displayName: string;
  url: string;
  type: string;
  heading?: string;
  intro?: string;
  body?: string;
  locale: string;
};

type RawSearchableItem = {
  _metadata?: {
    key: string;
    displayName?: string;
    locale?: string;
    types: string[];
    url?: {
      default?: string;
    };
  };
  heading?: string;
  intro?: {
    text?: string;
  };
  body?: {
    text?: string;
  };
};

const extractSearchableText = (item: RawSearchableItem | null) => {
  if (!item) return { heading: undefined, intro: undefined, body: undefined };

  return {
    heading: item.heading,
    intro: item.intro?.text,
    body: item.body?.text,
  };
};

const flattenNavigation = (
  items: NavigationItem[],
): Array<{ displayName: string; url: string }> => {
  const pages: Array<{ displayName: string; url: string }> = [];

  for (const item of items) {
    if (item.displayName !== 'Overview') {
      pages.push({
        displayName: item.displayName,
        url: item.url,
      });
    }

    if (item.items?.length) {
      pages.push(...flattenNavigation(item.items));
    }
  }

  return pages;
};

const fetchAllSearchableContent = async (): Promise<SearchableContent[]> => {
  try {
    const navigationItems = await getNavigationItems();
    const pages = flattenNavigation(navigationItems);
    const results: SearchableContent[] = [];

    for (const page of pages) {
      try {
        const fullContent = await getClient().getContentByPath(page.url);

        if (fullContent?.length > 0) {
          const content = fullContent[0];
          const searchableText = extractSearchableText(content);

          results.push({
            key: content._metadata?.key || '',
            displayName: page.displayName,
            url: page.url,
            type: content._metadata?.types?.[0] || 'Page',
            heading: searchableText.heading || page.displayName,
            intro: searchableText.intro,
            body: searchableText.body,
            locale: content._metadata?.locale || 'en',
          });
        } else {
          results.push({
            key: '',
            displayName: page.displayName,
            url: page.url,
            type: 'Page',
            heading: page.displayName,
            intro: undefined,
            body: undefined,
            locale: 'en',
          });
        }
      } catch (error) {
        results.push({
          key: '',
          displayName: page.displayName,
          url: page.url,
          type: 'Page',
          heading: page.displayName,
          intro: undefined,
          body: undefined,
          locale: 'en',
        });
      }
    }

    return results;
  } catch (error) {
    console.error('getAllSearchableContent - error:', error);
    return [];
  }
};

export const getAllSearchableContent = unstable_cache(
  fetchAllSearchableContent,
  ['searchable-content'],
  { revalidate: 3600 },
);

export const searchContent = (
  content: SearchableContent[],
  query: string,
): Array<SearchableContent & { score: number }> => {
  const searchTerm = query.toLowerCase();

  const scoredResults = content.map(item => {
    let score = 0;
    const displayName = item.displayName.toLowerCase();
    const heading = (item.heading || '').toLowerCase();
    const intro = (item.intro || '').toLowerCase();
    const body = (item.body || '').toLowerCase();
    const url = item.url.toLowerCase();

    if (displayName === searchTerm) score += 10;
    else if (displayName.includes(searchTerm)) score += 5;

    if (heading === searchTerm) score += 10;
    else if (heading.includes(searchTerm)) score += 5;

    if (intro.includes(searchTerm)) score += 3;
    if (body.includes(searchTerm)) score += 2;

    if (url.includes(searchTerm)) score += 1;

    return { ...item, score };
  });

  return scoredResults.filter(item => item.score > 0).sort((a, b) => b.score - a.score);
};

