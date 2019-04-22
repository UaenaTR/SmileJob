<template>
  <div id="SchoolIndex">
    <div class="top-nav">
      <span class="logo"></span>
      <ul>
        <li class="school-job" :class="{checkedTop:checkedIndex == 0}" @click='skipNav(0)'>岗位</li>
        <li class="school-info" :class="{checkedTop:checkedIndex == 1}" @click='skipNav(1)'>学校信息</li>
      </ul>
      <div class="school-info-icon">
        <el-dropdown @command="clickItem">
          <span class="el-dropdown-link">
            {{ nickname }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Job">待审核岗位</el-dropdown-item>
            <el-dropdown-item command="SchoolInfo">学校信息</el-dropdown-item>
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

import { mapGetters,mapMutations,mapActions } from 'vuex'

export default {
  data() {
    return {
      checkedIndex: 0 //顶部导航栏默认选中
    };
  },
  components: {},
  //进入该组件触发
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  //离开该组件对应的路由触发
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#339966";
    next();
  },
  computed: {
      ...mapGetters(['nickname'])
  },
  watch: {
      '$route':'initNavType'
  },
  created() {
      this.initNavType()
      this.initNickName()
  },
  methods: {
      ...mapMutations(['initNickname']),
      //将信息存进vuex中,供刷新时获取
      initNickName(){
          const nickname = sessionStorage.getItem('nickname')
          this.initNickname(nickname)
      },
      initNavType(){
          const curPath = this.$route.path
          switch (curPath) {
              case '/SchoolJob':
                  this.checkedIndex = 0
                  break;
          
              default:
                  this.checkedIndex = 1
                  break;
          }
      },
      //顶部导航栏点击选中
      skipNav(NavType){
          switch (NavType) {
              case 0:
                  this.$router.push('/SchoolJob')
                  break;
          
              default:
              this.$router.push('/SchoolInfo')
                  break;
          }
      },
      //下拉菜单点击事件
      clickItem(item){
          switch (item) {
              case 'Job':
                  this.$router.push('/SchoolJob')
                  break;
              case 'SchoolInfo':
                  this.$router.push('/SchoolInfo')
                  break;
              default:
                  sessionStorage.removeItem('isSchoolLogin')
                  this.$router.push('/Login')
                  break;
          }
      }
  }
};
</script>

<style scoped>
#SchoolIndex {
  width: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
}

.top-nav {
  padding-left: 50px;
  display: flex;
  background-color: #fff;
}

.logo {
  display: inline-block;
  width: 215px;
  height: 105px;
  background: url(../../assets/images/logo.png);
}

.top-nav ul {
  display: flex;
  width: 50%;
  height: 110px;
  text-align: center;
  line-height: 110px;
  font-size: 20px;
  position: relative;
  left: 50%;
  transform: translateX(-60%);
}

.top-nav ul li {
  position: relative;
  margin-left: 60px;
  padding: 5px;
  cursor: pointer;
}

.top-nav ul li:after {
  content: "";
  width: 0;
  height: 2px;
  background: green;
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}

.top-nav ul .checkedTop:after {
  content: "";
  width: 100%;
  height: 2px;
  background: green;
  position: absolute;
  top: 100%;
  left: 0;
}

.top-nav ul li:hover:after {
  left: 0%;
  width: 100%;
}

.school-info-icon{
  height:45px;
  margin-right: -100px;
  margin-top:35px;
  line-height: 45px;
  position: relative;
  right: -300px;
}

.school-info-icon span {
  display: inline-block;
  position: relative;
  top: 50%;
  height: 40px;
  margin-top: -20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-size: 20px;
}

.school-info-icon span:hover {
  color: green;
}
</style>
