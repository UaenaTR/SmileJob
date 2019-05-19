<template>
  <div id="PersonInfo">
    <div class="person-info">
      <div class="opera-btn">
        <span class="modify-person-info" @click="openModifyDialog">修改信息</span>
        <span class="modify-person-info" @click="openAddDialog">添加经历</span>
      </div>
      <!-- 个人信息 -->
      <span class="info-title">个人信息</span>
      <div class="nickname-school-phone">
        <span class="nickname-cont">{{ curPersonInfo.nickName }}</span>
        <span class="schoolname-cont">{{ curPersonInfo.schoolName }}</span>
        <span class="num-cont">{{ curPersonInfo.tele }}</span>
      </div>
    </div>
    <!-- 在线简历 -->
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
          <div class="del-btn">
            <span @click="openModifyExp(item,0)">编辑该条</span>
            <span @click="openDelExp(item)">删除该条</span>
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
          <div class="del-btn">
            <span @click="openModifyExp(item,1)">编辑该条</span>
            <span @click="openDelExp(item)">删除该条</span>
          </div>
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
          <div class="del-btn">
            <span @click="openModifyExp(item,2)">编辑该条</span>
            <span @click="openDelExp(item)">删除该条</span>
          </div>
        </div>
      </div>
      <!-- 荣誉奖项 -->
      <div class="item-cont">
        <div class="item-exp">自我评价</div>
        <div class="school-exp-cont">{{ curPersonInfo.personalEvaluction }}</div>
      </div>
    </div>
    <!-- 修改信息弹窗 -->
    <div class="modify-info-dialog">
      <el-dialog
        @close="closeModify"
        title="修改信息"
        :visible.sync="personInfoFlag"
        width="50%"
        center
      >
        <div class="modify-cont">
          <div>
            <span>昵称：</span>
            <input type="text" v-model="addNickname">
          </div>
          <div>
            <span>真实姓名：</span>
            <input type="text" v-model="addRealName">
          </div>
          <div>
            <span>性别：</span>
            <el-select v-model="checkSex" placeholder="请选择">
              <el-option
                v-for="item in sexList"
                :key="item.sexFlag"
                :label="item.sex"
                :value="item.sexFlag"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>年龄：</span>
            <input type="text" v-model="addAge">
          </div>
          <div>
            <span>学历：</span>
            <input type="text" v-model="addEducation">
          </div>
          <div>
            <span>手机号码：</span>
            <input type="text" v-model="addTele">
          </div>
          <div>
            <span>邮箱：</span>
            <input type="text" v-model="addEmail">
          </div>
          <div>
            <span>教育时间：</span>
            <input type="text" v-model="addEducationTime">
          </div>
          <div>
            <span>专业：</span>
            <input type="text" v-model="addProfession">
          </div>
          <div>
            <span>期望岗位：</span>
            <input type="text" v-model="addJobName">
          </div>
          <div>
            <span>工作地点：</span>
            <input type="text" v-model="addJobAdd">
          </div>
          <div>
            <span>到岗时间：</span>
            <input type="text" v-model="addJobTime">
          </div>
          <div>
            <span>期望薪资：</span>
            <input type="text" v-model="addJobSalary">
          </div>
          <div>
            <span>个人评价：</span>
            <input type="text" v-model="addPersonal">
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeModify">返 回</el-button>
          <el-button type="primary" @click="ensureModify">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加经历弹窗 -->
    <div class="add-exp">
      <el-dialog @close="closeAdd" title="职位详情" :visible.sync="addExpFlag" width="50%" center>
        <div class="modify-cont">
          <div>
            <span>经历类型：</span>
            <el-select @change="selectSchoolExp" v-model="checkExp" placeholder="请选择">
              <el-option
                v-for="item in expList"
                :key="item.expType"
                :label="item.exp"
                :value="item.expType"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>经历名称：</span>
            <input type="text" v-model="addExpName">
          </div>
          <div>
            <span>经历时间：</span>
            <input type="text" v-model="addExpTime">
          </div>
          <div v-if="isSchoolExp">
            <span>担任职务：</span>
            <input type="text" v-model="addExpDuty">
          </div>
          <div>
            <span>经历描述：</span>
            <textarea type="text" v-model="addExpDescription"></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAdd">返 回</el-button>
          <el-button type="primary" @click="ensureAdd">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑弹窗 -->
    <!-- 添加经历弹窗 -->
    <div class="add-exp">
      <el-dialog
        @close="closeModifyExp"
        title="职位详情"
        :visible.sync="modifyExpFlag"
        width="50%"
        center
      >
        <div class="modify-cont">
          <div>
            <span>经历名称：</span>
            <input type="text" v-model="modifyExpName">
          </div>
          <div>
            <span>经历时间：</span>
            <input type="text" v-model="modifyExpTime">
          </div>
          <div v-if="modifyIsSchoolExp">
            <span>担任职务：</span>
            <input type="text" v-model="modifyExpDuty">
          </div>
          <div>
            <span>经历描述：</span>
            <textarea type="text" v-model="modifyExpDescription"></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeModifyExp">返 回</el-button>
          <el-button type="primary" @click="ensureModifyExp">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      personInfoFlag:false,    //修改信息弹窗
      addExpFlag:false,   //添加经历弹窗
      modifyExpFlag:false,    //修改经历弹窗
      isSchoolExp:true,   //担任职务输入框
      modifyIsSchoolExp:true,   //修改在线经历职务输入框
      checkSex:null,  //选中性别
      checkExp:null,  //选中经历类型
      itemExpList:[],   //项目经验列表
      practiceExpList:[],   //实习经历列表
      schoolExpList:[],     //学校经历列表
      curPersonInfo:{},
      addNickname:'',
      addRealName:'',
      addAge:'',
      addEducation:'',
      addTele:'',
      addEmail:"",
      addEducationTime:'',
      addProfession:'',
      addJobName:'',
      addJobAdd:'',
      addJobTime:'',
      addJobSalary:'',
      addPersonal:'',
      addExpName:'',
      addExpTime:'',
      addExpDuty:'',
      addExpDescription:'',
      modifyExpName:'',
      modifyExpTime:'',
      modifyExpDuty:'',
      modifyExpDescription:'',
      modifyExpId:'',   //修改经历的id
      modifyExpType:'',   //修改经历的类型
      sexList:[
        {
          sexFlag:0,
          sex:'男'
        },
        {
          sexFlag:1,
          sex:'女'
        }
      ],
      expList:[
        {
          expType:0,
          exp:'项目经验'
        },
        {
          expType:1,
          exp:'实习经历'
        },
        {
          expType:2,
          exp:'在校经历'
        }
      ]
    };
  },
  components: {},
  filters:{
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
    
  },
  async created() {
    await this.queryStudentInfo()
    this.queryItemExp()
    this.queryPractice()
    this.querySchoolExp()
  },
  methods: {
    ...mapActions(['getStudentInfo','modifyStudentInfo','addStudentExp','queryTypeExp','queryxStudentExp','delExp']),
    //初始化个人信息
    //打开修改个人信息弹窗
    async openModifyDialog(){
      this.personInfoFlag = true
      await this.queryStudentInfo()
      // console.log(this.curPersonInfo)
      this.addNickname = this.curPersonInfo.nickName
      this.addRealName = this.curPersonInfo.realName
      this.addAge = this.curPersonInfo.age
      this.addEducation = this.curPersonInfo.education
      this.addTele = this.curPersonInfo.tele
      this.addEmail = this.curPersonInfo.email
      this.addEducationTime = this.curPersonInfo.educationTime
      this.addProfession = this.curPersonInfo.profession
      this.addJobName = this.curPersonInfo.postName
      this.addJobAdd = this.curPersonInfo.address
      this.addJobTime = this.curPersonInfo.postArrive
      this.addJobSalary = this.curPersonInfo.postSalary
      this.addPersonal = this.curPersonInfo.personalEvaluction
    },
    //查询学生信息
    async queryStudentInfo(){
      const params = {
        id:sessionStorage.getItem('id')
      }
      const result = await this.getStudentInfo(params)
      if(result.data.code == 200){
        this.curPersonInfo = result.data.body
      }
    },
    //查询项目经验
    async queryItemExp(){
      const params = {
        studentId:this.curPersonInfo.id,
        type:0
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.itemExpList = result.data.body.list
      }
    },
    //查询实习经历列表
    async queryPractice(){
       const params = {
        studentId:this.curPersonInfo.id,
        type:1
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.practiceExpList = result.data.body.list
      }
    },
    //查询在校经历
    async querySchoolExp(){
      const params = {
        studentId:this.curPersonInfo.id,
        type:2
      }
      const result = await this.queryTypeExp(params)
      if(result.data.code == 200){
        this.schoolExpList = result.data.body.list
      }
    },
    //关闭修改弹窗
    closeModify(){
        this.personInfoFlag = false
        this.addNickname = ''
        this.addRealName = ''
        this.addAge = ''
        this.addEducation = ''
        this.addTele = ''
        this.addEmail = ''
        this.addEducationTime = ''
        this.addProfession = ''
        this.addJobName = ''
        this.addJobAdd = ''
        this.addJobTime = ''
        this.addJobSalary = ''
        this.addPersonal = ''
    },
    //确认修改
    async ensureModify(){
      const params = {
        id:this.curPersonInfo.id,
        address:this.addJobAdd,
        age:this.addAge,
        education:this.addEducation,
        educationTime:this.addEducationTime,
        email:this.addEmail,
        nickName:this.addNickname,
        password:this.curPersonInfo.password,
        personalEvaluction:this.addPersonal,
        postArrive:this.addJobTime,
        postName:this.addJobName,
        postSalary:this.addJobSalary,
        profession:this.addProfession,
        realName:this.addRealName,
        schoolId:this.curPersonInfo.schoolId,
        sex:this.checkSex,
        tele:this.addTele,
        userName:this.curPersonInfo.userName
      }
      const result = await this.modifyStudentInfo(params)
      if(result.data.code == 200){
        this.$message({
          message:result.data.body,
          type:'success'
        })
        this.personInfoFlag = false
        this.addNickname = ''
        this.addRealName = ''
        this.addAge = ''
        this.addEducation = ''
        this.addTele = ''
        this.addEmail = ''
        this.addEducationTime = ''
        this.addProfession = ''
        this.addJobName = ''
        this.addJobAdd = ''
        this.addJobTime = ''
        this.addJobSalary = ''
        this.addPersonal = ''
        this.queryStudentInfo()
      }
    },
    //打开添加经历弹窗
    openAddDialog(){
      this.addExpFlag = true
    },
    //关闭添加
    closeAdd(){
      this.addExpFlag = false
      this.addExpName = ''
      this.addExpTime = ''
      this.addExpDuty = ''
      this.addExpDescription = ''
    },
    //确认添加
    async ensureAdd(){
      await this.addExp()
      this.queryItemExp()
      this.queryPractice()
      this.querySchoolExp()
    },
    //添加经历
    async addExp(){
      const params = {
        studentId:this.curPersonInfo.id,
        type:this.checkExp,
        name:this.addExpName,
        time:this.addExpTime,
        duty:this.addExpDuty,
        description:this.addExpDescription
      }
      const result = await this.addStudentExp(params)
      if(result.data.code == 200){
        this.addExpFlag = false
        this.$message({
          message:result.data.body,
          type:'success'
        })
      }else{
        this.$message.error(result.data.message)
      }
    },
    //选中学校隐藏担任职称
    selectSchoolExp(current){
      if(current == 2){
        this.isSchoolExp = false
      }else{
        this.isSchoolExp = true
      }
    },
    //关闭修改经历弹窗
    closeModifyExp(){
      this.modifyExpFlag = false
    },
    //打开修改弹窗
    openModifyExp(item,type){
      this.modifyExpFlag = true
      this.modifyExpId = item.id
      if(type == 2){
        this.modifyIsSchoolExp = false
        this.modifyExpType = 2
        this.modifyItemExp(item.id,2)
      }else if(type == 1){
        this.modifyIsSchoolExp = true
        this.modifyExpType = 1
        this.modifyItemExp(item.id,1)
      }else if(type == 0){
        this.modifyIsSchoolExp = true
        this.modifyExpType = 0
        this.modifyItemExp(item.id,0)
      }
    },
    //修改经历
    async modifyItemExp(id,type){
      const params = {
        id:id,
        type:type
      }
      const result = await this.queryxStudentExp(params)
      if(result.data.code == 200){
        this.modifyExpName = result.data.body.name
        this.modifyExpTime = result.data.body.time
        this.modifyExpDuty = result.data.body.duty
        this.modifyExpDescription = result.data.body.description
      }else{
        this.$message.error(result.data.messsage)
      }
    },
    //确认修改经历
    async ensureModifyExp(){
      const params = {
        studentId:this.curPersonInfo.id,
        id:this.modifyExpId,
        type:this.modifyExpType,
        name:this.modifyExpName,
        time:this.modifyExpTime,
        duty:this.modifyExpDuty,
        description:this.modifyExpDescription
      }
      const result = await this.addStudentExp(params)
      if(result.data.code == 200){
        this.modifyExpFlag = false
        this.$message({
          message:result.data.body,
          type:'success'
        })
        this.queryItemExp()
        this.queryPractice()
        this.querySchoolExp()
      }else{
        this.$message.error(result.data.messsage)
      }
    },
    //删除经历
    async openDelExp(item){
      console.log(1)
       this.$confirm('确定删除该项?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
        id:item.id
      }
      const result = await this.delExp(params)
      if(result.data.code == 200){
        this.$message({
          message:result.data.body,
          type:'success'
        })
        this.queryItemExp()
        this.queryPractice()
        this.querySchoolExp()
      }else{
        this.$message.error(result.data.message)
      }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
};
</script>

<style scoped>
#PersonInfo {
  width: 100%;
  background-color: #f2f2f2;
  float: left;
  margin-top: 30px;
}

.opera-btn {
  width: 400px;
  height: 50px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}

.opera-btn span {
  display: inline-block;
  width: 150px;
  height: 40px;
  background-color: #339966;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
}

.opera-btn span:hover {
  background-color: #fff;
  color: #339966;
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

.del-btn {
  margin-left: 285px;
  display: flex;
}

.del-btn span {
  display: inline-block;
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #339966;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
}

.del-btn span:hover {
  background-color: #fff;
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

.modify-cont input {
  width: 70%;
  height: 30px;
}

.modify-cont > div {
  margin-top: 20px;
}

.modify-cont span {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 20px;
}

.modify-cont textarea {
  width: 70%;
  height: 50px;
  resize: none;
}
</style>
