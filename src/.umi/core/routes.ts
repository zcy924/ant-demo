import { ApplyPluginsType, dynamic } from '/Users/Tassel/Desktop/Cootek/ant-demo/node_modules/@umijs/runtime/dist/index.js';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/user/login'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/login.html",
    "redirect": "/welcome",
    "exact": true
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/",
            "redirect": "/welcome",
            "exact": true
          },
          {
            "path": "/welcome",
            "name": "welcome",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/Welcome'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/admin",
            "name": "admin",
            "icon": "crown",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/Admin'), loading: require('@/components/PageLoading/index').default}),
            "authority": [
              "admin"
            ],
            "routes": [
              {
                "path": "/admin/sub-page",
                "name": "sub-page",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/Welcome'), loading: require('@/components/PageLoading/index').default}),
                "authority": [
                  "admin"
                ],
                "exact": true
              }
            ]
          },
          {
            "name": "list.table-list",
            "icon": "table",
            "path": "/list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListTableList' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/ListTableList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "空白页面",
            "icon": "smile",
            "path": "/gp_violation",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__gp_violation' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/gp_violation'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "空白页面",
            "icon": "smile",
            "path": "/ad_violation",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ad_violation' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/ad_violation'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/Tassel/Desktop/Cootek/ant-demo/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
