<template>
  <div id="CompanyJob">
    <div class="left-nav" style="height:380px;position:relative">
      <div class="create-new-job" @click="openCreateDialog">创建新岗位</div>
      <!-- 创建新岗位 -->
      <el-dialog @close="closeCreate" title="创建新岗位" :visible.sync="createNewJobDialog" width="50%">
        <div class="new-job-name">
          <span>岗位名称：</span>
          <input type="text" class="new-job-name-ipt" v-model="addName">
        </div>
        <div class="new-job-salary">
          <span>岗位薪资：</span>
          <input type="text" class="new-job-salary-ipt" v-model="addSalary">
        </div>
        <div class="new-job-description">
          <span>岗位描述：</span>
          <textarea v-model="addDescription"></textarea>
        </div>
        <div class="new-job-request">
          <span>岗位要求：</span>
          <textarea v-model="addRequest"></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeCreate">取 消</el-button>
          <el-button type="primary" @click="ensureCreate">确 定</el-button>
        </span>
      </el-dialog>
      <div class="left-nav-title">已创建岗位</div>
      <ul>
        <li
          :key="index"
          @click="switchCheck(item,index)"
          :class="{checked:checkIndex==index}"
          v-for="(item,index) in curCompanyJobList"
        >{{ item.name }}</li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        style="position:absolute;left:20px;bottom:10px;"
        @current-change="skipPage"
        :current-page="jobListCurPage"
        :page-size="4"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <div class="company-job-cont" v-if="hasList">
      <div class="company-job-cont-title">
        <span>岗位详情</span>
      </div>
      <div class="company-job-cont-detail">
        <span class="company-job-salary">
          薪资：
          <em>{{ checkJobDetail.salary }}</em>
        </span>
        <span class="company-job-time">
          创建时间：
          <em>{{ checkJobDetail.createTimeStr }}</em>
        </span>
        <div class="company-job-description">
          <div>岗位描述：</div>
          <div class="company-job-description-cont">{{ checkJobDetail.description }}</div>
        </div>
        <div class="company-job-description">
          <div>岗位要求：</div>
          <div class="company-job-description-cont">{{ checkJobDetail.request }}</div>
        </div>
        <span class="new-company-job" @click="openNewJob">发布到学校</span>
        <span class="new-company-job" @click="delCompanyJob">删除该岗位</span>
      </div>
    </div>
    <div
      class="company-job-cont"
      style="margin:50px auto;font-size:20px;color:#339966;"
      v-if="!hasList"
    >您还未创建岗位</div>
    <!-- 发布新岗位弹框 -->
    <el-dialog title="发布到学校" :visible.sync="newJobDialog" width="50%">
      <div class="new-job-school">
        <div class="current-job">
          <span class="current-job-cont">{{ currentJob }}</span>
        </div>
        <span>发布学校：</span>
        <el-select v-model="checkSchool" placeholder="请选择">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newJobDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureRelease">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      checkIndex: null, //左边默认岗位选中
      checkJobDetail: {}, //对应岗位详情
      newJobDialog: false, //发布新岗位弹窗
      checkSchool: null, //发布选中学校
      currentJob: "", //当前要发布的岗位
      createNewJobDialog: false, //创建新岗位弹窗
      addName: "",
      addSalary: "",
      addDescription: "",
      addRequest: "",
      hasList: false,
      jobListCurPage: 1,
      total: null
    };
  },
  components: {},
  computed: {
    ...mapGetters(["curCompanyJobList", "schoolList"])
  },
  async created() {
    // const params = {
    //   companyId: sessionStorage.getItem("id")
    // };
    // await this.getCurCompanyJobList(params);
    // console.log(this.curCompanyJobList);
    await this.skipPage();
    if (this.curCompanyJobList.length > 0) {
      this.hasList = true;
      this.checkIndex = 0;
      this.checkJobDetail = this.curCompanyJobList[0];
    }
  },
  methods: {
    ...mapActions([
      "getCurCompanyJobList",
      "getSchoolList",
      "releaseJob",
      "delJob"
    ]),
    //切换左侧导航栏
    switchCheck(checkJobDetail, checkIndex) {
      this.checkIndex = checkIndex;
      this.checkJobDetail = checkJobDetail;
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
    //打开创建岗位弹窗
    openCreateDialog() {
      this.createNewJobDialog = true;
    },
    //关闭创建弹窗
    closeCreate() {
      this.createNewJobDialog = false;
      this.addName = "";
      this.addSalary = "";
      this.addDescription = "";
      this.addRequest = "";
    },
    ensureCreate() {
      const params = {
        companyId: sessionStorage.getItem("id"),
        name: this.addName,
        salary: this.addSalary,
        description: this.addDescription,
        request: this.addRequest
      };
      this.$http({
        method: "post",
        url: "api/company/post/doEdit",
        params: params
      }).then(response => {
        if (response.data.code == 200) {
          this.createNewJobDialog = false;
          this.$message({
            message: response.data.body,
            type: "success"
          });
          this.hasList = true;
          const data = {
            companyId: sessionStorage.getItem("id")
          };
          this.$http({
            method: "post",
            url: "api/company/post/query",
            params: data
          }).then(response => {
            const res = response.data.body.list;
            this.$store.commit("initCurCompanyJobList", res);
            if (this.curCompanyJobList.length > 0) {
              this.hasList = true;
              this.checkIndex = 0;
              this.checkJobDetail = this.curCompanyJobList[0];
            }
          });
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    //打开发布新岗位弹窗
    async openNewJob() {
      this.checkSchool = null;
      this.newJobDialog = true;
      this.currentJob = this.checkJobDetail.name;
      await this.getSchoolList();
      // console.log(this.checkJobDetail.jobName)
      console.log(this.checkJobDetail);
    },
    //发布新岗位
    async ensureRelease() {
      // console.log(this.checkSchool)
      // console.log(this.checkJobDetail)
      const params = {
        schoolId: this.checkSchool,
        postId: this.checkJobDetail.id
      };
      const result = await this.releaseJob(params);
      if (result.data.code == 200) {
        this.newJobDialog = false;
        this.$message({
          message: result.data.body,
          type: "success"
        });
      } else {
        this.$message.error(result.data.message);
      }
    },
    async delCompanyJob() {
      const params = {
        id: this.checkJobDetail.id
      };
      console.log(params);
      const result = await this.delJob(params);
      if (result.data.code == 200) {
        this.$message({
          message: result.data.body,
          type: "success"
        });
        const data = {
          companyId: sessionStorage.getItem("id")
        };
        this.$http({
          method: "post",
          url: "api/company/post/query",
          params: data
        }).then(response => {
          const res = response.data.body.list;
          this.$store.commit("initCurCompanyJobList", res);
          if (this.curCompanyJobList.length > 0) {
          this.hasList = true;
          this.checkIndex = 0;
          this.checkJobDetail = this.curCompanyJobList[0];
        }else{
          console.log(this.curCompanyJobList)
          this.hasList = false
          this.checkJobDetail = ''
        }
        });
      } else {
        this.$message.error(result.data.message);
      }
      // console.log(this.checkJobDetail)
    }
  }
};
</script>

<style scoped>
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

.create-new-job {
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
  background-color: #339966;
  border-radius: 4px;
  margin-bottom: 30px;
  cursor: pointer;
}

.create-new-job:hover {
  background-color: #fff;
  color: #339966;
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
  margin-top: 50px;
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

.new-job-salary {
  margin-top: 20px;
}

.new-job-name-ipt,
.new-job-salary-ipt,
.new-job-school-ipt {
  width: 70%;
  height: 30px;
}

.new-job-description,
.new-job-request,
.new-job-school {
  margin-top: 20px;
}

.new-job-description textarea,
.new-job-request textarea {
  width: 70%;
  height: 50px;
  resize: none;
}

.current-job {
  width: 40%;
  margin-bottom: 50px;
  font-size: 20px;
  color: #339966;
}
</style>
