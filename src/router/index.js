import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Admin = (resolve) => {
    import('../admin/admin/admin').then((module) => {
        resolve(module);
    });
};

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

const BlogList = (resolve) => {
    import('../admin/blogList/blogList').then((module) => {
        resolve(module);
    });
};

const HomePage = (resolve) => {
    import('../admin/homePage/homePage').then((module) => {
        resolve(module);
    });
};

const LeaveMess = (resolve) => {
    import('../admin/leaveMess/leaveMess').then((module) => {
        resolve(module);
    });
};

const FollowUser = (resolve) => {
    import('../admin/followUser/followUser').then((module) => {
        resolve(module);
    });
};
/*
const ArticalEdit = (resolve) => {
    import('../admin/artical-edit/artical-edit').then((module) => {
        resolve(module);
    });
};

const Blog = (resolve) => {
    import('../admin/blog/blog').then((module) => {
        resolve(module);
    });
}; */

export default new Router({
  routes: [
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'mainBackStage',
          component: MainBackstage,
          children: [
            {
              path: 'home',
              component: HomePage
            },
            {
              path: 'blog',
              component: BlogList
            },
            {
              path: 'message',
              component: LeaveMess
            },
            {
              path: 'users',
              component: FollowUser
            }
          ]
        }
      ]
    }
  ]
});