<template>
  <div id="PositionDetail">
    <div class="position-search">
      <input type="text" placeholder="请搜索职位" v-model='searchJob'>
      <label>
        <i class="el-icon-search"></i>
      </label>
    </div>
    <div class="position-list">
      <div class="position-title">全部职位</div>
      <div class="position-list-box" :key="index" v-for="(item,index) in jobList">
        <div class="position-name-salary">
          <span class="position-name">{{ item.name }}</span>
          <span class="position-company">{{ item.companyName }}</span>
          <span class="position-salary">{{ item.salary }}</span>
        </div>
        <div class="position-detail">
          <span class="position-city">{{ item.city }}</span>
          <span class="position-district">{{ item.district }}</span>
          <span class="position-time">{{ item.createTimeStr }}</span>
          <span class="position-send" @click='sendResume'>投递简历</span>
          <span class="position-more" @click="lookJobDetail(item.description,item.request)">查看详情</span>
        </div>
      </div>
    </div>
    <!-- 职位详情页 -->
    <el-dialog title="职位详情" :visible.sync="jobListFlag" width="50%" center>
      <span>岗位描述</span>
	  <div class="job-description">{{ jobDescription }}</div>
	  <span>岗位要求</span>
	  <div class="job-request">{{ jobRequest }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jobListFlag = false">返 回</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
  name: "PositionDetail",
  components: {},
  //进入该组件对应的路由触发
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  data: function() {
    return {
    jobListFlag: false,		//岗位详情弹框
	  jobList: [],		//职位列表
	  jobDescription:'',		//职位描述
    jobRequest:'',		//职位要求
    searchJob:''    //搜索岗位名
    };
  },
  async created() {
    const params = {
      studentId:sessionStorage.getItem('id'),
      postName:this.searchJob,
      startNum:1,
      endNum:2
    }
    const result = await this.getAllSchoolJobList(params)
    if(result.data.code == 200){
      this.jobList = result.data.body.list
    }
  },
  methods: {
    ...mapActions(['getAllSchoolJobList']),
    lookJobDetail(jobDescription,jobRequest) {
	  this.jobListFlag = true
	  this.jobDescription = jobDescription
	  this.jobRequest = jobRequest
    },
    //投递简历
    sendResume(){
      this.$confirm('确定投递此岗位?', '投递', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '投递成功!'
          });
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
<style>
#PositionDetail {
  width: 100%;
  background-color: #f2f2f2;
  float: left;
  margin-top: 30px;
}

.position-search {
  width: 600px;
  height: 50px;
  position: relative;
  left: 50%;
  margin-left: -300px;
}

.position-search input {
  width: 500px;
  height: 40px;
  border: 1px #339966 solid;
}

.position-search label {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 40px;
  border: 1px #339966 solid;
  top: 2px;
  left: -4px;
  text-align: center;
  line-height: 40px;
  background-color: #339966;
  cursor: pointer;
}

.position-search label i {
  color: #fff;
  font-size: 18px;
}

.position-list {
  width: 900px;
  background-color: #fff;
  position: relative;
  left: 50%;
  margin-left: -450px;
  margin-top: 30px;
}

.position-title {
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  margin-left: 30px;
}

.position-list-box {
  width: 100%;
  height: 80px;
  margin: 10px;
  border-bottom: 1px #f2f2f2 solid;
}

.position-list-box:hover {
  background-color: #f2f2f2;
}

.position-name-salary {
  width: 100%;
  height: 40px;
  display: flex;
}

.position-name {
  display: block;
  flex: 2;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: green;
  margin-left: 30px;
}

.position-company {
  flex: 2;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}

.position-salary {
  display: block;
  flex: 1;
  height: 40px;
  float: right;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
  font-size: 18px;
}

.position-detail {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-left: 30px;
}

.position-time {
  margin-left: 265px;
}

.position-send {
  display: block;
  width: 80px;
  height: 40px;
  background-color: #339966;
  border-radius: 5px;
  float: right;
  margin-right: 80px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  color: #fff;
}

.position-more {
  display: block;
  width: 80px;
  height: 40px;
  background-color: #339966;
  border-radius: 5px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  color: #fff;
}

.position-send:hover,
.position-more:hover {
  background-color: #fff;
  color: #339966;
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