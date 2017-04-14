<template>
	<div id="warehousemanage">
		<table class="table table-striped">
			<caption>
				<div class="col-md-offset-10">
					<button class="btn btn-primary" data-toggle='modal' data-target='#warehouseManageAddModal'>新增</button>
					<button class="btn btn-warning" data-toggle='modal' data-target='#warehouseManageChangeModal' @click='warehouseInputFill'>修改</button>
					<button class="btn btn-danger" data-toggle='modal' data-target='#warehouseManageDeleteModal'>删除</button>
				</div>
			</caption>
			<thead>
				<tr>
					<th>选择</th>
					<th>库名</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='ku in kuArr'>
					<td><input type="checkbox"/></td>
					<td>{{ku}}</td>
				</tr>
			</tbody>
		</table>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="warehouseManageAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入库名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="warehouseAddInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='warehouseAdd'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="warehouseManageChangeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请修改库名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="warehouseChangeInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='warehouseChange'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<div class="modal fade" id="warehouseManageDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
		                <button type="button" class="btn btn-danger" @click.prevent='warehouseDelete'>删除</button>
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

			}
		},
		computed:{	
			...mapState([
				"kuArr"
			])
		},
		methods:{
			warehouseAdd(){
				const _this=this;
				this.$http.post('http://localhost:3000/warehouseAdd',qs.stringify({
					warehouseAddInput:$('#warehouseAddInput').val()
				})).then(function(res){
					_this.$store.state.kuArr.push(res.data);
					$('#warehouseManageAddModal').modal('hide');
					$('#warehouseAddInput').val('');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			warehouseInputFill(){
				let warehousename=$('input[type="checkbox"]:checked').parent().next().text();
				$('#warehouseChangeInput').val(warehousename);
			},
			warehouseChange(){
				const _this=this;
				let warehousename=$('input[type="checkbox"]:checked').parent().next().text();
				this.$http.get('http://localhost:3000/warehouseChangeInput',{
					params:{
						warehouseOldValue:warehousename,
						warehouseChangeValue:$('#warehouseChangeInput').val()
					}
				}).then(function(res){
					_this.$store.state.kuArr=_this.kuArr.map(function(item,index,array){
						if(item == warehousename){
							return $('#warehouseChangeInput').val();
						}else{
							return item;
						}
					});
					$('#warehouseManageChangeModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
				//this.$http.get('http://localhost:3000/warehouseChange',)
			},
			warehouseDelete(){
				const _this=this;
				let warehousename=$('input[type="checkbox"]:checked').parent().next().text();
				this.$http.get('http://localhost:3000/warehouseInfoDelete',{
					params:{
						warehousename:warehousename
					}
				}).then(function(res){
					_this.$store.state.kuArr.forEach(function(item,index,array){
						if(item == warehousename){
							_this.$store.state.kuArr.splice(index,1);
						}
					})
					$('#warehouseManageDeleteModal').modal('hide');
				}).catch(function(err){
					console.log(err);
					return;
				});
			}
		}
	}
</script>
<style scoped lang='scss'>
	
</style>