<template>
  <div id="CompanyIndex">
    <div class="top-nav">
      <span class="logo"></span>
      <ul>
        <li class="company-job" :class="{checkedTop:checkedIndex == 0}" @click="skipNav(0)">岗位</li>
        <li class="company-resume" :class="{checkedTop:checkedIndex == 1}" @click="skipNav(1)">简历</li>
        <li class="company-info" :class="{checkedTop:checkedIndex == 2}" @click="skipNav(2)">公司信息</li>
      </ul>
      <div class="company-info-icon">
        <el-dropdown @command='clickItem'>
          <span class="el-dropdown-link">
            {{ nickname }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='Inbox'>收件箱</el-dropdown-item>
            <el-dropdown-item command='CompanyInfo'>公司信息</el-dropdown-item>
            <el-dropdown-item command='logOut'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { mapGetters,mapMutations,mapActions } from 'vuex'

export default {
  data() {
    return {
      checkedIndex: 0 //导航条选中索引
    };
  },
  components: {},
  computed:{
    ...mapGetters([
      'username',
      'nickname'
      ])
  },
  watch: {
    $route: "initNavType"
  },
  created() {
    this.initNickName()
  },
  //进入该组件时触发
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  //离开该组件对应的路由触发
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#339966";
    next();
  },
  methods: {
    ...mapMutations(['initNickname']),
    //刷新下页面将缓存中的信息存进vuex
    initNickName(){
      const nickname = sessionStorage.getItem('nickname')
      this.initNickname(nickname)
    },
    //导航栏切换到对应页面
    skipNav(NavType) {
      switch (NavType) {
        case 0:
          this.$router.push("/CompanyJob");
          break;
        case 1:
          this.$router.push("/CompanyResume");
          break;
        default:
          this.$router.push("/CompanyInfo");
      }
    },
    //初始化导航条选中状态
    initNavType() {
      const curPath = this.$route.path;
      switch (curPath) {
        case "/CompanyJob":
          this.checkedIndex = 0;
          break;
        case "/CompanyResume":
          this.checkedIndex = 1;
          break;
        default:
          this.checkedIndex = 2;
      }
    },
    //下拉菜单点击对应显示对应页面
    clickItem(item){
      switch (item) {
        case 'Inbox':   //点击进入简历页
          this.$router.push('/CompanyResume')
          break;
        case 'CompanyInfo':   //点击进入公司信息页
          this.$router.push('/CompanyInfo')
          break;
        default:
          this.$router.push('/Login')
          sessionStorage.removeItem('isCompanyLogin')
      }
    },
  }
};
</script>

<style scope>
#CompanyIndex {
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

.company-info-icon{
  height:45px;
  margin-right: -100px;
  margin-top:35px;
  line-height: 45px;
  position: relative;
  right: -300px;
}

.company-info-icon span {
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

.company-info-icon span:hover {
  color: green;
}
</style>
