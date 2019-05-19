import axios from 'axios'

//登录并获取当前用户个人信息
export const getPersonInfo = async ({commit,state},params) =>{
    const result = await axios({
        method:'post',
        url:'api/user/login',
        params:params
    })
    const data = result.data.body
    commit('initCurPersonInfo',data)
    return result
}

//获取当前公司已常见岗位的列表
export const getCurCompanyJobList = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url: "api/company/post/query",
        params:params
    })
    const data = result.data.body.list
    commit('initCurCompanyJobList', data)
    return result
}

//获取投递信息
export const querySendInfo = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/student/query',
        params:params
    })
    return result
}

//删除岗位
export const delJob = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/del',
        params:params
    })
    return result
}

//获取学校岗位
export const getSchoolJobList = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/school/query',
        params:params,
    })
    return result
}

//查看当前公司信息
export const getCurCompanyInfo = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/edit',
        params:params
    })
    const data = result.data.body
    commit('initCurCompanyInfo',data)
    return result
}

//查询学校列表
export const getSchoolList = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/school/query',
        params:params
    })
    const data = result.data.body.list
    commit('initSchoolList',data)
}

//发布岗位
export const releaseJob = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/release',
        params:params
    })
    return result
}

//查询学校信息
export const getSchoolInfo = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/school/edit',
        params:params
    })
    return result
}

//修改学校信息
export const modifySchoolInfo = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/school/doEdit',
        params:params
    })
    return result
}

//学校审核
export const examineJob = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/school/audit',
        params:params
    })
    return result
}

//查询学校已审核岗位
export const queryStudentJobList = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/school/student/query',
        params:params
    })
    return result
}

//查询学校所有岗位并搜索
export const getAllSchoolJobList = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/school/query',
        params:params
    })
    return result
}

//查询学生信息
export const getStudentInfo = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/student/edit',
        params:params
    })
    return result
}

//修改学生信息
export const modifyStudentInfo = async ({ commit, state }, params) => {
    const result = await axios({
        method: 'post',
        url: 'api/student/doEdit',
        params: params
    })
    return result
}

//添加经历
export const addStudentExp = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/student/exp/doEdit',
        params:params
    })
    return result
}

//查询经历
export const queryxStudentExp = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/student/exp/edit',
        params:params
    })
    return result 
}

//查询经历列表
export const queryTypeExp = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/student/exp/query',
        params:params
    })
    return result
}

//删除经历
export const delExp = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/student/exp/del',
        params:params
    })
    return result
}

//投递简历
export const sendResume = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/commit',
        params:params
    })
    return result
}

//标记简历
export const signJobResume = async ({commit,state},params) => {
    const result = await axios({
        method:'post',
        url:'api/company/post/student/handle',
        params:params
    })
    return result 
}
