<template>
	<div id="classesmanage">
		<table class="table table-striped">
			<caption>
				<div class="col-md-offset-10">
					<button class="btn btn-primary" data-toggle='modal' data-target='#classesManageAddModal'>新增</button>
					<button class="btn btn-warning" data-toggle='modal' data-target='#classesManageChangeModal' @click.prevent='classesValueFill'>修改</button>
					<button class="btn btn-danger" data-toggle='modal' data-target='#classesManageDeleteModal'>删除</button>
				</div>
			</caption>
			<thead>
				<tr>
					<td>选择</td>
					<td>班次</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='classes in truckBanArr'>
					<td><input type="checkbox"></td>
					<td>{{classes}}</td>
				</tr>
			</tbody>
		</table>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="classesManageAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入班次名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="classesAddInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='classesAdd'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="classesManageChangeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请修改班次名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="classesChangeInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='classesChange'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="classesManageDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请修改班次名</h4>
		            </div>
		            <div class="modal-body">
		            	<h4>确认删除此班次？</h4>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-danger" @click.prevent='classesDelete'>删除</button>
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
				"truckBanArr"
			])
		},
		methods:{
			classesAdd(){
				const _this=this;
				let classesValue=$('#classesAddInput').val();
				this.$http.get('http://localhost:3000/classesAdd',{
					params:{
						classesValue:classesValue
					}
				}).then(function(res){
					_this.truckBanArr.push(classesValue);
					$('#classesManageAddModal').modal('hide');
					$('#classesAddInput').val('');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			classesValueFill(){
				let classesValue=$('input[type="checkbox"]:checked').parent().next().text();
				$('#classesChangeInput').val(classesValue);
			},
			classesChange(){
				const _this=this;
				let classesOldValue=$('input[type="checkbox"]:checked').parent().next().text(),
					classesValue=$('#classesChangeInput').val();
				this.$http.get('http://localhost:3000/classesChange',{
					params:{
						classesOldValue:classesOldValue,
						classesValue:classesValue
					}
				}).then(function(res){
					_this.truckBanArr.forEach(function(item,index,array){
						if(item == classesOldValue){
							_this.truckBanArr.splice(index,1,classesValue);
						}
					})
					$('#classesManageChangeModal').modal('hide');
					$('#classesChangeInput').val('');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			classesDelete(){
				const _this=this;
				let classesValue=$('input[type="checkbox"]:checked').parent().next().text();
				this.$http.get('http://localhost:3000/classesDelete',{
					params:{
						classesValue:classesValue
					}
				}).then(function(res){
					_this.truckBanArr.forEach(function(item,index,array){
						if(item == classesValue){
							_this.truckBanArr.splice(index,1);
						}
					});
					$('#classesManageDeleteModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			}
		}
	}
</script>
<style scoped lang='scss'>
	
</style>