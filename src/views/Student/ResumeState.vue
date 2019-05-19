<template>
  <div id="ResumeState">
    <div class="resume-state">
     <div class="left-nav">
       <ul>
         <li :class="{checked:checkIndex == index}" :key='index' @click='getOther(item,index)' v-for='(item,index) in sendJobList'>{{ item.companyName }}——{{ item.postName }}</li>
       </ul>
     </div>
     <div class="main-content" v-if='!hasSend'>
       <div class="noSendInfo">您还未投递简历</div>
     </div>
     <div class="main-content" v-if='hasSend'>
      <div class="resume-sign-text" v-if='activeResumeStatus != 0'>您的简历已经被标记为{{ activeResumeStatus | resumeStatusToText }}</div>
      <div class="resume-sign-text" v-if='activeResumeStatus == 0'>您的简历{{ activeResumeStatus | resumeStatusToText }}</div>
      <div class="resume-step">
      <el-steps :active="activeResumeStatus" align-center v-if='activeResumeStatus != 3'>
        <el-step title="待查看"></el-step>
        <el-step title="待沟通"></el-step>
        <el-step title="面试"></el-step>
      </el-steps>
      <!-- 不合适 -->
      <el-steps :active="1" align-center v-if='activeResumeStatus == 3'>
        <el-step title="待查看"></el-step>
        <el-step title="不合适"></el-step>
      </el-steps>
      </div>
     </div>
    </div>
  </div>
</template>

<script>

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  data() {
    return {
      checkIndex:0,   //左侧导航选中索引
      activeResumeStatus:0,    //简历当前状态
      sendJobList:[],
      hasSend:false,    //是否有投递
    }
  },
  components: {

  },
  filters:{
    resumeStatusToText(type){
      switch (type) {
        case 0:
          return '待查看'
          break
        case 1:
          return '待沟通'
          break
        case 2:
          return '面试'
          break
        default:
          return '不合适'
          break;
      }
    }
  },
  async created(){
    await this.queryResumeState()
    this.initNav()
  },
  methods:{
    ...mapActions(['querySendInfo']),
    initNav(){
      this.checkIndex = 0
      if(this.sendJobList.length > 0){
        this.hasSend = true
        this.activeResumeStatus = this.sendJobList[this.checkIndex].status
        console.log(this.checkIndex)
      }else{
        this.hasSend = false
      }
    },
    //查询简历状态
    async queryResumeState(){
      const params = {
        studentId:sessionStorage.getItem('id'),
      }
      const result = await this.querySendInfo(params)
      if(result.data.code == 200){
        this.sendJobList = result.data.body.list
      }

    },
    //切换导航栏
    getOther(item,index){
      this.checkIndex = index
      this.activeResumeStatus = item.status
      console.log(item.status)
    }
  }
}
</script>

<style scoped>

  #ResumeState{
		width:100%;
		background-color:#f2f2f2;
		float:left;
		margin-top: 30px;
	}

.left-nav{
  width: 300px;
	margin-top:30px;
	margin-left: 80px;
	float: left;
}

.left-nav li{
	width:200px;
	height: 40px;
	margin-top: 15px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.left-nav li:nth-child(1){
	margin-top: 0;
}

.left-nav li:hover,
.checked{
	background-color:green;
	color:#fff;
}

.main-content {
  width:800px;
  height: 300px;
  float:left;
  margin-top: 30px;
  margin-left: 30px;
  background-color: #fff;
}

.resume-step{
  position: relative;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%)
}

.resume-sign-text{
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

.noSendInfo{
  font-size: 20px;
  text-align: center;
  color: #339966;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

</style>
