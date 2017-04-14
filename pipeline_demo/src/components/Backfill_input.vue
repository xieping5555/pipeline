<template>
	<div id="backfill_input">
		<form action="" class="form-horizontal">
			<div class="form-group">
				<label for="back_periods" class="col-md-2 text-right">期数</label>
				<div class="col-md-5">
					<input type="radio" name="huiitan_qi" id="huotianyiqi" value="一期" checked>一期
					<input type="radio" name="huiitan_qi" id="huitianerqi" value='二期'>二期	
				</div>
			</div>
			<div class="form-group">
				<label for="back_pinming" class="col-md-2 text-right">品名</label>
				<div class="col-md-5">
					<select name="back_pinming" id="back_pinming" class="form-control">
						<option v-for='material in materialArr'>{{material}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="back_mount" class="col-md-2 text-right">数量</label>
				<div class="col-md-5">
					<input type="text" id="back_mount" class="form-control" v-model='back_mountVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写数量' wrapper='back_hintb'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="back_jianzhong" class="col-md-2 text-right">件重</label>
				<div class="col-md-5">
					<input type="text" id="back_jianzhong" class="form-control" v-model='back_jianzhongVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写件重' wrapper='back_hintc'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="back_weight" class="col-md-2 text-right">重量</label>
				<div class="col-md-5">
					<input type="text" id="back_weight" class="form-control" v-model='back_weightVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写重量' wrapper='back_hintd'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="back_time" class="col-md-2 text-right">回填时间</label>
				<div class="col-md-5 ">
					<input type="text" id="back_time" class="form-control" v-model='back_timeVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写回填时间' wrapper='back_hinte'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="back_banci" class="col-md-2 text-right">班次</label>
				<div class="col-md-5">
					<input type="text" id="back_banci" class="form-control" v-model='back_banciVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写班次' wrapper='back_hintf'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="back_remark" class="col-md-2 text-right">备注</label>
				<div class="col-md-5">
					<textarea id="back_remark" class="form-control" 
					rows="3" cols="30"></textarea>
				</div>
			</div>
			<div class="form-group">
					<div class="col-md-offset-2 col-md-5">
						<button class="btn btn-primary btn-sm" @click.prevent='back_submit'>提交</button>
						<!-- <button class="btn btn-warning btn-sm">重置</button> -->
					</div>
				</div>
		</form>
		<Popover></Popover>
	</div>
</template>
<script>
import Hint from './Hint.vue';
import Popover from './Popover.vue';
import qs from 'qs';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default{
		data(){
			return{
				back_pinmingVal:'',
				back_mountVal:'',
				back_jianzhongVal:'',
				back_timeVal:'',
				back_banciVal:''
			}
		},
		computed:{
			...mapState([
				"materialArr",
				"Classes"
			]),
			back_weightVal(){
				if(this.back_mountVal == '' || this.back_jianzhongVal == ''){
					return '';
				}else{
					return this.back_mountVal*this.back_jianzhongVal
				}
			}
		},
		components:{
			"Hint":Hint,
			"Popover":Popover
		},
		directives:{
			hidden(el,binding){
				if(el.value !== ''){
					$(el).removeClass('highlight');	
					$(el).parent().next().children().children().hide();
				}
			}
		},
		methods:{
			...mapMutations([
				"BackAInfo"
			]),
			back_submit(){
				//表单验证区域
				let backMount=$('#back_mount').val() !== '' && $('#back_mount').val().search(/\D/) == -1?true:false;
				let backJianzhong=$('#back_jianzhong').val() !== ''?true:false;
				let backWeight=$('#back_weight').val() !=='' ? true:false;
				let backTime=$('#back_time').val() !== ''? true:false;
				let backBanci=$('#back_banci').val() !== ''?true:false;
				if( backMount && backJianzhong && backWeight && backTime && backBanci){
					const _this=this;
					this.$http.post('http://localhost:3000/backData',qs.stringify({
						'back_periods':$('input[name="huiitan_qi"]:checked').val(),
						"back_pinming":$('#back_pinming').val(),
						"back_mount":$('#back_mount').val(),
						"back_jianzhong":$('#back_jianzhong').val(),
						"back_weight":$('#back_mount').val(),
						"back_time":$('#back_time').val(),
						"back_banci":$('#back_banci').val(),
						"back_remark":$('#back_remark').val(),
						"Classes":_this.Classes
					})).then(function(res){
						Popover.methods.show();
						_this.BackAInfo(res.data[0]);
					}).catch(function(err){
						console.log(err);
					})
				}else{
					if(!backMount){
						$('#back_mount').addClass('highlight');
						this.$children[0].show();
					};
					if(!backJianzhong){
						$('#back_jianzhong').addClass('highlight');
						this.$children[1].show();
					};
					if(!backWeight){
						$('#back_weight').addClass('highlight');
						this.$children[2].show();
					};
					if(!backTime){
						$('#back_time').addClass('highlight');
						this.$children[3].show();
					};
					if(!backBanci){
						$('#back_banci').addClass('highlight');
						this.$children[4].show();
					}
				}
			}
		}
	}
</script>
<style>
	#huitianerqi{
		margin-left: 30px;
	}
</style>