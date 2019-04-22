<template>
  <div id="SchoolInfo">
    <div class="school-info-cont">
      <div class="school-info-title">学校信息</div>
      <div class="school-info-detail">
        <div class="school-name">浙江财经大学</div>
        <div class="school-address-cont">
          <span class="school-city">杭州</span>
          <span class="school-district">江干区</span>
          <span class="school-detail-add">下沙高教园区学源街18号</span>
        </div>
        <div class="school-introduction">
          <div class="introduction-title">学校介绍</div>
          <div class="introduction-cont">
            浙江财经大学坐落在浙江省杭州市，是一所由浙江省人民政府举办的，
            中国高等教育学会创新创业教育分会会员单位，以经济、管理学科为主体，
            多学科协调发展的全日制普通高等学校，入选第二批浙江省重点建设高校，
            具有博士、硕士、学士学位授予权和外国留学生、港澳台学生招生权。
            毕业生薪酬水平位列全国第75位浙江省属高校第一。
          </div>
        </div>
        <div @click="openModify" class="modify-school-info">修改信息</div>
        <!-- 修改学校信息弹窗 -->
        <el-dialog title="修改学校信息" :visible.sync="modifyDialog" width="50%">
          <div class="modify-school-info-cont">
            <div class="modify-school-name-cont">
              <span class="modify-school-name">学校名称：</span>
              <input type="text" class="school-name-ipt">
            </div>
            <div class="modify-school-nickname-cont">
              <span class="modify-school-nickname">学校简称：</span>
              <input type="text" class="school-nickname-ipt">
            </div>
            <div class="modify-school-province-cont">
              <span class="modify-school-province">所在省：</span>
              <input type="text" class="school-province-ipt">
            </div>
            <div class="modify-school-city-cont">
              <span class="modify-school-city">所在市：</span>
              <input type="text" class="school-city-ipt">
            </div>
            <div class="modify-school-district-cont">
              <span class="modify-school-district">所在区：</span>
              <input type="text" class="school-district-ipt">
            </div>
            <div class="modify-school-detailAdd-cont">
              <span class="modify-school-detailAdd">详细地址：</span>
              <input type="text" class="school-detailAdd-ipt">
            </div>
            <div class="modify-school-introduction-cont">
              <span class="modify-school-introduction">学校介绍：</span>
              <textarea type="text" class="school-introduction-ipt"></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modifyDialog = false">取 消</el-button>
            <el-button type="primary" @click="modifyDialog = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modifyDialog:false,   //修改学校信息弹窗
    };
  },
  components: {},
  created() {

  },
  methods: {
    openModify(){
      this.modifyDialog = true
    }
  }
};
</script>

<style scoped>
#SchoolInfo {
  margin-top: 30px;
}

.school-info-title {
  width: 100px;
  text-align: center;
  margin: 50px auto;
  font-size: 22px;
  color: #339966;
}

.school-name {
  width: 200px;
  text-align: center;
  font-size: 22px;
  color: #339966;
  margin: 20px auto;
}

.school-address-cont,
.school-introduction {
  width: 40%;
  margin: 40px auto;
  text-align: center;
}

.school-city::after,
.school-district::after {
  content: "|";
  color: #339966;
  margin: 0 10px 0 10px;
}

.introduction-title {
  width: 100px;
  margin: 20px auto;
  color: #339966;
  font-size: 18px;
}

.introduction-cont {
  text-align: left;
  line-height: 30px;
  letter-spacing: 2px;
}

.modify-school-info {
  width: 100px;
  height: 40px;
  background-color: #339966;
  color: #fff;
  margin: 20px auto;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
}

.modify-school-info-cont input{
    width: 70%;
    height: 30px;
}

.modify-school-info-cont span{
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 20px;
}

.modify-school-nickname-cont,
.modify-school-province-cont,
.modify-school-city-cont,
.modify-school-district-cont,
.modify-school-detailAdd-cont,
.modify-school-introduction-cont{
  margin-top: 20px;
}

.modify-school-introduction-cont textarea{
  width: 70%;
  height: 50px;
  resize: none;
}

</style>
