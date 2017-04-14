<template>
	<div class="out_detail">
		<table class="table table-bordered table-hover table-striped" id="outData">
				<caption class="text-center no-print">
					<div class="row">
						<div class="col-md-1  col-md-offset-5">
							<Print target='outData'></Print>
						</div>
						<div class="col-md-1">
							<ExportEXCEL tableId='outData' filename='出库表'></ExportEXCEL>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" placeholder="请输入查询关键字" v-model='queryString' id="query">
						</div>
						<div class="col-md-2">
				             <input type="date" class="form-control" @change='out_dateChange'>
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
					<th class="text-center">出库方式</th>
					<th class="text-center">货位</th>
					<th class="text-center">货物种类</th>
					<th class="text-center">数量</th>
					<th class="text-center">件重</th>
					<th class="text-center">重量</th>
					<th class="text-center">时间</th>
					<th class="text-center">班次</th>
					<th class="text-center">备注</th>
					<th class="text-center no-print">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='outInfo in query_result'>
					<td class="text-center">{{outInfo.out_kuwei}}</td>
					<td class="text-center">{{outInfo.out_style}}</td>
					<td class="text-center">{{outInfo.out_huowei}}</td>
					<td class="text-center">{{outInfo.out_zhonglei}}</td>
					<td class="text-center">{{outInfo.out_num}}</td>
					<td class="text-center">{{outInfo.out_jianzhong}}</td>
					<td class="text-center">{{outInfo.out_zhongliang}}</td>
					<td class="text-center">{{outInfo.out_time}}</td>
					<td class="text-center">{{outInfo.out_banci}}</td>
					<td class="text-center">{{outInfo.out_beizhu}}</td>
					<td class="text-center no-print">
						<button class="btn btn-primary btn-xs" data-target='#outModal' data-toggle='modal' @click='fill'>修改</button>
						<!-- <button class="btn btn-danger btn-xs">删除</button> -->
					</td>
				</tr>
				<tr >
					<td colspan="11" class="text-center  text-muted" v-show='query_result.length==0'>暂无信息...</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="outModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
							<label for="outQ_kuming" class="col-md-2 text-right">库位</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_kuming">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_fangshi" class="col-md-2 text-right">出库方式</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_fangshi">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_cangming" class="col-md-2 text-right">仓名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_cangming">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_pingming" class="col-md-2 text-right">品名</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_pingming">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_shuliang" class="col-md-2 text-right">数量</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_shuliang">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_jianzhong" class="col-md-2 text-right">件重</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_jianzhong">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_shijian" class="col-md-2 text-right">入库时间</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-sm" id="outQ_shijian">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_banci" class="col-md-2 text-right">班次</label>
							<div class="col-md-6"> 
								<input type="text" class="form-control input-sm" id="outQ_banci">
							</div>
						</div>
						<div class="form-group">
							<label for="outQ_beizhu" class="col-md-2 text-right">备注</label>
							<div class="col-md-8">
								<textarea name="outQ_beizhu" id="outQ_beizhu"  rows="4"  class="form-control input-sm"></textarea>
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
			return{
				queryString:'',
				nowIndex:-1,
				out_current:'站台一库'
			}
		},
		computed:{
			...mapState([
				"newOutInfoArr",
				"Classes"
			]),
			query_result(){
				if(this.queryString ==''){
					return this.newOutInfoArr;
				}else{
					const arr=[];
					const _this=this;
					this.newOutInfoArr.forEach(function(item,index,array){
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
			this.showOutInfo();
		},
		methods:{
			...mapMutations([
				"out_changeInfo"
			]),
			showOutInfo(){
				var _this=this;
				this.$http.get('http://localhost:3000/showOutInfo',{
					params:{
						"Classes":_this.Classes
					}
				}).then(function(res){
					_this.$store.state.newOutInfoArr=res.data;
				}).catch(function(err){
					console.log(err);
				})
			},
			fill(ev){
				this.nowIndex=$(ev.target).parent().parent().index();
				var thisInfo=this.newOutInfoArr[this.nowIndex];
				$('#outQ_kuming').val(thisInfo.out_kuwei);
				$('#outQ_fangshi').val(thisInfo.out_style);
				$('#outQ_cangming').val(thisInfo.out_huowei);
				$('#outQ_pingming').val(thisInfo.out_zhonglei);
				$('#outQ_jianzhong').val(thisInfo.out_jianzhong);
				$('#outQ_shijian').val(thisInfo.out_time);
				$('#outQ_banci').val(thisInfo.out_banci);
				$('#outQ_shuliang').val(thisInfo.out_num);
				$('#outQ_beizhu').val(thisInfo.out_beizhu);
			},
			submitChange(){
				const _this=this;
				this.$http.post('http://localhost:3000/outInfoChange',qs.stringify({
					"_id":_this.newOutInfoArr[_this.nowIndex]._id,
					"out_kuwei":$('#outQ_kuming').val(),
					"out_style":$('#outQ_fangshi').val(),
					"out_huowei":$('#outQ_cangming').val(),
					"out_zhonglei":$('#outQ_pingming').val(),
					"out_jianzhong":$('#outQ_jianzhong').val(),
					"out_time":$('#outQ_shijian').val(),
					"out_banci":$('#outQ_banci').val(),
					"out_num":$('#outQ_shuliang').val(),
					"out_beizhu":$('#outQ_beizhu').val()
				})).then(function(res){
					//执行修改信息的方法。
					_this.out_changeInfo(res.data);
					$('#outModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			},
			out_dateChange(){
				let date=$('input[type="date"]').val();
				let dayOrNight=$('input[name="dayOrNight"]:checked').val();
				const _this=this;
				this.$http.get('http://localhost:3000/out_dateInfo',{
					params:{
						Classes:date+dayOrNight
					}
				}).then(function(res){
					console.log(res);
					if(res.data.length == 0){
						alert('没有这个班次的数据');
					}else{
						_this.$store.state.newOutInfoArr=res.data;  //将信息数据赋值为根据日期查找到的数组信息显示在页面中
					}
				}).catch(function(err){
					console.log(err);
				})
			}
		}
	}
</script>