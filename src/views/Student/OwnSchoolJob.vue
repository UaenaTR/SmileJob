<template>
  <div id='OwnSchoolJob'>
    <div id="LeftNav">
   			<div class="left-nav">
   				<ul class="left-nav-list">
   					<li :class="{checked:checkIndex == index}" @click='getOther(item,index)' :key='index' v-for='(item,index) in leftCompanyList'>{{ item }}</li>
   				</ul>
   			</div>
    </div>
    <div class="main-content">
      <div class="main-own-school">
        <span>{{ leftCheckCom }}职位推荐</span>
      </div>
      <div class="main-own-job" :key="index" v-for="(item,index) in comJobInfo">
        <div class="own-job-name">
          <span>{{ item.name }}</span>
          <span class="own-job-salary">{{ item.salary }}</span>
        </div>
        <div class="own-job-details">
          <span class="own-job-city">{{ item.city }}</span>
          <span class="own-job-district">{{ item.district }}</span>
          <span class="own-job-time">{{ item.createTimeStr }}</span>
          <span class="own-job-more" @click='lookDetail(item.id,item.description,item.request)'>查看详情</span>
        </div>
      </div>
    </div>
    <!-- 职位详情页 -->
    <el-dialog title="职位详情" :visible.sync="jobListFlag" width="50%" center>
      <span>岗位描述</span>
	  <div class="job-description">{{ lookJobDescription }}</div>
	  <span>岗位要求</span>
	  <div class="job-request">{{ lookJobRequest }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jobListFlag = false">返 回</el-button>
        <el-button type="primary" @click='send'>投递简历</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { mapState, mapGetters,mapActions } from "vuex";

export default {
  name: "OwnSchoolJob",
  data: function() {
    return {
      schoolName: "", //根据用户名信息找到的用户对应学校
      checkIndex:0,   //左侧导航栏选中索引
      leftCheckCom:'',    //选中公司名称
      jobListFlag:false,
      lookJobDescription:'',    //查看岗位详情描述
      lookJobRequest:'',        //查看岗位详情要求
      leftCompanyList:[],
      comJobInfo:[],
      studentJobList:[],
      sendJobId:'',   //投递岗位id
    };
  },
  computed: {
    ...mapGetters([
      'username', //渲染为this.username(类似放在data里面)
      'leftCheckedSchool',
      'userSchool'
    ])
  },
  async created(){
    this.initCheck()
    const params = {
      id:sessionStorage.getItem('id'),
      startNum:1,
      endNum:2
    }
    const result = await this.queryStudentJobList(params)
    if(result.data.code == 200){
      this.studentJobList = result.data.body
      this.leftCompanyList = Object.keys(result.data.body)
      this.leftCheckCom = this.leftCompanyList[0]
      this.comJobInfo = result.data.body[this.leftCheckCom]
    }
    
  },
  updated(){
    
  },
  mounted(){
    
  },
  methods: {
    ...mapActions(['queryStudentJobList','sendResume']),
    initCheck(){
      this.checkIndex = 0
      // this.leftCheckCom = this.leftCompanyList[this.checkIndex].comName
    },
    //导航栏切换
   getOther(item,index){
     this.checkIndex = index
     this.leftCheckCom = item
     this.comJobInfo = this.studentJobList[item]
    //  console.log(item)
   },
   //查看岗位详情
   lookDetail(id,jobDescription,jobRequest){
     this.lookJobDescription = jobDescription
     this.lookJobRequest = jobRequest
     this.jobListFlag = true
     this.sendJobId = id
   },
   //投递简历
    send(){
      this.$confirm('确定投递此岗位?', '投递', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const params = {
           studentId:sessionStorage.getItem('id'),
           postId:this.sendJobId
         }
        const result = await this.sendResume(params)
        if(result.data.code == 200){
          this.$message({
            message:result.data.body,
            type:'success'
          })
          this.jobListFlag = false
        }else{
          this.$message.error(result.data.message)
          this.jobListFlag = false
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消投递'
          });          
        });
    }
  }
};
</script>

<style scoped>

#LeftNav{
		width:300px;
	}

.left-nav{
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
  float:left;
  margin-top: 30px;
  margin-left: 30px;
  background-color: #fff;
}

.main-own-school {
  width: 100%;
  height: 40px;
  border-bottom: 2px #f2f2f2 solid;
}

.main-own-school span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: green;
  margin-left: 30px;
}

.main-own-job {
  width: 100%;
  height: 80px;
  margin: 10px;
}

.main-own-job:hover {
  background-color: #f2f2f2;
}

.own-job-name {
  width: 100%;
  height: 40px;
  margin-left: 20px;
  line-height: 40px;
  font-size: 20px;
}

.own-job-salary {
  display:block;
  width:100px;
  height:40px;
  float: right;
  text-align: center;
  margin-right: 40px;
}

.own-job-details {
  width: 100%;
  height: 40px;
  margin-left: 20px;
  line-height: 40px;
  color: green;
}

.own-job-more {
  display: block;
  width: 80px;
  height: 40px;
  background-color:#339966;
  border-radius: 5px;
  float: right;
  margin-right: 50px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  color: #fff;
}

.own-job-more:hover {
  background-color:#fff;
  color:#339966;
}

.el-dialog__body span{
	color:#339966;
	font-weight: bold;
	margin-top: 20px;
}

.el-dialog__body .job-description{
	width:60%;
	position: relative;
	left:50%;
	transform: translateX(-50%);
	border:1px red solid;
}

.el-dialog__body .job-request{
	width:60%;
	position: relative;
	left:50%;
	transform: translateX(-50%);
	border:1px red solid;
}
</style>


