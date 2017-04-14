<template>
	<div id="carpush_detail">
		<table class="table table-bordered table-hover table-striped" id="carpushData">
		<caption class="text-center no-print">
					<div class="row">
						<div class="col-md-1  col-md-offset-5">
							<Print target='carpushData'></Print>
						</div>
						<div class="col-md-1">
							<ExportEXCEL tableId='carpushData' filename='兑车表'></ExportEXCEL>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" placeholder="请输入查询关键字" v-model='queryString' id="query">
						</div>
						<div class="col-md-2">
				             <input type="date" class="form-control" @change='truck_dateChange'>
						</div>
						<div class="col-md-1" style="margin-top:8px;">
							<input type="radio" name="dayOrNight" id="day" value="白班">白班
				             <input type="radio" name="dayOrNight" id="night" value="夜班">夜班
						</div>
					</div>
				</caption>
			<thead>
				<tr>
					<th class="text-center">期数</th>
					<th class="text-center">品名</th>
					<th class="text-center">客户名称</th>
					<th class="text-center">兑车方式</th>
					<th class="text-center">车号</th>
					<th class="text-center">销售单号</th>
					<th class="text-center">定单号</th>
					<th class="text-center">实发件数</th>
					<th class="text-center">磅重</th>
					<th class="text-center">作业时间</th>
					<th class="text-center">作业班组</th>
					<th class="text-center">状态</th>
					<th class="text-center">备注</th>
					<th class="text-center no-print">操作</th>					
				</tr>
			</thead>
			<tbody>
				<tr v-for='truckInfo in query_result'>
					<td class="text-center">{{truckInfo.periods}}</td>
					<td class="text-center">{{truckInfo.truck_pinming}}</td>
					<td class="text-center">{{truckInfo.truck_custom}}</td>
					<td class="text-center">{{truckInfo.truck_methods}}</td>
					<td class="text-center">{{truckInfo.truck_car}}</td>
					<td class="text-center">{{truckInfo.truck_salenum}}</td>
					<td class="text-center">{{truckInfo.truck_ordernum}}</td>
					<td class="text-center">{{truckInfo.truck_truenum}}</td>
					<td class="text-center">{{truckInfo.truck_weight}}</td>
					<td class="text-center">{{truckInfo.truck_time}}</td>
					<td class="text-center">{{truckInfo.truck_people}}</td>
					<td class="text-center"><button class="btn btn-xs truckPrepareFilling" data-toggle='modal' data-target='#truckFillingModal' @click.prevent='truckFillingStatusChange'>{{truckInfo.truck_fillingStatus}}</button></td>
					<td class="text-center">{{truckInfo.truck_remark}}</td>
					<td class="text-center no-print">
						<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#carpushModal' @click='fill'>修改</button>
						<!-- <button class="btn btn-danger btn-xs">删除</button> -->
					</td>
				</tr>
				<tr >
					<td colspan="14" class="text-center  text-muted" v-show='query_result.length==0'>暂无信息...</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="carpushModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title text-center" id="myModalLabel">
							修改
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-horizontal">
						<div class="form-group">
							<label for="truckQ_periods" class="col-md-2 text-right">期数</label>
							<div class="col-md-6">
								<input type="radio" name="truckQ_periods" id="truckQ_one_periods" value="一期" >一期兑车
								<input type="radio" name="truckQ_periods" id="truckQ_two_periods" value="二期" style='margin-left:20px;'>二期兑车
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_pinming" class="col-md-2 text-right">品名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_pinming">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_custom" class="col-md-2 text-right">客户名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_custom">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_methods" class="col-md-2 text-right">兑车方式</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_methods">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_car" class="col-md-2 text-right">车号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_car">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_salenum" class="col-md-2 text-right">销售单号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_salenum">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_ordernum" class="col-md-2 text-right">定单号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_ordernum">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_truenum" class="col-md-2 text-right">实发件数</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_truenum">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_weight" class="col-md-2 text-right">磅重</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="truckQ_weight">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_time" class="col-md-2 text-right">作业时间</label>
							<div class="col-md-6">
								<input type="text" id="truckQ_time" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_people" class="col-md-2 text-right">作业班组</label>
							<div class="col-md-6">
								<input type="text" id="truckQ_people" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="truckQ_remark" class="col-md-2 text-right">备注</label>
							<div class="col-md-8">
								<textarea name="truckQ_remark" id="truckQ_remark"  rows="4"  class="form-control input-sm"></textarea>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" @click='truck_submitChange'>
							提交更改
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<div class="modal fade" id="truckFillingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabe2" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">警告</h4>
		            </div>
		            <div class="modal-body">是否装车完毕?</div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='confirmFilling'>确定</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
