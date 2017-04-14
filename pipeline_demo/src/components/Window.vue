<template>
	<div id="window" class="col-md-6" >
		<div class="wrapper">
			<div class="panel panel-info">
				<div class="panel-heading text-center">{{name}}</div>
				<div class="panel-body">
					<ul>
						<li>节点状态:{{nodeStatus}}</li>
						<li>传感器状态:{{sensorStatus}}</li>
						<li>产线当前任务:{{lineDone}}/{{lineTask}}</li>
						<li>吨数:{{orderInfo[oIndex].ton}}</li>
						<li>物料名:{{orderInfo[oIndex].materialName}}</li>
						<li>车牌号:{{orderInfo[oIndex].carNum}}</li>
						<li>产线完成总量:{{totalLine}}</li>
						<li>预计剩余时间:{{RemainingTime}}</li>
						<li>任务开始时间:{{time}}</li>
					</ul>
					<!-- <div class="pipelineStatus busy"></div> -->
				</div>
				<div class="panel-footer">
					<div class="btn btn-default btn-xs" :ID='ID' @click.prevent='collapseOneDown'>发布</div>
					<div class="btn btn-info btn-xs" @click.prevent='collapseTwoDown'>增加</div>
					<div class="btn btn-success btn-xs" @click.prevent='openProductionLine'>开启</div>
					<div class="btn btn-danger btn-xs" @click.prevent='shutDownProductionLine'>关闭</div>
					<div class="btn btn-warning btn-xs" @click.prevent='suspendProductionLine'>暂停</div>
					<!-- <div class="btn btn-primary btn-xs" @click.prevent='aaa'>换班</div> -->
					<div id="collapseOne" class="collapse out row">
						<div class="col-md-6"> 
							<input type="text" placeholder="物料名" class="form-control input-xs" id="materialName">
						</div>
						<div class="col-md-6">
							<input type="text" placeholder="发件数" class="form-control input-xs" id="sendOutNum">
						 </div>

						<div class="col-md-6"> 
							<input type="text" placeholder="件重" class="form-control input-xs" id="Heavy">
						</div>
						<div class="col-md-6">
							<input type="text" placeholder="车牌号" class="form-control input-xs" id="LicensePlateNumber">
						 </div>
						 <div class="col-md-6">
						 	<label style="font-weight:400;margin-right:20px;">强制更改</label>
					 		<input type="radio" name="forcedOrNot" id="forcedTrue"  value="true"  /> 是
					 		<input type="radio" name="forcedOrNot" id="forcedfalse" value="false" /> 否
						 </div>
						 <div class='col-md-6'><button class='btn btn-default btn-xs pull-right' style='margin-bottom:5px;' @click.prevent='updateTask'>提交</button></div>
					</div>
					<div id="collapseTwo" class="collapse out row">
						 <div class='form-group form-inline'>
						 	<input type="text" class='form-control' id="TaskQuantity">
							 <button class='btn btn-default btn-sm' @click.prevent='temporaryAdd'>提交</button>
						 </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		props:["name","ID","nodeStatus","sensorStatus","lineTask","lineDone","totalLine","time","RemainingTime"],
		data(){
			return {

			}
		},
		mounted(){
		},
		computed:{
			...mapState([
				"orderInfo"
			]),
			oIndex(){
				return Number(this.ID)-1;   //orderInfo的数组索引
			}
		},
		methods:{
			collapseOneDown(ev){
				if($('collapseTwo').css('display') != 'none'){
					$(ev.target).parent().find('#collapseTwo').hide();
					const target=$(ev.target).parent().find('#collapseOne');
					$(target).slideToggle();
				}else{
					const target=$(ev.target).parent().find('#collapseOne');
					$(target).slideToggle();
				};
			},
			collapseTwoDown(ev){
				if($('collapseOne').css('display') != 'none'){
					$(ev.target).parent().find('#collapseOne').hide();
					const target=$(ev.target).parent().find('#collapseTwo');
					$(target).slideToggle();
				}else{
					const target=$(ev.target).parent().find('#collapseTwo');
					$(target).slideToggle();
				}
			},
			updateTask(ev){
				const $target=$(ev.target);
				const $parent=$target.parent().parent();
				const oID=$target.parent().parent().parent().children(0).attr('id');
				let materialName=$parent.find('#materialName').val(),
					sendOutNum=$parent.find('#sendOutNum').val(),
					Heavy=$parent.find('#Heavy').val(),
					LicensePlateNumber=$parent.find('#LicensePlateNumber').val(),
					forcedOrNot=$parent.find('input[type="radio"]:checked').val();
				this.$socket.emit('UpdateTask',{
					"materialName":materialName,
					"sendOutNum":sendOutNum,
					"Heavy":Heavy,
					"LicensePlateNumber":LicensePlateNumber,
					"nodeID":oID,
					"force":forcedOrNot
				});
				this.$store.state.orderInfo.forEach(function(item,index,array){
					if(item.ID==oID){
						item.ton=sendOutNum*Heavy*0.0005;
						item.materialName=materialName;
						item.carNum=LicensePlateNumber;
					}
				})
			},
			temporaryAdd(ev){
				const $target=$(ev.target);
				const $parent=$target.parent().parent();
				const oID=$target.parent().parent().parent().children(0).attr('id');
				let TaskQuantity = $parent.find('#TaskQuantity').val();
				this.$socket.emit('temporaryAdd',{
					"nodeID":oID,
					"TaskQuantity":TaskQuantity
				});
			},
			openProductionLine(ev){
				const $target=$(ev.target);
				const $parent=$target.parent();
				const oID=$parent.children(0).attr('id');
				this.$socket.emit('ControlProductionLine',{
					"nodeID":oID,
					"Oper":'1'
				});
			},
			shutDownProductionLine(ev){
				const $target=$(ev.target);
				const $parent=$target.parent();
				const oID=$parent.children(0).attr('id');
				this.$socket.emit('ControlProductionLine',{
					"nodeID":oID,
					"Oper":'2'
				});
			},
			suspendProductionLine(ev){
				const $target=$(ev.target);
				const $parent=$target.parent();
				const oID=$parent.children(0).attr('id');
				this.$socket.emit('ControlProductionLine',{
					"nodeID":oID,
					"Oper":'3'
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrapper{
		
	}
	.panel-body{
		position:relative;
	}
	.pipelineStatus{
		height:20px;
		width:20px;
		position: absolute;
		top: 0;
		right: 0;
		border-radius:50%;
		margin-right: 10px;
		margin-top: 10px;
	}
	.leisure{
		background:#0dde0d;
		border:1px solid rgba(31,204,68,1);
	}
	.busy{
		background:red;
		border:1px solid rgba(236,92,91,1);
	}
	#collapseOne{
		border:1px solid #bce8f1;
		border-radius:5px;
		position:relative;
		margin-top:10px;
		&:before{
			overflow:hidden;
			position:absolute;
			top:-20px;
			left: 8px;
			content:'';
			border-right:10px solid transparent;
			border-left:10px solid transparent;
			border-top:10px solid transparent;
			border-bottom:10px solid #bce8f1;
		}
		div{
			padding:10px;
		}
	}
	#collapseTwo{
		border:1px solid #bce8f1;
		border-radius:5px;
		position:relative;
		margin-top:10px;
		&:before{
			overflow:hidden;
			position:absolute;
			top:-20px;
			left: 50px;
			content:'';
			border-right:10px solid transparent;
			border-left:10px solid transparent;
			border-top:10px solid transparent;
			border-bottom:10px solid #bce8f1;
		}
		div{
			padding:10px;
			margin:0;
		}
	}
</style>