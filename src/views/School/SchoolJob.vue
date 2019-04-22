<template>
  <div id="SchoolJob">
    <div class="school-info-cont">
      <div class="left-nav">
        <div class="left-nav-title">待审核岗位</div>
        <ul>
          <li
            :class="{'checked':checkedIndex == index}"
            @click="switchCheck(item,index)"
            :key="index"
            v-for="(item,index) in schoolJobList"
          >{{ item.company }}</li>
        </ul>
      </div>
      <div class="school-job-detail">
        <!-- 未审核列表 -->
        <div class="noexamine-job-cont">
          <div class="noexamine-job-title">未审核岗位</div>
          <el-table border :data="noExamineJobDetail" style="700px">
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column
                :show-overflow-tooltip="true"
                prop="jobName"
                label="岗位名称"
                width="120"
              ></el-table-column>
            </el-tooltip>
            <el-table-column prop="jobSalary" label="薪资" width="100"></el-table-column>
            <el-table-column prop="jobTime" label="发布时间" width="120"></el-table-column>
            <el-table-column prop="examineSate" label="状态" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="openExamine('noExamine',0,scope.row)">查看详情</span>
                <span @click="openExamine('noExamine',1,scope.row)">通过</span>
                <span @click="openExamine('noExamine',2,scope.row)">拒绝</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 已审核列表 -->
        <div class="examine-job-cont">
          <div class="examine-job-title">已审核岗位</div>
          <el-table border :data="examineJobDetail" style="700px">
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column
                :show-overflow-tooltip="true"
                prop="jobName"
                label="岗位名称"
                width="120"
              ></el-table-column>
            </el-tooltip>
            <el-table-column prop="jobSalary" label="薪资" width="100"></el-table-column>
            <el-table-column prop="jobTime" label="发布时间" width="120"></el-table-column>
            <el-table-column prop="examineSate" label="状态" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="openExamine('examine',0,scope.row)">查看详情</span>
                <span @click="openExamine('examine',1,scope.row)">通过</span>
                <span @click="openExamine('examine',2,scope.row)">拒绝</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedIndex: 0, //左侧导航栏选中
      noExamineJobDetail: [], //选中岗位未审核
      examineJobDetail: [] //选中已审核岗位
    };
  },
  components: {},
  computed: {
    ...mapGetters(["schoolJobList"])
  },
  async created() {
    await this.getSchoolJobList();
    this.noExamineJobDetail = this.schoolJobList[0].noExamineJob;
    this.examineJobDetail = this.schoolJobList[0].examineJob;
    console.log(this.noExamineJobDetail);
    console.log(this.examineJobDetail);
  },
  methods: {
    ...mapActions(["getSchoolJobList"]),
    //左侧导航栏修改选中状态
    switchCheck(item, index) {
      this.noExamineJobDetail = item.noExamineJob;
      this.examineJobDetail = item.examineJob;
      this.checkedIndex = index;
    },
    //打开审核弹窗
    openExamine(examineType, jobType, item) {
  
    },
    //审核通过
    examineSuccess() {
      this.$confirm("确定通过审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "审核成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    //审核未通过
    examineFail() {
      this.$confirm("确定拒绝审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已拒绝审核!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    }
  }
};
</script>

<style scoped>
#SchoolJob {
  margin-top: 20px;
}

.school-info-cont {
  width: 1000px;
  margin: 50px 80px;
  display: flex;
}

.left-nav {
  width: 300px;
  display: flex;
  text-align: center;
  flex-flow: column nowrap;
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

.school-job-detail {
  width: 700px;
  text-align: center;
}

.examine-job-cont {
  margin-top: 50px;
}

.noexamine-job-title,
.examine-job-title {
  margin-bottom: 30px;
  font-size: 22px;
  color: #339966;
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
  margin-left: 4px;
  cursor: pointer;
}

.el-table span:hover {
  background-color: #fff;
  color: #339966;
}
</style>
