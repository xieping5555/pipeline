<template>
	<div id="sale">
		<div class="sale_wrapper">
			<div class="sale_title">
				<h4><span class="glyphicon glyphicon-log-out"></span>发货表</h4>
			</div>
			<ul class="nav nav-tabs">
				<router-link to="/index/sale/sale_input" tag="li" class="active" name='sale_input'  ><a href="">input</a></router-link>
				<router-link to="/index/sale/sale_detail" tag="li"><a href="">detail</a></router-link>
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
	#sale{
		overflow: hidden;
		.sale_wrapper{
			background: #fff;
			margin: 20px;
			border: 2px solid rgba(158,158,158,0.35);
			border-radius: 10px 10px 10px 10px;
			.sale_title h4{
				margin:0;
				padding: 15px;
				background: #00c734;
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