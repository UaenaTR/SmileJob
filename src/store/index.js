import Vue from "vue";
import Vuex from "Vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

Vue.use(Vuex);

// 首先声明一个需要全局维护的状态 state
const state = {
    projectName:'SmileJob', 
    username:'', //主页显示对应用户名称
    nickname:'',        //当前用户的昵称
    userSchool:'',      //当前用户所在学校
    userCompany:'',     //当前用户所在公司
    leftCheckedSchool:'',        //左侧导航栏点击选中的学校名称
    curUserInfo:{},     //当前用户个人信息
    curUserResume:{},        //当前用户个人简历
    curCompanyJobList:[],     //当前公司已发布岗位列表
    resumeJobList:[],       //已收到简历岗位列表
}
 
// 注册上面引入的各大模块
const store = new Vuex.Store({
    state,    // 共同维护的一个状态，state里面可以是很多个全局状态
    getters,  // 获取数据并渲染
    actions,  // 数据的异步操作
    mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里
})
 
export default store  // 导出store并在 main.js中引用注册。