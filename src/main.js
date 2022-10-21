import Vue from 'vue';
import VueI18n from 'vue-i18n';
import iView from 'iview';
import iViewEn from 'iview/dist/locale/en-US';
import iViewZh from 'iview/dist/locale/zh-CN';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {default as en} from './lang/en.js';
import {default as zh} from './lang/zh.js';
import router from './router';
import request from './request';
import App from './App.vue';

const messages = {
  en: Object.assign(en, iViewEn),
  zh: Object.assign(zh, iViewZh)
};

Vue.use(request);
Vue.use(VueI18n);
Vue.use(iView, {
  i18n: function(path, options) {
    let value = i18n.t(path, options)
    return (value !== null && value !== undefined) ? value : '';
  }
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.locale = () => {};

const i18n = new VueI18n({
  locale: localStorage.language === null ? 'en' : localStorage.language,
  messages,
});

iView.i18n((key, value) => i18n.t(key, value))

new Vue({
  i18n,
  render: h => h(App),
  router,
}).$mount('#app');
