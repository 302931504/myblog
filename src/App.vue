<template>
  <div id="app">
    <main-backstage></main-backstage>
    <router-view/>
  </div>
</template>

<script>
  import Login from './components/login/login';
  import MainBackstage from './components/mainBackStage/mainBackStage';

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
  background: #E0E0E0;
}
</style>
