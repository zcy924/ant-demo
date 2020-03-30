import { Plugin } from '/Users/jax/Desktop/ant-demo/node_modules/@umijs/runtime/dist/index.js';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','locale','locale','request',],
});
plugin.register({
  apply: require('/Users/jax/Desktop/ant-demo/node_modules/umi-plugin-antd-icon-config/lib/app.js'),
  path: '/Users/jax/Desktop/ant-demo/node_modules/umi-plugin-antd-icon-config/lib/app.js',
});
plugin.register({
  apply: require('/Users/jax/Desktop/ant-demo/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/jax/Desktop/ant-demo/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('/Users/jax/Desktop/ant-demo/src/.umi/plugin-locale/runtime.tsx'),
  path: '/Users/jax/Desktop/ant-demo/src/.umi/plugin-locale/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
