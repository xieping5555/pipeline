<template>
	<div id="materialmanage">
		<table class="table table-striped">
			<caption>
				<div class="col-md-offset-10">
					<button class="btn btn-primary" data-toggle='modal' data-target='#materialManageAddModal'>新增</button>
					<button class="btn btn-warning" data-toggle='modal' data-target='#materialManageChangeModal' @click.prevent='materialValueFill'>修改</button>
					<button class="btn btn-danger" data-toggle='modal' data-target='#materialManageDeleteModal'>删除</button>
				</div>
			</caption>
			<thead>
				<tr>
					<td>选择</td>
					<td>物料名</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='material in materialArr'>
					<td><input type="checkbox"></td>
					<td>{{material}}</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="materialManageAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入物料名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="materialAddInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='materialAdd'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<div class="modal fade" id="materialManageChangeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请修改物料名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="materialChangeInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='materialChange'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<div class="modal fade" id="materialManageDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">警告</h4>
		            </div>
		            <div class="modal-body">
		            	<h4>是否确定删除该物料？</h4>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-danger" @click.prevent='materialDelete'>删除</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return{

			}
		},
		computed:{
			...mapState([
				'materialArr'
			])
		},
		methods:{
			materialAdd(){
				const _this=this;
				let materialName=$('#materialAddInput').val();
				this.$http.get('http://localhost:3000/materialAdd',{
					params:{
						materialName:materialName
					}
				}).then(function(res){
					_this.$store.state.materialArr.push(materialName);
					$('#materialManageAddModal').modal('hide');
					$('#materialAddInput').val('');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			materialValueFill(){
				let materialname=$('input[type="checkbox"]:checked').parent().next().text();
				$('#materialChangeInput').val(materialname);
			},
			materialChange(){
				const _this=this;
				let materialOldValue=$('input[type="checkbox"]:checked').parent().next().text(),
					materialname=$('#materialChangeInput').val();
				this.$http.get('http://localhost:3000/materialChange',{
					params:{
						materialOldValue:materialOldValue,
						materialname:materialname
					}
				}).then(function(res){
					_this.$store.state.materialArr=_this.materialArr.map(function(item,index,array){
						if(item == materialOldValue){
							return materialname
						}else{
							return item;
						}
					})
					$('#materialManageChangeModal').modal('hide');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			materialDelete(){
				const _this=this;
				let materialname=$('input[type="checkbox"]:checked').parent().next().text();
				this.$http.get('http://localhost:3000/materialDelete',{
					params:{
						materialname:materialname
					}
				}).then(function(res){
					_this.$store.state.materialArr.forEach(function(item,index,array){
						if(item == materialname){
							_this.$store.state.materialArr.splice(index,1);
						}
					});
					$('#materialManageDeleteModal').modal('hide');
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