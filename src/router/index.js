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

const Blog = (resolve) => {
    import('../admin/blog/blog').then((module) => {
        resolve(module);
    });
};

const HomePage = (resolve) => {
    import('../admin/homePage/homePage').then((module) => {
        resolve(module);
    });
};

const FollowUser = (resolve) => {
    import('../admin/followUser/followUser').then((module) => {
        resolve(module);
    });
};

const ArticalEdit = (resolve) => {
    import('../admin/artical-edit/artical-edit').then((module) => {
        resolve(module);
    });
};

const Draft = (resolve) => {
    import('../admin/draft/draft').then((module) => {
        resolve(module);
    });
}; 

const Mess = (resolve) => {
    import('../admin/mess/mess').then((module) => {
        resolve(module);
    });
}; 

const UserCenter = (resolve) => {
    import('../admin/user-center/user-center').then((module) => {
        resolve(module);
    });
}; 

const WalkingBlog = (resolve) => {
    import('../admin/walking-blog/walking-blog').then((module) => {
        resolve(module);
    });
}; 

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
              component: Blog
            },
            {
              path: 'follower',
              component: FollowUser
            },
            {
              path: 'editBlog',
              component: ArticalEdit
            },
            {
              path: 'draft',
              component: Draft
            },
            {
              path: 'mess',
              component: Mess
            },
            {
              path: 'setup',
              component: UserCenter
            },
            {
              path: 'walkingBlog',
              component: WalkingBlog
            }
          ]
        }
      ]
    }
  ]
});