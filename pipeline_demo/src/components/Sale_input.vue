<template>
	<div id="sale_input">
			<form class="form-horizontal" role='form'>
				<div class="form-group" >
					<label for="sale_kuwei" class="col-md-2 text-right">库位</label>
					<div class="col-md-5">
						<select name="out_kuwei" id="sale_kuwei" class="form-control" @change='sale_kuwei'>
							<option>站台一库</option>
							<option>站台二库</option>
							<option>4号库</option>
							<option>曲4场库</option>
							<option>604库</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="sale_style" class="col-md-2 text-right">发货方式</label>
					<div class="col-md-5">
						<select name="sale_style" id="sale_style" class="form-control">
							<option>装汽车</option>
							<option>装火车</option>
							<option>装船</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="sale_huowei" class="col-md-2 text-right">货位</label>
					<div class="col-md-5">
						<select name="sale_huowei" id="sale_huowei" class="form-control">
							<option v-for='cang in sale_huowei'>{{cang}}</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="custom_name" class="col-md-2 text-right">客户名称</label>
					<div class="col-md-5">
						<input type="text" id="custom_name" class='form-control' v-model='customNameVal' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写客户名称' wrapper='sale_hinta'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="car_num" class="col-md-2 text-right">车号</label>
					<div class="col-md-5">
						<input type="text" id="car_num" class="form-control" v-model='carNumVal' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写车号' wrapper='sale_hintb'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="sale_num" class="col-md-2 text-right">销售单号</label>
					<div class="col-md-5">
						<input type="text" id="sale_num" class="form-control" v-model='saleNumVal' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写销售单号' wrapper='sale_hintc'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="other_num" class="col-md-2 text-right">定单号</label>
					<div class="col-md-5">
						<input type="text" id="other_num" class="form-control" v-model='otherNumVal' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写定单号' wrapper='sale_hintd'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="true_num" class="col-md-2 text-right">实发件数</label>
					<div class="col-md-5">
						<input type="text" id="true_num" class="form-control" v-model='trueNumVal' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写实发件数' wrapper='sale_hinte'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="pieceWeight" class="col-md-2 text-right">件重</label>
					<div class="col-md-5">
						<input type="text" id="pieceWeight" class="form-control" v-model='pieceWeightValue' v-saleHidden/>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写件重' wrapper='sale_hintf' ></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="sale_pinming" class="col-md-2 text-right">品名</label>
					<div class="col-md-5">
						<select name="sale_pinming" id="sale_pinming" class="form-control">
							<option v-for='material in materialArr'>{{material}}</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="sale_banci" class="col-md-2 text-right">班次</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="sale_banci" v-model='Classes' v-saleHidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写班次' wrapper='sale_hintg'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="sanpo" class="col-md-2 text-right">散粕</label>
					<div class="col-md-5"> 
						<input type="radio" name="sanpo" id="yes" value="是">是
						<input type="radio" name="sanpo" id="false" value="否" style="margin-left:30px;" checked>否
					</div>
				</div>
				<div class="form-group">
					<label for="sale_remark" class="col-md-2 text-right">备注</label>
					<div class="col-md-5">
						<textarea name="sale_remark" id="sale_remark" cols="30" rows="3" class="form-control"></textarea>
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-offset-2 col-md-5">
						<button class="btn btn-primary btn-sm" @click.prevent='sale_submit'>提交</button>
						<!-- <button class="btn btn-warning btn-sm">重置</button> -->
					</div>
				</div>
			</form>
			<Popover></Popover>
	</div>
