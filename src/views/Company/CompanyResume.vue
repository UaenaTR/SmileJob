<template>
  <div id="CompanyResume">
    <div class="resume-title">未标记简历</div>
    <div class="left-resume-nav">
      <div class="resume-nav-title" style="position:relative;height:350px;">
        <div>岗位列表</div>
        <ul>
          <li
            :class="checkIndex == index ? 'check' : ''"
            @click="switchCheck(item,index)"
            :key="index"
            v-for="(item,index) in curCompanyJobList"
          >{{ item.name }}</li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          style="position:absolute;left:70px;bottom:10px;"
          @current-change="skipPage"
          :current-page="jobListCurPage"
          :page-size="4"
          layout="prev, pager, next"
          :total="total"
      ></el-pagination>
      </div>
      <div class="table-list">
        <div class="company-resume-cont" style="position:relative">
          <el-table border :data="checkSendInfo" style="width:700px;height:320px;">
            <el-table-column prop="realName" label="投递人" width="100"></el-table-column>
            <el-table-column prop="createTimeStr" label="投递时间" width="150"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope='scope'>
                    {{ scope.row.status | statusFormat }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width='350'>
              <template slot-scope="scope">
                <span @click="operaResume('noSign',1,scope.row)">查看简历</span>
                <span @click="operaResume('noSign',2,scope.row)">待沟通</span>
                <span @click="operaResume('noSign',3,scope.row)">不合适</span>
                <span @click="operaResume('noSign',4,scope.row)">面试</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            style="position:absolute;left:50%;transform: translateX(-50%)"
            @current-change="noSignSkipPage"
            :current-page="noSignCurPage"
            :page-size="4"
            layout="prev, pager, next"
            :total="noSignTotal"
          ></el-pagination>
        </div>
        <div class="sign-resume" style="margin-top:50px;">已标记简历</div>
        <div class="company-resume-cont"  style="position:relative">
          <el-table border :data="signResume" style="width:700px;height:320px;">
            <el-table-column prop="realName" label="投递人" width="100"></el-table-column>
            <el-table-column prop="createTimeStr" label="投递时间" width="150"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope='scope'>
                    {{ scope.row.status | statusFormat }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width='350'>
              <template slot-scope="scope">
                <span @click="operaResume('sign',1,scope.row)">查看简历</span>
                <span @click="operaResume('sign',2,scope.row)">待沟通</span>
                <span @click="operaResume('sign',3,scope.row)">不合适</span>
                <span @click="operaResume('sign',4,scope.row)">面试</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            style="margin-left:300px;"
            @current-change="signSkipPage"
            :current-page="signCurPage"
            :page-size="4"
            layout="prev, pager, next"
            :total="signTotal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 简历弹窗 -->
    <el-dialog
      :visible.sync="resumeDialog"
      width="70%">
      <div class="person-resume">
      <span class="online-resume">在线简历</span>
      <!-- 基本信息 -->
      <div class="resume-basic-info">
        <span class="nickname">{{ curPersonInfo.realName }}</span>
        <span class="sex">{{ curPersonInfo.sex | sexFormat }}</span>
        <span class="age">{{ curPersonInfo.age }}</span>
        <span class="education">{{ curPersonInfo.education }}</span>
        <span class="phone">{{ curPersonInfo.tele }}</span>
        <span class="email">{{ curPersonInfo.email }}</span>
      </div>
      <!-- 教育背景 -->
      <div class="education-bg-cont">
        <div class="education-bg">教育背景</div>
        <div class="bg-cont">
          <span class="education-bg-time">{{ curPersonInfo.educationTime }}</span>
          <span class="education-bg-school">{{ curPersonInfo.schoolName }}</span>
          <span class="education-bg-profession">{{ curPersonInfo.profession }}</span>
        </div>
      </div>
      <!-- 求职意向 -->
      <div class="bidding-cont">
        <div class="bidding">求职意向</div>
        <div class="job-cont">
          <span class="job-name">{{ curPersonInfo.postName }}</span>
          <span class="job-address">{{ curPersonInfo.address }}</span>
          <span class="job-arrive">{{ curPersonInfo.postArrive }}</span>
          <span class="job-salary">{{ curPersonInfo.postSalary }}</span>
        </div>
      </div>
      <!-- 项目经验 -->
      <div class="item-cont">
        <div class="item-exp">项目经验</div>
        <div :key="index" v-for="(item,index) in itemExpList">
          <div class="item-title">
            <span class="item-time">{{ item.time }}</span>
            <span class="item-name">{{ item.name }}</span>
          </div>
          <div class="item-detail">
            <div class="item-description">
              <span class="description">项目描述</span>
              <span class="description-cont">{{ item.description }}</span>
            </div>
            <div class="item-duty">
              <span class="duty">个人职责</span>
              <span class="duty-cont">{{ item.duty }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 实习经历 -->
      <div class="practice-cont">
        <div class="practice-exp">实习经历</div>
        <div :key="index" v-for="(item,index) in practiceExpList">
          <div class="bg-cont">
            <span class="education-bg-time">{{ item.time }}</span>
            <span class="education-bg-school">{{ item.name }}</span>
            <span class="education-bg-profession">{{ item.duty }}</span>
          </div>
          <div class="practice-detail">{{ item.description }}</div>
        </div>
      </div>
      <!-- 在校经历 -->
      <div class="item-cont">
        <div class="item-exp">在校经历</div>
        <div :key="index" v-for="(item,index) in schoolExpList">
          <div class="item-title">
            <span class="item-time">{{ item.time }}</span>
            <span class="item-name">{{ item.name }}</span>
          </div>
          <div class="school-exp-cont">{{ item.description }}</div>
        </div>
      </div>
      <!-- 荣誉奖项 -->
      <div class="item-cont">
        <div class="item-exp">自我评价</div>
        <div class="school-exp-cont">{{ curPersonInfo.personalEvaluction }}</div>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      checkIndex: 0, //左侧导肮默认选中第一个
      checkSendInfo: [], //选中岗位未标记简历
      noSignResume:[],    //未标记简历
      signResume:[],     //已标记简历
      jobListCurPage:1,   //岗位列表当前页
      noSignCurPage:1,
      signCurPage:1,
      total:null,
      noSignTotal:null,
      signTotal:null,
      resumeDialog:false,   //简历弹窗
      curPersonInfo:{},
      itemExpList:[],   //项目经验列表
      practiceExpList:[],   //实习经历列表
      schoolExpList:[],     //学校经历列表
    };
  },
  components: {},
  filters:{
    statusFormat(data){
      switch (data) {
        case 0:
          return '待查看'
          break;
        case 1:
          return '待沟通'
          break;
        case 2:
            return '面试'
            break;
        default:
            return '不合适'
          break;
      }
    },
    sexFormat(data){
      switch (data) {
        case 0:
          return '男'
          break;
        default:
          return '女'
      }
    }
  },
  computed: {
    ...mapGetters(['curCompanyJobList'])
  },
  async created() {
    await this.skipPage()
    const noSignResult = await this.queryNoSignSend(this.curCompanyJobList[0].id,this.noSignCurPage)
    console.log(noSignResult)
    this.noSignResume = noSignResult.data.body.list
    this.noSignTotal = noSignResult.data.body.total
    // this.noSignResume = await this.queryNoSignSend(this.curCompanyJobList[0].id,this.noSignCurPage).data.body.list
    // console.log(this.noSignResume)
    this.checkSendInfo = this.noSignResume
    const signResult = await this.querySignSend(this.curCompanyJobList[0].id,this.signCurPage)
    this.signResume = signResult.data.body.list
    this.signTotal = signResult.data.body.total
    // this.signResume = await this.querySignSend(this.curCompanyJobList[0].id,this.signCurPage).data.body.list
    // console.log(this.signResume)
  },
  methods: {
    ...mapActions(['getCurCompanyJobList','querySendInfo','signJobResume','getStudentInfo','queryTypeExp']),
    //查询学生信息,简历
    async queryStudentInfo(id){
      const params = {
        id:id
      }
      const result = await this.getStudentInfo(params)
      if(result.data.code == 200){
        this.curPersonInfo = result.data.body
      }
    },
    //查询项目经验
    async queryItemExp(id){
      const params = {
        studentId:id,
        type:0
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.itemExpList = result.data.body.list
      }
    },
    //查询实习经历列表
    async queryPractice(id){
       const params = {
        studentId:id,
        type:1
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.practiceExpList = result.data.body.list
      }
    },
    //查询在校经历
    async querySchoolExp(id){
      const params = {
        studentId:id,
        type:2
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.schoolExpList = result.data.body.list
      }
    },
    async switchCheck(item, index) {
      this.checkIndex = index
      this.checkJobId = item.id
      const noSignResult = await this.queryNoSignSend(this.checkJobId,this.noSignCurPage)
      console.log(noSignResult)
      this.noSignResume = noSignResult.data.body.list
      this.noSignTotal = noSignResult.data.body.total
      this.checkSendInfo = this.noSignResume
      const signResult = await this.querySignSend(this.checkJobId,this.signCurPage)
      this.signResume = signResult.data.body.list
      this.signResult = signResult.data.body.total
    },
    async skipPage(curPage) {
      this.jobListCurPage = curPage;
      const params = {
        companyId: sessionStorage.getItem("id"),
        pageNum: this.jobListCurPage,
        pageSize: 4
      };
      const result = await this.getCurCompanyJobList(params);
      if (result.data.code == 200) {
        this.total = result.data.body.total;
      }
    },
    noSignSkipPage(curPage){
      this.noSignCurPage = curPage
      this.queryNoSignSend(this.checkJobId,this.noSignCurPage)
    },
    signSkipPage(curPage){
      this.signCurPage = curPage
      this.queryNoSignSend(this.checkJobId,this.signCurPage)
    },
    //查询未标记简历列表
    async queryNoSignSend(id,pageNum){
      const params = {
        postId:id,
        pageNum:pageNum,
        startNum:0,
        endNum:1
      }
      const result = await this.querySendInfo(params)
      return result
    },
    //查询标记简历列表
    async querySignSend(id,pageNum){
      const params = {
        postId:id,
        pageNum:pageNum,
        startNum:1,
        endNum:4
      }
      const result = await this.querySendInfo(params)
      return result
    },
    //简历操作
    operaResume(signType,resumeType,item){
        if(resumeType == '2'){
          this.signCommunicate(item.studentId,item.id)
        }else if(resumeType == '3'){
          this.signImproper(item.studentId,item.id)
        }else if(resumeType == '4'){
          this.signInterview(item.studentId,item.id)
        }else if(resumeType == '1'){
          this.resumeDialog = true
          this.queryStudentInfo(item.studentId)
          this.queryItemExp(item.studentId)
          this.queryPractice(item.studentId)
          this.querySchoolExp(item.studentId)
        }
    },
    //标记为待沟通
    signCommunicate(studentId,id){
      this.$confirm('确定将该简历标记为待沟通?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            studentId:studentId,
            id:id,
            status:1
          }
          const result = await this.signJobResume(params)
          if(result.data.code == 200){
            this.$message({
              message:result.data.body,
              type:'success'
            })
            const noSignResult = await this.queryNoSignSend(this.checkJobId,this.noSignCurPage)
            console.log(noSignResult)
            this.noSignResume = noSignResult.data.body.list
            this.noSignTotal = noSignResult.data.body.total
            this.checkSendInfo = this.noSignResume
            const signResult = await this.querySignSend(this.checkJobId,this.signCurPage)
            this.signResume = signResult.data.body.list
            this.signResult = signResult.data.body.total
          }else{
            this.$message.error(result.data.message)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消标记'
          });          
        });
    },
    //标记为不合适
    signImproper(studentId,id){
      this.$confirm('确定将该简历标记为不合适?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            studentId:studentId,
            id:id,
            status:3
          }
          const result = await this.signJobResume(params)
          if(result.data.code == 200){
            this.$message({
              message:result.data.body,
              type:'success'
            })
            const noSignResult = await this.queryNoSignSend(this.checkJobId,this.noSignCurPage)
            console.log(noSignResult)
            this.noSignResume = noSignResult.data.body.list
            this.noSignTotal = noSignResult.data.body.total
            this.checkSendInfo = this.noSignResume
            const signResult = await this.querySignSend(this.checkJobId,this.signCurPage)
            this.signResume = signResult.data.body.list
            this.signResult = signResult.data.body.total
          }else{
            this.$message.error(result.data.message)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消标记'
          });          
        });
    },
    //标记为面试
    signInterview(studentId,id){
      this.$confirm('确定将该简历标记为面试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            studentId:studentId,
            id:id,
            status:2
          }
          const result = await this.signJobResume(params)
          if(result.data.code == 200){
            this.$message({
              message:result.data.body,
              type:'success'
            })
            const noSignResult = await this.queryNoSignSend(this.checkJobId,this.noSignCurPage)
            console.log(noSignResult)
            this.noSignResume = noSignResult.data.body.list
            this.noSignTotal = noSignResult.data.body.total
            this.checkSendInfo = this.noSignResume
            const signResult = await this.querySignSend(this.checkJobId,this.signCurPage)
            this.signResume = signResult.data.body.list
            this.signResult = signResult.data.body.total
          }else{
            this.$message.error(result.data.message)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消标记'
          });          
        });
    }
  }
};
</script>

