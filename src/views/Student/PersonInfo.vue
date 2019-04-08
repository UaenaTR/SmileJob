<template>
  <div id="PersonInfo">
    <div class="person-info">
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
      </div>
      <!-- 在校经历 -->
      <div class="item-cont">
        <div class="item-exp">在校经历</div>
        <div class="item-title">
          <span class="item-time">{{ curUserResume.schoolTime }}</span>
          <span class="item-name">{{ curUserResume.schoolItemName }}</span>
        </div>
        <div class="school-exp-cont">{{ curUserResume.schoolExpCont }}</div>
      </div>
      <!-- 荣誉奖项 -->
      <div class="item-cont">
        <div class="item-exp">自我评价</div>
        <div class="school-exp-cont">{{ curUserResume.personalEvaluation }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
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
    initPersonInfo() {
      const username = sessionStorage.getItem("username");
      this.getPersonInfo(username);
    }
  }
};
</script>

<style scope>
#PersonInfo {
  width: 100%;
  background-color: #f2f2f2;
  float: left;
  margin-top: 30px;
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
.school-exp-cont{
  width:60%;
  margin: 10px auto;
  border: 1px red solid;
}
</style>
