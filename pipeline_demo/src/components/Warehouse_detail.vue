<template>
	<div id="warehouse_detail">
		<table class="table table-bordered table-hover table-striped" id="warehouseDate">
			<caption class="text-center no-print">
				<div class="row">
					<div class="col-md-1  col-md-offset-5">
						<Print target='warehouseDate'></Print>
					</div>
					<div class="col-md-1">
						<ExportEXCEL tableId='warehouseDate' filename='入库表'></ExportEXCEL>
					</div>
					<div class="col-md-2">
						<input type="text" class="form-control" placeholder="请输入查询关键字" v-model='queryString' id="query" >
					</div>
					<div class="col-md-2">
			             <input type="date" class="form-control" @change='dateChange'>
					</div>
					<div class="col-md-1" style="margin-top:8px;">
						<input type="radio" name="dayOrNight" id="day" value="白班">白班
			             <input type="radio" name="dayOrNight" id="night" value="夜班">夜班
					</div>
				</div>
			</caption>
			<thead>
				<tr>
					<th class="text-center">库名</th>
					<th class="text-center">入库方式</th>
					<th class="text-center">仓号</th>
					<th class="text-center">品名</th>
					<th class="text-center">数量</th>
					<th class="text-center">件重</th>
					<th class="text-center">重量</th>
					<th class="text-center">入库时间</th>
					<th class="text-center">班次</th>
					<th class="text-center">备注</th>
					<th class="text-center no-print noExl">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="putInfo in query_result">
					<td class="text-center">{{putInfo.warehouse_name}}</td>
					<td class="text-center">{{putInfo.putstyle}}</td>
					<td class="text-center">{{putInfo.freight_house}}</td>
					<td class="text-center">{{putInfo.goods_name}}</td>
					<td class="text-center">{{putInfo.mount}}</td>
					<td class="text-center">{{putInfo.piece_weight}}</td>
					<td class="text-center">{{putInfo.weight}}</td>
					<td class="text-center">{{putInfo.put_time}}</td>
					<td class="text-center">{{putInfo.group}}</td>
					<td class="text-center">{{putInfo.remark}}</td>
					<td class="noExl text-center no-print ">
						<button class="btn btn-primary btn-xs"  data-toggle="modal" data-target="#putModal" @click='b'>修改</button>
						<!-- <button class="btn btn-danger btn-xs" @click='deleteInfo'>删除</button> -->
					</td>
				</tr>
				<tr>
					<td colspan="11" class="text-center text-muted noExl" v-show='query_result.length==0'>暂无信息...</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="putModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
							<label for="kuming" class="col-md-2 text-right">库名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="kuming">
							</div>
						</div>
						<div class="form-group">
							<label for="cangming" class="col-md-2 text-right">仓名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="cangming">
							</div>
						</div>
						<div class="form-group">
							<label for="pingming" class="col-md-2 text-right">品名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="pingming">
							</div>
						</div>
						<div class="form-group">
							<label for="shuliang" class="col-md-2 text-right" >数量</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="shuliang" v-model='shuliang'>
							</div>
						</div>
						<div class="form-group">
							<label for="jianzhong" class="col-md-2 text-right">件重</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="jianzhong" v-model='jianzhong'>
							</div>
						</div>
						<div class="form-group">
							<label for="zhongliang" class="col-md-2 text-right">重量</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="zhongliang" v-model='zhongliang'>
							</div>
						</div>
						<div class="form-group">
							<label for="shijian" class="col-md-2 text-right">入库时间</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="shijian">
							</div>
						</div>
						<div class="form-group">
							<label for="banci" class="col-md-2 text-right">班次</label>
							<div class="col-md-6"> 
								<input type="text" class="form-control input-sm" id="banci">
							</div>
						</div>
						<div class="form-group">
							<label for="beizhu" class="col-md-2 text-right">备注</label>
							<div class="col-md-8">
								<textarea name="beizhu" id="beizhu"  rows="4"  class="form-control input-sm"></textarea>
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
	</div>
</template>
<script>
import qs from 'qs';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default{
		data(){
			return {
				putInfoArr:[],
				nowIndex:-1,
				queryString:'',
				'shuliang':'',
				'jianzhong':''
			}
		},
		computed:{
			...mapState([
				'newPutInfoArr',
				"Classes"
			]),
			zhongliang(){
				if(this.shuliang == '' || this.jianzhong == ''){
					return '';
				}else{
					return this.shuliang*this.jianzhong;
				}
			},
			query_result:function(){
				if(this.queryString == ''){
					return this.newPutInfoArr;
				}else{
					const arr=[];
					const _this=this;
					this.newPutInfoArr.forEach(function(item,index,array){
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
			this.showPutInfo();
		},
		methods:{
			...mapMutations([
				"changeInfo",
				"delete_Info"
			]),
			showPutInfo(){
				const _this=this;
				this.$http.get('http://localhost:3000/showPutInfo',{
					params:{
						"Classes":_this.Classes
					}
				}).then(function(res){
					_this.putInfoArr=res.data;
					_this.$store.state.newPutInfoArr=_this.putInfoArr;					
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			b(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
				var thisInfo=this.query_result[this.nowIndex];
				$('#kuming').val(thisInfo.warehouse_name);
				$('#cangming').val(thisInfo.freight_house);
				$('#pingming').val(thisInfo.goods_name);
				$('#shuliang').val(thisInfo.mount);
				$('#jianzhong').val(thisInfo.piece_weight);
				$('#zhongliang').val(thisInfo.weight);
				$('#shijian').val(thisInfo.put_time);
				$('#banci').val(thisInfo.group);
				$('#beizhu').val(thisInfo.remark);
			},
			submitChange(){
				const _this=this;
				this.$http.post('http://localhost:3000/submitChange',qs.stringify({
					"_id":_this.query_result[_this.nowIndex]._id,
					"warehouse_name":$('#kuming').val(),
					"freight_house":$('#cangming').val(),
					"goods_name":$('#pingming').val(),
					"mount":$('#shuliang').val(),
					"piece_weight":$('#jianzhong').val(),
					"weight":$('#zhongliang').val(),
					"put_time":$('#shijian').val(),
					"group":$('#banci').val(),
					"remark":$('#beizhu').val()
				})).then(function(res){
					//执行修改信息的方法。
					_this.changeInfo(res.data);
					$('#putModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			},
			deleteInfo(ev){
				const _this=this;
				this.nowIndex=$(ev.target).parent().parent().index();
				let _id=this.query_result[this.nowIndex]._id;
				this.$http.get('http://localhost:3000/deleteInfo?_id='+_id).then(function(res){
					_this.delete_Info(_id);  //删除一条信息
				}).catch(function(err){
					console.log(err);
				})
			},
			dateChange(){
				let date=$('input[type="date"]').val();
				let dayOrNight=$('input[name="dayOrNight"]:checked').val();
				const _this=this;
				this.$http.get('http://localhost:3000/warehouse_dateInfo',{
					params:{
						Classes:date+dayOrNight
					}
				}).then(function(res){
					if(res.data.length == 0){
						alert('没有这个班次的数据');
					}else{
						_this.$store.state.newPutInfoArr=res.data;  //将信息数据赋值为根据日期查找到的数组信息显示在页面中
					}
				}).catch(function(err){
					console.log(err);
				})
			}
		}
	}
</script>
<style>
	.title{
		margin-top:10px ;
		font-size: 18px;
	}
	thead tr th{
		font-weight: 500;
	}
	tbody tr th{
		font-weight:400;
	}
</style>