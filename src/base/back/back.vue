<template>
  <div style="color: #000">这是中间空白页</div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'backPath'
      ])
    },
    created () {
      this.$router.push({path: this.backPath});
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  
</style>