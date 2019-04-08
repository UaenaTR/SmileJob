<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//公共组件

//引入公共css
import './assets/css/base.css'

export default {
  name:'app',
  components:{

  }
}
</script>


<style>

body{
  background-color: #339966;
}

#app{
  min-width: 1200px;
}

</style>
