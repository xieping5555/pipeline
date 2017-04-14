<template>
	<div id="sidebar">
		<div class="title">
			<h3>益海储运</h3>
		</div>
		<div class="sidebar_content">
			<div class="admin">
				<div class="admin_img">
					<img src="http://localhost:8082/src/assets/img/admin.jpg" alt="adminis">
				</div>
				<div class="admin_name">
					<p>Administrator</p>
					<div class="status"><span></span><p>online</p></div>
				</div>
			</div>
			<div class="nav_content">
				<div class="nav_name">
					<p class='text-center'>main navigation</p>
				</div>
				<div class="nav">
					<ul id="sidebar_nav">
						<router-link tag='li' to='/index/home' active-class><a href="javascript:;"><span class="glyphicon glyphicon-home"></span><span class="word">主页</span></a></router-link>
						<li @click='triangle' class="aa" data-toggle='collapse' data-target="#warehouse_manage"><a><span class="glyphicon glyphicon-asterisk"></span><span class="word">仓库管理</span><span class="glyphicon glyphicon-menu-down pull-right glyphicon-menu-down1"></span></a></li>
						<li id="warehouse_manage" class="collapse out">
							<div>
								<router-link to='/index/warehouse' @click.native='warehouse_input'>
									<span class="glyphicon glyphicon-copy"></span>
									<span class="word">入库</span>
								</router-link>
								<router-link to='/index/out' @click.native='out_input'>
									<span class="glyphicon glyphicon-paste"></span>
									<span class="word">出库</span>
								</router-link>
								<router-link to='/index/sale' @click.native='sale_input'>
									<span class="glyphicon glyphicon-log-out"></span>
									<span class="word">发货</span>
								</router-link>
							</div>
						</li>
						<li @click='triangle1' class="aa" data-toggle='collapse' data-target='#carpush_manage'><a>
							<span class="glyphicon glyphicon-bed"></span>
							<span class="word">兑车管理</span>
							<span class="glyphicon glyphicon-menu-down pull-right glyphicon-menu-down2"></span>
						</a></li>
						<li id="carpush_manage" class="collapse out">
							<div>
								<router-link to='/index/carpush' @click.native='carpush_input'>
									<span class="glyphicon glyphicon-send"></span>
									<span class="word">兑车</span>
								</router-link>
								<router-link to='/index/backfill' @click.native='backfill_input'>
									<span class="glyphicon glyphicon-remove-sign "></span>
									<span class="word">回填</span>
								</router-link>
							</div>
						</li>
						<router-link tag='li' to='/index/arrange'><a href="javascript:;"><span class="glyphicon glyphicon-calendar"></span><span class="word">调度表</span></a></router-link>
						<router-link tag='li' to='/index/screen'><a href="javascript:;"><span class="glyphicon glyphicon-blackboard"><span class="word">流水线查看</span></span></a></router-link>	
						<router-link tag='li' to='/index/datamanage' @click.native='datamanage_warehousemanage'><a href="javascript:;"><span class="glyphicon glyphicon-xbt"></span><span class="word">数据字典管理</span></a></router-link>	
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			switch:true,	//表示向下
			switch1:true  //表示向下
		}
	},
	mounted(){
		this.border_mounted_a();
		this.border_mounted_b('#carpush_manage');
		this.border_mounted_b('#warehouse_manage');
	},
	methods:{
		//点击入库表跳转到input页面
		warehouse_input(){
			this.$router.replace({path:'/index/warehouse/warehouse_input'});
		},
		//点击入库跳转到input界面
		out_input(){
			this.$router.replace({path:'/index/out/out_input'});
		},
		//点击发货跳转到input界面
		sale_input(){
			this.$router.replace({path:'/index/sale/sale_input'});
		},
		//点击兑车跳转到input界面
		carpush_input(){
			this.$router.replace({path:'/index/carpush/carpush_input'});
		},
		//点击回填界面跳转到input界面
		backfill_input(){
			this.$router.replace({path:'/index/backfill/backfill_input'});
		},
		//点击数据字典管理界面跳转到库位管理界面
		datamanage_warehousemanage(){
			this.$router.replace({path:'/index/datamanage/warehousemanage'});
		},
		border_mounted_a(){
			$('#sidebar_nav>li>a').each(function(){
				$(this).click(function(){
					$(this).addClass('activea').parent().siblings().children().removeClass('activea');
				})
			})
		},
		border_mounted_b(a){
			$(a+'>div>a').each(function(){
				$(this).click(function(){
					$(this).addClass('activeb').parent().siblings().children().removeClass('.activeb');
				})
			})
		},
		triangle(){
			if(this.switch){
				$('.glyphicon-menu-down1').css({"transform":"rotate(180deg)","transition":"all 0.2s ease-in"});
				this.switch=!this.switch;
			}else{
				$('.glyphicon-menu-down1').css({"transform":"rotate(0deg)","transition":"all 0.2s ease-in"});
				this.switch=!this.switch;
			}
		},
		triangle1(){
			if(this.switch1){
				$('.glyphicon-menu-down2').css({"transform":"rotate(180deg)","transition":"all 0.2s ease-in"});
				this.switch1=!this.switch1;
			}else{
				$('.glyphicon-menu-down2').css({"transform":"rotate(0deg)","transition":"all 0.2s ease-in"});
				this.switch1=!this.switch1;
			}
		}
	}
}
</script>
<style lang='scss' scoped>
.glyphicon-menu-down{
	margin-top: 1px;
}
.activea{
	color:#fff;
	border-left: 3px solid #3c8dbc !important;
	background: #1e282c;
	color: #fff !important;
}
.activeb{
	border-left:2px solid #ffd5d5 !important;
	color: #fff !important;
}
.aa{
	cursor: pointer;
}
	#sidebar{
		height: 100%;
		position: fixed;
		width: 200px;
		.title{
		margin-top: 0;
		margin-bottom: 0;
		height: 50px;
		background: #367fa9;
		&:hover{
			background:#357ca5;
		}
		h3{
			margin-top: 0;
			margin-bottom: 0;
			color: #fff;
			text-align: center;
			line-height: 50px;
		}
	}
	.sidebar_content{
		height: 100%;
		background:#222d32;
		.admin{
			padding: 20px;
			.admin_img{
				display: inline-block;
				img{
					height: 50px;
					width: 50px;
					border-radius: 50%;
				}
			} 
			.admin_name{
				float: right;
				margin-top: 6px;
				font-weight:600;
				p{
					color: #fff;
					margin-bottom: 0;
				}
				.status{
					overflow: hidden;
					p{
						display: inline-block;
						padding-bottom: 2px;
					}
					span{
						display: inline-block;
						 height: 10px;
						 width: 10px;
						 border-radius:50%;
						 background:green;
						 margin-right:5px;
					}
				}
			}
		}
		.nav_content{
			.nav_name{
				color:#4b646f;
				background:#1a2226;
				padding:5px 0;
				p{
					margin-bottom: 0;
				}
			}
			.nav {
				#sidebar_nav{
					padding: 0;
					li a{
						height: 100%;
						width: 100%;
						display: inline-block;
						padding: 12px 5px 12px 15px;
						text-decoration:none;
						color: #b8c7ce;
						border-left: 3px solid transparent;
						&:hover{
							color:#fff;
							border-left: 3px solid #3c8dbc;
							background: #1e282c;
						}
						.word{
							margin-left: 8px;
						}
					}
					li#warehouse_manage div a{
						border-left: 2px solid transparent;
						background:#374850;
						padding: 8px 5px 8px  25px;
						font-size: 12px;
						&:hover{
							border-left:2px solid #ffd5d5;
						}
					}
					li#warehouse_manage div a:first-child{
						border-bottom: 1px solid rgba(0,0,0,0.33);
					}
					li#warehouse_manage div a:nth-child(2){
						border-bottom: 1px solid rgba(0,0,0,0.33);
					}
					li#carpush_manage div a{
						border-left: 2px solid transparent;
						background:#374850;
						padding: 8px 5px 8px  25px;
						font-size: 12px;
						&:hover{
							border-left:2px solid #ffd5d5;
						}
					}
					li#carpush_manage div a:first-child{
						border-bottom: 1px solid rgba(0,0,0,0.33);
					}
				}
			}
		}
	}
	}
	
</style>