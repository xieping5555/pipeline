<template>
	<div id="datamanage">
		<div class="datamanage_wrapper">
			<ul class="nav nav-tabs">
			  <router-link tag='li' to='/index/datamanage/warehousemanage' class='active'><a href="">库位管理</a></router-link>
			  <router-link tag='li' to='/index/datamanage/storehousemanage'><a href="">仓位管理</a></router-link>
			  <router-link tag='li' to='/index/datamanage/materialmanage'><a href="">物料管理</a></router-link>
			  <router-link tag='li' to='/index/datamanage/classesemanage'><a href="">班次管理</a></router-link>
			  <router-link tag='li' to='/index/datamanage/groupmanage'><a href="">组别管理</a></router-link>
			</ul>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
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
<style scoped lang="scss">
	.datamanage_wrapper{
		    margin: 20px;
		    background: #fff;
		    border-radius: 5px;
		    border: 2px solid #D6D6D6;
		    overflow: hidden;
	}
</style>