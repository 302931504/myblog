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
          const nav = {
            text: res.data[0].blog_title,
            name: 'editBlog'
          };
          this.pushNav(nav);
          this.$router.push({path: '/admin/mainBackStage/editBlog'});
        }
      }); 
    },
    ...mapMutations({
      setEditBlog: 'SET_EDITBLOG'
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
    }
  }
};