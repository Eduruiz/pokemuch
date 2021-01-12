import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';

Vue.use(VueLazyload, {
  preLoad: 1.3,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
