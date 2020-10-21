<template>
  <div id="app">
    <Header :title="brandName" :key="headerUpdate" @updateHeader="updateHeader"></Header>
    <router-view @updateHeader="updateHeader"></router-view>
  </div>
</template>

<script>
import header from './components/header';
export default {
  name: 'App',
  components: {
    Header:header,
  },
  data(){
    return {
      brandName: 'Blog',
      headerUpdate:false
    }
  },
  methods:{
    updateHeader(status){
      this.headerUpdate=status;
      this.$forceUpdate();
    }
  }
}
</script>

<style>
</style>
