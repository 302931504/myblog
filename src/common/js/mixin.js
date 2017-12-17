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