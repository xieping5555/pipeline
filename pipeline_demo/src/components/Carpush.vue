<template>
	<div id="carpush">
		<div class="carpush_wrapper">
			<div class="carpush_title">
				<h4><span class="glyphicon glyphicon-send"></span>兑车表</h4>
			</div>
			<ul class="nav nav-tabs">
				<router-link to='/index/carpush/carpush_input' tag='li' class='active' name='carpush_input'><a href="">input</a></router-link>
				<router-link to='/index/carpush/carpush_detail' tag='li' name='carpush_detail'><a href="">detail</a></router-link>
			</ul>
			<div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
		export default{
		mounted(){
			this.choose();
		},
		methods:{
			choose(){
				$('.nav-tabs>li').click(function(){
					$(this).addClass('active').siblings().removeClass('active');
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	#carpush{
		overflow: hidden;
		.carpush_wrapper{
			background: #fff;
			margin: 20px;
			border: 2px solid rgba(158,158,158,0.35);
			border-radius: 10px 10px 10px 10px;
			.carpush_title h4{
				margin:0;
				padding: 15px;
				background: rgba(129,45,144,1);
				border-radius: 10px 10px 0 0;
				color: #fff;
				font-size: 17px;
				font-weight: 400;
				span{
					margin-right:5px;
					font-size: 15px;
				}
			}
		}
	}
</style>