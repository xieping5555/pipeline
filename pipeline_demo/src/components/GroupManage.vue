<template>
	<div id="groupmanage">
		<table class="table table-striped">
			<caption>
				<div class="col-md-2 col-md-offset-8">
					<select id="classesSelectArea" class="form-control" @change='getCurrentClasses'>
						<option v-for='ban in truckBanArr'>{{ban}}</option>
					</select>
				</div>
				<div>
					<button class="btn btn-primary" data-toggle='modal' data-target='#groupManageAddModal'>新增</button>
					<button class="btn btn-warning" data-toggle='modal' data-target='#groupManageChangeModal' @click.prevent='groupValueFill'>修改</button>
					<button class="btn btn-danger" data-toggle='modal' data-target='#groupManageDeleteModal'>删除</button>
				</div>
			</caption>
			<thead>
				<tr>
					<td>选择</td>
					<td>组名</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='group in a'>
					<td><input type="checkbox"></td>
					<td>{{group}}</td>
				</tr>
			</tbody>
		</table>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="groupManageAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入组名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="groupAddInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='groupAdd'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="groupManageChangeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入组名</h4>
		            </div>
		            <div class="modal-body">
		            	<input type="text" class="form-control" id="groupChangeInput">
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='groupChange'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<!-- /.modal -->
		<div class="modal fade" id="groupManageDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">警告</h4>
		            </div>
		            <div class="modal-body">
		            	<h4>确定删除此组？</h4>	
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-danger" @click.prevent='groupDelete'>删除</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</div>
</template>
<script type='text/javascript'>
	import qs from 'qs';
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return{
				currentClasses:'',
				a:[]
			}
		},
		computed:{
			...mapState([
				"truckGroup",
				"truckBanArr"
			])
		},
		mounted(){
			this.currentClasses=this.truckBanArr[0];
			this.getCurrentGroup();
		},
		methods:{
			getCurrentClasses(){
				this.currentClasses=$('#classesSelectArea').val();
				this.getCurrentGroup();
			},
			getCurrentGroup(){
				this.a=this.truckGroup[this.currentClasses];
			},
			groupAdd(){
				const _this=this;
				let currentClasses=$('#classesSelectArea').val(),
					groupValue=$('#groupAddInput').val();
				this.$http.get('http://localhost:3000/groupAdd',{
					params:{
						currentClasses:currentClasses,
						groupValue:groupValue
					}
				}).then(function(res){
					_this.truckGroup[_this.currentClasses].push(groupValue);
					_this.getCurrentGroup();
					$('#groupManageAddModal').modal('hide');
					$("#groupAddInput").val('');
				}).catch(function(err){
					console.log(err);
				})
			},
			groupValueFill(){
				let groupValue=$('input[type="checkbox"]:checked').parent().next().text();
				$('#groupChangeInput').val(groupValue);
			},
			groupChange(){
				const _this=this;
				let groupOldValue=$('input[type="checkbox"]:checked').parent().next().text(),
					currentClasses=this.currentClasses,
					groupChangeValue=$('#groupChangeInput').val();
				this.$http.get('http://localhost:3000/groupChange',{
					params:{
						currentClasses:currentClasses,
						groupOldValue:groupOldValue,
						groupChangeValue:groupChangeValue
					}
				}).then(function(res){
					_this.truckGroup[_this.currentClasses].forEach(function(item,index,array){
						if(item == groupOldValue){
							_this.truckGroup[_this.currentClasses].splice(index,1,groupChangeValue);
							_this.getCurrentGroup();
						}
					})
					$('#groupManageChangeModal').modal('hide');
				}).catch(function(err){
					console.log(err);
					return;
				})
			},
			groupDelete(){
				const _this=this;
				let groupValue=$('input[type="checkbox"]:checked').parent().next().text(),
					currentClasses=this.currentClasses;
				this.$http.get('http://localhost:3000/groupDelete',{
					params:{
						groupValue:groupValue,
						currentClasses:currentClasses
					}
				}).then(function(res){
					_this.truckGroup[_this.currentClasses].forEach(function(item,index,array){
						if(item == groupValue){
							_this.truckGroup[_this.currentClasses].splice(index,1);
						}
						_this.getCurrentGroup();
					})
					$('#groupManageDeleteModal').modal('hide');
				}).catch(function(err){
					console.log(err);
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	
</style>