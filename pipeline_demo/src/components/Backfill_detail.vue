<template>
	<div id="backfill_detail">
		<table class="table table-bordered table-hover table-striped" id="backData">
			<caption class="text-center no-print">
					<div class="row">
						<div class="col-md-1  col-md-offset-5">
							<Print target='backData'></Print>
						</div>
						<div class="col-md-1">
							<ExportEXCEL tableId='backData' filename='回填表'></ExportEXCEL>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" placeholder="请输入查询关键字" v-model='back_queryString' id="back_query" >
						</div>
						<div class="col-md-2">
				             <input type="date" class="form-control" @change='back_dateChange'>
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
					<th class="text-center">数量</th>
					<th class="text-center">件重</th>
					<th class="text-center">重量</th>
					<th class="text-center">回填时间</th>
					<th class="text-center">班次</th>
					<th class="text-center">备注</th>
					<th class="text-center no-print">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='backInfo in back_query_result'>
					<td class="text-center">{{backInfo.back_periods}}</td>
					<td class="text-center">{{backInfo.back_pinming}}</td>
					<td class="text-center">{{backInfo.back_mount}}</td>
					<td class="text-center">{{backInfo.back_jianzhong}}</td>
					<td class="text-center">{{backInfo.back_weight}}</td>
					<td class="text-center">{{backInfo.back_time}}</td>
					<td class="text-center">{{backInfo.back_banci}}</td>
					<td class="text-center">{{backInfo.back_remark}}</td>
					<td class="text-center no-print">
						<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#backModal' @click='fill'>修改</button>
						<!-- <button class="btn btn-danger btn-xs">删除</button> -->
					</td>
				</tr>
				<tr >
					<td colspan="9" class="text-center  text-muted" v-show='back_query_result.length==0'>暂无信息...</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="backModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
							<label for="backQ_periods" class="col-md-2 text-right">期数</label>
							<div class="col-md-6">
								<input type="radio" name="backQ_periods" id="backQ_periods_one" value="一期">一期
								<input type="radio" name="backQ_periods" id="backQ_periods_two" value="二期">二期
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_pinming" class="col-md-2 text-right">品名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="backQ_pinming">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_mount" class="col-md-2 text-right">数量</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="backQ_mount">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_jianzhong" class="col-md-2 text-right">件重</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="backQ_jianzhong">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_weight" class="col-md-2 text-right">重量</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="backQ_weight">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_time" class="col-md-2 text-right">回填时间</label>
							<div class="col-md-6"> 
								<input type="text" class="form-control input-sm" id="backQ_time">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_banci" class="col-md-2 text-right">班次</label>
							<div class="col-md-6"> 
								<input type="text" class="form-control input-sm" id="backQ_banci">
							</div>
						</div>
						<div class="form-group">
							<label for="backQ_remark" class="col-md-2 text-right">备注</label>
							<div class="col-md-8">
								<textarea name="backQ_remark" id="backQ_remark"  rows="4"  class="form-control input-sm"></textarea>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" @click='back_submitChange'>
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
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return{
				back_queryString:'',
				nowIndex:-1
			}
		},
		computed:{
			...mapState([
				"newBackInfoArr",
				"Classes"
			]),
			back_query_result(){
				if(this.back_queryString ==''){
					return this.newBackInfoArr;
				}else{
					const arr=[];
					const _this=this;
					this.newBackInfoArr.forEach(function(item,index,array){
						for (let props in item){
							if(props == '_id'){
								continue;
							};
							let props_string=item[props].toString();
							if(props_string.search(_this.back_queryString) !=-1){
								arr.push(item);
								break;
							}
						}
					})
					return arr;
				}
			}
		},
		mounted(){
			this.showBackInfo();
		},
		methods:{
			...mapMutations([
				"back_changeInfo"
			]),
			showBackInfo(){
				const _this=this;
				this.$http.get('http://localhost:3000/showBackInfo',{
					params:{
						"Classes":_this.Classes
					}
				}).then(function(res){
					_this.$store.state.newBackInfoArr=res.data;
				}).catch(function(err){
					console.log(err);
				})
			},
			back_dateChange(){
				let date=$('input[type="date"]').val();
				let dayOrNight=$('input[name="dayOrNight"]:checked').val();
				const _this=this;
				this.$http.get('http://localhost:3000/back_dateInfo',{
					params:{
						Classes:date+dayOrNight
					}
				}).then(function(res){
					if(res.data.length == 0){
						alert('没有这个班次的数据');
					}else{
						_this.$store.state.newBackInfoArr=res.data;  //将信息数据赋值为根据日期查找到的数组信息显示在页面中
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			fill(ev){
				console.log(this.newBackInfoArr);
				this.nowIndex=$(ev.target).parent().parent().index();
				var thisInfo=this.newBackInfoArr[this.nowIndex];
				$(`input[name='backQ_periods'][value=${thisInfo.back_periods}]`).prop({checked:"checked"});
				$("#backQ_pinming").val(thisInfo.back_pinming);
				$('#backQ_mount').val(thisInfo.back_mount);
				$('#backQ_jianzhong').val(thisInfo.back_jianzhong);
				$('#backQ_weight').val(thisInfo.back_weight);
				$('#backQ_time').val(thisInfo.back_time);
				$('#backQ_banci').val(thisInfo.back_banci);
				$('#backQ_remark').val(thisInfo.back_remark)
			},
			back_submitChange(){
				const _this=this;
				this.$http.post('http://localhost:3000/backInfoChange',qs.stringify({
					"_id":_this.newBackInfoArr[_this.nowIndex]._id,
					"back_periods":$('input[name="backQ_periods"]:checked').val(),
					"back_pinming":$("#backQ_pinming").val(),
					"back_mount":$('#backQ_mount').val(),
					"back_jianzhong":$('#backQ_jianzhong').val(),
					"back_weight":$('#backQ_weight').val(),
					"back_time":$('#backQ_time').val(),
					"back_banci":$('#backQ_banci').val(),
					"back_remark":$('#backQ_remark').val()
				})).then(function(res){
					_this.back_changeInfo(res.data);
					$('#backModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			}
		}
	}
</script>
<style>
	
</style>