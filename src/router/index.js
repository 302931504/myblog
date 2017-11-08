import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const MainBackstage = (resolve) => {
    import('../components/mainBackStage/mainBackStage').then((module) => {
        resolve(module);
    });
};

export default new Router({
  routes: [
  {
    path: '/admin/mainBackstage',
    component: MainBackstage
  }
  ]
});