</template>
<script>
import qs from 'qs';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default{
		data(){
			return{
				queryString:'',
				nowIndex:-1
			}
		},
		computed:{
			...mapState([
				"newTruckInfoArr",
				"Classes"
			]),
			query_result(){
				if(this.queryString ==''){
					return this.newTruckInfoArr;
				}else{
					const arr=[];
					const _this=this;
					this.newTruckInfoArr.forEach(function(item,index,array){
						for (let props in item){
							if(props == '_id'){
								continue;
							}
							let props_string=item[props].toString();
							if(props_string.search(_this.queryString) !=-1){
								arr.push(item);
								break;
							}
						}
					});
					return arr;
				}
			}
		},
		mounted(){
			this.showTruckInfo();
		},
		updated(){    
			const _this=this;
			$('.truckPrepareFilling').each(function(index){       
				if(this.innerHTML == '装车完成'){
					console.log('hjahaahhaha');
					console.log(this);
					$(this).css({'background-color':'#c9302c'}).prop({'disabled':'disabled'});
				};
				if(this.innerHTML == '准备装车'){             
				//	由于vuejs的模板缓存问题，使得数据更新之后v-for循环出来dom节点不会更新，所以需要重新加样式
					$(this).css({'background-color':'#00a65a'}).removeAttr('disabled');
				}
			});
		},
		methods:{
			...mapMutations([
				"truck_changeInfo"
			]),
			showTruckInfo(){
				const _this=this;
				this.$http.get('http://localhost:3000/showTruckInfo',{
					params:{
						"Classes":_this.Classes
					}
				}).then(function(res){
					_this.$store.state.newTruckInfoArr=res.data;
					_this.$nextTick(function(){             //在第一次模板渲染之后v-for循环出来的元素还没有创建，需要过一个周期才能添加样式。
						$('.truckPrepareFilling').each(function(){
							if(this.innerHTML == '装车完成'){
								$(this).css({'background-color':'#c9302c'}).prop({'disabled':'disabled'});
							}
						})
					});
				}).catch(function(err){
					console.log(err);
				})
			},
			truck_dateChange(){
				let date=$('input[type="date"]').val();
				let dayOrNight=$('input[name="dayOrNight"]:checked').val();
				const _this=this;
				this.$http.get('http://localhost:3000/carpush_dateInfo',{
					params:{
						Classes:date+dayOrNight
					}
				}).then(function(res){
					if(res.data.length == 0){
						alert('没有这个班次的数据');
					}else{
						_this.$store.state.newTruckInfoArr=res.data;  //将信息数据赋值为根据日期查找到的数组信息显示在页面中
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			fill(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
				var thisInfo=this.newTruckInfoArr[this.nowIndex];
				$(`input[name="truckQ_periods"][value=${thisInfo.periods}]`).prop({checked:'checked'});
				$('#truckQ_pinming').val(thisInfo.truck_pinming);
				$('#truckQ_custom').val(thisInfo.truck_custom);
				$('#truckQ_methods').val(thisInfo.truck_methods);
				$('#truckQ_car').val(thisInfo.truck_car);
				$('#truckQ_salenum').val(thisInfo.truck_salenum);
				$('#truckQ_ordernum').val(thisInfo.truck_ordernum);
				$('#truckQ_truenum').val(thisInfo.truck_truenum);
				$('#truckQ_weight').val(thisInfo.truck_weight);
				$('#truckQ_time').val(thisInfo.truck_time);
				$('#truckQ_people').val(thisInfo.truck_people);
				$('#truckQ_remark').val(thisInfo.truck_remark);
			},
			truck_submitChange(){
				const _this=this;
				this.$http.post('http://localhost:3000/truckInfoChange',qs.stringify({
					"_id":_this.newTruckInfoArr[_this.nowIndex]._id,
					"periods":$('input[name="truckQ_periods"]:checked').val(),
					"truck_pinming":$('#truckQ_pinming').val(),
					"truck_custom":$('#truckQ_custom').val(),
					"truck_methods":$('#truckQ_methods').val(),
					"truck_car":$('#truckQ_car').val(),
					"truck_salenum":$('#truckQ_salenum').val(),
					"truck_ordernum":$('#truckQ_ordernum').val(),
					"truck_truenum":$('#truckQ_truenum').val(),
					"truck_weight":$('#truckQ_weight').val(),
					"truck_time":$('#truckQ_time').val(),
					"truck_people":$('#truckQ_people').val(),
					"truck_remark":$('#truckQ_remark').val()
				})).then(function(res){
					_this.truck_changeInfo(res.data[0]);
					$('#carpushModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			},
			truckFillingStatusChange(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
			},
			confirmFilling(){
				const _this=this;
				this.$http.get('http://localhost:3000/truckFillingStatusChange',{
					params:{
						"_id":_this.newTruckInfoArr[_this.nowIndex]._id
					}
				}).then(function(res){
					_this.newTruckInfoArr[_this.nowIndex]['truck_fillingStatus'] = '装车完成';
					$($('.truckPrepareFilling')[_this.nowIndex]).css({'background-color':'#c9302c'}).prop({'disabled':'disabled'});
				}).catch(function(err){
					console.log(err);
					return;
				})
				$('#truckFillingModal').modal('hide');
			}
		}
	}
</script>
<style lang='scss' scoped>
	.truckPrepareFilling{
		color: #fff;
		background-color: #00a65a;
		&:hover{
			background-color:#00c734;
		}
	}
</style>