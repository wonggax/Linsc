<template>
	<view>
		<view v-if="!isLoading" class="loading">
			<text>欢迎使用Linsc签到</text>
			<van-button type="info" @click="GetUserInfo">立即登录</van-button>
		</view >
		<view v-else>
			<view class="top-view">
				<text>班级列表</text>
				<van-button size="small" type="info" @click="gotoJoinClass">加入班级</van-button>
			</view>
			<view class="line"></view>
			<view class="body">
				<my-class @click.native="gotoClass"></my-class>
				<my-class @click.native="gotoClass"></my-class>
				<my-class @click.native="gotoClass"></my-class>
				<my-class @click.native="gotoClass"></my-class>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading:false,
				EncryptedData:"",
				Iv:"",
				code:""
			};
		},
		methods:{
			gotoJoinClass(){
				uni.navigateTo({
					url: '/subpkg/toJoinClass/toJoinClass'
				});
			},
			gotoClass(){
				uni.navigateTo({
					url:'/subpkg/student_in_class/student_in_class'
				})
			},
			async GetUserInfo(){
				this.code = await (await wx.login()).code
				const data = await wx.getUserInfo()
				this.EncryptedData = data.encryptedData
				this.Iv = data.iv
				this.toLogin()
			},
			async toLogin() {
				// 发起请求，模拟一个登入请求
				const query = {
				    code: this.code,
				    encryptedData: this.EncryptedData,
				    iv: this.Iv,
				}
				const res= await uni.$http.get("/api/user/login/wx_miniapp",query)
				//打印请求结果
				console.log(res);
				
			},
	}
}
</script>

<style lang="scss">
.loading{
	display: flex;
	flex-direction: column;
	padding-top: 50%;
	text-align: center;
	text{
		padding-bottom: 20px;
		font-weight: bolder;
		font-size: 20px;
	}
	button{
		width: 200px;
		border-radius: 10px;
	}
}
.top-view{
	height: 60px;
	display: flex;
	justify-content: space-between;
	border-bottom:1px solid  rgba(229, 231, 235, 1);
	text{
		padding-left: 10px;
		padding-top: 15px;
		font-size: 20px;
		font-weight: bolder;
	}
	van-button{
		padding-right: 10px;
		padding-top: 15px;
	}
}
.body{
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>
