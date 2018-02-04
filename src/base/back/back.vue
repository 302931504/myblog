<template>
  <div class="load">
    <div class="img">
      <img src="./loading.gif" alt="">
    </div>
  </div>
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
  .load{
    position: relative;
    .img{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 300px;
      margin-left: -200px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>