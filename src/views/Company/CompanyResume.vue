<template>
  <div id="CompanyResume">
    <div class="resume-title">未标记简历</div>
    <div class="left-resume-nav">
      <div class="resume-nav-title">
        <div>已收到简历岗位列表</div>
        <ul>
          <li
            :class="checkIndex == index ? 'check' : ''"
            @click="switchCheck(item,index)"
            :key="index"
            v-for="(item,index) in resumeJobList"
          >{{ item.jobName }}</li>
        </ul>
      </div>
      <div class="table-list">
        <div class="company-resume-cont">
          <el-table border :data="checkSendInfo" style="700px">
            <el-table-column prop="sendPerson" label="投递人" width="100"></el-table-column>
            <el-table-column prop="sendTime" label="投递时间" width="150"></el-table-column>
            <el-table-column prop="resumeState" label="状态"></el-table-column>
            <el-table-column label="操作" width='350'>
              <template slot-scope="scope">
                <span @click="operaResume('noSign',1,scope.row)">查看简历</span>
                <span @click="operaResume('noSign',2,scope.row)">待沟通</span>
                <span @click="operaResume('noSign',3,scope.row)">不合适</span>
                <span @click="operaResume('noSign',4,scope.row)">面试</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="sign-resume">已标记简历</div>
        <div class="company-resume-cont">
          <el-table border :data="signResume" style="700px">
            <el-table-column prop="sendPerson" label="投递人" width="100"></el-table-column>
            <el-table-column prop="sendTime" label="投递时间" width="150"></el-table-column>
            <el-table-column prop="resumeState" label="状态"></el-table-column>
            <el-table-column label="操作" width='350'>
              <template slot-scope="scope">
                <span @click="operaResume('sign',1,scope.row)">查看简历</span>
                <span @click="operaResume('sign',2,scope.row)">待沟通</span>
                <span @click="operaResume('sign',3,scope.row)">不合适</span>
                <span @click="operaResume('sign',4,scope.row)">面试</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      checkIndex: 0, //左侧导肮默认选中第一个
      sendInfo: [], //投递信息
      checkSendInfo: [], //选中岗位未标记简历
      signResume:[]     //已标记简历
    };
  },
  components: {},
  computed: {
    ...mapGetters(["resumeJobList"])
  },
  async created() {
    await this.getResumeJobList();
    this.checkSendInfo = this.resumeJobList[0].sendInfo
    this.signResume = this.resumeJobList[0].signResume
  },
  methods: {
    ...mapActions(["getResumeJobList"]),
    switchCheck(item, index) {
      this.checkSendInfo = item.sendInfo
      this.signResume = item.signResume
      this.checkIndex = index
    },
    //简历操作
    operaResume(signType,resumeType,item){
      if(signType == 'noSign'){
        if(resumeType == '2'){
          this.signCommunicate()
        }
      }
    },
    //标记为待沟通
    signCommunicate(){
      this.$confirm('确定将该简历标记为待沟通?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '标记成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消标记'
          });          
        });
    },
    //标记为不合适
    signImproper(){
      this.$confirm('确定将该简历标记为不合适?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '标记成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消标记'
          });          
        });
    },
    //标记为面试
    signInterview(){
      this.$confirm('确定将该简历标记为面试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '标记成功!'
          });
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

</style>
