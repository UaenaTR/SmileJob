<template>
  <div id="PersonInfo">
    <div class="person-info">
      <div class="opera-btn">
        <span class="modify-person-info" @click='openModifyDialog'>修改信息</span>
        <span class="modify-person-info" @click='openAddDialog'>添加经历</span>
      </div>
      <!-- 个人信息 -->
      <span class="info-title">个人信息</span>
      <div class="nickname-school-phone">
        <span class="nickname-cont">{{ curPersonInfo.nickname }}</span>
        <span class="schoolname-cont">{{ curPersonInfo.school }}</span>
        <span class="num-cont">{{ curPersonInfo.phoneNum }}</span>
      </div>
    </div>
    <!-- 在线简历 -->
    <div class="person-resume">
      <span class="online-resume">在线简历</span>
      <!-- 基本信息 -->
      <div class="resume-basic-info">
        <span class="nickname">{{ curUserResume.nickname }}</span>
        <span class="sex">{{ curUserResume.sex }}</span>
        <span class="age">{{ curUserResume.age }}</span>
        <span class="education">{{ curUserResume.education }}</span>
        <span class="phone">{{ curUserResume.phone }}</span>
        <span class="email">{{ curUserResume.email }}</span>
      </div>
      <!-- 教育背景 -->
      <div class="education-bg-cont">
        <div class="education-bg">教育背景</div>
        <div class="bg-cont">
          <span class="education-bg-time">{{ curUserResume.educationTime }}</span>
          <span class="education-bg-school">{{ curUserResume.educationSchool }}</span>
          <span class="education-bg-profession">{{ curUserResume.educationProfession }}</span>
        </div>
      </div>
      <!-- 求职意向 -->
      <div class="bidding-cont">
        <div class="bidding">求职意向</div>
        <div class="job-cont">
          <span class="job-name">{{ curUserResume.jobName }}</span>
          <span class="job-address">{{ curUserResume.jobAddress }}</span>
          <span class="job-arrive">{{ curUserResume.jobArrive }}</span>
          <span class="job-salary">{{ curUserResume.jobSalary }}</span>
        </div>
      </div>
      <!-- 项目经验 -->
      <div class="item-cont">
        <div class="item-exp">项目经验</div>
        <div>
          <div class="item-title">
            <span class="item-time">{{ curUserResume.itemTime }}</span>
            <span class="item-name">{{ curUserResume.itemName }}</span>
          </div>
          <div class="item-detail">
            <div class="item-description">
              <span class="description">项目描述</span>
              <span class="description-cont">{{ curUserResume.itemDescription }}</span>
            </div>
            <div class="item-duty">
              <span class="duty">个人职责</span>
              <span class="duty-cont">{{ curUserResume.itemDuty }}</span>
            </div>
          </div>
          <div class="del-btn">
            <span>编辑该条</span>
            <span>删除该条</span>
          </div>
        </div>
      </div>
      <!-- 实习经历 -->
      <div class="practice-cont">
        <div class="practice-exp">实习经历</div>
        <div class="bg-cont">
          <span class="education-bg-time">{{ curUserResume.practiceTime }}</span>
          <span class="education-bg-school">{{ curUserResume.practiceCom }}</span>
          <span class="education-bg-profession">{{ curUserResume.practicePosition }}</span>
        </div>
        <div class="practice-detail">{{ curUserResume.practiceDetailCont }}</div>
        <div class="del-btn">
          <span>编辑该条</span>
          <span>删除该条</span>
        </div>
      </div>
      <!-- 在校经历 -->
      <div class="item-cont">
        <div class="item-exp">在校经历</div>
        <div class="item-title">
          <span class="item-time">{{ curUserResume.schoolTime }}</span>
          <span class="item-name">{{ curUserResume.schoolItemName }}</span>
        </div>
        <div class="school-exp-cont">{{ curUserResume.schoolExpCont }}</div>
        <div class="del-btn">
          <span>编辑该条</span>
          <span>删除该条</span>
        </div>
      </div>
      <!-- 荣誉奖项 -->
      <div class="item-cont">
        <div class="item-exp">自我评价</div>
        <div class="school-exp-cont">{{ curUserResume.personalEvaluation }}</div>
      </div>
    </div>
    <!-- 修改信息弹窗 -->
    <div class="modify-info-dialog">
      <el-dialog title="修改信息" :visible.sync="personInfoFlag" width="50%" center>
       <div class="modify-cont">
         <div>
           <span>昵称：</span>
           <input type="text">
         </div>
         <div>
           <span>真实姓名：</span>
           <input type="text">
         </div>
         <div>
           <span>性别：</span>
           <el-select v-model="checkSex" placeholder="请选择">
            <el-option
              v-for="item in sexList"
              :key="item.sexFlag"
              :label="item.sex"
              :value="item.sexFlag">
            </el-option>
          </el-select>
         </div>
         <div>
           <span>年龄：</span>
           <input type="text">
         </div>
         <div>
           <span>学历：</span>
           <input type="text">
         </div>
         <div>
           <span>手机号码：</span>
           <input type="text">
         </div>
         <div>
           <span>邮箱：</span>
           <input type="text">
         </div>
         <div>
           <span>教育时间：</span>
           <input type="text">
         </div>
         <div>
           <span>专业：</span>
           <input type="text">
         </div>
         <div>
           <span>期望岗位：</span>
           <input type="text">
         </div>
         <div>
           <span>工作地点：</span>
           <input type="text">
         </div>
         <div>
           <span>到岗时间：</span>
           <input type="text">
         </div>
         <div>
           <span>期望薪资：</span>
           <input type="text">
         </div>
         <div>
           <span>个人评价：</span>
           <input type="text">
         </div>
       </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="personInfoFlag = false">返 回</el-button>
        <el-button type="primary">确定</el-button>
      </span>
      </el-dialog>
    </div>
    <!-- 添加经历弹窗 -->
    <div class="add-exp">
      <el-dialog title="职位详情" :visible.sync="addExpFlag" width="50%" center>
        <div class="modify-cont">
          <div>
            <span>经历类型：</span>
            <el-select @change='selectSchoolExp' v-model="checkExp" placeholder="请选择">
              <el-option
                v-for="item in expList"
                :key="item.expType"
                :label="item.exp"
                :value="item.expType">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>经历名称：</span>
            <input type="text">
          </div>
          <div>
            <span>经历时间：</span>
            <input type="text">
          </div>
          <div v-if='isSchoolExp'>
            <span>担任职务：</span>
            <input type="text">
          </div>
          <div>
            <span>经历描述：</span>
            <textarea type="text"></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addExpFlag = false">返 回</el-button>
          <el-button type="primary">确定</el-button>
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
      isSchoolExp:true,   //担任职务输入框
      checkSex:null,  //选中性别
      checkExp:null,  //选中经历类型
      sexList:[
        {
          sexFlag:true,
          sex:'男'
        },
        {
          sexFlag:false,
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
  computed: {
    ...mapGetters(["curPersonInfo", "curUserResume"])
  },
  created() {
    this.initPersonInfo();
    this.getUserResume();
  },
  methods: {
    ...mapActions(["getPersonInfo", "getUserResume"]), //获取登录人的个人信息
    //初始化个人信息
    initPersonInfo() {
      const username = sessionStorage.getItem("username");
      this.getPersonInfo(username);
    },
    //打开修改个人信息弹窗
    openModifyDialog(){
      this.personInfoFlag = true
    },
    //打开添加经历弹窗
    openAddDialog(){
      this.addExpFlag = true
    },
    //选中学校隐藏担任职称
    selectSchoolExp(current){
      if(current == 2){
        this.isSchoolExp = false
      }else{
        this.isSchoolExp = true
      }
    }
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

.opera-btn{
  width: 400px;
  height: 50px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}

.opera-btn span{
  display: inline-block;
  width: 150px;
  height: 40px;
  background-color: #339966;
  color:#fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
}

.opera-btn span:hover{
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

.del-btn{
  margin-left: 285px;
  display: flex;
}

.del-btn span{
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

.del-btn span:hover{
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
.school-exp-cont{
  width:60%;
  margin: 10px auto;
  border: 1px red solid;
}

.modify-cont input{
    width: 70%;
    height: 30px;
}

.modify-cont>div{
  margin-top: 20px;
}

.modify-cont span{
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 20px;
}

.modify-cont textarea{
  width: 70%;
  height: 50px;
  resize: none;
}
</style>
