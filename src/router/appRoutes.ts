export type RouteLink = {
  name: string;
  path: string;
  filePath: string;
  prependIcon?: string;
  appendIcon?: string;
  type: 'link';
  isDynamic?: boolean;
};

export type RouteDivider = {
  type: 'divider';
};

export type RouteGroup = {
  name: string;
  type: 'group',
  prependIcon?: string;
  children: Array<RouteDivider | RouteLink | RouteGroup>;
};

export const appRoutes: Array<RouteDivider | RouteLink | RouteGroup> = [
  {
    type: 'link',
    name: 'Login',
    path: '/login',
    isDynamic: true,
    filePath: '../views/Login/Login.vue',
  },
  {
    name: 'Dashboard',
    path: '/',
    prependIcon: 'mdi-home',
    filePath: '../modules/Dashboard/Dashboard.vue',
    type: 'link'
  },
  {
    type: 'divider'
  },
  {
    type: 'group',
    name: 'Group sample',
    children: [
      {
        name: 'Tasks',
        path: '/tasks',
        type: 'link',
        prependIcon: 'mdi-format-list-checks',
        filePath: '../modules/Tasks/Tasks.vue'
      },
      {
        name: 'TaskDetails',
        path: '/tasks/:id',
        type: 'link',
        isDynamic: true,
        prependIcon: 'mdi-text-box-outline',
        filePath: '../modules/Tasks/TaskDetail.vue'
      }
    ]

  }
]
