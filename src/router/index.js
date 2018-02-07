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

const Back = (resolve) => {
    import('../base/back/back').then((module) => {
        resolve(module);
    });
}; 

const WalkingBlogDetail = (resolve) => {
    import('../base/walking-blog/walking-blog').then((module) => {
        resolve(module);
    });
}; 

const ArticleDetail = (resolve) => {
    import('../base/articleDetail/articleDetail').then((module) => {
        resolve(module);
    });
};

const FisrtPage = (resolve) => {
    import('../components/firstPage/firstPage').then((module) => {
        resolve(module);
    });
}; 

const Pigeonhole = (resolve) => {
    import('../components/pigeonhole/pigeonhole').then((module) => {
        resolve(module);
    });
}; 

const About = (resolve) => {
    import('../components/about/about').then((module) => {
        resolve(module);
    });
}; 

const Mylife = (resolve) => {
    import('../components/mylife/mylife').then((module) => {
        resolve(module);
    });
}; 

const Board = (resolve) => {
    import('../components/board/board').then((module) => {
        resolve(module);
    });
}; 

export default new Router({
  routes: [
    {
      path: '/',
      component: FisrtPage
    },
    {
      path: '/archives',
      component: Pigeonhole
    },
    {
      path: '/board',
      component: Board
    },
    {
      path: '/mylife',
      component: Mylife
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: MainBackstage,
      children: [
        {
          path: 'home',
          component: HomePage
        },
        {
          path: 'article',
          component: Blog,
          children: [{
            path: ':id',
            component: ArticleDetail
          }]
        },
        {
          path: 'subscribe',
          component: FollowUser
        },
        {
          path: 'edite',
          component: ArticalEdit
        },
        {
          path: 'draft',
          component: Draft,
          children: [{
            path: ':id',
            component: ArticleDetail
          }]
        },
        {
          path: 'message',
          component: Mess
        },
        {
          path: 'setup',
          component: UserCenter
        },
        {
          path: 'mylife',
          component: WalkingBlog,
          children: [{
            path: ':id',
            component: WalkingBlogDetail
          }]
        },
        {
          path: 'back',
          component: Back
        }
      ]
    }
  ]
});