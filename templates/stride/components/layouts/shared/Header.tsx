import { HeaderClient } from './Header.client';
import { getNavigationItems } from '../../../lib/navigation';
import { getAllSearchableContent } from '../../../lib/search';

export const Header = async () => {
  const navigationItems = await getNavigationItems();
  const searchableContent = await getAllSearchableContent();

  return <HeaderClient navigationItems={navigationItems} searchableContent={searchableContent} />;
};
