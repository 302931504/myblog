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