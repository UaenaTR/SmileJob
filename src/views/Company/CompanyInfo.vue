<template>
  <div id="CompanyInfo">
    <div class="company-info-title">公司信息</div>
    <div class="company-info-cont">
      <div class="company-name">{{ curPersonInfo.name }}</div>
      <div class="finance-num-industry">
        <span class="finance-cont">{{ curPersonInfo.scale }}</span>
        <span class="num-cont">{{ curPersonInfo.finance }}</span>
        <span class="industry-cont">{{ curPersonInfo.industry }}</span>
      </div>
      <div class="company-address-cont">
        <span class="company-city">{{ curPersonInfo.city }}</span>
        <span class="company-district">{{ curPersonInfo.district }}</span>
        <span class="company-detail-add">{{ curPersonInfo.address }}</span>
      </div>
      <div class="company-introduction">
        <div class="introduction-title">公司介绍</div>
        <div class="introduction-cont">
          {{ curPersonInfo.introduction }}
        </div>
      </div>
    </div>
    <div @click="openModify" class="modify-company-info">修改信息</div>
    <!-- 修改公司信息弹窗 -->
    <el-dialog @close='closeDialog' title="修改信息" :visible.sync="modifyDialog" width="50%">
      <div class="modify-company-info-cont">
        <div class="modify-company-name-cont">
          <span class="modify-company-name">公司名称：</span>
          <input type="text" class="company-name-ipt" v-model='addName'>
        </div>
        <div class="modify-company-finance-cont">
          <span class="modify-company-finance">融资情况：</span>
          <input type="text" class="company-finance-ipt" v-model='addFinance'>
        </div>
        <div class="modify-company-num-cont">
          <span class="modify-company-num">公司人数：</span>
          <input type="text" class="company-num-ipt" v-model='addScale'>
        </div>
        <div class="modify-company-industry-cont">
          <span class="modify-company-industry">所属行业：</span>
          <input type="text" class="company-industry-ipt" v-model='addIndustry'>
        </div>
        <div class="modify-company-province-cont">
          <span class="modify-company-province">所在省：</span>
          <input type="text" class="company-province-ipt" v-model='addProvince'>
        </div>
        <div class="modify-company-city-cont">
          <span class="modify-company-city">所在市：</span>
          <input type="text" class="company-city-ipt" v-model='addCity'>
        </div>
        <div class="modify-company-district-cont">
          <span class="modify-company-district">所在区：</span>
          <input type="text" class="company-district-ipt" v-model='addDistrict'>
        </div>
        <div class="modify-company-detailAdd-cont">
          <span class="modify-company-detailAdd">详细地址：</span>
          <input type="text" class="company-detailAdd-ipt" v-model='addAddress'>
        </div>
        <div class="modify-company-introduction-cont">
          <span class="modify-company-introduction">公司信息：</span>
          <textarea type="text" class="company-introduction-ipt" v-model='addIntroduction'></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="ensureModify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
  data() {
    return {
      modifyDialog:false,    //修改公司信息弹窗
      curPersonInfo:{},
      addName:'',
      addFinance:'',
      addScale:'',
      addIndustry:'',
      addProvince:'',
      addCity:'',
      addDistrict:'',
      addAddress:'',
      addIntroduction:'',
      addUsername:'',
      addPassword:''
    };
  },
  components: {},
  computed:{
  },
  async created() {
    const params = {
        id:sessionStorage.getItem('id')
    }
    const result = await this.getCurCompanyInfo(params)
    this.curPersonInfo = result.data.body
  },
  methods: {
    ...mapActions(['getCurCompanyInfo']),
    //打开修改公司信息弹窗
    async openModify() {
      const params = {
        id:sessionStorage.getItem('id')
      }
      const result = await this.getCurCompanyInfo(params)
      if(result.data.code == 200){
        this.addName = result.data.body.name
        this.addFinance = result.data.body.finance
        this.addScale = result.data.body.scale
        this.addIndustry = result.data.body.industry
        this.addProvince = result.data.body.province
        this.addCity = result.data.body.city
        this.addDistrict = result.data.body.district
        this.addAddress = result.data.body.address
        this.addIntroduction = result.data.body.introduction
        this.addUsername = result.data.body.userName
        this.addPassword = result.data.body.password
      }
      this.modifyDialog = true
    },
    //关闭弹窗
    closeDialog(){
        this.modifyDialog = false
        this.addName = ''
        this.addFinance = ''
        this.addScale = ''
        this.addIndustry = ''
        this.addProvince = ''
        this.addCity = ''
        this.addDistrict = ''
        this.addAddress = ''
        this.addIntroduction = ''
    },
    //确认修改
    async ensureModify(){
        const params = {
          id:sessionStorage.getItem('id'),
          userName:this.addUsername,
          password:this.addPassword,
          name:this.addName,
          finance:this.addFinance,
          scale:this.addScale,
          industry:this.addIndustry,
          province:this.addProvince,
          city:this.addCity,
          district:this.addDistrict,
          address:this.addAddress,
          introduction:this.addIntroduction,
        }
        this.$http({
          method:'post',
          url:'api/company/doEdit',
          params:params
        }).then(response => {
          if(response.data.code == 200){
            this.$message({
              message:response.data.body,
              type:'success'
            })
            this.modifyDialog = false
            this.addName = ''
            this.addFinance = ''
            this.addScale = ''
            this.addIndustry = ''
            this.addProvince = ''
            this.addCity = ''
            this.addDistrict = ''
            this.addAddress = ''
            this.addIntroduction = ''
            const data = {
                id:sessionStorage.getItem('id')
            }
            this.$http({
              method:'post',
              url:'api/company/edit',
              params:data
            }).then(response => {
              if(response.data.code == 200){
                this.curPersonInfo = response.data.body
              }
            })
          }else{
            this.$message.error(response.data.message)
          }
        })
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
