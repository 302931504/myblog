import {getClassify} from '../../api/editor';
import {getOneBlog} from '../../api/draft';
import {mapMutations, mapActions} from 'vuex';

export const showAttentionMixin = {
  data () {
    return {
      attText: '',
      attIcon: true
    };
  },
  methods: {
    showAttention (text, iconVal) {
      this.attText = text;
      this.attIcon = iconVal;
      this.$refs.attBox.show(); 
    }
  }
}; 

export const circleMixin = {
  data () {
    return {
      showList: false
    };
  },
  methods: {
    optionOver () {
      this.showList = true;
      this.$refs.circle.style.transform = 'rotate(180deg)'; 
    },
    optionOut () {
      this.showList = false;
      this.$refs.circle.style.transform = 'rotate(0)';
    }
  } 
};

export const initPageMixin = {
  data () {
    return {
      limit: 10,
      pages: [],
      currentPage: 1,
      showBtn: true
    };
  },
  methods: {
    initPage (count) {
      let pageCount = Math.ceil(count / this.limit);
      for (let i = 0; i < pageCount; i++) {
        this.pages.push({page: i + 1});
      }
    },
    pre () {
      this.currentPage -= 1;
      this.getByPage();
    },
    next () {
      this.currentPage += 1;
      this.getByPage();
    },
    clickPage (page) {
      this.currentPage = page;
      this.getByPage();
    }
  }
};

export const blogMixin = {
  data () {
    return {
      options: []
    };
  },
  methods: {
    _getClassify () {
      getClassify().then(res => {
        if (res.status === 0) {
          for (let i = 0; i < res.data.length; i++) {
            this.options.push({text: res.data[i].classify_text, name: 'classify'});
          }
        }
      });
    },
    editBlog (id) {
      getOneBlog(id).then(res => {
        if (res.status === 0) {
          this.setEditBlog(res.data[0]);
          this.setType(1);
          const nav = {
            // text: res.data[0].blog_title,
            text: '编辑文章',
            name: 'editBlog_t'
          };
          this.pushNav(nav);
          this.setCurrentName(nav.name);
          this.$router.push({path: '/admin/edite'});
        }
      }); 
    },
    freshPage (id) {
      let index = this.blogs.findIndex((item) => {
        return item.blog_id === id;
      });
      this.blogs.splice(index, 1);
    },
    ...mapMutations({
      setEditBlog: 'SET_EDITBLOG',
      setType: 'SET_TYPE',
      setCurrentName: 'SET_CURRENTNAME'
    }),
    ...mapActions([
      'pushNav'
    ])
  }
};

export const cautionMixin = {
  data () {
    return {
      text: '',
      id: -1,
      showFlag: false,
      status: 0
    };
  },
  methods: {
    cancel () {
      this.showFlag = false;
    },
    routerGo () {
      this.setBackPath(this.$route.path);
      this.$router.push('/back');
    },
    ...mapMutations({
      setBackPath: 'SET_BACKPATH'
    })
  }
};

export const quoteMixin = {
  data () {
    return {
      answerType: 0,
      answerId: -1,
      isQuote: false,
      quoteObj: {},
      content: ''
    };
  }, 
  methods: {
    quoteto (item) {
      this.isQuote = true;
      this.quoteObj = item;
    },
    answer (item) {
      this.content = '回复 ' + item.name + ':';
      this.answerId = item.id;
      this.answerType = 1;
    }
  }
};
