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
      currentPage: 1
    };
  },
  methods: {
    initPage (count) {
      let pageCount = Math.ceil(count / this.limit);
      for (let i = 0; i < pageCount; i++) {
        this.pages.push({page: i + 1});
      }
      console.log(this.pages);
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