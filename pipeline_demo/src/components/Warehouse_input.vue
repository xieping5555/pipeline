<template>
	<div id="warehouse_input">
		<form  role='form' class="form-horizontal" method="post">
			<div  class="form-group">
				<label for="kuwei" class="col-md-2 text-right">库位</label>
				<div class="col-md-5">
					<select name="kuwei" id="kuwei" class="form-control" @change="kuwei">
						<option v-for='ku in kuArr'>{{ku}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 text-right">入库方式</label>
				<div class="col-md-5">
					<input type="radio" name="duo" id="maduo" value="码垛" checked > 码垛
					<input type="radio" name="duo" id="zhuanduo" value="转垛" > 转垛
				</div>
			</div>
			<div class="form-group" v-show='ma_or_zhuan'>
				<label for="maduohuowei" class="col-md-2 text-right">货位</label>
				<div class="col-md-5">
					<select name="maduohuowei" id="maduohuowei" class="form-control">
						<option v-for="cang in huowei">{{cang}}</option>      
					</select>
				</div>
			</div>
			<div class="form-group" v-show='!ma_or_zhuan'>
				<label for="zhuanduohuowei" class="col-md-2 text-right">货位</label>
				<!-- <div class="col-md-2">
					<input type="text" class="form-control" id="from" v-model='fromVal' v-double>
				</div> -->
				<div class="col-md-1">
					<select  class="form-control" id="kuweiThatNeedOut" @change='kuweiThatNeedOut'>
						<option v-for='ku in kuArr'>{{ku}}</option>
					</select>
				</div>
				<div class="col-md-1">
					<select  id="huoweiThatNeedOut" class="form-control">
						<option v-for='huowei in huoweiThatNeedOut'>{{huowei}}</option>
					</select>
				</div>
				<div class="col-md-1 text-center">
					<p class="arrow">to</p>
				</div>
				<div class="col-md-1">
					<select  class="form-control" id="kuweiThatNeedIn" @change='kuweiThatNeedIn'>
						<option v-for='ku in kuArr'>{{ku}}</option>
					</select>
				</div>
				<div class="col-md-1">
					<select  id="huoweiThatNeedIn" class="form-control">
						<option v-for='huowei in huoweiThatNeedIn'>{{huowei}}</option>
					</select>
				</div>
				<!-- <div class="col-md-2">
					<input type="text" class="form-control" id="to" v-model='toVal' v-double>
				</div> -->
<!-- 				<div class="col-md-2" id="double_needtohide">
	<Hint msg='请填写货位' wrapper='warehouse_hinta'></Hint>
</div> -->
			</div>
			<div class="form-group">
				<label for="good" class="col-md-2 text-right">货物种类</label>
				<div class="col-md-5">
					<!-- <input type="text" id="good" class="form-control"  v-model='goodVal' v-hidden> -->
					<select name="good" id="good" class="form-control">
						<option v-for='material in materialArr'>{{material}}</option>
					</select>
				</div>
				<!-- <div class="col-md-2">
					<Hint msg='请填写货物种类' wrapper='warehouse_hintb'></Hint>
				</div> -->
			</div>
			<div class="form-group">
				<label for="mount" class="col-md-2 text-right">数量</label>
				<div class="col-md-5">
					<input type="text" id="mount" class="form-control" v-model='mountVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写数量' wrapper='warehouse_hintc'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="piece_weight" class="col-md-2 text-right">件重</label>
				<div class="col-md-5">
					<input type="text" id="piece_weight" class="form-control" v-model='piece_weightVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写件重' wrapper='warehouse_hintd'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="weight" class="col-md-2 text-right">重量</label>
				<div class="col-md-5">
					<input type="text" id="weight" class="form-control" v-model='weightVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写重量' wrapper='warehouse_hinte'></Hint>
				</div>
			</div>

			<div class="form-group">
				<label for="put_time" class="col-md-2 text-right">入库时间</label>
				<div class="col-md-5">
					<input type="text" id="put_time" class="form-control" v-model='putTimeVal' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写入库时间' wrapper='warehouse_hintf'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="group" class="col-md-2 text-right">班次</label>
				<div class="col-md-5">
					<input type="text" id="group" class="form-control" v-model='Classes' v-hidden>
				</div>
				<div class="col-md-2">
					<Hint msg='请填写班次' wrapper='warehouse_hintg'></Hint>
				</div>
			</div>
			<div class="form-group">
				<label for="remark" class="col-md-2 text-right">备注</label>
				<div class="col-md-5">
					<textarea name="remark" id="remark" class="form-control" cols="30" rows="3"></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="col-md-offset-2 col-md-5">
					<button class="btn btn-primary btn-sm" @click.prevent='submit'>提交</button>
					<!-- <button class="btn btn-warning btn-sm" @click.prevent='reset'>重置</button> -->
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
				ma_or_zhuan:true,
				currentKu:'站台一库',
				currentKuThatNeedOut:'站台一库',
				currentKuThatNeedIn:'站台一库',
				goodVal:'',
				mountVal:'',
				piece_weightVal:'',   //双向绑定解除警告状态
				putTimeVal:'',
				groupVal:'',
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
				if(this.mountVal == ''|| this.piece_weightVal == ''){
					return '';
				}else{
					return this.mountVal*this.piece_weightVal;
				}
			},
			freight_house(){
				if(this.ma_or_zhuan){
					return $('#maduohuowei').val();
				}else{
					let from=$('#huoweiThatNeedOut').val();
					let to=$('#huoweiThatNeedIn').val();
					let str=from + '-->' + to;
					return str;
				}
			},
			huowei(){
				return this.kuweiArr[this.currentKu];
			},
			huoweiThatNeedOut(){
				return this.kuweiArr[this.currentKuThatNeedOut];
			},
			huoweiThatNeedIn(){
				return this.kuweiArr[this.currentKuThatNeedIn];
			}
		},
		mounted(){
			console.log(this.kuArr);
			this.tab();
			this.key();
			this.kuwei();
		},
		directives:{
			hidden(el,binding){
				if(el.value !== ''){
					$(el).removeClass('highlight');	
					$(el).parent().next().children().children().hide();
				}
			},
			double(el,binding){
				if(el.value !== ''){
					$(el).removeClass('highlight');
					$('#double_needtohide').children().children().hide();
				}
			}
		},
		methods:{
			...mapMutations([
				"putAInfo",   //在detail中新增一条数据的方法
				"oWarehouse_name"   //根据库位得到库位对象的方法
			]),
			tab(){
				let _this=this;
				$('input[type="radio"][name="duo"]').each(function(){
					$(this).click(function(ev){
						if($(ev.target).prop('id')=='maduo'){
							_this.ma_or_zhuan=true;
						}else{
							_this.ma_or_zhuan=false;
						}
					}.bind(this))
				});
			},
			submit(){
				//表单验证区域
				let quantity=$('#mount').val() !== '' && $("#mount").val().search(/\D/) == -1?true:false;
				let piece_weight=$('#weight').val() !=='' && $('#weight').val().search(/\D/) == -1?true:false;
				let weight=$('#weight').val() !==''?true:false;
				let time=$("#put_time").val() !== ''?true:false;
				let banci=$('#group').val() !==''?true:false;
				if(this.ma_or_zhuan){
					if( quantity && piece_weight && weight && time && banci){
						const _this=this;
						this.$http.post('http://localhost:3000/put',qs.stringify({
								"kuwei":$('#kuwei').val(),
								"putstyle":$('input[name="duo"]:checked').val(),
								"huowei":_this.freight_house,    //利用计算属性获得货位的值
								"good":$('#good').val(),
								"mount":$('#mount').val(),
								"piece_weight":$('#piece_weight').val(),
								"weight":$('#weight').val(),
								"put_time":$('#put_time').val(),
								"group":$('#group').val(),
								"remark":$('#remark').val()
						})).then(function(res){
							Popover.methods.show();
							_this.putAInfo(res.data.a);   //在detail界面新增一条数据
							//图表中的数据更新
							const arr=[_this.a,_this.b,_this.c,_this.d,_this.e];
							let warehouse_name=res.data.a[0].warehouse_name;   //库名;
							let freight_house_name=(function(){
									if(res.data.a[0].freight_house.search('-->') != -1){
										return res.data.a[0].freight_house.split('-->');
									}else{
										return res.data.a[0].freight_house;
									}
								})();   // 货位
							//不同库区之间进行货物转移，提取货仓名
							let mount=res.data.a[0].mount;  //数量
							let goods_name=res.data.a[0].goods_name;  //货物名称
							let put_style=res.data.a[0].putstyle;
							//确定是那个库位，将库对象当做参数传到函数里面
							let oWarehouse_name = _this.getWarehouseObj(warehouse_name);   //取得货位对象
							arr.forEach(function(item,index,array){
								if(item.name == warehouse_name){
									if(put_style == '码垛'){
										item.W_put(oWarehouse_name,freight_house_name,mount,goods_name);
										_this.$http.get('http://localhost:3000/increase',{
											params:{
												kuming:warehouse_name,
												cangming:freight_house_name,
												huoming:goods_name,
												mount:mount
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
						if(!quantity){
							$('#mount').addClass('highlight');
							this.$children[0].show();

						};
						if(!piece_weight){
							$('#piece_weight').addClass('highlight');
							this.$children[1].show();
						};
						if(!weight){
							$('#weight').addClass('highlight');
							this.$children[2].show();
						};
						if(!time){
							$('#put_time').addClass('highlight');
							this.$children[3].show();
						};
						if(!banci){
							$('#group').addClass('highlight');
							this.$children[4].show();
						}
						return;
					}
				}else{
					if(quantity && piece_weight && weight && time && banci){
						const _this=this;
						this.$http.post('http://localhost:3000/put',qs.stringify({
								"kuwei":$('#kuwei').val(),
								"putstyle":$('input[name="duo"]:checked').val(),
								"huowei":_this.freight_house,    //利用计算属性获得货位的值
								"good":$('#good').val(),
								"mount":$('#mount').val(),
								"piece_weight":$('#piece_weight').val(),
								"weight":$('#weight').val(),
								"put_time":$('#put_time').val(),
								"group":$('#group').val(),
								"remark":$('#remark').val()
						})).then(function(res){
							Popover.methods.show();
							_this.putAInfo(res.data.a);   //在detail界面新增一条数据
							//图表中的数据更新
							const arr=[_this.a,_this.b,_this.c,_this.d,_this.e];
							let warehouse_name=res.data.a[0].warehouse_name;   //库名;
							let freight_house_name=(function(){
									if(res.data.a[0].freight_house.search('-->') != -1){
										return res.data.a[0].freight_house.split('-->');
									}else{
										return res.data.a[0].freight_house;
									}
								})();   // 货位
								console.log(freight_house_name);
							let mount=res.data.a[0].mount;  //数量
							let goods_name=res.data.a[0].goods_name;  //货物名称
							let put_style=res.data.a[0].putstyle;
							arr.forEach(function(item,index,array){
								if(item.name == warehouse_name){
									if(put_style == '转垛'){
										//出货的库位
										let house_goodsToReduce=freight_house_name[0].match(/^(.*库)\d+#/)[1];
										let warehouse_goodsToReduce=_this.getWarehouseObj(house_goodsToReduce);
										//进货的库位
										let house_goodsToIncrease=freight_house_name[1].match(/^(.*库)\d+#/)[1];
										let warehouse_goodsToIncrease=_this.getWarehouseObj(house_goodsToIncrease);
										//界面中更新数据
										item.W_out(warehouse_goodsToReduce,freight_house_name[0],mount,goods_name,freight_house_name[1],warehouse_goodsToIncrease);
										//后台数据更新
										_this.$http.get('http://localhost:3000/decrease',{
											params:{
												kuming:house_goodsToReduce,
												cangming:freight_house_name[0],
												huoming:goods_name,
												mount:mount,
												xixixi:'xixixi'
											}
										}).then(function(res){
											return;
										}).catch(function(err){
											console.log(err);
										});
										_this.$http.get('http://localhost:3000/increase',{
											params:{
												kuming:house_goodsToIncrease,
												cangming:freight_house_name[1],
												huoming:goods_name,
												mount:mount
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
						$('#mount').addClass('highlight');
						this.$children[0].show();

					};
					if(!piece_weight){
						$('#piece_weight').addClass('highlight');
						this.$children[1].show();
					};
					if(!weight){
						$('#weight').addClass('highlight');
						this.$children[2].show();
					};
					if(!time){
						$('#put_time').addClass('highlight');
						this.$children[3].show();
					};
					if(!banci){
						$('#group').addClass('highlight');
						this.$children[4].show();
					}
						return;
					}
				}
			},
			key(){    //取消enter键点击自动提交表单的事件
				$('body').keydown(function(ev){
					if(ev.keyCode == 13){
						ev.preventDefault();
					}
				})
			},
			kuwei(){
				this.currentKu=$('#kuwei').val();
			},
			kuweiThatNeedOut(){
				this.currentKuThatNeedOut=$('#kuweiThatNeedOut').val();
			},
			kuweiThatNeedIn(){
				this.currentKuThatNeedIn=$('#kuweiThatNeedIn').val();
			},
			hidden(n){
				this.children[n].hide();
			},
			getWarehouseObj(warehouse_name){     //取得货位对象
				var a={};
				switch (warehouse_name){
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
<style>
.highlight{
	border:1px solid rgba(255, 0, 0, 0.74);
}
form{
	margin-top: 20px;
}
#zhuanduo{
	margin-left: 30px;
}
.arrow{
	margin-bottom: 0;
	height: 34px !important;
	line-height: 34px;
}
</style>