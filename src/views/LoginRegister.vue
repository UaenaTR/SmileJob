<template>
  <div id="LoginRegister">
    <div class="login-register">
      <router-link to="/Login" class="login-btn">登录</router-link>
      <span>|</span>
      <router-link to="/Register" class="login-btn">注册</router-link>
    </div>
    <div class="login-register-logo"></div>
    <div class="introduction">校招求职系统</div>
    <router-view/>
  </div>
</template>
<script>
import { loginMsg } from "../assets/js/common.js";

export default {
  name: "",
  data: function() {
    return {};
  },
  //若不登录直接进入详情页，提示必须登录
  beforeRouteLeave(to, from, next) {
    const StudentRoute = [
      "/OwnSchoolJob",
      "/PositionDetail",
      "/ResumeState",
      "/PersonInfo"
    ]
    const CompanyRoute = ['/CompanyJob','/CompanyResume','/CompanyInfo']
    const SchoolRoute = ['/SchoolJob','SchoolInfo']
    if (StudentRoute.indexOf(to.path) != -1) {
      if (!sessionStorage.getItem("isLogin")) {
        loginMsg(this)
      }
    } else if (CompanyRoute.indexOf(to.path) != -1) {
      if (!sessionStorage.getItem("isCompanyLogin")) {
        loginMsg(this)
      }
    }else if(SchoolRoute.indexOf(to.path) != -1){
       if (!sessionStorage.getItem("isSchoolLogin")) {
        loginMsg(this)
      }
    }
    next()
  }
};
</script>
<style scoped>
.login-register {
  width: 300px;
  margin: 20px auto;
  color: #fff;
}

.login-btn {
  display: inline-block;
  height: 40px;
  width: 80px;
  text-align: center;
  line-height: 40px;
  margin-right: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}

.register-btn {
  display: inline-block;
  height: 40px;
  width: 80px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}

.login-register-logo {
  width: 600px;
  height: 220px;
  margin-top: 20px;
  position: relative;
  left: 50%;
  margin-left: -300px;
  background: url(../assets/images/logo-big.png);
}

.introduction {
  width: 600px;
  height: 40px;
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  position: relative;
  left: 50%;
  margin-left: -300px;
  letter-spacing: 20px;
}
</style>