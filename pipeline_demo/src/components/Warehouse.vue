<template>
	<div id="warehouse">
		<div class="warehouse_wrapper">
			<div class="warehouse_title">
				<h4><span class="glyphicon glyphicon-copy"></span>入库表</h4>
			</div>
			<ul class="nav nav-tabs">
				<router-link to="/index/warehouse/warehouse_input" tag="li" class="active" name='warehouse_input'  ><a href="">input</a></router-link>
				<router-link to="/index/warehouse/warehouse_detail" tag="li"><a href="">detail</a></router-link>
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
	#warehouse{
		overflow: hidden;
		.warehouse_wrapper{
			background: #fff;
			margin: 20px;
			border: 2px solid rgba(158,158,158,0.35);
			border-radius: 10px 10px 10px 10px;
			.warehouse_title h4{
				margin:0;
				padding: 15px;
				background: #00c0ef;
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