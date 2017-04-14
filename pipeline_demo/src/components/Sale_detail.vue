<template>
	<div id="sale_detail">
		<table class="table table-bordered table-hover table-striped" id="saleData">
			<caption class="text-center no-print">
					<div class="row">
						<div class="col-md-1  col-md-offset-5">
							<Print target='saleData'></Print>
						</div>
						<div class="col-md-1">
							<ExportEXCEL tableId='saleData' filename='发货表'></ExportEXCEL>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" placeholder="请输入查询关键字"
							v-model='queryString' id="query" >
						</div>
						<div class="col-md-2">
				             <input type="date" class="form-control" @change='sale_dateChange'>
						</div>
						<div class="col-md-1" style="margin-top:8px;">
							<input type="radio" name="dayOrNight" id="day" value="白班">白班
				             <input type="radio" name="dayOrNight" id="night" value="夜班">夜班
						</div>
					</div>
				</caption>
			<thead>
				<tr>
					<th class="text-center">库位</th>
					<th class="text-center">发货方式</th>
					<th class="text-center">货位</th>
					<th class="text-center">客户名称</th>
					<th class="text-center">车号</th>
					<th class="text-center">销售单号</th>
					<th class="text-center">订单号</th>
					<th class="text-center">实发件数</th>
					<th class="text-center">品名</th>
					<th class="text-center">班次</th>
					<th class="text-center">散粕</th>
					<th class="text-center">状态</th>
					<th class="text-center">备注</th>
					<th class="text-center no-print">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="saleInfo in query_result">
					<td class="text-center">{{saleInfo.sale_kuwei}}</td>
					<td class="text-center">{{saleInfo.sale_style}}</td>
					<td class="text-center">{{saleInfo.sale_huowei}}</td>
					<td class="text-center">{{saleInfo.custom_name}}</td>
					<td class="text-center">{{saleInfo.car_num}}</td>
					<td class="text-center">{{saleInfo.sale_num}}</td>
					<td class="text-center">{{saleInfo.other_num}}</td>
					<td class="text-center">{{saleInfo.true_num}}</td>
					<td class="text-center">{{saleInfo.sale_pinming}}</td>
					<td class="text-center">{{saleInfo.sale_banci}}</td>
					<td class="text-center">{{saleInfo.sanpo}}</td>
					<td class="text-center"><button class="btn btn-xs prepareFilling" data-toggle='modal' data-target='#fillingModal' 
					@click.prevent='fillingStatusChange'>{{saleInfo.fillingStatus}}</button></td>
					<td class="text-center">{{saleInfo.sale_remark}}</td>
					<td class="text-center no-print">
						<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#saleModal' @click='fill'>修改</button>
						<!-- <button class="btn btn-danger btn-xs">删除</button> -->
					</td>
				</tr>
				<tr >
					<td colspan="14" class="text-center  text-muted" v-show='query_result.length==0'>暂无信息...</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="saleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
							<label for="saleQ_kuming" class="col-md-2 text-right">库位</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_kuming">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_style" class="col-md-2 text-right">发货方式</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_style">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_huowei" class="col-md-2 text-right">货位</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_huowei">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_customName" class="col-md-2 text-right">客户名称</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_customName">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_carNum" class="col-md-2 text-right">车号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_carNum">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_saleNum" class="col-md-2 text-right">销售单号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_saleNum">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_otherNum" class="col-md-2 text-right">定单号</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_otherNum">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_trueNum" class="col-md-2 text-right">实发件数</label>
							<div class="col-md-6"> 
								<input type="text" class="form-control input-sm" id="saleQ_trueNum">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_pinming" class="col-md-2 text-right">品名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_pinming">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_banci" class="col-md-2 text-right">班次</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="saleQ_banci">
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_sanpo" class="col-md-2 text-right">散粕</label>
							<div class="col-md-6">
								<input type="radio" name="Q_sanpo" id="Q_yes" value="是">是
								<input type="radio" name="Q_sanpo" id="Q_no" value="否" style="margin-left:20px;">否
							</div>
						</div>
						<div class="form-group">
							<label for="saleQ_remark" class="col-md-2 text-right">备注</label>
							<div class="col-md-8">
								<textarea name="saleQ_remark" id="saleQ_remark"  rows="4"  class="form-control input-sm"></textarea>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" @click='submitChange'>
							提交更改
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<div class="modal fade" id="fillingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabe2" aria-hidden="true">
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
				nowIndex:-1,
				queryString:''
			}
		},
		computed:{
			...mapState([
				"newSaleInfoArr",
				"Classes"
			]),
			query_result(){
				if(this.queryString ==''){
					return this.newSaleInfoArr;
				}else{
					const arr=[];
					const _this=this;
					this.newSaleInfoArr.forEach(function(item,index,array){
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
		watch:{

		},
		mounted(){
			this.showSaleInfo();
		},
		updated(){   
			const _this=this;
			$('.prepareFilling').each(function(index){       
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
				"sale_changeInfo"
			]),
			showSaleInfo(){
				var _this=this;
				this.$http.get('http://localhost:3000/showSaleInfo',{
					params:{
						"Classes":_this.Classes
					}
				}).then(function(res){
					_this.$store.state.newSaleInfoArr=res.data;
					_this.$nextTick(function(){             //在第一次模板渲染之后v-for循环出来的元素还没有创建，需要过一个周期才能添加样式。
						$('.prepareFilling').each(function(){
							if(this.innerHTML == '装车完成'){
								$(this).css({'background-color':'#c9302c'}).prop({'disabled':'disabled'});
							}
						})
					});
				}).catch(function(err){
					console.log(err);
				})
			},
			sale_dateChange(){
				let date=$('input[type="date"]').val();
				let dayOrNight=$('input[name="dayOrNight"]:checked').val();
				const _this=this;
				this.$http.get('http://localhost:3000/sale_dateInfo',{
					params:{
						Classes:date+dayOrNight
					}
				}).then(function(res){
					if(res.data.length == 0){
						alert('没有这个班次的数据');
					}else{
						_this.$store.state.newSaleInfoArr=res.data;  //将信息数据赋值为根据日期查找到的数组信息显示在页面中
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			fill(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
				let thisInfo=this.query_result[this.nowIndex];
				$('#saleQ_kuming').val(thisInfo.sale_kuwei);
				$('#saleQ_style').val(thisInfo.sale_style);
				$('#saleQ_huowei').val(thisInfo.sale_huowei);
				$('#saleQ_customName').val(thisInfo.custom_name);
				$('#saleQ_carNum').val(thisInfo.car_num);
				$('#saleQ_saleNum').val(thisInfo.sale_num);
				$('#saleQ_otherNum').val(thisInfo.other_num);
				$('#saleQ_trueNum').val(thisInfo.true_num);
				$('#saleQ_pinming').val(thisInfo.sale_pinming);
				$('#saleQ_banci').val(thisInfo.sale_banci);
				$(`input[name='Q_sanpo'][value=${thisInfo.sanpo}]`).prop({checked:"checked"});
				$('#saleQ_remark').val(thisInfo.sale_remark);
			},
			submitChange(){
				const _this=this;
				this.$http.post('http://localhost:3000/saleInfoChange',qs.stringify({
					"_id":_this.query_result[_this.nowIndex]._id,
					"sale_kuwei":$('#saleQ_kuming').val(),
					"sale_style":$('#saleQ_style').val(),
					"sale_huowei":$('#saleQ_huowei').val(),
					"custom_name":$('#saleQ_customName').val(),
					"car_num":$('#saleQ_carNum').val(),
					"sale_num":$('#saleQ_saleNum').val(),
					"other_num":$('#saleQ_otherNum').val(),
					"true_num":$('#saleQ_trueNum').val(),
					"sale_pinming":$('#saleQ_pinming').val(),
					"sale_banci":$('#saleQ_banci').val(),
					"sanpo":$('input[name="Q_sanpo"]:checked').val(),
					"sale_remark":$('#saleQ_remark').val()
				})).then(function(res){
					_this.sale_changeInfo(res.data[0]);
					console.log(res.data);
					$('#saleModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			},
			fillingStatusChange(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
			},
			confirmFilling(ev){
				const _this=this;
				this.$http.get('http://localhost:3000/fillingStatusChange',{
					params:{
						"_id":_this.query_result[_this.nowIndex]._id
					}
				}).then(function(res){
					_this.query_result[_this.nowIndex]['fillingStatus'] = '装车完成';
					$($('.prepareFilling')[_this.nowIndex]).css({'background-color':'#c9302c'}).prop({'disabled':'disabled'});
				}).catch(function(err){
					console.log(err);
					return;
				})
				$('#fillingModal').modal('hide');
			}
		}
	}
</script>
<style lang='scss' scoped>
	.prepareFilling{
		color: #fff;
		background-color: #00a65a;
	}

</style>