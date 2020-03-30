import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/Tassel/Desktop/Cootek/ant-demo/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';

let app:any = null;

function _onCreate() {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'global', ...(require('/Users/Tassel/Desktop/Cootek/ant-demo/src/models/global.ts').default) });
app.model({ namespace: 'login', ...(require('/Users/Tassel/Desktop/Cootek/ant-demo/src/models/login.ts').default) });
app.model({ namespace: 'setting', ...(require('/Users/Tassel/Desktop/Cootek/ant-demo/src/models/setting.ts').default) });
app.model({ namespace: 'user', ...(require('/Users/Tassel/Desktop/Cootek/ant-demo/src/models/user.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    _onCreate();
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
