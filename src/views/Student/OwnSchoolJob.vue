<template>
  <div id='OwnSchoolJob'>
    <div id="LeftNav">
   			<div class="left-nav">
   				<ul class="left-nav-list">
   					<li :class="{checked:checkIndex == index}" @click='getOther(item.comId,item.comName,index)' :key='index' v-for='(item,index) in leftCompanyList'>{{ item.comName }}</li>
   				</ul>
   			</div>
    </div>
    <div class="main-content">
      <div class="main-own-school">
        <span>{{ leftCheckCom }}职位推荐</span>
      </div>
      <div class="main-own-job" :key="index" v-for="(item,index) in comJobInfo">
        <div class="own-job-name">
          <span>{{ item.jobName }}</span>
          <span class="own-job-salary">{{ item.jobSalary }}</span>
        </div>
        <div class="own-job-details">
          <span class="own-job-city">{{ item.jobCity }}</span>
          <span class="own-job-district">{{ item.jobDistrict }}</span>
          <span class="own-job-time">{{ item.jobTime }}</span>
          <span class="own-job-more" @click='lookDetail(item.jobDescription,item.jobRequest)'>查看详情</span>
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
        <el-button type="primary">投递简历</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { mapState, mapGetters } from "vuex";

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
      leftCompanyList:[
        {
          comId:1,
          comName:'蚂蚁金服'
        },
        {
          comId:2,
          comName:'阿里巴巴集团'
        }
      ],
      comJobInfo:[
            {
                'companyId':'1',
                'company':'蚂蚁金服',
                'jobName':'销售经理',
                'jobSalary':'15k~20k',
                'jobTime':'2019-01-10',
                'jobDescription':'销售经理岗位描述',
                'jobRequest':'销售经理岗位要求'
            },
            {
                'companyId':'1',
                'company':'蚂蚁金服',
                'jobName':'前端开发工程师',
                'jobSalary':'20k~25k',
                'jobTime':'2019-01-13',
                'jobDescription':'前端开发岗位描述',
                'jobRequest':'前端开发岗位要求'
            }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'username', //渲染为this.username(类似放在data里面)
      'leftCheckedSchool',
      'userSchool'
    ])
  },
  created(){
    this.initCheck()
  },
  updated(){
    
  },
  mounted(){
    
  },
  methods: {
    initCheck(){
      this.checkIndex = 0
      this.leftCheckCom = this.leftCompanyList[this.checkIndex].comName
    },
    //导航栏切换
   getOther(comId,comName,index){
     this.checkIndex = index
     this.leftCheckCom = comName
   },
   //查看岗位详情
   lookDetail(jobDescription,jobRequest){
     this.lookJobDescription = jobDescription
     this.lookJobRequest = jobRequest
     this.jobListFlag = true
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


