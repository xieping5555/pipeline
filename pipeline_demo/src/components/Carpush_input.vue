<template>
	<div id="carpush_input">
		<form action="" class="form-horizontal">
			<div class="form-group">
				<label for="periods" class="text-right col-md-2">期数</label>
				<div class="col-md-5">
					<input type="radio" name="periods" id="one_periods" value="一期" checked>一期兑车
					<input type="radio" name="periods" id="two_periods" value="二期">二期兑车
				</div>
			</div>
			<div class="form-group">
				<label for="truck_pinming" class="col-md-2 text-right">品名</label>
				<div class="col-md-5">
					<select name="truck_pinming" id="truck_pinming" class="form-control">
						<option v-for='material in materialArr'>{{material}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_custom" class="col-md-2 text-right">客户名称</label>
				<div class="col-md-5">
					<input type="text" class="form-control" id="truck_custom" v-model='truck_customVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入客户名' wrapper='carpush_hintb'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_methods" class="col-md-2 text-right">兑车方式</label>
				<div class="col-md-5">
					<select name="truck_methods" id="truck_methods" class="form-control">
						<option selected>汽车</option>
						<option>火车</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_car" class="col-md-2 text-right">车号</label>
				<div class="col-md-5">
					<input type="text" id="truck_car" class="form-control" v-model='truck_carVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入车号' wrapper='carpush_hintc'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_salenum" class="col-md-2 text-right">销售单号</label>
				<div class="col-md-5">
					<input type="text" id="truck_salenum" class="form-control" v-model='truck_salenumVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入销售单号' wrapper='carpush_hintd'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_ordernum" class="col-md-2 text-right">定单号</label>
				<div class="col-md-5">
					<input type="text" id="truck_ordernum" class="form-control" v-model='truck_ordernumVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入定单号' wrapper='carpush_hinte'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_truenum" class="col-md-2 text-right">实发件数</label>
				<div class="col-md-5">
					<input type="text" id="truck_truenum" class="form-control" v-model='truck_truenumVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入实发件数' wrapper='carpush_hintf'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_pieceWeight" class="col-md-2 text-right" >件重</label>
				<div class="col-md-5">
					<input type="text" id="truck_pieceWeight" class="form-control" v-model='truck_pieceWeightVal' v-hidden/>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入件重' wrapper='carpush_hintg'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_weight" class="col-md-2 text-right" >磅重</label>
				<div class="col-md-5">
					<input type="text" id="truck_weight" class="form-control" v-model='truck_weightVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入磅重' wrapper='carpush_hinth'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_time" class="col-md-2 text-right">作业时间</label>
				<div class="col-md-5">
					<input type="text" id="truck_time" class="form-control" v-model='truck_timeVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请输入作业时间' wrapper='carpush_hinti'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_people" class="col-md-2 text-right">作业班组</label>
				<div class="col-md-1">
					<!-- <input type="text" id="truck_people" class="form-control" v-model='truck_peopleVal' v-hidden> -->
					<select id="truckBan" class="form-control" @change='truckBanChange'>
						<option v-for='truckBan in truckBanArr'>{{truckBan}}</option>
					</select>
				</div>
				<div class="col-md-2">
					<select id="truckZu" class="form-control">
						<option v-for='zu in currentZu'>{{zu}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="truck_remark" class="col-md-2 text-right">备注</label>
				<div class="col-md-5">
					<textarea name="truck_remark" id="truck_remark" cols="30" rows="3" class="form-control"></textarea>
				</div>
			</div>
			<div class="form-group">
					<div class="col-md-offset-2 col-md-5">
						<button class="btn btn-primary btn-sm" @click.prevent='truck_submit'>提交</button>
						<!-- <button class="btn btn-warning btn-sm">重置</button> -->
					</div>
				</div>
		</form>
		<Popover></Popover>
	</div>
</template>
<script>
import qs from 'qs';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import Hint from "./Hint.vue";
import Popover from "./Popover.vue";
	export default{
		data(){
			return{
				truck_pinmingVal:'',
				truck_customVal:'',
				truck_carVal:'',
				truck_salenumVal:'',
				truck_ordernumVal:'',
				truck_truenumVal:'',
				truck_weightVal:'',
				truck_pieceWeightVal:'',
				truck_timeVal:'',
				truck_peopleVal:'',
				currentBan:'一班'
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
		computed:{
			...mapState([
				"materialArr",
				"Classes",
				"truckGroup",
				"truckBanArr"
			]),
			currentZu(){
				return this.truckGroup[this.currentBan];
			}
		},
		methods:{
			...mapMutations([
				"TruckAInfo"
			]),
			truck_submit(){
				//表单验证区域
				let truckCustomName=$('#truck_custom').val() !== ''?true:false;
				let truckCar=$('#truck_car').val() !== ''?true:false;
				let truckSaleNum=$('#truck_salenum').val() !==''?true:false;
				let truckOrderNum=$('#truck_ordernum').val() !==''?true:false;
				let truckTrueNum=$('#truck_truenum').val() !=='' && $('#truck_truenum').val().search(/\D/) ==-1?true:false;
				let truckWeight=$('#truck_weight').val() !== '' && $('#truck_weight').val().search(/\D/) ==-1?true:false;
				let truck_pieceWeight=$('#truck_pieceWeight').val() !== '' && $('#truck_pieceWeight').val().search(/\D/) ==-1?true:false;
				let truckTime=$('#truck_time').val() !== ''?true:false;
				if(truckCustomName && truckCar && truckSaleNum && truckOrderNum && truckTrueNum && truckWeight && truck_pieceWeight){
					const _this=this;
					this.$http.post('http://localhost:3000/carpush_data',qs.stringify({
						"periods":$('input[name="periods"]:checked').val(),
						"truck_pinming":$('#truck_pinming').val(),
						"truck_custom":$('#truck_custom').val(),
						"truck_methods":$('#truck_methods').val(),
						"truck_car":$('#truck_car').val(),
						"truck_salenum":$('#truck_salenum').val(),
						"truck_ordernum":$('#truck_ordernum').val(),
						"truck_truenum":$('#truck_truenum').val(),
						"truck_pieceWeight":$('#truck_pieceWeight').val(),
						"truck_weight":$('#truck_weight').val(),
						"truck_time":$('#truck_time').val(),
						"truck_people":$('#truckZu').val(),
						"truck_remark":$('#truck_remark').val(),
						"Classes":_this.Classes
					})).then(function(res){
						Popover.methods.show();
						_this.TruckAInfo(res.data[0]);
					}).catch(function(err){
						console.log(err);
					})
				}else{
					if(!truckCustomName){
						$('#truck_custom').addClass('highlight');
						this.$children[0].show();
					};
					if(!truckCar){
						$('#truck_car').addClass('highlight');
						this.$children[1].show();
					};
					if(!truckSaleNum){
						$('#truck_salenum').addClass('highlight');
						this.$children[2].show();
					};
					if(!truckOrderNum){
						$('#truck_ordernum').addClass('highlight');
						this.$children[3].show();
					};
					if(!truckTrueNum){
						$('#truck_truenum').addClass('highlight');
						this.$children[4].show();
					};
					if(!truck_pieceWeight){
						$('#truck_pieceWeight').addClass('highlight');
						this.$children[5].show();
					}
					if(!truckWeight){
						$('#truck_weight').addClass('highlight');
						this.$children[6].show();
					};
					if(!truckTime){
						$('#truck_time').addClass('highlight');
						this.$children[7].show();
					};
				}
			},
			truckBanChange(){
				this.currentBan=$('#truckBan').val();
			}
		}
	}
</script>
<style>
	#two_periods{
		margin-left: 30px;
	}
	.highlight{
		border:1px solid rgba(255, 0, 0, 0.74);
	}
</style>