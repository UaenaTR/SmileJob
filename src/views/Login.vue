<template>
        <div id="Login">
					<!-- 用户类型 -->
        	<div class="user-type">
        		<span class="user-student">
        			<span class="icon1" @click='check(0)'>
        				<span class="icon2" :class="{iconChecked:userType==0}"></span>
        			</span>
        			<span class="user-student-name">学生</span>
        		</span>
        		<span class="user-school">
        			<span class="icon1" @click='check(1)'>
        				<span class="icon2" :class="{iconChecked:userType==1}"></span>
        			</span>
        			<span class="user-school-name">校方</span>
        		</span>
        		<span class="user-student">
        			<span class="icon1" @click='check(2)'>
        				<span class="icon2" :class="{iconChecked:userType==2}"></span>
        			</span>
        			<span class="user-company-name">HR</span>
        		</span>
        	</div>
        	<div class="user">
        		<span class="username">账号：</span>
   				<input type="text" class="username-ipt" name="" v-model='loginUser'>
        	</div>
        	<div class="user-password">
        		<span class="password">密码：</span>
   				<input type="password" class="password-ipt" name="" v-model='loginPassword' @keydown.enter='loginIndex'>
        	</div>
        	<div class="login">
        		<span class="login-btn" @click='loginIndex'>登录</span>
        	</div>
        </div>
</template>
<script>

			import {mapGetters,mapMutations,mapActions} from 'vuex'

      export default {
        name: '',
        data:function(){
        	return {
						loginUser:'',
						loginPassword:'',
						userType:'0'
        	}
				},
				computed:{
					...mapGetters(['curPersonInfo'])
				},
				methods:{
					...mapActions(['getPersonInfo']),
					//切换用户类型及学校公司
        	check(clickIndex){
        		this.userType = clickIndex;
        		this.schoolCompanyFlag = clickIndex
        	},
					//登录到主页
					async loginIndex(){
						if(this.loginUser != '' && this.loginPassword != ''){
							const params = {
								userName:this.loginUser,
								password:this.loginPassword,
								role:this.userType
							}
							const result = await this.getPersonInfo(params)
							// console.log(result)
							// console.log(curName)
							if(result.data.code == 200){
								const curName = this.curPersonInfo.name
								const id = this.curPersonInfo.id
									if(this.userType == 0){
											sessionStorage.setItem('isLogin',true)
											sessionStorage.setItem('curName',curName)
											sessionStorage.setItem('id',id)
											this.$router.push('/StudentIndex')
									}else if(this.userType == 1){
											sessionStorage.setItem('isSchoolLogin',true)
											sessionStorage.setItem('curName',curName)
											sessionStorage.setItem('id',id)
											this.$router.push('/SchoolIndex')
									}else{
											sessionStorage.setItem('isCompanyLogin',true)
											sessionStorage.setItem('curName',curName)
											sessionStorage.setItem('id',id)
											this.$router.push('/CompanyIndex')
									}
							}else{
								this.$message.error(result.data.message)
							}
						}else{
							this.$message.error("请输入用户名和密码！")
						}
					}
				}
      }
</script>
<style scoped>

	body{
    background-color:#339966;
  }

	#Login{
		width:600px;
		position: relative;
		left:50%;
		top:20px;
		margin-left: -300px;
	}

	.user-type{
		width:600px;
		position: relative;
		top:20px;
		left:50%;
		margin-left: -310px;
		text-align: center;
	}

	.icon1{
		display: inline-block;
		width:16px;
		height:16px;
		border-radius: 50%;
		border:1px #fff solid;
		text-align: center;
		line-height: 16px;
		cursor: pointer;
	}

	.icon2{
		display: none;
		width:10px;
		height:10px;
		border-radius:50%;
		border:1px #fff solid;
		background-color:red;
		position: relative;
		top:-3px;
	}

	.iconChecked{
		display: inline-block;
	}

	.user-student,
	.user-school,
	.user-company{
		font-size: 18px;
		margin-left:30px;
	}
	
	.user,
	.user-password{
		margin-top: 40px;
		margin-left: 150px;
	}

	.username,
	.password{
		display: inline-block;
		width:80px;
		height:40px;
		color:#fff;
		font-size: 20px;
	}

	.username-ipt,
	.password-ipt{
		width:200px;
		height:30px;
	}

	.login-btn{
		display: inline-block;
		width:80px;
		height:40px;
		border-radius: 10px;
		background-color: #fff;
		text-align: center;
		line-height: 40px;
		position: absolute;
		left: 50%;
		margin-left: -30px;
		margin-top: 40px;
		cursor: pointer;
	}


</style>