<style scoped>
#CompanyResume {
  margin-top: 20px;
}

.resume-title {
  width: 400px;
  height: 40px;
  margin: 20px auto;
  text-align: center;
  font-size: 22px;
  color: #339966;
}

.left-resume-nav {
  display: flex;
}

.resume-nav-title {
  width: 300px;
  margin: 30px 80px;
  text-align: center;
}

.resume-nav-title > div {
  font-size: 20px;
  font-weight: bold;
}

.resume-nav-title ul li {
  width: 200px;
  height: 40px;
  margin: 20px auto;
  line-height: 40px;
  cursor: pointer;
}

.resume-nav-title ul li:hover,
.check {
  background-color: green;
  color: #fff;
}

.company-resume-cont {
  width: 700px;
}

.el-table span {
  display: inline-block;
  width: 70px;
  height: 40px;
  background-color: #339966;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  margin-left: 7px;
  cursor: pointer;
}

.el-table span:hover {
  background-color: #fff;
  color: #339966;
}

.sign-resume{
  width: 400px;
  height: 40px;
  padding-left: 95px;
  margin: 20px auto;
  font-size: 22px;
  color:#339966;
}

.info-title,
.online-resume {
  display: block;
  width: 100px;
  margin: 50px auto;
  font-size: 22px;
  color: #339966;
}

.nickname-school-phone,
.resume-basic-info {
  width: 40%;
  margin: 20px auto;
  text-align: center;
}

.nickname-school-phone span::after,
.resume-basic-info span::after {
  content: "|";
  display: inline-block;
  margin: 0 10px 0 10px;
  color: #339966;
}

.nickname-school-phone span:last-child::after,
.resume-basic-info span:last-child::after {
  content: "";
  display: inline-block;
}

.education-bg,
.bidding,
.item-exp,
.practice-exp {
  margin-left: 13%;
  font-size: 18px;
  color: #339966;
}

.bg-cont,
.job-cont,
.item-title {
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}

.education-bg-cont span,
.job-cont span {
  display: inline-block;
}

.item-description,
.item-duty {
  width: 60%;
  margin: 10px auto;
  display: flex;
}

.description,
.duty {
  flex: 1 1 auto;
  border: 1px red solid;
}

.description-cont,
.duty-cont {
  flex: 4 1 auto;
  border: 1px red solid;
}

.practice-detail {
  width: 70%;
  margin: 10px auto;
  border: 1px red solid;
}
.school-exp-cont {
  width: 60%;
  margin: 10px auto;
  border: 1px red solid;
}

</style>
