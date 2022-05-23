<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import firebaseInitialize from './firebase'

export default {
  name: 'App',
  created(){
    firebaseInitialize();
  }
}
</script>
