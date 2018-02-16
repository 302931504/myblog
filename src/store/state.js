import {loadBlogs, loaduser} from '../common/js/cache';

const state = {
  navList: [
    {text: '后台首页', name: 'home'}
  ],
  currentName: 'home',
  editBlog: {},
  type: 0,
  backPath: '',
  isquote: false,
  manager: {},
  showList: true,
  likeBlogs: loadBlogs(),
  user: loaduser()
};

export default state;