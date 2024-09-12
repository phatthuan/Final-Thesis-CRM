import { NavItem } from './nav-item/nav-item';

export function generateNavItems(pageType: string): NavItem[] {
  let items:any = [];
  if(pageType === 'crm'){
    items = [
      {
        displayName: 'Customer',
        iconName: 'phone',
        route: `/admin/${pageType}/customers`, 
      }
      ,{
        displayName: 'Leads',
        iconName: 'users-group',
        route: `/admin/${pageType}/leads`, 
      },
      {
        displayName: 'Activities',
        iconName: 'activity',
        route: `/admin/${pageType}/activities`, 
      },
      {
        displayName: 'Quotes',
        iconName: 'quote',
        route: `/admin/${pageType}/quotes`, 
      },
      {
        displayName: 'Calendar',
        iconName: 'calendar',
        route: `/admin/${pageType}/calendar`, 
      }
    ];
  }
  let navItems: NavItem[] = [
    {
      navCap: 'Home',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: `/admin/${pageType}/dashboard`, 
    },
    {
      navCap: 'Management',
    },
    {
      displayName: 'Tickets',
      iconName: 'ticket',
      route: `/admin/${pageType}/tickets`, 
    },
    {
      displayName: 'Product',
      iconName: 'shopping-bag',
      route: `/admin/${pageType}/products`, 
    },
    {
      displayName: 'User',
      iconName: 'list',
      route: `/admin/${pageType}/contacts`, 
    },
    ...items,
    {
      navCap: 'Others',
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      route: '#',
    }
  ];

  return navItems;
}
