<template>
  <div id="CompanyInfo">
    <div class="company-info-title">公司信息</div>
    <div class="company-info-cont">
      <div class="company-name">蚂蚁金服</div>
      <div class="finance-num-industry">
        <span class="finance-cont">C轮</span>
        <span class="num-cont">10000人以上</span>
        <span class="industry-cont">互联网</span>
      </div>
      <div class="company-address-cont">
        <span class="company-city">杭州</span>
        <span class="company-district">西湖区</span>
        <span class="company-detail-add">西溪路556号8层8段801-10</span>
      </div>
      <div class="company-introduction">
        <div class="introduction-title">公司介绍</div>
        <div class="introduction-cont">
          浙江蚂蚁小微金融服务集团股份有限公司，简称蚂蚁金服，
          正式成立于2014年，是专注于服务小微企业与普通消费者的互联网金融服务公司。
          其前身是成立于2000年10月，独立于阿里巴巴集团之外的中国内资公司——浙江阿里巴巴电子商务有限公司。
          截至2018年，蚂蚁金服的估值达到1600亿美元，是全球最大的独角兽公司。
        </div>
      </div>
    </div>
    <div @click="openModify" class="modify-company-info">修改信息</div>
    <!-- 修改公司信息弹窗 -->
    <el-dialog title="修改信息" :visible.sync="modifyDialog" width="50%">
      <div class="modify-company-info-cont">
        <div class="modify-company-name-cont">
          <span class="modify-company-name">公司名称：</span>
          <input type="text" class="company-name-ipt">
        </div>
        <div class="modify-company-finance-cont">
          <span class="modify-company-finance">融资情况：</span>
          <input type="text" class="company-finance-ipt">
        </div>
        <div class="modify-company-num-cont">
          <span class="modify-company-num">公司人数：</span>
          <input type="text" class="company-num-ipt">
        </div>
        <div class="modify-company-industry-cont">
          <span class="modify-company-industry">所属行业：</span>
          <input type="text" class="company-industry-ipt">
        </div>
        <div class="modify-company-province-cont">
          <span class="modify-company-province">所在省：</span>
          <input type="text" class="company-province-ipt">
        </div>
        <div class="modify-company-city-cont">
          <span class="modify-company-city">所在市：</span>
          <input type="text" class="company-city-ipt">
        </div>
        <div class="modify-company-district-cont">
          <span class="modify-company-district">所在区：</span>
          <input type="text" class="company-district-ipt">
        </div>
        <div class="modify-company-detailAdd-cont">
          <span class="modify-company-detailAdd">详细地址：</span>
          <input type="text" class="company-detailAdd-ipt">
        </div>
        <div class="modify-company-introduction-cont">
          <span class="modify-company-introduction">公司信息：</span>
          <textarea type="text" class="company-introduction-ipt"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="modifyDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modifyDialog:false    //修改公司信息弹窗
    };
  },
  components: {},
  created() {},
  methods: {
    //打开修改公司信息弹窗
    openModify() {
      this.modifyDialog = true
    }
  }
};
</script>

<style scoped>
#CompanyInfo {
  margin-top: 20px;
}

.company-info-title {
  width: 100px;
  margin: 50px auto;
  font-size: 20px;
  color: #339966;
  text-align: center;
}

.company-name {
  width: 100px;
  font-size: 18px;
  color: #339966;
  margin: 0 auto;
  text-align: center;
}

.finance-num-industry,
.company-address-cont,
.company-introduction {
  width: 40%;
  margin: 40px auto;
  text-align: center;
}

.finance-cont::after,
.num-cont::after,
.company-city::after,
.company-district::after {
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

.modify-company-info {
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

.modify-company-info-cont input{
    width: 70%;
    height: 30px;
}

.modify-company-info-cont span{
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 20px;
}

.modify-company-finance-cont,
.modify-company-num-cont,
.modify-company-industry-cont,
.modify-company-province-cont,
.modify-company-city-cont,
.modify-company-district-cont,
.modify-company-province-cont,
.modify-company-detailAdd-cont,
.modify-company-introduction-cont{
  margin-top: 20px;
}

.modify-company-introduction-cont textarea{
  width: 70%;
  height: 50px;
  resize: none;
}

</style>
