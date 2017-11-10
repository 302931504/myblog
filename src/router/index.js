import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Login = (resolve) => {
    import('../admin/login/login').then((module) => {
        resolve(module);
    });
};

const MainBackstage = (resolve) => {
    import('../admin/mainBackStage/mainBackStage').then((module) => {
        resolve(module);
    });
};

const ArticalEdit = (resolve) => {
    import('../admin/artical-edit/artical-edit').then((module) => {
        resolve(module);
    });
};

const Blog = (resolve) => {
    import('../admin/blog/blog').then((module) => {
        resolve(module);
    });
};

export default new Router({
  routes: [
    {
      path: '/admin',
      component: Login,
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'mainBackstage',
          component: MainBackstage,
          children: [
            {
              path: 'blog',
              component: Blog,
              children: [
                {
                  path: 'articalEdit',
                  component: ArticalEdit
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});