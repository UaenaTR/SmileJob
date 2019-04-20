import axios from 'axios'

//获取当前用户个人信息
export const getPersonInfo = ({commit,state},username) =>{
    axios({
        method:'get',
        url:'../../static/api/student_info.json'
    }).then(response => {
        const userList = response.data.studentList
        const index = userList.findIndex(item => {
          return username == item.username
        })
       commit('initCurPersonInfo',userList[index])
    })
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

//获取当前公司已发布岗位的列表
export const getCurCompanyJobList = ({commit,state},callback) => {
    axios({
        method:'get',
        url: "api/curComJobList"
    }).then(response => {
        const result = response.data.list
        commit('initCurCompanyJobList',result)
        callback()
    })
}

export const getResumeJobList = async ({commit,state}) => {
    const result = await axios({
        method:'get',
        url:'api/resumeJob'
    })
    const data = result.data.list
    if(result.data.result == '0'){
        commit('initResumeJobList', data)
    }
}