</template>
<script>
	import qs from 'qs';
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	import Popover from "./Popover.vue";
	import Hint from "./Hint.vue";
	export default{
		data(){
			return {
				"sale_currentKu":'站台一库',
				customNameVal:'',
				carNumVal:'',
				saleNumVal:'',
				otherNumVal:'',
				trueNumVal:'',
				pieceWeightValue:'',
				salePinmingVal:''
			}
		},
		components:{
			"Hint":Hint,
			"Popover":Popover
		},
		directives:{
			saleHidden(el,binding){
				if(el.value !== ''){
					$(el).removeClass('highlight');	
					$(el).parent().next().children().children().hide();
				}
			}
		},
		computed:{
			...mapState([
				"a",
				"b",
				"c",
				"d",
				"e",
				"kuweiArr",
				"materialArr",
				"Classes"
			]),
			sale_huowei(){
				return this.kuweiArr[this.sale_currentKu];
			}
		},
		methods:{
			...mapMutations([
				"saleAInfo"
			]),
			sale_submit(){
				//表单验证区域
				let customName = $('#custom_name').val() !== ''?true:false;
				let carNum=$('#car_num').val() !== ''?true:false;
				let saleNum=$("#sale_num").val() !==''?true:false;
				let otherNum=$('#other_num').val() !== ''?true:false;
				let trueNum=$('#true_num').val() !=='' && $("#true_num").val().search(/\D/) == -1 ?true:false;
				let pieceWeight=$('#pieceWeight').val() !== '' && $("#pieceWeight").val().search(/\D/) == -1 ?true:false;
				let saleBanci=$('#sale_banci').val() !==''?true:false;
				if(customName && carNum && saleNum && otherNum && trueNum && pieceWeight && saleBanci){
					const _this=this;
					this.$http.post('http://localhost:3000/sale_submit',qs.stringify({
						"sale_kuwei":$('#sale_kuwei').val(),
						"sale_style":$('#sale_style').val(),
						"sale_huowei":$('#sale_huowei').val(),
						"custom_name":$('#custom_name').val(),
						"car_num":$('#car_num').val(),
						"sale_num":$('#sale_num').val(),
						"other_num":$('#other_num').val(),
						"true_num":$('#true_num').val(),
						"pieceWeight":$('#pieceWeight').val(),
						"sale_pinming":$('#sale_pinming').val(),
						"sale_banci":$('#sale_banci').val(),
						"sanpo":$('input[name="sanpo"]:checked').val(),
						"sale_remark":$('#sale_remark').val() 
					})).then(function(res){
						Popover.methods.show();
						_this.saleAInfo(res.data[0]);
						const arr=[_this.a,_this.b,_this.c,_this.d,_this.e];
						let sale_kuwei=res.data[0].sale_kuwei;  //库位
						let sale_huowei=res.data[0].sale_huowei; //货位
						let true_num=res.data[0].true_num; //数量
						let sale_pinming=res.data[0].sale_pinming;  //品名
						//根据库位得到库位对象
						let saleKuweiObj=_this.getSaleKuweiObj(sale_kuwei);
						arr.forEach(function(item,index,array){
							if(item.name == sale_kuwei){
								item.W_out(saleKuweiObj,sale_huowei,true_num,sale_pinming);
							}
						});
						_this.$http.get('http://localhost:3000/decrease',{
							params:{
								kuming:sale_kuwei,
								cangming:sale_huowei,
								huoming:sale_pinming,
								mount:true_num
							}
						}).then(function(res){
							return;
						}).catch(function(err){
							console.log(err);
						})
					}).catch(function(err){
						console.log(err);
					})
				}else{
					if(!customName){
						$('#custom_name').addClass('highlight');
						this.$children[0].show();
					};
					if(!carNum){
						$('#car_num').addClass('highlight');
						this.$children[1].show();
					};
					if(!saleNum){
						$('#sale_num').addClass('highlight');
						this.$children[2].show();
					};
					if(!otherNum){
						$('#other_num').addClass('highlight');
						this.$children[3].show();
					};
					if(!trueNum){
						$('#true_num').addClass('highlight');
						this.$children[4].show();
					};
					if(!pieceWeight){
						$('#pieceWeight').addClass('highlight');
						this.$children[5].show();
					}
					if(!saleBanci){
						$('#sale_banci').addClass('highlight');
						this.$children[6].show();
					};
				}
			},
			sale_kuwei(){
				this.sale_currentKu=$('#sale_kuwei').val();
			},
			getSaleKuweiObj(saleKuwei_name){     //取得货位对象
				var a={};
				switch (saleKuwei_name){
					case '站台一库':
						a =this.a
						break;
					case '站台二库':
						a=this.b
						break;
					case '4号库':
						a=this.c
						break;
					case '曲4场库':
						a=this.d
						break;
					case '604库':
						a=this.e
						break;
				}
				return a;
			}
		}
	}
</script>
<style scoped lang='scss'>

</style>