<template>
	<div id="storehousemanage">
		<table class="table table-striped">
			<caption>
				<div class="col-md-2 col-md-offset-8">
					<select id="storehouseSelectArea" class="form-control" @change='getCurrentKu'>
						<option v-for='ku in kuArr'>{{ku}}</option>
					</select>
				</div>
				<div>
					<button class="btn btn-primary" data-toggle='modal' data-target='#storehouseManageAddModal'>新增</button>
					<button class="btn btn-warning" data-toggle='modal' data-target='#storehouseManageChangeModal' @click.prevent='storehouseValueFill'>修改</button>
					<button class="btn btn-danger" data-toggle='modal' data-target='#storehouseManageDeleteModal'>删除</button>
				</div>
			</caption>
			<thead>
				<tr>
					<th>选择</th>
					<th>仓名</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='kuwei in a'>
					<td><input type="checkbox"/></td>
					<td>{{kuwei}}</td>
				</tr>
			</tbody>
		</table>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="storehouseManageAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入仓名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="storehouseAddInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='storehouseAdd'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="storehouseManageChangeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请修改仓名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="storehouseChangeInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='storehouseChange'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<div class="modal fade" id="storehouseManageDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">警告</h4>
		            </div>
		            <div class="modal-body">
		            	<h4>确定删除此库？</h4>	
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-danger" @click.prevent='storehouseDelete'>删除</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</div>
</template>
<script>
	import qs from 'qs';
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return{
				currentKu:'',
				a:[]
			}
		},
		computed:{
			...mapState([
				"kuArr",
				"kuweiArr"
			])
		},
		mounted(){
			this.currentKu=this.kuArr[0];
			this.getCurrentKuwei();
		},
		methods:{
			getCurrentKuwei(){
				this.a=this.kuweiArr[this.currentKu];
			},
			getCurrentKu(){                 //利用调用methods中的方法实现视图更新
				this.currentKu=$('#storehouseSelectArea').val();
				this.getCurrentKuwei();
			},
			storehouseAdd(){
				const _this=this;
				let warehousename=_this.currentKu,
					storehouseName=$('#storehouseAddInput').val();
				this.$http.get('http://localhost:3000/storehouseAdd',{
					params:{
						warehousename:warehousename,
						storehouseName:storehouseName
					}
				}).then(function(res){
					_this.$store.state.kuweiArr[warehousename].push(storehouseName);
					_this.getCurrentKuwei();
					$('#storehouseManageAddModal').modal('hide');
					$('#storehouseAddInput').val('');
				}).catch(function(err){
					console.log(err);
				})
			},
			storehouseValueFill(){
				let storehouseValue=$('input[type="checkbox"]:checked').parent().next().text();
				$('#storehouseChangeInput').val(storehouseValue);
			},
			storehouseChange(){
				const _this=this;
				let storehouseOldValue=$('input[type="checkbox"]:checked').parent().next().text(),
					storehouseChangeValue=$('#storehouseChangeInput').val();
				this.$http.get('http://localhost:3000/storehouseChange',{
					params:{
						warehousename:_this.currentKu,
						storehouseOldValue:storehouseOldValue,
						storehouseChangeValue:storehouseChangeValue
					}
				}).then(function(res){
					_this.kuweiArr[_this.currentKu].forEach(function(item,index,array){
						if(item == storehouseOldValue){
							_this.kuweiArr[_this.currentKu].splice(index,1,storehouseChangeValue);
						}
					});
					_this.getCurrentKuwei();
					$('#storehouseManageChangeModal').modal('hide');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			storehouseDelete(){
				const _this=this;
				let storehouseValue=$('input[type="checkbox"]:checked').parent().next().text(),
					warehousename=_this.currentKu;
				this.$http.get('http://localhost:3000/storehouseDelete',{
					params:{
						storehouseValue:storehouseValue,
						warehousename:warehousename
					}
				}).then(function(res){
					_this.kuweiArr[_this.currentKu].forEach(function(item,index,array){
						if(item == storehouseValue){
							_this.kuweiArr[_this.currentKu].splice(index,1);
						};
					});
					_this.getCurrentKuwei();
					$('#storehouseManageDeleteModal').modal('hide');
				}).catch(function(err){
					console.log(err);
					return;
				})
			}
		}
	}
</script>
<style scoped lang='scss'>
	
</style>