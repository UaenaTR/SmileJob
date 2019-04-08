<template>
		<!-- 注册组件 -->
        <div id="Register">
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
        	<!-- 注册信息 -->
        	<div class="student-school-ipt" v-if="schoolCompanyFlag">
        		<span class="student-school-name">您的学校：</span>
        		<input type="text" name="" placeholder="请输入您所在的学校" v-model='userSchool'>
        		<span class="school-validate" v-show='schoolValidate'>该项为必填项！</span>
        	</div>
        	<div class="company-ipt" v-else>
        		<span class="company-name">您的企业：</span>
        		<input type="text" name="" placeholder="请输入您所在的企业" v-model='userCompany'>
        		<span class="company-validate" v-show='companyValidate'>该项为必填项！</span>
        	</div>
        	<div class="user">
        		<span class="username">账号：</span>
   				<input type="text" class="username-ipt" name="" v-model='username' placeholder="请输入长度为3-15之间的账号">
   				<span class="username-validate" v-show='userValidate'>必须以字母开头，且长度在3-15之间</span>
        	</div>
        	<div class="user-password">
        		<span class="password">密码：</span>
   				<input type="password" class="password-ipt" name="" v-model='password' placeholder="请输入长度为4-10之间的密码">
   				<span class="password-validate" v-show='passwordValidate'>不能有非法字符，长度在4-10之间</span>
        	</div>
        	<div class="user-password">
        		<span class="password">确认密码：</span>
   				<input type="password" class="password-ipt" name="" v-model='ensurePassword' @keydown.enter='goRegisterSuccess' placeholder="请再次输入密码">
   				<span class="ensure-password-validate" v-show='ensurePasswordValidate'>两次输入的密码不一致</span>
        	</div>
        	<div class="register">
        		<span class="Register-btn" @click='goRegisterSuccess'>注册</span>
        	</div>
        </div>
</template>
<script>
      export default {
        name: '',
        data:function(){
        	return {
        		userType:0,		//切换用户类型，0：学生，1：校方，2：HR
        		schoolCompanyFlag:true, 	  //切换学校公司
        		userSchool:'',	 //用户所在学校
        		userCompany:'',	 	//用户所在公司
        		username:'',		//用户名
        		password:'',		//用户密码
        		ensurePassword:'',	//确认密码
        		schoolValidate:false,		//所在学校验证
        		companyValidate:false,		//所在企业验证
        		userValidate:false,		//用户名验证
        		passwordValidate:false,		//密码验证
        		ensurePasswordValidate:false,		//确认密码验证	
        	}
				},
				computed:{
					// projectName(){
					// 	return this.$store.state.projectName;
					// }
				},
        methods:{
        	//切换用户类型及学校公司
        	check(clickIndex){
        		this.userType = clickIndex;
        		if(clickIndex ==2){
        			this.schoolCompanyFlag = false;
        		}else{
        			this.schoolCompanyFlag = true;
        		}
        	},
        	//所在学校验证
        	checkSchool(){
        		if(this.userSchool == ''){
        			this.schoolValidate = true;
        		}else{
        			this.schoolValidate = false;
        		}
        	},
        	checkCompany(){
        		if(this.userCompany == ''){
        			this.companyValidate = true;
        		}else{
        			this.companyValidate = false;
        		}
        	},
        	//用户名校验
        	checkUsername(){
        		var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        		if(reg.test(this.username) == false || this.username == ''){
        			this.userValidate = true;
        		}else{
        			this.userValidate = false;
        		}
        	},
        	//密码校验
        	checkPassword(){
        		var reg = /^[a-zA-Z0-9]{4,10}$/;
        		if(reg.test(this.password) == false || this.password == ''){
        			this.passwordValidate = true;
        		}else{
        			this.passwordValidate = false;
        		}
        	},
        	//确认密码校验
        	checkEnsurePassword(){
        		if(this.password === this.ensurePassword){
        			this.ensurePasswordValidate = false;
        		}else{
        			this.ensurePasswordValidate = true;
        		}
        	},
        	//跳转到注册成功页面
        	goRegisterSuccess(){
        		this.checkCompany();
        		this.checkUsername();
        		this.checkPassword();
        		this.checkEnsurePassword();
        		if(this.userType == 2){
        			this.checkCompany();
        			if(!this.userValidate && !this.passwordValidate && !this.ensurePasswordValidate && !this.companyValidate){
									this.$http({
										method:'post',
										url:'/api/register',
										data:{
											username:this.username,
											password:this.password,
											userType:this.userType,
											userCompany:this.userCompany
										}
									}).then(response => {
										console.log(response)
										this.openRegisterSuccess()
									})
									
        			}
        		}else{
        			this.checkSchool();
        			if(!this.userValidate && !this.passwordValidate && !this.ensurePasswordValidate && !this.schoolValidate){
        					this.$router.push('/RegisterSuccess');
        			}
        		}
        		
					},
					openRegisterSuccess(){
						this.$alert('您的账号为:' + this.username, '注册成功！', {
						confirmButtonText: '确定',
						callback: action => {
							this.username = ''
							this.password = ''
							this.ensurePassword = ''
							this.userCompany = ''
							this.$router.push('Login')
						}
					})
					}
        }
      }
</script>
<style scoped>

	#Register{
		width:600px;
		position: relative;
		left:50%;
		top:20px;
		margin-left: -310px;
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

	.student-school-ipt,
	.company-ipt{
		height:40px;
		margin-top: 50px;
		position: relative;
		left:50%;
		margin-left:-140px;
		font-size: 18px;
		color:#fff;
	}

	.student-school-ipt input,
	.company-ipt input{
		width:200px;
		height:30px;
	}

	.school-validate,
	.company-validate{
		display: inline-block;
		width:100px;
		height: 40px;
		color:red;
		font-size: 12px;
		position: relative;
		top:0;
	}

	.user,
	.user-password{
		margin-top: 60px;
		margin-left: 150px;
	}

	.username,
	.password{
		display: inline-block;
		width:100px;
		height:40px;
		color:#fff;
		font-size: 20px;
		text-align: center;
	}

	.username-ipt,
	.password-ipt{
		width:200px;
		height:30px;
	}
	
	.username-validate,
	.password-validate,
	.ensure-password-validate{
		display: inline-block;
		width:100px;
		height: 40px;
		color:red;
		font-size: 12px;
		position: relative;
		top: 8px;
	}

	.Register-btn{
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