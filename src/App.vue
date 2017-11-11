<template>
  <div id="app">
<!--     <main-backstage></main-backstage> -->
    <router-view/>
  </div>
</template>

<script>
  import Login from './admin/login/login';
  import MainBackstage from './admin/mainBackStage/mainBackStage';

  export default {
    components: {
      Login,
      MainBackstage    
    }
  };
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
}
</style>
