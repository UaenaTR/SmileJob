//获取器,主要是对state中的数据进行简单处理,在组件中若需要处理后的数据使用mapGetters来获取，若需要原生数据，使用mapState来获取
//使用获取器的方法则是直接调用Vuex实例的getter下的各种函数即可,或者使用mapGetters
export const curPersonInfo = state => state.curUserInfo
export const curUserResume = state => state.curUserResume
export const curCompanyJobList = state => state.curCompanyJobList
export const resumeJobList = state => state.resumeJobList
export const schoolJobList = state => state.schoolJobList
export const curCompanyInfo = state => state.curCompanyInfo
export const schoolList = state => state.schoolList 