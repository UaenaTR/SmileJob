import { resumeJobList } from "./getters";

//转变
//在Vuex实例的Mutations下编写对应的修改函数来修改状态。
//并且要修改的时候，要通过Vuex实例的commit方法来提交修改。
//也就是说任何对state状态的修改操作都必须写在Mutations中，
//并且还得用Vuex实例的commit来提交修改操作，
//并且由于Mutations函数可以传入参数，所以commit同理也可以传入参数。
//通过vuex实例的commit方法提交Mutations修改的原因：Vue.js的状态修改其实是在内部有一个修改队列，通过commit的方式提交修改可以保证状态的修改是有序的。

export const initCurPersonInfo = (state,curPersonInfo) => {
    state.curUserInfo = curPersonInfo
}

export const initCurUserResume = (state,curUserResume) => {
    state.curUserResume = curUserResume
}

export const initCurCompanyJobList = (state,curCompanyJobList) => {
    state.curCompanyJobList = curCompanyJobList
}

export const initResumeJobList = (state,resumeJobList) => {
    state.resumeJobList = resumeJobList
}

export const initSchoolJobList = (state,schoolJobList) => {
    state.schoolJobList = schoolJobList
}

export const initCurCompanyInfo = (state,curCompanyInfo) => {
    state.curCompanyInfo = curCompanyInfo
}

export const initSchoolList = (state,schoolList) => {
    state.schoolList = schoolList
}