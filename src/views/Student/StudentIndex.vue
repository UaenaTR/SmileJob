<template>
  <div id="StudentIndex">
    <router-view/>
  </div>
</template>
<script>

export default {
  name: "StudentIndex",
  //进入该组件对应的路由触发
  beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
  },
  //离开该组件对应的路由触发
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#339966"
    next()
  },
  data: function() {
    return {};
  }
};
</script>
<style>
#StudentIndex {
  width: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
  min-height: 500px;
}
</style>