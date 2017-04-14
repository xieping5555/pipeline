<template>
	<div id="arrange">
		<div class="arrange_wrapper">
			<div class="current_group">
				<div class="group_name">
					<p>当前班组:{{shiftData.shiftBanci}}</p>
				</div>
				<div class="group_member">
					<p>调度:{{shiftData.shiftDispatch}}</p>
					<p>内勤:{{shiftData.shiftSecretary}}</p>
					<p>机械:{{shiftData.shiftMachinery}}</p>
				</div>
				<div class='group_btn' @click='shiftShow'>换班</div>
				<div class="group_form"> 
					<input type="text" class="form-control " placeholder="班次" id="shiftBanci" data-toggle='tooltip' data-placement='bottom' title="请按照xxxx-xx-xx白(夜)班的格式填写">
					<input type="text" class="form-control" placeholder="调度" id="shiftDispatch">
					<input type="text" class="form-control" placeholder="内勤" id="shiftSecretary">
					<input type="text" class="form-control" placeholder="机械" id="shiftMachinery">
					<button class="btn btn-default btn-xs" @click.prevent='submitShiftInfo'>提交</button>
					<span class="glyphicon glyphicon-remove" id="shiftHide" @click='shiftHide'></span>
				</div>
			</div>
			<div class="arrange_table">
				<table class="table table-bordered" id="arrangeData">
					<caption class="no-print">
						<div class="row">
							<h4 class="col-md-3 col-md-offset-5">调度计划落实表      LYG-IV-05-15</h4>
							<div class="col-md-1 col-md-offset-2">
								<Print target='arrangeData'></Print>
							</div>
							<div class="col-md-1">
								<ExportEXCEL tableId='arrangeData' filename='调度表'></ExportEXCEL>
							</div>
						</div>
					</caption>
					<tbody>
						<tr>
							<td class="text-center sancang" colspan="2">1#仓
							</td>
							<td class="text-center sancang" colspan="2">2#仓
							</td>
							<td class="text-center sancang" colspan="2">3#仓
							</td>
							<td class="text-center sancang" colspan="2">4#仓
							</td>
						</tr>
						<tr>
							<td class="text-center">货名</td>
							<td class="text-center">吨位</td>
							<td class="text-center">货名</td>
							<td class="text-center">吨位</td>
							<td class="text-center">货名</td>
							<td class="text-center">吨位</td>
							<td class="text-center">货名</td>
							<td class="text-center">吨位</td>
						</tr>
						<tr>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
							<td class="input_td"><p>1</p><input type="text" class="form-control text-center"></td>
						</tr>

						<!-- 汽车作业 -->
						<tr id="autocar_tr">
							<td class="text-center work_wrapper" colspan="2" :rowspan='autocarRowspan'><p class="autocar_work" id="autocarP">汽车作业</p></td>
							<td class="text-center autocar_work_title">货种</td>
							<td class="text-center autocar_work_title">类别</td>
							<td class="text-center autocar_work_title">车数</td>
							<td class="text-center autocar_work_title">件数</td>
							<td class="text-center autocar_work_title">吨位</td>
							<td class="text-center autocar_work_title">备注</td>
						</tr>
						<tr v-for='autocarWorkTruck in autocarWorkTruckArr '>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='autocarWorkTruck.autocarTruck_goodsName'>
							</td>
							<td class="text-center">
								兑车
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='autocarWorkTruck.autocarTruck_carNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='autocarWorkTruck.autocarTruck_goodsNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='
								autocarWorkTruck.autocarTruck_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center">
							</td>
						</tr>
						<tr v-for='autocarWorkSale in autocarWorkSaleArr'>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='autocarWorkSale.autocarSale_goodsName'>
							</td>
							<td class="text-center">
								装车
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='
								autocarWorkSale.autocarSale_carNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='
								autocarWorkSale.autocarSale_goodsNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='
								autocarWorkSale.autocarSale_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center">
							</td>
						</tr>


					<!-- 火车作业 -->
						<tr >
							<td class="text-center work_wrapper" colspan="2" :rowspan='trainRowspan'><p class="train_work" id="trainP">火车作业</p></td>
							<td class="text-center train_work_title">货种</td>
							<td class="text-center train_work_title">类别</td>
							<td class="text-center train_work_title">车数</td>
							<td class="text-center train_work_title">件数</td>
							<td class="text-center train_work_title">吨位</td>
							<td class="text-center train_work_title">备注</td>
						</tr>
						<tr v-for='trainWorkTruck in trainWorkTruckArr'>
							<td class="text-center input_td">
								<p >1</p>
								<input type="text" class="form-control text-center" :value='trainWorkTruck.trainTruck_goodsName'>
							</td>
							<td class="text-center">
								兑车
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkTruck.trainTruck_carNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkTruck.trainTruck_goodsNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkTruck.trainTruck_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center">
							</td>
						</tr>
						<tr v-for='trainWorkSale in trainWorkSaleArr'>
							<td class="text-center input_td">
								<p >1</p>
								<input type="text" class="form-control text-center" :value='trainWorkSale.trainSale_goodsName'>
							</td>
							<td class="text-center">
								装车
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkSale.trainSale_carNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkSale.trainSale_goodsNum'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='trainWorkSale.trainSale_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center">
							</td>
						</tr>
						
						

						<!-- 码垛作业 -->
						<tr>
							<td :rowspan="stackingRowspan" colspan="2" class='text-center work_wrapper'><p class="maduo_work" id="stackingP">码垛作业</p></td>
							<td class="text-center maduo_work_title">货种</td>
							<td class="text-center maduo_work_title" colspan="2">件数</td>
							<td class="text-center maduo_work_title" colspan="2">吨位</td>
							<td class="text-center maduo_work_title">备注</td>
						</tr>
						<tr v-for='stackingWork in stackingWorkArr'>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="text-center form-control" :value='stackingWork.stacking_goodsName'>
							</td>
							<td colspan="2" class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='stackingWork.stacking_goodsNum'>
							</td>
							<td colspan="2" class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='stackingWork.stacking_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>
						

						<!-- 转场作业 -->
						<tr>
							<td :rowspan="transferRowspan" colspan="2" class='text-center work_wrapper'><p class="transfer_work" id="transferP">转场作业</p></td>
							<td class="text-center transfer_work_title">货种</td>
							<td class="text-center transfer_work_title" colspan="2">件数</td>
							<td class="text-center transfer_work_title" colspan="2">吨位</td>
							<td class="text-center transfer_work_title">备注</td>
						</tr>
						<tr v-for='transferWork in transferWorkArr'>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="text-center form-control" :value='transferWork.transfer_goodsName'>
							</td>
							<td colspan="2" class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='transferWork.transfer_goodsNum'>
							</td>
							<td colspan="2" class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" :value='transferWork.transfer_goodsWeight'>
							</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>
					

						<!-- 理保数和机头数 -->
						<tr>
							<td colspan="2" class="text-center compare">货种</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center">
								总计
							</td>
						</tr>
						<tr>
							<td rowspan="2" class="text-center work_wrapper"><p class="compare compare_obj">理保数</p></td>
							<td class="text-center compare">一期</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center compare">二期</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>
						<tr>
							<td rowspan="2" class="text-center work_wrapper"><p class="compare compare_obj">机头数</p></td>
							<td class="text-center compare">一期</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center compare">二期</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
							<td class="text-center input_td">
								<p>1</p>
								<input type="text" class="text-center form-control">
							</td>
						</tr>

						<!-- 其他作业 -->
						<tr>
							<td rowspan="5" colspan="2" class="text-center work_wrapper"><p class="other_work">其他作业</p></td>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>

						<!-- 交接事项 -->
						<tr>
							<td rowspan="5" colspan="2" class="text-center work_wrapper"><p class="explain">交接事项</p></td>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center input_td" colspan="6">
								<p>1</p>
								<input type="text" class="form-control">
							</td>
						</tr>
						<tr>
							<td class="text-center">调度</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" v-model='shiftData.shiftDispatch'>
							</td>
							<td class="text-center">内勤</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" v-model='shiftData.shiftSecretary'>
							</td>
							<td class="text-center">机械</td>
							<td class="input_td text-center">
								<p>1</p>
								<input type="text" class="form-control text-center" v-model='shiftData.shiftMachinery'>
							</td>
							<td colspan="2" class="text-center input_td">
								<p>1</p>
								<input type="text" class="form-control text-center" v-model='shiftData.shiftBanci'>
							</td>	
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs';
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return {
				Goods:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%'],
				saleMethods:['兑车','装车'],
				putInfoArr:[],
				outInfoArr:[],
				saleInfoArr:[],
				truckInfoArr:[],
				backInfoArr:[],
				autocarWorkTruckArr:[],  //汽车兑车信息
				autocarRowspan:0,        //跨越的行
				autocarWorkSaleArr:[],    //汽车装车信息
				trainWorkTruckArr:[],
				trainHeight:0,
				trainRowspan:0,
				trainWorkSaleArr:[],
				stackingWorkArr:[],
				stackingRowspan:0,
				transferWorkArr:[],
				transferRowspan:0
			}
		},
		computed:{
			...mapState([
				"shiftData",
				"Classes"
			])
		},
		mounted(){
			(function () { 
				$("[data-toggle='tooltip']").tooltip();
			})();   //启用弹出框
			this.getShiftInfo();
			this.replace();
			this.getInfo();
			this.autocarWork();
			this.trainWork();
			this.stackingWork();
			this.transferWork();
		},
		methods:{
			...mapMutations([
				"shiftAInfo"
			]),
			//导出时将input框的值给td
			replace(ev){
					$('#exportEXCEL>.btn').mouseup(function(){
							$('input').each(function(index,el){
								$(el).siblings().html($(el).val());
							})
					})
			},
			//页面载入的时候获取今天的调度信息
			getInfo(){
				const _this=this;
				$.ajaxSettings.async=false;   // 同步ajax
				$.getJSON('http://localhost:3000/getPutInfo',{
					"Classes":_this.Classes
				},function(res){
					this.putInfoArr=res;
				}.bind(this));
				$.getJSON('http://localhost:3000/getOutInfo',{
					"Classes":_this.Classes
				},function(res){
					this.outInfoArr=res;
				}.bind(this));
				$.getJSON('http://localhost:3000/getSaleInfo',{
					"Classes":_this.Classes
				},function(res){
					this.saleInfoArr=res;
				}.bind(this));
				$.getJSON('http://localhost:3000/getTruckInfo',{
					"Classes":_this.Classes
				},function(res){
					this.truckInfoArr=res;
				}.bind(this));
				$.getJSON('http://localhost:3000/getBackInfo',{
					"Classes":_this.Classes
				},function(res){
					this.backInfoArr=res;
				}.bind(this));
				$.ajaxSettings.async=true; 
			},
			//处理汽车作业
			autocarWork(){
				//先根据分类
				var TruckInfoArr=this.truckInfoArr;
				var SaleInfoArr=this.saleInfoArr;
				for(let i=0;i<this.Goods.length;i++){
					//创建一个汽车作业兑车对象
					const autocarTruck={
						goodsName:'',
						carNum:0,
						goodsNum:0,
						goodsWeight:0,
						remark:''
					};
					//创建一个汽车作业装车对象
					const autocarSale={
						goodsName:'',
						carNum:0,
						goodsNum:0,
						goodsWeight:0,
						remark:''
					};
					const _this=this;
					TruckInfoArr.forEach(function(item,index,array){
						if(item.truck_pinming == _this.Goods[i] && item.truck_methods =='汽车'){
							autocarTruck.goodsName=_this.Goods[i];
							autocarTruck.carNum++;
							autocarTruck.goodsNum+=item.truck_truenum;
							autocarTruck.goodsWeight+=item.truck_pieceWeight*item.truck_truenum/1000;
						}
					});
					SaleInfoArr.forEach(function(item,index,array){
						if(item.sale_pinming == _this.Goods[i] &&item.sale_style == '装汽车'){
							autocarSale.goodsName=_this.Goods[i];
							autocarSale.carNum++;
							autocarSale.goodsNum+=item.true_num;
							autocarSale.goodsWeight+=item.pieceWeight*item.true_num/1000;
						}
					});
					if(autocarTruck.goodsName !==''){
						_this.autocarWorkTruckArr.push({
							"autocarTruck_goodsName":autocarTruck.goodsName,
							"autocarTruck_carNum":autocarTruck.carNum,
							"autocarTruck_goodsNum":autocarTruck.goodsNum,
							"autocarTruck_goodsWeight":autocarTruck.goodsWeight
						});
					};
					if(autocarSale.goodsName !==''){
						_this.autocarWorkSaleArr.push({
							"autocarSale_goodsName":autocarSale.goodsName,
							"autocarSale_carNum":autocarSale.carNum,
							"autocarSale_goodsNum":autocarSale.goodsNum,
							"autocarSale_goodsWeight":autocarSale.goodsWeight
						});
					}
				};
				this.autocarRowspan=this.autocarWorkTruckArr.length + this.autocarWorkSaleArr.length + 1;
				$('#autocarP').height(this.autocarRowspan*38.75).css({"line-height":this.autocarRowspan*38.75+'px'});
			},
			//处理火车作业
			trainWork(){
				var TruckInfoArr=this.truckInfoArr;
				var SaleInfoArr=this.saleInfoArr;
				//创建一个火车作业兑车对象
				for(let i=0;i<this.Goods.length;i++){
					const trainTruck={
							goodsName:'',
							carNum:0,
							goodsNum:0,
							goodsWeight:0,
							remark:''
					};
					//创建一个火车作业装车对象
					const trainSale={
						goodsName:'',
						carNum:0,
						goodsNum:0,
						goodsWeight:0,
						remark:''
					};
					const _this=this;
					TruckInfoArr.forEach(function(item,index,array){
						if(item.truck_pinming == _this.Goods[i] && item.truck_methods =='火车'){
							trainTruck.goodsName=_this.Goods[i];
							trainTruck.carNum++;
							trainTruck.goodsNum+=item.truck_truenum;
							trainTruck.goodsWeight+=item.truck_pieceWeight*item.truck_truenum/1000;
						}
					});
					SaleInfoArr.forEach(function(item,index,array){
						if(item.sale_pinming == _this.Goods[i] &&item.sale_style == '装火车'){
							trainSale.goodsName=_this.Goods[i];
							trainSale.carNum++;
							trainSale.goodsNum+=item.true_num;
							trainSale.goodsWeight+=item.pieceWeight*item.true_num/1000;
						}
					});
					if(trainTruck.goodsName !==''){
							_this.trainWorkTruckArr.push({
								"trainTruck_goodsName":trainTruck.goodsName,
								"trainTruck_carNum":trainTruck.carNum,
								"trainTruck_goodsNum":trainTruck.goodsNum,
								"trainTruck_goodsWeight":trainTruck.goodsWeight
							});
						};
					if(trainSale.goodsName !==''){
						_this.trainWorkSaleArr.push({
							"trainSale_goodsName":trainSale.goodsName,
							"trainSale_carNum":trainSale.carNum,
							"trainSale_goodsNum":trainSale.goodsNum,
							"trainSale_goodsWeight":trainSale.goodsWeight
						});
					}
				}
				this.trainRowspan=this.trainWorkTruckArr.length + this.trainWorkSaleArr.length + 1;
				$('#trainP').height(this.trainRowspan*38.75).css({"line-height":this.trainRowspan*38.75+'px'});
			},
			//处理码垛作业
			stackingWork(){
				var PutInfoArr=this.putInfoArr;
				const _this=this;
				for(let i=0;i<this.Goods.length;i++){
					//创建一个码垛作业对象
					const stacking={
						goodsName:'',
						goodsNum:0,
						goodsWeight:0,
						remark:''
					};
					PutInfoArr.forEach(function(item,index,array){
						if(item.goods_name == _this.Goods[i] && item.putstyle == '码垛'){
							stacking.goodsName=_this.Goods[i];
							stacking.goodsNum+=item.mount;
							stacking.goodsWeight+=item.weight/1000;
						}
					});
					if(stacking.goodsName !==''){
						_this.stackingWorkArr.push({
							"stacking_goodsName":stacking.goodsName,
							"stacking_goodsNum":stacking.goodsNum,
							"stacking_goodsWeight":stacking.goodsWeight,
						})
					};
				};
				this.stackingRowspan=this.stackingWorkArr.length+1;
				$('#stackingP').height(this.stackingRowspan*38.75).css({"line-height":this.stackingRowspan*38.75+'px'});
			},
			//处理转场作业
			transferWork(){
				var PutInfoArr=this.putInfoArr;
				var OutInfoArr=this.outInfoArr;
				var combineArr=PutInfoArr.concat(OutInfoArr);
				const _this=this;
				for(let i=0;i<this.Goods.length;i++){
					const transfer={
						goodsName:'',
						goodsNum:0,
						goodsWeight:0,
						remark:''
					};
					combineArr.forEach(function(item,index,array){
						let goods_name = item.goods_name?item.goods_name:item.out_zhonglei;
						let out_style=item.putstyle?item.putstyle:item.out_style;
						let goods_num=item.mount?item.mount:item.out_num;
						let weight=item.piece_weight?item.piece_weight:item.out_jianzhong;
						if(goods_name == _this.Goods[i] && out_style == '转垛'){
							transfer.goodsName=_this.Goods[i];
							transfer.goodsNum+=goods_num;
							transfer.goodsWeight+=goods_num*weight/1000;
						}
					});
					if(transfer.goodsName !== ''){
						_this.transferWorkArr.push({
							"transfer_goodsName":transfer.goodsName,
							"transfer_goodsNum":transfer.goodsNum,
							"transfer_goodsWeight":transfer.goodsWeight
						})
					};
				};
				this.transferRowspan=this.transferWorkArr.length + 1;
				$('#transferP').height(this.transferRowspan*38.75).css({"line-height":this.transferRowspan*38.75+'px'});
			},
			shiftShow(){
				$('.group_form').animate({"left":0+'px'},500);
			},
			shiftHide(){
				$('.group_form').animate({"left":2000+'px'},500);
			},
			submitShiftInfo(){
				const _this=this;
				if($('#shiftBanci').val() == '' || $('#shiftBanci').val().search(/^\d{4}-\d{2}-\d{2}[\u4E00-\u9FA5]{2}$/) == -1){
					$('#shiftBanci').addClass('highlight');
					return;
				}
				this.$http.post('http://localhost:3000/submitShiftInfo',qs.stringify({
					"shiftBanci":$('#shiftBanci').val(),
					"shiftDispatch":$('#shiftDispatch').val(),
					"shiftSecretary":$('#shiftSecretary').val(),
					"shiftMachinery":$('#shiftMachinery').val()
				})).then(function(res){
					_this.shiftAInfo(res.data);
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			getShiftInfo(){
				const _this=this;
				this.$http.get('http://localhost:3000/getShiftInfo').then(function(res){
					_this.$store.state.shiftData=res.data[0];
				}).catch(function(err){
					console.log(err);
					return;
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
.highlight{
	border:1px solid rgba(255, 0, 0, 0.74);
}
	.oRowspan{
		height: 70.12px;
	}
	.compare_obj{
		height: 76.12px;
		line-height: 76.12px;
		margin-bottom: 0;
		color: #fff;
		background: rgba(148,153,214,1);
	}
	.compare{
		background: rgba(148,153,214,1);
		color: #fff;
	}
	.explain{
		height: 192.8px;
		line-height: 192.8px;
		font-size: 24px;
		color: #fff;
		margin-bottom: 0;
		background: rgba(148,153,214,1);
	}
	.other_work{
		height: 192.8px;
		line-height: 192.8px;
		font-size: 24px;
		color: #fff;
		margin-bottom: 0;
		background: rgba(148,153,214,1);
	}
	.transfer_work{
		font-size: 24px;
		color: #fff;
		margin-bottom: 0;
		background: rgba(148,153,214,1);
	}
	.transfer_work_title{
		color: #fff;
		background: rgba(148,153,214,1);
	}
	.maduo_work{
		font-size: 24px;
		color: #fff;
		margin-bottom: 0;
		background: rgba(148,153,214,1);
	}
	.maduo_work_title{
		color: #fff;
		background: rgba(148,153,214,1);
	}
	.train_work{
		margin-bottom: 0;
		background: rgba(148,153,214,1);
		color: #fff;
		font-size: 24px;
	}
	.train_work_title{
		background:rgba(148,153,214,1);
		color: #fff;
	}
	.autocar_work_title{
		background: rgba(148,153,214,1);
		color: #fff;
	}
	.sancang{
		background: rgba(148,153,214,1);
		color: #fff;
	}
	.work_wrapper{
		padding: 0;
	}
	.autocar_work{
		height: 106.68px;
		line-height: 106.68px;
		margin-bottom: 0;
		background: rgba(148,153,214,1);
		color: #fff;
		font-size: 24px;
	}
	.arrange_wrapper{
		margin:20px;
		background: #fff;
		border-radius: 5px;
		border:2px solid #D6D6D6;
		overflow: hidden;
		.current_group{
			border-bottom: 1px solid #eee;
			color: #000000;
			color: #fff;
			padding: 10px;
			.group_name {
				display: inline-block;
				padding: 10px;
				background:rgba(148,153,214,1); 
				border-radius: 5px;
				box-shadow: 0px 1px 4px #eee inset;
				border:1px solid rgba(148,153,214,0.5);
				p{
					margin-bottom: 0;
				}
			}
			.group_member{
				display: inline-block;
				background:rgba(148,153,214,1); 
				padding: 10px;
				border-radius: 5px;
				box-shadow: 0px 1px 4px #eee inset;
				border:1px solid rgba(148,153,214,0.5);
				p{
					margin-bottom:0px;
					display: inline-block;
				}
			}
			.group_btn{
				display: inline-block;
				background:rgba(148,153,214,1); 
				padding: 10px;
				border-radius: 5px;
				box-shadow: 0px 1px 4px #eee inset;
				border:1px solid rgba(148,153,214,0.5);
				cursor: pointer;
				&:hover{
					background:rgba(5,35,144,0.61);	
				};
			}
			.group_form{
				display: inline-block;
				padding: 5px;
				position: relative;
				left: 2000px;
				input{
					display: inline-block;
					width: 22%;
				}
				span{
					display: inline-block;
					height: 27.75px;
					padding-top: 5px;
					color: #b5a5a5;
					cursor: pointer;
					float: right;
					top: 5px;
				}
			}
		}
		.arrange_table{
			table tbody tr .input_td{
				overflow:hidden;
				padding:0;
				position: relative;
				z-index: 1;
				width: 12.5%;
				p{
					height: 100%;
					width: 100%;
					margin: 0;
					padding: 8px;
					box-sizing: border-box;
				}
				input{
					padding: 0;
					border: none;
					border-radius: 0;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 9999;
					height: 38.75px;
					&:focus{
						box-shadow:-80px -80px 6px 20px hsla(183, 58%, 59%, 0.28) inset;
					}
				}
			}
		}
	}
</style>