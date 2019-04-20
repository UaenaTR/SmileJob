<template>
  <div id="CompanyResume">
      <div class="resume-title">已收到简历</div>
      <div class="left-resume-nav">
        <div class="resume-nav-title">已收到简历岗位列表</div>
        <ul>
          <li :key='index' v-for='(item,index) in resumeJobList'>{{ item.jobName }}</li>
        </ul>
      </div> 
  </div>
</template>

<script>

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  data() {
    return {

    }
  },
  components: {

  },
  computed:{
    ...mapGetters(['resumeJobList'])
  },
  async created(){
    await this.getResumeJobList()
  },
  methods:{
    ...mapActions(['getResumeJobList'])
  }
}
</script>

<style scoped>

#CompanyResume{
  margin-top: 20px;
}

.resume-title{
  width: 400px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
  color: #339966;
}

.left-resume-nav{
    width: 300px;
    display: flex;
    margin:30px 80px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    flex-flow: column nowrap;
}

.left-resume-nav ul li{
  margin: 20px auto;
  font-size: 14px;
  font-weight: normal;
  background-color: green;
  width: 200px;
  height: 40px;
  line-height: 40px;
}

</style>
