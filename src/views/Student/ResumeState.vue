<template>
  <div id="ResumeState">
    <div class="resume-state">
     <div class="left-nav">
       <ul>
         <li :class="{checked:checkIndex == index}" :key='index' @click='getOther(item,index)' v-for='(item,index) in sendJobList'>{{ item.company }}——{{ item.jobName }}</li>
       </ul>
     </div>
     <div class="main-content">
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
export default {
  data() {
    return {
      checkIndex:0,   //左侧导航选中索引
      activeResumeStatus:0,    //简历当前状态
      activeStatus:0,
      sendJobList:[
        {
          company:'蚂蚁金服',
          jobName:'销售经理',
          status:3      //0待查看 1待沟通  2面试  3不合适
        },
        {
          company:'蚂蚁金服',
          jobName:'前端开发工程师',
          status:0
        }
      ]
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
  created(){
    this.initNav()
  },
  methods:{
    initNav(){
      this.checkIndex = 0
      this.activeResumeStatus = this.sendJobList[this.checkIndex].status
      console.log(this.checkIndex)
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

</style>
