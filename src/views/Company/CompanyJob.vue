<template>
  <div id="CompanyJob">
    <div class="left-nav">
      <div class="left-nav-title">已发布岗位</div>
      <ul>
        <li
          :key="index"
          @click="switchCheck(item,index)"
          :class="{checked:checkIndex==index}"
          v-for="(item,index) in curCompanyJobList"
        >{{ item.jobName }}</li>
      </ul>
    </div>
    <div class="company-job-cont">
      <div class="company-job-cont-title">
        <span>岗位详情</span>
        <span class="new-company-job" @click='openNewJob'>发布新岗位</span>
      </div>
      <div class="company-job-cont-detail">
        <span class="company-job-salary">
          发布薪资：
          <em>{{ checkJobDetail.jobSalary }}</em>
        </span>
        <span class="company-job-time">
          发布时间：
          <em>{{ checkJobDetail.jobTime }}</em>
        </span>
        <div class="company-job-description">
          <div>岗位描述：</div>
          <div
            class="company-job-description-cont"
          >{{ checkJobDetail.jobDescription }}哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
        </div>
        <div class="company-job-description">
          <div>岗位要求：</div>
          <div
            class="company-job-description-cont"
          >{{ checkJobDetail.jobRequest }}哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
        </div>
      </div>
    </div>
    <!-- 发布新岗位弹框 -->
    <el-dialog title="发布新岗位" :visible.sync="newJobDialog" width="50%">
      <div class="new-job-name">
        <span>岗位名称：</span>
        <input type="text" class="new-job-name-ipt">
      </div>
      <div class="new-job-salary">
        <span>岗位薪资：</span>
        <input type="text" class="new-job-salary-ipt">
      </div>
      <div class="new-job-description">
        <span>岗位描述：</span>
        <textarea></textarea>
      </div>
      <div class="new-job-request">
        <span>岗位要求：</span>
        <textarea></textarea>
      </div>
      <div class="new-job-school">
        <span>发布学校：</span>
        <input type="text" class="new-job-school-ipt">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newJobDialog = false">取 消</el-button>
        <el-button type="primary" @click="newJobDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      checkIndex: 0, //左边默认岗位选中
      checkJobDetail: {},    //对应岗位详情
      newJobDialog:false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["curCompanyJobList"])
  },
  created() {
    this.getCurCompanyJobList(() => {
      this.checkJobDetail = this.curCompanyJobList[0]
    })
  },
  methods: {
    ...mapActions(["getCurCompanyJobList"]),
    //切换左侧导航栏
    switchCheck(checkJobDetail, checkIndex) {
      this.checkIndex = checkIndex
      this.checkJobDetail = checkJobDetail
    },
    //打开新岗位弹窗
    openNewJob(){
      this.newJobDialog = true
    }
  }
};
</script>

<style scope>
#CompanyJob {
  display: flex;
}

.left-nav {
  width: 300px;
  text-align: center;
  margin-top: 30px;
  margin-left: 80px;
}

.left-nav-title {
  width: 200px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
}

.left-nav li {
  width: 200px;
  height: 40px;
  margin-top: 15px;
  line-height: 40px;
  cursor: pointer;
}

.left-nav li:nth-child(1) {
  margin-top: 0;
}

.left-nav li:hover,
.checked {
  background-color: green;
  color: #fff;
}

.company-job-cont {
  width: 700px;
}

.company-job-cont-title {
  width: 700px;
  margin: 30px auto;
  font-size: 20px;
  font-weight: bold;
  color: #339966;
  display: flex;
  justify-content: space-between;
}

.new-company-job {
  display: inline-block;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
  background-color: #339966;
  color: #fff;
  cursor: pointer;
}

.new-company-job:hover {
  background-color: #fff;
  color: #339966;
}

.company-job-cont-detail {
  padding: 20px;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  flex-flow: wrap;
}

.company-job-cont-detail em {
  font-style: normal;
  color: #339966;
}

.company-job-description {
  width: 100%;
  margin: 20px 77px;
}

.company-job-description-cont {
  position: relative;
  left: 20px;
  top: 20px;
}

.new-job-salary{
  margin-top:20px;
}

.new-job-name-ipt,
.new-job-salary-ipt,
.new-job-school-ipt{
  width:70%;
  height: 30px;
}

.new-job-description,
.new-job-request,
.new-job-school{
  margin-top: 20px;
}

.new-job-description textarea,
.new-job-request textarea{
  width: 70%;
  height: 50px;
  resize: none;
}
</style>
