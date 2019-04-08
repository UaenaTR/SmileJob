<template>
  <div id='OwnSchoolJob'>
    <div id="LeftNav">
   			<div class="left-nav">
   				<ul class="left-nav-list">
   					<li class="own-school" :class="{checked:checkedSchool == userSchool}" @click='getOwnSchool'>本校</li>
   					<li class="other-school" :class="{checked:item.schoolName == otherSchool}" @click='getOtherSchool(item.schoolName,item.schoolCode)' :key='item.schoolCode' v-for='item in leftSchoolList'>{{ item.schoolName }}</li>
   				</ul>
   			</div>
    </div>
    <div class="main-content">
      <div class="main-own-school">
        <span>{{ leftCheckedSchool }}职位推荐</span>
      </div>
      <div class="main-own-job" :key="index" v-for="(item,index) in ownSchoolJobInfo">
        <div class="own-job-name">
          <span>{{ item.jobName }}</span>
          <span class="own-job-salary">{{ item.jobSalary }}</span>
        </div>
        <div class="own-job-details">
          <span class="own-job-city">{{ item.jobCity }}</span>
          <span class="own-job-district">{{ item.jobDistrict }}</span>
          <span class="own-job-time">{{ item.jobTime }}</span>
          <span class="own-job-more" @click='jobListFlag=true'>查看详情</span>
        </div>
      </div>
    </div>
    <!-- 职位详情页 -->
    <el-dialog title="职位详情" :visible.sync="jobListFlag" width="50%" center>
      <span>岗位描述</span>
	  <div class="job-description">岗位描述</div>
	  <span>岗位要求</span>
	  <div class="job-request">岗位要求</div>
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
      checkedSchool:"",		//左侧导航栏本校选中
			otherSchool:"",		//其他被选中
			schoolList:[		//左侧导航栏列表
				{
					schoolCode:"zufe",
					schoolName:"浙江财经大学"
				},
				{
					schoolCode:"hzsf",
					schoolName:"杭州师范大学"
				},
				{
					schoolCode:"zjgs",
					schoolName:"浙江工商大学"
				},
				{
					schoolCode:"zjlg",
					schoolName:"浙江理工大学"
				},
				{
					schoolCode:"zjdx",
					schoolName:"浙江大学"
				}
			],
			leftSchoolList:[],
      otherSchoolJobObj:{},
      ownSchoolJobInfo: [], //学校职位信息
      jobListFlag:false
    };
  },
  computed: {
    ...mapGetters([
      'username', //渲染为this.username(类似放在data里面)
      'leftCheckedSchool',
      'userSchool'
    ])
  },
  created: function() {
    //左侧导航栏初始化
    this.initSchool()
    this.initLeftNav()
    //本校默认选中及本校推荐职位
		this.getOwnSchool()
  },
  updated(){
    
  },
  mounted(){
    
  },
  methods: {
    //刷新页面重新将缓存中的学校信息放到vuex中
		initSchool(){
			let userSchool = sessionStorage.getItem('userSchool')
			this.$store.commit('initSchool',userSchool)
		},
		//按照用户学校信息初始化左侧导航栏
		initLeftNav(){
			//将左侧导航栏列表中当前用户所在学校渲染位本校，其他学校按详细名渲染
			this.schoolList.forEach(item => {
				if(this.userSchool != item.schoolName){
					this.leftSchoolList.push(item)
				}
			})
		},
		//本校被选中
		getOwnSchool(){
			this.checkedSchool = this.userSchool
			this.otherSchool = ''
			//将当前选中的学校名放到缓存中
			let leftCheckedSchool = this.checkedSchool
			sessionStorage.setItem('leftCheckedSchool',leftCheckedSchool)
      this.$store.commit('initLeftCheckedSchool',leftCheckedSchool)
      //根据当前用户名获取本校推荐职位
      let username = sessionStorage.getItem("username");
      this.$http({
        method: "get",
        url: "../../../static/api/school_job.json"
      }).then(response => {
        if (response.data.result == "0") {
          let jobListObj = response.data.jobInfo
          this.$http({
            method: "get",
            url: "../../../static/api/student_info.json"
          }).then(response => {
            if (response.data.result == "0") {
              let index = response.data.studentList.findIndex((item, index) => {
                return username == item.username
              });
              this.schoolName = response.data.studentList[index].school
              let schoolCode = this.formatSchool(this.schoolName)
              this.ownSchoolJobInfo = jobListObj[schoolCode]
            }
          })
        }
      })
			this.$router.push('/OwnSchoolJob')
		},
		//其他被选中
		getOtherSchool(schoolName,schoolCode){
			this.checkedSchool = ''
			if(schoolCode == 'zufe'){
				this.otherSchool = "浙江财经大学"
			}else if(schoolCode == 'hzsf'){
				this.otherSchool = "杭州师范大学"
			}else if(schoolCode == 'zjgs'){
				this.otherSchool = "浙江工商大学"
			}else if(schoolCode == 'zjlg'){
				this.otherSchool = "浙江理工大学"
			}else {
				this.otherSchool = "浙江大学"
			}
			//将当前选中的学校名放到缓存中
			let leftCheckedSchool = this.otherSchool
			sessionStorage.setItem('leftCheckedSchool',leftCheckedSchool)
      this.$store.commit('initLeftCheckedSchool',leftCheckedSchool)
      //在vuex中获取左侧导航栏点击的学校状态
      let leftCheckedSchoolCode = this.formatSchool(leftCheckedSchool)
      this.$http({
          method:'get',
          url:'../../static/api/school_job.json'
      }).then(response => {
          if(response.data.result == '0'){
              this.otherSchoolJobObj = response.data.jobInfo
          }
          this.ownSchoolJobInfo = this.otherSchoolJobObj[leftCheckedSchoolCode]
      })
			this.$router.push('/OwnSchoolJob')
		},
    formatSchool(msg) {
      switch (msg) {
        case "浙江财经大学":
          return "zufe";
          break;
        case "杭州师范大学":
          return "hzsf";
          break;
        case "浙江工商大学":
          return "zjgs";
          break;
        case "浙江理工大学":
          return "zjlg";
          break;
        default:
          return "zjdx";
      }
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


