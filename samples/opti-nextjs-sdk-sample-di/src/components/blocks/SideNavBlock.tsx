import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { SideNavBlockCT } from '@/content-types/component/SideNavBlock';
import { getGraphClient } from '@/lib/graphClient';
import Link from 'next/link';

type Props = {
  content: ContentProps<typeof SideNavBlockCT>;
};

type NavItem = {
  key: string;
  label: string;
  href: string;
};

export default async function SideNavBlock({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  let items: NavItem[] = [];

  if (content.autoGenerate && content.rootPage?.key) {
    const locale = content._metadata.locale;
    const client = getGraphClient();
    const pages = await client.getItems(
      { key: content.rootPage.key },
      { locales: [locale] },
    ) ?? [];
    items = pages
      .filter(p => p._metadata?.url?.default || p._metadata?.url?.hierarchical)
      .map(p => ({
        key: p._metadata?.key ?? crypto.randomUUID(),
        label: p._metadata?.displayName ?? '',
        href: p._metadata?.url?.default ?? p._metadata?.url?.hierarchical ?? '#',
      }));
  } else if (content.navLinks) {
    items = content.navLinks
      .filter(link => link !== null)
      .map((link, i) => ({
        key: String(i),
        label: link!.text ?? link!.title ?? '',
        href: link!.url?.default ?? link!.url?.hierarchical ?? '#',
      }));
  }

  return (
    <nav className="flex flex-col overflow-hidden rounded border border-border" {...pa()}>
      {content.heading && (
        <div className="bg-muted px-4 py-3 border-b border-border">
          <p
            className="text-xs font-bold uppercase tracking-widest text-foreground"
            {...pa('heading')}
          >
            {content.heading}
          </p>
        </div>
      )}
      <ul className="flex flex-col gap-px bg-border" {...pa('navLinks')}>
        {items.map(item => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="block w-full px-4 py-3 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/85 transition-colors duration-150"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
