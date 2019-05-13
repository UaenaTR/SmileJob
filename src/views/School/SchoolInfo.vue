<template>
  <div id="SchoolInfo">
    <div class="school-info-cont">
      <div class="school-info-title">学校信息</div>
      <div class="school-info-detail">
        <div class="school-name">{{ curSchoolInfo.name }}</div>
        <div class="school-address-cont">
          <span class="school-city">{{ curSchoolInfo.city }}</span>
          <span class="school-district">{{ curSchoolInfo.district }}</span>
          <span class="school-detail-add">{{ curSchoolInfo.address }}</span>
        </div>
        <div class="school-introduction">
          <div class="introduction-title">学校介绍</div>
          <div class="introduction-cont">
            {{ curSchoolInfo.introduction }}
          </div>
        </div>
        <div @click="openModify" class="modify-school-info">修改信息</div>
        <!-- 修改学校信息弹窗 -->
        <el-dialog @close='closeModify' title="修改学校信息" :visible.sync="modifyDialog" width="50%">
          <div class="modify-school-info-cont">
            <div class="modify-school-name-cont">
              <span class="modify-school-name">学校名称：</span>
              <input type="text" class="school-name-ipt" v-model='addName'>
            </div>
            <div class="modify-school-nickname-cont">
              <span class="modify-school-nickname">学校简称：</span>
              <input type="text" class="school-nickname-ipt" v-model='addNickName'>
            </div>
            <div class="modify-school-province-cont">
              <span class="modify-school-province">所在省：</span>
              <input type="text" class="school-province-ipt" v-model='addProvince'>
            </div>
            <div class="modify-school-city-cont">
              <span class="modify-school-city">所在市：</span>
              <input type="text" class="school-city-ipt" v-model='addCity'>
            </div>
            <div class="modify-school-district-cont">
              <span class="modify-school-district">所在区：</span>
              <input type="text" class="school-district-ipt" v-model='addDistrict'>
            </div>
            <div class="modify-school-detailAdd-cont">
              <span class="modify-school-detailAdd">详细地址：</span>
              <input type="text" class="school-detailAdd-ipt" v-model='addAddress'>
            </div>
            <div class="modify-school-introduction-cont">
              <span class="modify-school-introduction">学校介绍：</span>
              <textarea type="text" class="school-introduction-ipt" v-model='addIntroduction'></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeModify">取 消</el-button>
            <el-button type="primary" @click="ensureModify">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
  data() {
    return {
      modifyDialog:false,   //修改学校信息弹窗
      curSchoolInfo:{},
      addName:'',
      addNickName:'',
      addProvince:'',
      addCity:'',
      addDistrict:'',
      addAddress:'',
      addIntroduction:''
    };
  },
  components: {},
  async created() {
    await this.querySchoolInfo()
  },
  methods: {
    ...mapActions(['getSchoolInfo','modifySchoolInfo']),
    //打开修改弹窗
    openModify(){
      this.modifyDialog = true
      this.querySchoolInfo()
      this.addName = this.curSchoolInfo.name
      this.addNickName = this.curSchoolInfo.nickName
      this.addProvince = this.curSchoolInfo.province
      this.addCity = this.curSchoolInfo.city
      this.addDistrict = this.curSchoolInfo.district
      this.addAddress = this.curSchoolInfo.address
      this.addIntroduction = this.curSchoolInfo.introduction
    },
    //查询学校信息，0未审核 1通过 2拒绝。  查询未审核（0-1） 已审核（1-3）
    async querySchoolInfo(){
      const params = {
        id:sessionStorage.getItem('id')
      }
      const result = await this.getSchoolInfo(params)
      this.curSchoolInfo = result.data.body
    },
    //关闭修改弹窗
    closeModify(){
      this.modifyDialog = false
      this.addName = ''
      this.addNickName = ''
      this.addProvince = ''
      this.addCity = ''
      this.addDistrict = ''
      this.addAddress = ''
      this.addIntroduction = ''
    },
    //确认修改
    async ensureModify(){
      const params = {
        id:this.curSchoolInfo.id,
        userName:this.curSchoolInfo.userName,
        password:this.curSchoolInfo.password,
        name:this.addName,
        nickName:this.addNickName,
        province:this.addProvince,
        city:this.addCity,
        district:this.addDistrict,
        address:this.addAddress,
        introduction:this.addIntroduction
      }
      const result = await this.modifySchoolInfo(params)
      if(result.data.code == 200){
        this.$message({
          message:result.data.body,
          type:'success'
        })
        this.modifyDialog = false
        this.addName = ''
        this.addNickName = ''
        this.addProvince = ''
        this.addCity = ''
        this.addDistrict = ''
        this.addAddress = ''
        this.addIntroduction = ''
        this.querySchoolInfo()
      }else{
        this.$message.error(result.data.message)
      }
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
