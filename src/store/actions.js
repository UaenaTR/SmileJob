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

//获取当前用户个人简历
export const getUserResume = ({commit,state}) => {
    axios({
        method:'get',
        url:"api/resume"
    }).then(response => {
        const result = response.data
        commit('initCurUserResume',result)
    })
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
}
//获取已收到简历岗位列表
export const getResumeJobList = async ({commit,state}) => {
    const result = await axios({
        method:'get',
        url:'api/resumeJob'
    })
    if(result.data.result == '0'){
        const data = result.data.list
        commit('initResumeJobList', data)
    }
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