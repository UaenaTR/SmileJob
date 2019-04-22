<template>
        <div id="Login">
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

      export default {
        name: '',
        data:function(){
        	return {
						loginUser:'',
						loginPassword:'',
						userType:'0'
        	}
				},
				methods:{
					//登录到主页
					loginIndex:function(){
						if(this.loginUser != '' && this.loginPassword != ''){
								this.$http({
								method:'get',
								url:'../../static/api/student_info.json',
							}).then(response => {
											let userList = response.data.studentList
											let index = userList.findIndex((item,index) =>{
													return this.loginUser == item.username
											})
											if(index != -1){
													if(this.loginUser == userList[index].username){
														if(this.loginPassword == userList[index].password){
															//将当前用户名放到缓存中
															sessionStorage.setItem('username',userList[index].username)
															let localUername = sessionStorage.getItem('username')
															//将缓存中的用户名放到vuex中
															this.$store.commit('initUsername',localUername)
															//将当前用户的昵称放到缓存中和vuex中
															let nickname = userList[index].nickname
															sessionStorage.setItem('nickname',nickname)
															this.$store.commit('initNickname',nickname)
															//判断用户类型进入到不同的主页面
															if(userList[index].userType == '0'){
																//将学生登录状态放到缓存中
																sessionStorage.setItem('isLogin',true)
																//将当前用户所在学校名放到缓存中和vuex中
																let userSchool = userList[index].school
																sessionStorage.setItem('userSchool',userSchool)
																this.$store.commit('initSchool',userSchool)
																this.$router.push('/StudentIndex')
															}else if(userList[index].userType == '1'){
																//将学校登录状态放到缓存中
																sessionStorage.setItem('isSchoolLogin',true)
																let userSchool = userList[index].school
																sessionStorage.setItem('userSchool',userSchool)
																this.$store.commit('initSchool',userSchool)
																this.$router.push('/SchoolIndex')
																// this.$message.error('进入学校页')
															}else{
																let userCompany = userList[index].company
																//将公司登录状态放到缓存中
																sessionStorage.setItem('isCompanyLogin',true)
																//将当前用户所在公司放到缓存和vuex中
																sessionStorage.setItem('userCompany',userCompany)
																this.$store.commit('initCompany',userCompany)
																this.$router.push('/CompanyIndex')
																// this.$message.error('进入企业页')
															}
													}else{
														this.$message.error("密码不正确！")
													}
												}
											}else{
													this.$message.error("账号不正确！")
												}
							})
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