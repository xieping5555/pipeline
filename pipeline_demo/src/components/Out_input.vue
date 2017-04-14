<template>
	<div id="out_input">
			<form action="" role='form' class="form-horizontal">
				<div class="form-group" >
					<label for="out_kuwei" class="col-md-2 text-right">库位</label>
					<div class="col-md-5">
						<select name="out_kuwei" id="out_kuwei" class="form-control" @change='out_kuwei'>
							<option v-for='ku in kuArr'>{{ku}}</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="out_style" class="col-md-2 text-right">出库方式</label>
					<div class="col-md-5">
						<select name="out_style" id="out_style" class="form-control">
							<option>转垛</option>
							<option>回填</option>
						</select>
					</div>
				</div>
				<div class="form-group" v-show='!zhuan_or_hui'>
					<label for="out_huowei" class="col-md-2 text-right">货位</label>
					<div class="col-md-5">
						<select name="out_huowei" id="out_huowei" class="form-control">
							<option v-for='cang in out_huowei'>{{cang}}</option>
						</select>
						<!-- <div id="out_in" v-show="zhuan_or_hui">
							<div class="col-md-5">
								<input type="text" class="form-control" id="out_from" v-model='fromVal' v-double />
							</div>
							<div class="col-md-2">
								<span class="text-center">to</span>
							</div>
							<div class="col-md-5">
								<input type="text" class="form-control" id="out_to" v-model='toVal' v-double/>  
							</div>
						</div>  -->
					</div>
					<div class="col-md-2">
						<Hint msg='请填写货位' wrapper='out_hinta'></Hint>
					</div>
				</div>
				<div class="form-group" v-show='zhuan_or_hui'>
					<label for="out_in" class="col-md-2 text-right">货位</label>
					<div class='col-md-1'>
						<select id="out_kuweiThatNeedOut" class="form-control" @change='out_kuweiThatNeedOut'>
							<option v-for='ku in kuArr'>{{ku}}</option>
						</select>
					</div>
					<div class='col-md-1'>
						<select id="out_huoweiThatNeedOut" class="form-control">
							<option v-for='huowei in out_huoweiThatNeedOut'>{{huowei}}</option>
						</select>
					</div>
					<div class="col-md-1 text-center">
						<p class="arrow">to</p>
					</div>
					<div class='col-md-1'>
						<select id="out_kuweiThatNeedIn" class="form-control" @change='out_kuweiThatNeedIn'>
							<option v-for='ku in kuArr'>{{ku}}</option>
						</select>
					</div>
					<div class='col-md-1'>
						<select id="out_huoweiThatNeedIn" class="form-control">
							<option v-for='huowei in out_huoweiThatNeedIn'>{{huowei}}</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="out_zhonglei" class="col-md-2 text-right">货物种类</label>
					<div class="col-md-5">
						<select name="out_zhonglei" id="out_zhonglei" class="form-control">
							<option v-for='material in materialArr'>{{material}}</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="out_num" class="col-md-2 text-right">数量</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="out_num" v-model='mountVal' v-hidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写数量' wrapper='out_hintc'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="out_jianzhong" class="col-md-2 text-right">件重</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="out_jianzhong" v-model='piece_weightVal' v-hidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写件重' wrapper='out_hintd'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="out_zhongliang" class="col-md-2 text-right">重量</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="out_zhongliang" v-model='weightVal' v-hidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写重量' wrapper='out_hinte'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="out_time" class="col-md-2 text-right">出库时间</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="out_time" v-model='outTimeVal' v-hidden>
					</div>
					<div class="col-md-2">
						<Hint msg='请填写出库时间' wrapper='out_hintf'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="out_banci" class="col-md-2 text-right" >班次</label>
					<div class="col-md-5">
						<input type="text" class="form-control" id="out_banci" v-model='Classes' v-hidden>  
					</div>
					<div class="col-md-2">
						<Hint msg='请填写班次' wrapper='out_hintg'></Hint>
					</div>
				</div>
				<div class="form-group">
					<label for="out_beizhu" class="col-md-2 text-right">备注</label>
					<div class="col-md-5">
						<textarea name="out_beizhu" id="out_beizhu" cols="30" rows="3" class="form-control"></textarea>
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-offset-2 col-md-5">
						<button class="btn btn-primary btn-sm" @click.prevent='out_submit'>提交</button>
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
			return{
				zhuan_or_hui:true,
				out_currentKu:'站台一库',
				out_currentKuThatNeedOut:'站台一库',
				out_currentKuThatNeedIn:'站台一库',
				goodVal:'',
				mountVal:'',
				piece_weightVal:'',   //双向绑定解除警告状态
				outTimeVal:'',
				fromVal:'',
				toVal:''
			}
		},
		components:{
			"Popover":Popover,
			"Hint":Hint
		},
		computed:{
			...mapState([
				"a",
				"b",
				"c",
				"d",
				"e",
				"kuweiArr",
				"kuArr",
				"materialArr",
				"Classes"
			]),
			weightVal(){
				if(this.mountVal == '' && this.piece_weightVal == ''){
					return '';
				}else{
					return this.mountVal*this.piece_weightVal;
				}
			},
			huoweiValue(){
				if(this.zhuan_or_hui){
					var from=$('#out_huoweiThatNeedOut').val();
					var to=$('#out_huoweiThatNeedIn').val();
					return from+'-->'+to
				}else{
					var from=$('#out_huowei').val();
					return from;
				}
			},
			out_huowei(){
				return this.kuweiArr[this.out_currentKu];
			},
			out_huoweiThatNeedOut(){
				return this.kuweiArr[this.out_currentKuThatNeedOut];
			},
			out_huoweiThatNeedIn(){
				return this.kuweiArr[this.out_currentKuThatNeedIn];
			}
		},
		mounted(){
			this.judge();
		},
		directives:{
			hidden(el,binding){
				if(el.value !== ''){
					$(el).removeClass('highlight');	
					$(el).parent().next().children().children().hide();
				}
			},
			double(el,binding){
				if(el.value !==''){
					$(el).removeClass('highlight');	
					$(el).parent().parent().parent().next().children().children().hide();
				}
			}
		},
		methods:{
			...mapMutations([
				"outAInfo"
			]),
			out_submit(){
				//表单验证区域
				let zhongliang=$('#out_zhongliang').val() !== ''?true:false;
				let huowei=$('#out_from').val() !==''&& $('#out_to').val() !== '' ?true:false;
				let quantity=$('#out_num').val() !== '' && $("#out_num").val().search(/\D/) == -1?true:false;
				let piece_weight=$('#out_jianzhong').val() !=='' && $('#out_jianzhong').val().search(/\D/) == -1?true:false;
				let time=$("#out_time").val() !== ''?true:false;
				let banci=$('#out_banci').val() !==''?true:false;
				if(this.zhuan_or_hui){
					if(huowei && quantity && piece_weight && zhongliang && time && banci){
						const _this=this;
						this.$http.post('http://localhost:3000/outData',qs.stringify({
							"out_kuwei":$('#out_kuwei').val(),
							"out_style":$('#out_style').val(),
							"out_huowei":_this.huoweiValue,
							"out_zhonglei":$('#out_zhonglei').val(),
							"out_num":$('#out_num').val(),
							"out_jianzhong":$('#out_jianzhong').val(),
							"out_zhongliang":$('#out_zhongliang').val(),
							"out_time":$('#out_time').val(),
							"out_banci":$('#out_banci').val(),
							"out_beizhu":$('#out_beizhu').val()
						})).then(function(res){
							Popover.methods.show();
							_this.outAInfo(res.data[0]);
							const arr=[_this.a,_this.b,_this.c,_this.d,_this.e];
							let out_kuwei=res.data[0].out_kuwei;  //库位
							let out_huowei=(function(){
								if(res.data[0].out_huowei.search('-->') != -1){
									return res.data[0].out_huowei.split('-->');
								}else{
									return res.data[0].out_huowei;
								}
							})();   // 货位
							let out_num=res.data[0].out_num; //数量
							let out_zhonglei=res.data[0].out_zhonglei; //种类
							let out_style=res.data[0].out_style;  //出库方式
							//取得当前对象的库位对象
							let oOutKuwei_name=_this.getOutKuweiObj(out_kuwei);
							arr.forEach(function(item,index,array){
								if(item.name == out_kuwei){
									if(out_style == '转垛'){
										let outKuwei_goodsToReduce=out_huowei[0].match(/^(.*库)\d+#/)[1];
										let outKuwei_goodsToReduceObj=_this.getOutKuweiObj(outKuwei_goodsToReduce);
										//进货的库位
										let outKuwei_goodsToIncrease=out_huowei[1].match(/^(.*库)\d+#/)[1];
										let outKuwei_goodsToIncreaseObj=_this.getOutKuweiObj(outKuwei_goodsToIncrease);
										//界面中更新数据
										item.W_out(outKuwei_goodsToReduceObj,out_huowei[0],out_num,out_zhonglei,out_huowei[1],outKuwei_goodsToIncreaseObj);
										_this.$http.get('http://localhost:3000/decrease',{
											params:{
												kuming:outKuwei_goodsToReduce,
												cangming:out_huowei[0],
												huoming:out_zhonglei,
												mount:out_num
											}
										}).then(function(res){
											return;
										}).catch(function(err){
											console.log(err);
										});
										_this.$http.get('http://localhost:3000/increase',{
											params:{
												kuming:outKuwei_goodsToIncrease,
												cangming:out_huowei[1],
												huoming:out_zhonglei,
												mount:out_num
											}
										}).then(function(res){
											return;
										}).catch(function(err){
											console.log(err);
										})
									};
								}
							});
						}).catch(function(err){
							console.log(err);
						})
					}else{
						if(!huowei){
							console.log(huowei);
							if($('#out_from').val() == '' && $('#out_to').val() !==''){
								$('#out_from').addClass('highlight');
							};
							if($('#out_from').val() !== '' && $('#out_to').val() ==''){
								$('#out_to').addClass('highlight');
							}
							if($('#out_from').val() === '' && $('#out_to').val() ===''){
								$('#out_to').addClass('highlight');
								$('#out_from').addClass('highlight');
							}
							this.$children[0].show();
						};
						if(!quantity){
							$('#out_num').addClass('highlight');
							this.$children[1].show();
						};
						if(!piece_weight){
							$('#out_jianzhong').addClass('highlight');
							this.$children[2].show();
						};
						if(!zhongliang){
							$('#out_zhongliang').addClass('highlight');
							this.$children[3].show();
						};
						if(!time){
							$('#out_time').addClass('highlight');
							this.$children[4].show();
						};
						if(!banci){
							$('#out_banci').addClass('highlight');
							this.$children[5].show();
						}
					}
				}else{
					if(quantity && piece_weight && zhongliang && time && banci){
						const _this=this;
						this.$http.post('http://localhost:3000/outData',qs.stringify({
							"out_kuwei":$('#out_kuwei').val(),
							"out_style":$('#out_style').val(),
							"out_huowei":_this.huoweiValue,
							"out_zhonglei":$('#out_zhonglei').val(),
							"out_num":$('#out_num').val(),
							"out_jianzhong":$('#out_jianzhong').val(),
							"out_zhongliang":$('#out_zhongliang').val(),
							"out_time":$('#out_time').val(),
							"out_banci":$('#out_banci').val(),
							"out_beizhu":$('#out_beizhu').val()
						})).then(function(res){
							Popover.methods.show();
							_this.outAInfo(res.data[0]);
							const arr=[_this.a,_this.b,_this.c,_this.d,_this.e];
							let out_kuwei=res.data[0].out_kuwei;  //库位
							let out_huowei=(function(){
								if(res.data[0].out_huowei.search('-->') != -1){
									return res.data[0].out_huowei.split('-->');
								}else{
									return res.data[0].out_huowei;
								}
							})();   // 货位
							let out_num=res.data[0].out_num; //数量
							let out_zhonglei=res.data[0].out_zhonglei; //种类
							let out_style=res.data[0].out_style;  //出库方式
							arr.forEach(function(item,index,array){
								if(item.name == out_kuwei){
									let outKuweiObj=_this.getOutKuweiObj(out_kuwei);
									if(out_style == '回填'){
										item.W_out(outKuweiObj,out_huowei,out_num,out_zhonglei);
										_this.$http.get('http://localhost:3000/decrease',{
											params:{
												kuming:out_kuwei,
												cangming:out_huowei,
												huoming:out_zhonglei,
												mount:out_num
											}
										}).then(function(res){
											return;
										}).catch(function(err){
											console.log(err);
										})
									}
								}
							});
						}).catch(function(err){
							console.log(err);
						})
					}else{
						if(!quantity){
							$('#out_num').addClass('highlight');
							this.$children[1].show();
						};
						if(!piece_weight){
							$('#out_jianzhong').addClass('highlight');
							this.$children[2].show();
						};
						if(!zhongliang){
							$('#out_zhongliang').addClass('highlight');
							this.$children[3].show();
						};
						if(!time){
							$('#out_time').addClass('highlight');
							this.$children[4].show();
						};
						if(!banci){
							$('#out_banci').addClass('highlight');
							this.$children[5].show();
						}
					}
				}
			},
			judge(){
				var _this=this;
				$('#out_style').change(function(){
					if($(this).val() == '转垛'){
						_this.zhuan_or_hui = true;
					}else{
						_this.zhuan_or_hui = false;
					}
				});
			},
			out_kuwei(){
				this.out_currentKu=$('#out_kuwei').val();
			},
			out_kuweiThatNeedOut(){
				this.out_currentKuThatNeedOut=$('#out_kuweiThatNeedOut').val();
			},
			out_kuweiThatNeedIn(){
				this.out_currentKuThatNeedIn=$('#out_kuweiThatNeedIn').val();
			},
			getOutKuweiObj(outKuwei_name){     //取得货位对象
				var a={};
				switch (outKuwei_name){
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
<style lang='scss' scoped>
#false{
	margin-left: 30px;
}
	form{
		margin-top: 20px;
	}
	#out_in{
		div{
			padding: 0;
		}
		div.col-md-2 span{
			display: inline-block;
			height: 33px;
			width: 100%;
			line-height: 33px;
		}
	}
</style>