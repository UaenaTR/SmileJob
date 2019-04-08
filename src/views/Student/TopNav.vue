<template>
  <div id="header">
    <span class="logo"></span>
    <ul class="student-nav">
      <li class="student-index" :class="{checkedTop:checkedIndex == 0}" @click='skipNav(0)'>首页</li>
      <li class="student-job" :class="{checkedTop:checkedIndex == 1}" @click='skipNav(1)'>职位</li>
      <li class="student-resume" :class="{checkedTop:checkedIndex == 2}" @click='skipNav(2)'>简历状态</li>
      <li class="student-info" :class="{checkedTop:checkedIndex == 3}" @click='skipNav(3)'>个人信息</li>
    </ul>
    <div class="user-info">
      <el-dropdown @command='clickItem'>
        <span class="el-dropdown-link">
          {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='modifyResume'>在线简历</el-dropdown-item>
          <el-dropdown-item command='mySend'>我的投递</el-dropdown-item>
          <el-dropdown-item command='logOut'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <router-view />
  </div>
</template>
<script>

import { mapGetters,mapMutations } from 'vuex'

export default {
  name: "TopNav",
  data: function() {
    return {
      checkedIndex:0,
    } 
  },
  computed: {
	...mapGetters([
    'username',
    'nickname'
	])
  },
  watch:{
    //根据路由变化切换导航条选中状态
    "$route":"initNavType"
  },
  created(){
     this.initNickname2()
     this.initNavType()
  },
  methods:{
    ...mapMutations(['initNickname']),
	  //当刷新页面将用户昵称信息从缓存中重新存进vuex
	  initNickname2(){
		  let nickname = sessionStorage.getItem('nickname')
      // this.$store.commit('initNickname',nickname)
      this.initNickname(nickname)
    },
    //顶部导航栏个人操作下拉菜单
    clickItem(item){
      //点击个人信息
      if(item == 'modifyResume'){
        this.$router.push('/modifyResume')
      }else if(item == 'mySend'){    //点击修改简历
        this.$router.push('/mySend')
      }else if(item == 'logOut'){     //点击注销账号
        sessionStorage.removeItem('isLogin')    
        this.$router.push('/Login')
      }  
    },
    //点击顶部导航栏显示对应内容
    skipNav(NavType){
      if(NavType == 0){
        //this.checkedIndex = 0
        this.$router.push('/StudentIndex')
      }else if(NavType == 1){
        //this.checkedIndex = 1
        this.$router.push('/PositionDetail')
      }else if(NavType == 2){
        //this.checkedIndex = 2
        this.$router.push('/ResumeState')
      }else{
        //this.checkedIndex = 3
        this.$router.push('/PersonInfo')
      }
    },
    //初始化导航条选中状态
    initNavType(){
      //根据当前路由路径确定导航条选中状态
      const curPath = this.$route.path
      switch(curPath){
        case '/OwnSchoolJob':
          this.checkedIndex = 0
          break;
        case '/PositionDetail':
          this.checkedIndex = 1
          break;
        case '/ResumeState':
          this.checkedIndex = 2
          break;
        default:
          this.checkedIndex = 3
      }
    }
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 110px;
  background-color: #fff;
}

.logo {
  display: block;
  width: 215px;
  height: 105px;
  position: relative;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  background: url(../../assets/images/logo.png);
  float: left;
}

#header .student-nav {
  width: 50%;
  height: 110px;
  float: left;
  margin-left: 50px;
  display: flex;
}

.student-nav li {
  position: relative;
  text-align: center;
  margin-left: 30px;
  font-size: 20px;
  padding: 5px;
  line-height: 100px;
  cursor: pointer;
}

.student-nav li:after {
  content: "";
  width: 0;
  height: 2px;
  background: green;
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}

.student-nav .checkedTop:after {
  content: "";
  width: 100%;
  height: 2px;
  background: green;
  position: absolute;
  top: 100%;
  left: 0;
}

.student-nav li:hover:after {
  left: 0%;
  width: 100%;
}

.user-info {
  height:45px;
  float: right;
  display: flex;
  margin-right: 100px;
  margin-top:35px;
}

.user-info span {
  display: inline-block;
  height: 40px;
  position: relative;
  top: 50%;
  margin-top: -20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-size: 20px;
}

.user-info span:hover {
  color: green;
}

</style>