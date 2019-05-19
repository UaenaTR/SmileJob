<template>
  <div id="SchoolJob">
    <div class="school-info-cont">
      <!-- <div class="left-nav">
        <div class="left-nav-title">本校岗位所在公司</div>
        <ul>
          <li
            :class="{'checked':checkedIndex == index}"
            @click="switchCheck(item,index)"
            :key="index"
            v-for="(item,index) in schoolJobList"
          >{{ item.company }}</li>
        </ul>
      </div>-->
      <div class="school-job-detail">
        <!-- 未审核列表 -->
        <div class="noexamine-job-cont">
          <div class="noexamine-job-title">未审核岗位</div>
          <el-table border :data="noExamineJobDetail" style="height:320px;">
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column
                :show-overflow-tooltip="true"
                prop="companyName"
                label="公司名称"
                width="100"
              ></el-table-column>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column :show-overflow-tooltip="true" prop="name" label="岗位名称" width="120"></el-table-column>
            </el-tooltip>
            <el-table-column prop="salary" label="薪资" width="100"></el-table-column>
            <el-table-column prop="createTimeStr" label="发布时间" width="120"></el-table-column>
             <el-table-column label="状态" width="80">
                <template slot-scope='scope'>
                    {{ scope.row.status | examineStatus }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="openExamine('noExamine',0,scope.row)">查看详情</span>
                <span @click="openExamine('noExamine',1,scope.row)">通过</span>
                <span @click="openExamine('noExamine',2,scope.row)">拒绝</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @current-change="noexamineSkipPage"
            :current-page="noexamineCurPage"
            :page-size="4"
            layout="prev, pager, next"
            :total="noexamineTotal"
          ></el-pagination>
        </div>
        <!-- 已审核列表 -->
        <div class="examine-job-cont">
          <div class="examine-job-title">已审核岗位</div>
          <el-table border :data="examineJobDetail" style="height:320px;">
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column
                :show-overflow-tooltip="true"
                prop="companyName"
                label="公司名称"
                width="100"
              ></el-table-column>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <el-table-column :show-overflow-tooltip="true" prop="name" label="岗位名称" width="120"></el-table-column>
            </el-tooltip>
            <el-table-column prop="salary" label="薪资" width="100"></el-table-column>
            <el-table-column prop="createTimeStr" label="发布时间" width="120"></el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope='scope'>
                    {{ scope.row.status | examineStatus }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="openExamine('examine',0,scope.row)">查看详情</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @current-change="examineSkipPage"
            :current-page="examineCurPage"
            :page-size="4"
            layout="prev, pager, next"
            :total="examineTotal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 查看详情弹窗 -->
    <el-dialog title="岗位详情" :visible.sync="jobDetailDialog" width="50%">
      <div class="job-detail">
        <div class="job-description">岗位描述：</div>
        <div class="description-cont">{{ jobDetailDescription }}</div>
        <div class="job-request">岗位要求：</div>
        <div class="request-cont">{{ jobDetailRequest }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedIndex: 0, //左侧导航栏选中
      noExamineJobDetail: [], //选中岗位未审核
      examineJobDetail: [], //选中已审核岗位
      jobDetailDialog:false,
      jobDetailDescription:'',
      jobDetailRequest:'',
      examineCurPage:1,
      noexamineCurPage:1,
      pageSize:4,
      examineTotal:null,
      noexamineTotal:null
    };
  },
  components: {},
  filters:{
    examineStatus(data){
      switch(data){
        case 0:
          return '未审核'
          break
        case 1:
          return '审核通过'
          break
        default:
          return '审核未通过'
      }
    }
  },
  computed: {},
  async created() {
    this.queryNoExmineJob();
    this.queryExmineJob();
    // this.noExamineJobDetail = this.schoolJobList[0].noExamineJob;
    // this.examineJobDetail = this.schoolJobList[0].examineJob;
    // console.log(this.noExamineJobDetail);
    // console.log(this.examineJobDetail);
  },
  methods: {
    ...mapActions(["getSchoolJobList", "examineJob"]),
    //查询未审核岗位
    async queryNoExmineJob() {
      const params = {
        schoolId: sessionStorage.getItem("id"),
        pageNum:this.noexamineCurPage,
        pageSize:4,
        startNum: 0,
        endNum: 1
      };
      const result = await this.getSchoolJobList(params);
      if (result.data.code == 200) {
        this.noExamineJobDetail = result.data.body.list;
        this.noexamineTotal = result.data.body.total
      }
    },
    noexamineSkipPage(curPage){
      this.noexamineCurPage = curPage
      this.queryNoExmineJob()
    },
    //查询已审核岗位
    async queryExmineJob() {
      const params = {
        schoolId: sessionStorage.getItem("id"),
        pageNum:this.examineCurPage,
        pageSize:4,
        startNum: 1,
        endNum: 3
      };
      const result = await this.getSchoolJobList(params);
      if (result.data.code == 200) {
        this.examineJobDetail = result.data.body.list;
        this.examineTotal = result.data.body.total
      }
    },
    examineSkipPage(curPage){
      this.examineCurPage = curPage
      this.queryExmineJob() 
    },
    //左侧导航栏修改选中状态
    switchCheck(item, index) {
      this.noExamineJobDetail = item.noExamineJob;
      this.examineJobDetail = item.examineJob;
      this.checkedIndex = index;
    },
    //查看详情弹窗
    lookJobDetail(item){
      this.jobDetailDialog = true
      this.jobDetailDescription = item.description
      this.jobDetailRequest = item.request
    },
    //打开审核弹窗
    openExamine(examineType, jobType, item) {
      if (jobType == 0) {
        this.lookJobDetail(item)
      }
      if (examineType == "noExamine") {
        if (jobType == 1) {
          this.examineSuccess(1, item);
        } else if (jobType == 2) {
          this.examineFail(2, item);
        }
      }
    },
    //审核通过
    async examineSuccess(status, item) {
      this.$confirm("确定通过审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const params = {
            id: item.postSchoolId,
            status: status
          };
          const result = await this.examineJob(params);
          if (result.data.code == 200) {
            this.$message({
              message: result.data.body,
              type: "success"
            });
            this.queryNoExmineJob();
            this.queryExmineJob();
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    //审核未通过
    examineFail(status, item) {
      this.$confirm("确定拒绝审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const params = {
            id: item.postSchoolId,
            status: status
          };
          const result = await this.examineJob(params);
          if (result.data.code == 200) {
            this.$message({
              message: result.data.body,
              type: "success"
            });
            this.queryNoExmineJob();
            this.queryExmineJob();
          } else {
            this.$message.error(result.data.message);
          }
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
  width: 780px;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 200px;
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

.job-description,
.job-request{
  margin:20px 30px;
  font-size: 18px;
  color: #339966;
}

.description-cont,
.request-cont{
  margin:10px 50px;
  font-size: 18px;
}
</style>
