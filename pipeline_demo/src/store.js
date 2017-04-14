import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
class Warehouse{  //创建一个库类
	constructor(name,...storehouse_arr){
		this.name=name;
		[this.a1,this.a2,this.a3,this.a4,this.a5,this.a6,this.a7,this.a8,this.a9,this.a10,
		this.a11,this.a12,this.a13,this.a14,this.a15,this.a16,this.a17,this.a18,this.a19,this.a20]=storehouse_arr;
	}


	//把库对象传进来
	W_put(warehouseObj,huocang,put_mount,variety){
		for (let props in warehouseObj){
			if(typeof warehouseObj[props] =='object' && warehouseObj[props].name == huocang){			
				warehouseObj[props].put(put_mount,variety);
			}
		}
	}
	    //货仓的进和出要考虑是同一个库还是不同的库
	W_out(warehouseToReduceObj,huocang,out_mount,variety,to,warehouseToIncreaseObj){    //新增两个参数，货减少的库和货增加的库
		if(arguments.length == 6){
			for (let props in warehouseToReduceObj){
				if(typeof warehouseToReduceObj[props] =='object' && warehouseToReduceObj[props].name == huocang){			
					warehouseToReduceObj[props].out(out_mount,variety);
				}
			}
			warehouseToIncreaseObj.W_put(warehouseToIncreaseObj,to,out_mount,variety);
		};
		if(arguments.length == 4){
			for (let props in warehouseToReduceObj){
				if(typeof warehouseToReduceObj[props] =='object' && warehouseToReduceObj[props].name == huocang){			
					warehouseToReduceObj[props].out(out_mount,variety);
				}
			}
		}
	}
};
class Storehouse{  //创建一个仓类
	constructor(name,num1,num2,num3,num4,num5,num6,num7,num8,num9,num10){
		this.name=name
		this.kind=[{
			name:'43%',
			num:num1
		},{
			name:'棕粒粕',
			num:num2
		},{
			name:'43%吨袋',
			num:num3
		},{
			name:'低纤维47%',
			num:num4
		},{
			name:'定制2粕',
			num:num5
		},{
			name:'大豆粉',
			num:num6
		},{
			name:'豆皮',
			num:num7
		},{
			name:'豆奶宝',
			num:num8
		},{
			name:'45%',
			num:num9
		},{
			name:'46%',
			num:num10
		}]
	}
	put(put_mount,variety){
		this.kind.forEach(function(item,index,array){
			if(item.name == variety){
				item.num+=put_mount;
				return;
			}
		});
	}
	out(out_mount,variety){
		this.kind.forEach(function(item,index,array){
			if(item.name == variety){
				item.num -=out_mount;
			}
		})
	}
};
var A1=new Array(10),A2=new Array(10),A3=new Array(10),A4=new Array(10),A5=new Array(10),A6=new Array(10),A6=new Array(10),A6=new Array(10)
	,A7=new Array(10),A8=new Array(10),A9=new Array(10),A10=new Array(10),A11=new Array(10),A12=new Array(10),A13=new Array(10),A14=new Array(10)
	,A15=new Array(10),A16=new Array(10),A17=new Array(10),A18=new Array(10);  
var B1=new Array(10),B2=new Array(10),B3=new Array(10),B4=new Array(10),B5=new Array(10),B6=new Array(10),B7=new Array(10),B8=new Array(10),
	B9=new Array(10),B10=new Array(10);
var C1=new Array(10),C2=new Array(10),C3=new Array(10),C4=new Array(10),C5=new Array(10),C6=new Array(10),C7=new Array(10),C8=new Array(10),
	C9=new Array(10),C10=new Array(10);
var D1=new Array(10),D2=new Array(10),D3=new Array(10),D4=new Array(10),D5=new Array(10),D6=new Array(10),D7=new Array(10),D8=new Array(10),
	D9=new Array(10),D10=new Array(10);
var E1=new Array(10),E2=new Array(10),E3=new Array(10),E4=new Array(10),E5=new Array(10),E6=new Array(10),E7=new Array(10),E8=new Array(10),
	E9=new Array(10),E10=new Array(10);
var oriangal_data=[];
$.ajaxSettings.async=false;  //将jquery ajax请求变为同步请求
$.getJSON('http://localhost:3000/get_oriangal_data',function(res){
	oriangal_data=res;
	//取值函数
	function getData(kuming,cangming,huoming){
		var data='';
		oriangal_data.forEach(function(item,index,array){
			for(let props in item ){
				if(item[props] == kuming){
					item.data.forEach(function(oItem,oIndex,oArray){
						for(let props in oItem){
							if(props == cangming){
								oItem[cangming].forEach(function(dItem,dIndex,dArray){
									for(let props in dItem){
										if(dItem[props] == huoming){
											data=dItem.num;
										}
									}
								})
							}
						}
					})
				}
			}
		});
		return data;
	}
	A1[0]=getData('站台一库','站台一库1#','43%');A1[1]=getData('站台一库','站台一库1#','棕粒粕');A1[2]=getData('站台一库','站台一库1#','43%吨袋');A1[3]=getData('站台一库','站台一库1#','低纤维47%');A1[4]=getData('站台一库','站台一库1#','定制2粕');A1[5]=getData('站台一库','站台一库1#','大豆粉');A1[6]=getData('站台一库','站台一库1#','豆皮');A1[7]=getData('站台一库','站台一库1#','豆奶宝');A1[8]=getData('站台一库','站台一库1#','45%');A1[9]=getData('站台一库','站台一库1#','46%');
	A2[0]=getData('站台一库','站台一库2#','43%');A2[1]=getData('站台一库','站台一库2#','棕粒粕');A2[2]=getData('站台一库','站台一库2#','43%吨袋');A2[3]=getData('站台一库','站台一库2#','低纤维47%');A2[4]=getData('站台一库','站台一库2#','定制2粕');A2[5]=getData('站台一库','站台一库2#','大豆粉');A2[6]=getData('站台一库','站台一库2#','豆皮');A2[7]=getData('站台一库','站台一库2#','豆奶宝');A2[8]=getData('站台一库','站台一库2#','45%');A2[9]=getData('站台一库','站台一库2#','46%');
	A3[0]=getData('站台一库','站台一库3#','43%');A3[1]=getData('站台一库','站台一库3#','棕粒粕');A3[2]=getData('站台一库','站台一库3#','43%吨袋');A3[3]=getData('站台一库','站台一库3#','低纤维47%');A3[4]=getData('站台一库','站台一库3#','定制2粕');A3[5]=getData('站台一库','站台一库3#','大豆粉');A3[6]=getData('站台一库','站台一库3#','豆皮');A3[7]=getData('站台一库','站台一库3#','豆奶宝');A3[8]=getData('站台一库','站台一库3#','45%');A3[9]=getData('站台一库','站台一库3#','46%');
	A4[0]=getData('站台一库','站台一库4#','43%');A4[1]=getData('站台一库','站台一库4#','棕粒粕');A4[2]=getData('站台一库','站台一库4#','43%吨袋');A4[3]=getData('站台一库','站台一库4#','低纤维47%');A4[4]=getData('站台一库','站台一库4#','定制2粕');A4[5]=getData('站台一库','站台一库4#','大豆粉');A4[6]=getData('站台一库','站台一库4#','豆皮');A4[7]=getData('站台一库','站台一库4#','豆奶宝');A4[8]=getData('站台一库','站台一库4#','45%');A4[9]=getData('站台一库','站台一库4#','46%');
	A5[0]=getData('站台一库','站台一库5#','43%');A5[1]=getData('站台一库','站台一库5#','棕粒粕');A5[2]=getData('站台一库','站台一库5#','43%吨袋');A5[3]=getData('站台一库','站台一库5#','低纤维47%');A5[4]=getData('站台一库','站台一库5#','定制2粕');A5[5]=getData('站台一库','站台一库5#','大豆粉');A5[6]=getData('站台一库','站台一库5#','豆皮');A5[7]=getData('站台一库','站台一库5#','豆奶宝');A5[8]=getData('站台一库','站台一库5#','45%');A5[9]=getData('站台一库','站台一库5#','46%');
	A6[0]=getData('站台一库','站台一库6#','43%');A6[1]=getData('站台一库','站台一库6#','棕粒粕');A6[2]=getData('站台一库','站台一库6#','43%吨袋');A6[3]=getData('站台一库','站台一库6#','低纤维47%');A6[4]=getData('站台一库','站台一库6#','定制2粕');A6[5]=getData('站台一库','站台一库6#','大豆粉');A6[6]=getData('站台一库','站台一库6#','豆皮');A6[7]=getData('站台一库','站台一库6#','豆奶宝');A6[8]=getData('站台一库','站台一库6#','45%');A6[9]=getData('站台一库','站台一库6#','46%');
	A7[0]=getData('站台一库','站台一库7#','43%');A7[1]=getData('站台一库','站台一库7#','棕粒粕');A7[2]=getData('站台一库','站台一库7#','43%吨袋');A7[3]=getData('站台一库','站台一库7#','低纤维47%');A7[4]=getData('站台一库','站台一库7#','定制2粕');A7[5]=getData('站台一库','站台一库7#','大豆粉');A7[6]=getData('站台一库','站台一库7#','豆皮');A7[7]=getData('站台一库','站台一库7#','豆奶宝');A7[8]=getData('站台一库','站台一库7#','45%');A7[9]=getData('站台一库','站台一库7#','46%');
	A8[0]=getData('站台一库','站台一库8#','43%');A8[1]=getData('站台一库','站台一库8#','棕粒粕');A8[2]=getData('站台一库','站台一库8#','43%吨袋');A8[3]=getData('站台一库','站台一库8#','低纤维47%');A8[4]=getData('站台一库','站台一库8#','定制2粕');A8[5]=getData('站台一库','站台一库8#','大豆粉');A8[6]=getData('站台一库','站台一库8#','豆皮');A8[7]=getData('站台一库','站台一库8#','豆奶宝');A8[8]=getData('站台一库','站台一库8#','45%');A8[9]=getData('站台一库','站台一库8#','46%');
	A9[0]=getData('站台一库','站台一库9#','43%');A9[1]=getData('站台一库','站台一库9#','棕粒粕');A9[2]=getData('站台一库','站台一库9#','43%吨袋');A9[3]=getData('站台一库','站台一库9#','低纤维47%');A9[4]=getData('站台一库','站台一库9#','定制2粕');A9[5]=getData('站台一库','站台一库9#','大豆粉');A9[6]=getData('站台一库','站台一库9#','豆皮');A9[7]=getData('站台一库','站台一库9#','豆奶宝');A9[8]=getData('站台一库','站台一库9#','45%');A9[9]=getData('站台一库','站台一库9#','46%');
	A10[0]=getData('站台一库','站台一库10#','43%');A10[1]=getData('站台一库','站台一库10#','棕粒粕');A10[2]=getData('站台一库','站台一库10#','43%吨袋');A10[3]=getData('站台一库','站台一库10#','低纤维47%');A10[4]=getData('站台一库','站台一库10#','定制2粕');A10[5]=getData('站台一库','站台一库10#','大豆粉');A10[6]=getData('站台一库','站台一库10#','豆皮');A10[7]=getData('站台一库','站台一库10#','豆奶宝');A10[8]=getData('站台一库','站台一库10#','45%');A10[9]=getData('站台一库','站台一库10#','46%');
	A11[0]=getData('站台一库','站台一库11#','43%');A11[1]=getData('站台一库','站台一库11#','棕粒粕');A11[2]=getData('站台一库','站台一库11#','43%吨袋');A11[3]=getData('站台一库','站台一库11#','低纤维47%');A11[4]=getData('站台一库','站台一库11#','定制2粕');A11[5]=getData('站台一库','站台一库11#','大豆粉');A11[6]=getData('站台一库','站台一库11#','豆皮');A11[7]=getData('站台一库','站台一库11#','豆奶宝');A11[8]=getData('站台一库','站台一库11#','45%');A11[9]=getData('站台一库','站台一库11#','46%');
	A12[0]=getData('站台一库','站台一库12#','43%');A12[1]=getData('站台一库','站台一库12#','棕粒粕');A12[2]=getData('站台一库','站台一库12#','43%吨袋');A12[3]=getData('站台一库','站台一库12#','低纤维47%');A12[4]=getData('站台一库','站台一库12#','定制2粕');A12[5]=getData('站台一库','站台一库12#','大豆粉');A12[6]=getData('站台一库','站台一库12#','豆皮');A12[7]=getData('站台一库','站台一库12#','豆奶宝');A12[8]=getData('站台一库','站台一库12#','45%');A12[9]=getData('站台一库','站台一库12#','46%');
	A13[0]=getData('站台一库','站台一库13#','43%');A13[1]=getData('站台一库','站台一库13#','棕粒粕');A13[2]=getData('站台一库','站台一库13#','43%吨袋');A13[3]=getData('站台一库','站台一库13#','低纤维47%');A13[4]=getData('站台一库','站台一库13#','定制2粕');A13[5]=getData('站台一库','站台一库13#','大豆粉');A13[6]=getData('站台一库','站台一库13#','豆皮');A13[7]=getData('站台一库','站台一库13#','豆奶宝');A13[8]=getData('站台一库','站台一库13#','45%');A13[9]=getData('站台一库','站台一库13#','46%');
	A14[0]=getData('站台一库','站台一库14#','43%');A14[1]=getData('站台一库','站台一库14#','棕粒粕');A14[2]=getData('站台一库','站台一库14#','43%吨袋');A14[3]=getData('站台一库','站台一库14#','低纤维47%');A14[4]=getData('站台一库','站台一库14#','定制2粕');A14[5]=getData('站台一库','站台一库14#','大豆粉');A14[6]=getData('站台一库','站台一库14#','豆皮');A14[7]=getData('站台一库','站台一库14#','豆奶宝');A14[8]=getData('站台一库','站台一库14#','45%');A14[9]=getData('站台一库','站台一库14#','46%');
	A15[0]=getData('站台一库','站台一库15#','43%');A15[1]=getData('站台一库','站台一库15#','棕粒粕');A15[2]=getData('站台一库','站台一库15#','43%吨袋');A15[3]=getData('站台一库','站台一库15#','低纤维47%');A15[4]=getData('站台一库','站台一库15#','定制2粕');A15[5]=getData('站台一库','站台一库15#','大豆粉');A15[6]=getData('站台一库','站台一库15#','豆皮');A15[7]=getData('站台一库','站台一库15#','豆奶宝');A15[8]=getData('站台一库','站台一库15#','45%');A15[9]=getData('站台一库','站台一库15#','46%');
	A16[0]=getData('站台一库','站台一库16#','43%');A16[1]=getData('站台一库','站台一库16#','棕粒粕');A16[2]=getData('站台一库','站台一库16#','43%吨袋');A16[3]=getData('站台一库','站台一库16#','低纤维47%');A16[4]=getData('站台一库','站台一库16#','定制2粕');A16[5]=getData('站台一库','站台一库16#','大豆粉');A16[6]=getData('站台一库','站台一库16#','豆皮');A16[7]=getData('站台一库','站台一库16#','豆奶宝');A16[8]=getData('站台一库','站台一库16#','45%');A16[9]=getData('站台一库','站台一库16#','46%');
	A17[0]=getData('站台一库','站台一库17#','43%');A17[1]=getData('站台一库','站台一库17#','棕粒粕');A17[2]=getData('站台一库','站台一库17#','43%吨袋');A17[3]=getData('站台一库','站台一库17#','低纤维47%');A17[4]=getData('站台一库','站台一库17#','定制2粕');A17[5]=getData('站台一库','站台一库17#','大豆粉');A17[6]=getData('站台一库','站台一库17#','豆皮');A17[7]=getData('站台一库','站台一库17#','豆奶宝');A17[8]=getData('站台一库','站台一库17#','45%');A17[9]=getData('站台一库','站台一库17#','46%');
	A18[0]=getData('站台一库','站台一库18#','43%');A18[1]=getData('站台一库','站台一库18#','棕粒粕');A18[2]=getData('站台一库','站台一库18#','43%吨袋');A18[3]=getData('站台一库','站台一库18#','低纤维47%');A18[4]=getData('站台一库','站台一库18#','定制2粕');A18[5]=getData('站台一库','站台一库18#','大豆粉');A18[6]=getData('站台一库','站台一库18#','豆皮');A18[7]=getData('站台一库','站台一库18#','豆奶宝');A18[8]=getData('站台一库','站台一库18#','45%');A18[9]=getData('站台一库','站台一库18#','46%');
	B1[0]=getData('站台二库','站台二库1#','43%');B1[1]=getData('站台二库','站台二库1#','棕粒粕');B1[2]=getData('站台二库','站台二库1#','43%吨袋');B1[3]=getData('站台二库','站台二库1#','低纤维47%');B1[4]=getData('站台二库','站台二库1#','定制2粕');B1[5]=getData('站台二库','站台二库1#','大豆粉');B1[6]=getData('站台二库','站台二库1#','豆皮');B1[7]=getData('站台二库','站台二库1#','豆奶宝');B1[8]=getData('站台二库','站台二库1#','45%');B1[9]=getData('站台二库','站台二库1#','46%');
	B2[0]=getData('站台二库','站台二库2#','43%');B2[1]=getData('站台二库','站台二库2#','棕粒粕');B2[2]=getData('站台二库','站台二库2#','43%吨袋');B2[3]=getData('站台二库','站台二库2#','低纤维47%');B2[4]=getData('站台二库','站台二库2#','定制2粕');B2[5]=getData('站台二库','站台二库2#','大豆粉');B2[6]=getData('站台二库','站台二库2#','豆皮');B2[7]=getData('站台二库','站台二库2#','豆奶宝');B2[8]=getData('站台二库','站台二库2#','45%');B2[9]=getData('站台二库','站台二库2#','46%');
	B3[0]=getData('站台二库','站台二库3#','43%');B3[1]=getData('站台二库','站台二库3#','棕粒粕');B3[2]=getData('站台二库','站台二库3#','43%吨袋');B3[3]=getData('站台二库','站台二库3#','低纤维47%');B3[4]=getData('站台二库','站台二库3#','定制2粕');B3[5]=getData('站台二库','站台二库3#','大豆粉');B3[6]=getData('站台二库','站台二库3#','豆皮');B3[7]=getData('站台二库','站台二库3#','豆奶宝');B3[8]=getData('站台二库','站台二库3#','45%');B3[9]=getData('站台二库','站台二库3#','46%');
	B4[0]=getData('站台二库','站台二库4#','43%');B4[1]=getData('站台二库','站台二库4#','棕粒粕');B4[2]=getData('站台二库','站台二库4#','43%吨袋');B4[3]=getData('站台二库','站台二库4#','低纤维47%');B4[4]=getData('站台二库','站台二库4#','定制2粕');B4[5]=getData('站台二库','站台二库4#','大豆粉');B4[6]=getData('站台二库','站台二库4#','豆皮');B4[7]=getData('站台二库','站台二库4#','豆奶宝');B4[8]=getData('站台二库','站台二库4#','45%');B4[9]=getData('站台二库','站台二库4#','46%');
	B5[0]=getData('站台二库','站台二库5#','43%');B5[1]=getData('站台二库','站台二库5#','棕粒粕');B5[2]=getData('站台二库','站台二库5#','43%吨袋');B5[3]=getData('站台二库','站台二库5#','低纤维47%');B5[4]=getData('站台二库','站台二库5#','定制2粕');B5[5]=getData('站台二库','站台二库5#','大豆粉');B5[6]=getData('站台二库','站台二库5#','豆皮');B5[7]=getData('站台二库','站台二库5#','豆奶宝');B5[8]=getData('站台二库','站台二库5#','45%');B5[9]=getData('站台二库','站台二库5#','46%');
	B6[0]=getData('站台二库','站台二库6#','43%');B6[1]=getData('站台二库','站台二库6#','棕粒粕');B6[2]=getData('站台二库','站台二库6#','43%吨袋');B6[3]=getData('站台二库','站台二库6#','低纤维47%');B6[4]=getData('站台二库','站台二库6#','定制2粕');B6[5]=getData('站台二库','站台二库6#','大豆粉');B6[6]=getData('站台二库','站台二库6#','豆皮');B6[7]=getData('站台二库','站台二库6#','豆奶宝');B6[8]=getData('站台二库','站台二库6#','45%');B6[9]=getData('站台二库','站台二库6#','46%');
	B7[0]=getData('站台二库','站台二库7#','43%');B7[1]=getData('站台二库','站台二库7#','棕粒粕');B7[2]=getData('站台二库','站台二库7#','43%吨袋');B7[3]=getData('站台二库','站台二库7#','低纤维47%');B7[4]=getData('站台二库','站台二库7#','定制2粕');B7[5]=getData('站台二库','站台二库7#','大豆粉');B7[6]=getData('站台二库','站台二库7#','豆皮');B7[7]=getData('站台二库','站台二库7#','豆奶宝');B7[8]=getData('站台二库','站台二库7#','45%');B7[9]=getData('站台二库','站台二库7#','46%');
	B8[0]=getData('站台二库','站台二库8#','43%');B8[1]=getData('站台二库','站台二库8#','棕粒粕');B8[2]=getData('站台二库','站台二库8#','43%吨袋');B8[3]=getData('站台二库','站台二库8#','低纤维47%');B8[4]=getData('站台二库','站台二库8#','定制2粕');B8[5]=getData('站台二库','站台二库8#','大豆粉');B8[6]=getData('站台二库','站台二库8#','豆皮');B8[7]=getData('站台二库','站台二库8#','豆奶宝');B8[8]=getData('站台二库','站台二库8#','45%');B8[9]=getData('站台二库','站台二库8#','46%');
	B9[0]=getData('站台二库','站台二库9#','43%');B9[1]=getData('站台二库','站台二库9#','棕粒粕');B9[2]=getData('站台二库','站台二库9#','43%吨袋');B9[3]=getData('站台二库','站台二库9#','低纤维47%');B9[4]=getData('站台二库','站台二库9#','定制2粕');B9[5]=getData('站台二库','站台二库9#','大豆粉');B9[6]=getData('站台二库','站台二库9#','豆皮');B9[7]=getData('站台二库','站台二库9#','豆奶宝');B9[8]=getData('站台二库','站台二库9#','45%');B9[9]=getData('站台二库','站台二库9#','46%');
	B10[0]=getData('站台二库','站台二库10#','43%');B10[1]=getData('站台二库','站台二库10#','棕粒粕');B10[2]=getData('站台二库','站台二库10#','43%吨袋');B10[3]=getData('站台二库','站台二库10#','低纤维47%');B10[4]=getData('站台二库','站台二库10#','定制2粕');B10[5]=getData('站台二库','站台二库10#','大豆粉');B10[6]=getData('站台二库','站台二库10#','豆皮');B10[7]=getData('站台二库','站台二库10#','豆奶宝');B10[8]=getData('站台二库','站台二库10#','45%');B10[9]=getData('站台二库','站台二库10#','46%');
	
	C1[0]=getData('4号库','4号库1#','43%');C1[1]=getData('4号库','4号库1#','棕粒粕');C1[2]=getData('4号库','4号库1#','43%吨袋');C1[3]=getData('4号库','4号库1#','低纤维47%');C1[4]=getData('4号库','4号库1#','定制2粕');C1[5]=getData('4号库','4号库1#','大豆粉');C1[6]=getData('4号库','4号库1#','豆皮');C1[7]=getData('4号库','4号库1#','豆奶宝');C1[8]=getData('4号库','4号库1#','45%');C1[9]=getData('4号库','4号库1#','46%');
	C2[0]=getData('4号库','4号库2#','43%');C2[1]=getData('4号库','4号库2#','棕粒粕');C2[2]=getData('4号库','4号库2#','43%吨袋');C2[3]=getData('4号库','4号库2#','低纤维47%');C2[4]=getData('4号库','4号库2#','定制2粕');C2[5]=getData('4号库','4号库2#','大豆粉');C2[6]=getData('4号库','4号库2#','豆皮');C2[7]=getData('4号库','4号库2#','豆奶宝');C2[8]=getData('4号库','4号库2#','45%');C2[9]=getData('4号库','4号库2#','46%');
	C3[0]=getData('4号库','4号库3#','43%');C3[1]=getData('4号库','4号库3#','棕粒粕');C3[2]=getData('4号库','4号库3#','43%吨袋');C3[3]=getData('4号库','4号库3#','低纤维47%');C3[4]=getData('4号库','4号库3#','定制2粕');C3[5]=getData('4号库','4号库3#','大豆粉');C3[6]=getData('4号库','4号库3#','豆皮');C3[7]=getData('4号库','4号库3#','豆奶宝');C3[8]=getData('4号库','4号库3#','45%');C3[9]=getData('4号库','4号库3#','46%');
	C4[0]=getData('4号库','4号库4#','43%');C4[1]=getData('4号库','4号库4#','棕粒粕');C4[2]=getData('4号库','4号库4#','43%吨袋');C4[3]=getData('4号库','4号库4#','低纤维47%');C4[4]=getData('4号库','4号库4#','定制2粕');C4[5]=getData('4号库','4号库4#','大豆粉');C4[6]=getData('4号库','4号库4#','豆皮');C4[7]=getData('4号库','4号库4#','豆奶宝');C4[8]=getData('4号库','4号库4#','45%');C4[9]=getData('4号库','4号库4#','46%');
	C5[0]=getData('4号库','4号库5#','43%');C5[1]=getData('4号库','4号库5#','棕粒粕');C5[2]=getData('4号库','4号库5#','43%吨袋');C5[3]=getData('4号库','4号库5#','低纤维47%');C5[4]=getData('4号库','4号库5#','定制2粕');C5[5]=getData('4号库','4号库5#','大豆粉');C5[6]=getData('4号库','4号库5#','豆皮');C5[7]=getData('4号库','4号库5#','豆奶宝');C5[8]=getData('4号库','4号库5#','45%');C5[9]=getData('4号库','4号库5#','46%');
	C6[0]=getData('4号库','4号库6#','43%');C6[1]=getData('4号库','4号库6#','棕粒粕');C6[2]=getData('4号库','4号库6#','43%吨袋');C6[3]=getData('4号库','4号库6#','低纤维47%');C6[4]=getData('4号库','4号库6#','定制2粕');C6[5]=getData('4号库','4号库6#','大豆粉');C6[6]=getData('4号库','4号库6#','豆皮');C6[7]=getData('4号库','4号库6#','豆奶宝');C6[8]=getData('4号库','4号库6#','45%');C6[9]=getData('4号库','4号库6#','46%');
	C7[0]=getData('4号库','4号库7#','43%');C7[1]=getData('4号库','4号库7#','棕粒粕');C7[2]=getData('4号库','4号库7#','43%吨袋');C7[3]=getData('4号库','4号库7#','低纤维47%');C7[4]=getData('4号库','4号库7#','定制2粕');C7[5]=getData('4号库','4号库7#','大豆粉');C7[6]=getData('4号库','4号库7#','豆皮');C7[7]=getData('4号库','4号库7#','豆奶宝');C7[8]=getData('4号库','4号库7#','45%');C7[9]=getData('4号库','4号库7#','46%');
	C8[0]=getData('4号库','4号库8#','43%');C8[1]=getData('4号库','4号库8#','棕粒粕');C8[2]=getData('4号库','4号库8#','43%吨袋');C8[3]=getData('4号库','4号库8#','低纤维47%');C8[4]=getData('4号库','4号库8#','定制2粕');C8[5]=getData('4号库','4号库8#','大豆粉');C8[6]=getData('4号库','4号库8#','豆皮');C8[7]=getData('4号库','4号库8#','豆奶宝');C8[8]=getData('4号库','4号库8#','45%');C8[9]=getData('4号库','4号库8#','46%');
	C9[0]=getData('4号库','4号库9#','43%');C9[1]=getData('4号库','4号库9#','棕粒粕');C9[2]=getData('4号库','4号库9#','43%吨袋');C9[3]=getData('4号库','4号库9#','低纤维47%');C9[4]=getData('4号库','4号库9#','定制2粕');C9[5]=getData('4号库','4号库9#','大豆粉');C9[6]=getData('4号库','4号库9#','豆皮');C9[7]=getData('4号库','4号库9#','豆奶宝');C9[8]=getData('4号库','4号库9#','45%');C9[9]=getData('4号库','4号库9#','46%');
	C10[0]=getData('4号库','4号库10#','43%');C10[1]=getData('4号库','4号库10#','棕粒粕');C10[2]=getData('4号库','4号库10#','43%吨袋');C10[3]=getData('4号库','4号库10#','低纤维47%');C10[4]=getData('4号库','4号库10#','定制2粕');C10[5]=getData('4号库','4号库10#','大豆粉');C10[6]=getData('4号库','4号库1#','豆皮');C10[7]=getData('4号库','4号库10#','豆奶宝');C10[8]=getData('4号库','4号库10#','45%');C10[9]=getData('4号库','4号库10#','46%');

	D1[0]=getData('曲4场库','曲4场库1#','43%');D1[1]=getData('曲4场库','曲4场库1#','棕粒粕');D1[2]=getData('曲4场库','曲4场库1#','43%吨袋');D1[3]=getData('曲4场库','曲4场库1#','低纤维47%');D1[4]=getData('曲4场库','曲4场库1#','定制2粕');D1[5]=getData('曲4场库','曲4场库1#','大豆粉');D1[6]=getData('曲4场库','曲4场库1#','豆皮');D1[7]=getData('曲4场库','曲4场库1#','豆奶宝');D1[8]=getData('曲4场库','曲4场库1#','45%');D1[9]=getData('曲4场库','曲4场库1#','46%');
	D2[0]=getData('曲4场库','曲4场库2#','43%');D2[1]=getData('曲4场库','曲4场库2#','棕粒粕');D2[2]=getData('曲4场库','曲4场库2#','43%吨袋');D2[3]=getData('曲4场库','曲4场库2#','低纤维47%');D2[4]=getData('曲4场库','曲4场库2#','定制2粕');D2[5]=getData('曲4场库','曲4场库2#','大豆粉');D2[6]=getData('曲4场库','曲4场库2#','豆皮');D2[7]=getData('曲4场库','曲4场库2#','豆奶宝');D2[8]=getData('曲4场库','曲4场库2#','45%');D2[9]=getData('曲4场库','曲4场库2#','46%');
	D3[0]=getData('曲4场库','曲4场库3#','43%');D3[1]=getData('曲4场库','曲4场库3#','棕粒粕');D3[2]=getData('曲4场库','曲4场库3#','43%吨袋');D3[3]=getData('曲4场库','曲4场库3#','低纤维47%');D3[4]=getData('曲4场库','曲4场库3#','定制2粕');D3[5]=getData('曲4场库','曲4场库3#','大豆粉');D3[6]=getData('曲4场库','曲4场库3#','豆皮');D3[7]=getData('曲4场库','曲4场库3#','豆奶宝');D3[8]=getData('曲4场库','曲4场库3#','45%');D3[9]=getData('曲4场库','曲4场库3#','46%');
	D4[0]=getData('曲4场库','曲4场库4#','43%');D4[1]=getData('曲4场库','曲4场库4#','棕粒粕');D4[2]=getData('曲4场库','曲4场库4#','43%吨袋');D4[3]=getData('曲4场库','曲4场库4#','低纤维47%');D4[4]=getData('曲4场库','曲4场库4#','定制2粕');D4[5]=getData('曲4场库','曲4场库4#','大豆粉');D4[6]=getData('曲4场库','曲4场库4#','豆皮');D4[7]=getData('曲4场库','曲4场库4#','豆奶宝');D4[8]=getData('曲4场库','曲4场库4#','45%');D4[9]=getData('曲4场库','曲4场库4#','46%');
	D5[0]=getData('曲4场库','曲4场库5#','43%');D5[1]=getData('曲4场库','曲4场库5#','棕粒粕');D5[2]=getData('曲4场库','曲4场库5#','43%吨袋');D5[3]=getData('曲4场库','曲4场库5#','低纤维47%');D5[4]=getData('曲4场库','曲4场库5#','定制2粕');D5[5]=getData('曲4场库','曲4场库5#','大豆粉');D5[6]=getData('曲4场库','曲4场库5#','豆皮');D5[7]=getData('曲4场库','曲4场库5#','豆奶宝');D5[8]=getData('曲4场库','曲4场库5#','45%');D5[9]=getData('曲4场库','曲4场库5#','46%');
	D6[0]=getData('曲4场库','曲4场库6#','43%');D6[1]=getData('曲4场库','曲4场库6#','棕粒粕');D6[2]=getData('曲4场库','曲4场库6#','43%吨袋');D6[3]=getData('曲4场库','曲4场库6#','低纤维47%');D6[4]=getData('曲4场库','曲4场库6#','定制2粕');D6[5]=getData('曲4场库','曲4场库6#','大豆粉');D6[6]=getData('曲4场库','曲4场库6#','豆皮');D6[7]=getData('曲4场库','曲4场库6#','豆奶宝');D6[8]=getData('曲4场库','曲4场库6#','45%');D6[9]=getData('曲4场库','曲4场库6#','46%');
	D7[0]=getData('曲4场库','曲4场库7#','43%');D7[1]=getData('曲4场库','曲4场库7#','棕粒粕');D7[2]=getData('曲4场库','曲4场库7#','43%吨袋');D7[3]=getData('曲4场库','曲4场库7#','低纤维47%');D7[4]=getData('曲4场库','曲4场库7#','定制2粕');D7[5]=getData('曲4场库','曲4场库7#','大豆粉');D7[6]=getData('曲4场库','曲4场库7#','豆皮');D7[7]=getData('曲4场库','曲4场库7#','豆奶宝');D7[8]=getData('曲4场库','曲4场库7#','45%');D7[9]=getData('曲4场库','曲4场库7#','46%');
	D8[0]=getData('曲4场库','曲4场库8#','43%');D8[1]=getData('曲4场库','曲4场库8#','棕粒粕');D8[2]=getData('曲4场库','曲4场库8#','43%吨袋');D8[3]=getData('曲4场库','曲4场库8#','低纤维47%');D8[4]=getData('曲4场库','曲4场库8#','定制2粕');D8[5]=getData('曲4场库','曲4场库8#','大豆粉');D8[6]=getData('曲4场库','曲4场库8#','豆皮');D8[7]=getData('曲4场库','曲4场库8#','豆奶宝');D8[8]=getData('曲4场库','曲4场库8#','45%');D8[9]=getData('曲4场库','曲4场库8#','46%');
	D9[0]=getData('曲4场库','曲4场库9#','43%');D9[1]=getData('曲4场库','曲4场库9#','棕粒粕');D9[2]=getData('曲4场库','曲4场库9#','43%吨袋');D9[3]=getData('曲4场库','曲4场库9#','低纤维47%');D9[4]=getData('曲4场库','曲4场库9#','定制2粕');D9[5]=getData('曲4场库','曲4场库9#','大豆粉');D9[6]=getData('曲4场库','曲4场库9#','豆皮');D9[7]=getData('曲4场库','曲4场库9#','豆奶宝');D9[8]=getData('曲4场库','曲4场库9#','45%');D9[9]=getData('曲4场库','曲4场库9#','46%');
	D10[0]=getData('曲4场库','曲4场库10#','43%');D10[1]=getData('曲4场库','曲4场库10#','棕粒粕');D10[2]=getData('曲4场库','曲4场库10#','43%吨袋');D10[3]=getData('曲4场库','曲4场库10#','低纤维47%');D10[4]=getData('曲4场库','曲4场库10#','定制2粕');D10[5]=getData('曲4场库','曲4场库10#','大豆粉');D10[6]=getData('曲4场库','曲4场库1#','豆皮');D10[7]=getData('曲4场库','曲4场库10#','豆奶宝');D10[8]=getData('曲4场库','曲4场库10#','45%');D10[9]=getData('曲4场库','曲4场库10#','46%');

	E1[0]=getData('604库','604库1#','43%');E1[1]=getData('604库','604库1#','棕粒粕');E1[2]=getData('604库','604库1#','43%吨袋');E1[3]=getData('604库','604库1#','低纤维47%');E1[4]=getData('604库','604库1#','定制2粕');E1[5]=getData('604库','604库1#','大豆粉');E1[6]=getData('604库','604库1#','豆皮');E1[7]=getData('604库','604库1#','豆奶宝');E1[8]=getData('604库','604库1#','45%');E1[9]=getData('604库','604库1#','46%');
	E2[0]=getData('604库','604库2#','43%');E2[1]=getData('604库','604库2#','棕粒粕');E2[2]=getData('604库','604库2#','43%吨袋');E2[3]=getData('604库','604库2#','低纤维47%');E2[4]=getData('604库','604库2#','定制2粕');E2[5]=getData('604库','604库2#','大豆粉');E2[6]=getData('604库','604库2#','豆皮');E2[7]=getData('604库','604库2#','豆奶宝');E2[8]=getData('604库','604库2#','45%');E2[9]=getData('604库','604库2#','46%');
	E3[0]=getData('604库','604库3#','43%');E3[1]=getData('604库','604库3#','棕粒粕');E3[2]=getData('604库','604库3#','43%吨袋');E3[3]=getData('604库','604库3#','低纤维47%');E3[4]=getData('604库','604库3#','定制2粕');E3[5]=getData('604库','604库3#','大豆粉');E3[6]=getData('604库','604库3#','豆皮');E3[7]=getData('604库','604库3#','豆奶宝');E3[8]=getData('604库','604库3#','45%');E3[9]=getData('604库','604库3#','46%');
	E4[0]=getData('604库','604库4#','43%');E4[1]=getData('604库','604库4#','棕粒粕');E4[2]=getData('604库','604库4#','43%吨袋');E4[3]=getData('604库','604库4#','低纤维47%');E4[4]=getData('604库','604库4#','定制2粕');E4[5]=getData('604库','604库4#','大豆粉');E4[6]=getData('604库','604库4#','豆皮');E4[7]=getData('604库','604库4#','豆奶宝');E4[8]=getData('604库','604库4#','45%');E4[9]=getData('604库','604库4#','46%');
	E5[0]=getData('604库','604库5#','43%');E5[1]=getData('604库','604库5#','棕粒粕');E5[2]=getData('604库','604库5#','43%吨袋');E5[3]=getData('604库','604库5#','低纤维47%');E5[4]=getData('604库','604库5#','定制2粕');E5[5]=getData('604库','604库5#','大豆粉');E5[6]=getData('604库','604库5#','豆皮');E5[7]=getData('604库','604库5#','豆奶宝');E5[8]=getData('604库','604库5#','45%');E5[9]=getData('604库','604库5#','46%');
	E6[0]=getData('604库','604库6#','43%');E6[1]=getData('604库','604库6#','棕粒粕');E6[2]=getData('604库','604库6#','43%吨袋');E6[3]=getData('604库','604库6#','低纤维47%');E6[4]=getData('604库','604库6#','定制2粕');E6[5]=getData('604库','604库6#','大豆粉');E6[6]=getData('604库','604库6#','豆皮');E6[7]=getData('604库','604库6#','豆奶宝');E6[8]=getData('604库','604库6#','45%');E6[9]=getData('604库','604库6#','46%');
	E7[0]=getData('604库','604库7#','43%');E7[1]=getData('604库','604库7#','棕粒粕');E7[2]=getData('604库','604库7#','43%吨袋');E7[3]=getData('604库','604库7#','低纤维47%');E7[4]=getData('604库','604库7#','定制2粕');E7[5]=getData('604库','604库7#','大豆粉');E7[6]=getData('604库','604库7#','豆皮');E7[7]=getData('604库','604库7#','豆奶宝');E7[8]=getData('604库','604库7#','45%');E7[9]=getData('604库','604库7#','46%');
	E8[0]=getData('604库','604库8#','43%');E8[1]=getData('604库','604库8#','棕粒粕');E8[2]=getData('604库','604库8#','43%吨袋');E8[3]=getData('604库','604库8#','低纤维47%');E8[4]=getData('604库','604库8#','定制2粕');E8[5]=getData('604库','604库8#','大豆粉');E8[6]=getData('604库','604库8#','豆皮');E8[7]=getData('604库','604库8#','豆奶宝');E8[8]=getData('604库','604库8#','45%');E8[9]=getData('604库','604库8#','46%');
	E9[0]=getData('604库','604库9#','43%');E9[1]=getData('604库','604库9#','棕粒粕');E9[2]=getData('604库','604库9#','43%吨袋');E9[3]=getData('604库','604库9#','低纤维47%');E9[4]=getData('604库','604库9#','定制2粕');E9[5]=getData('604库','604库9#','大豆粉');E9[6]=getData('604库','604库9#','豆皮');E9[7]=getData('604库','604库9#','豆奶宝');E9[8]=getData('604库','604库9#','45%');E9[9]=getData('604库','604库9#','46%');
	E10[0]=getData('604库','604库10#','43%');E10[1]=getData('604库','604库10#','棕粒粕');E10[2]=getData('604库','604库10#','43%吨袋');E10[3]=getData('604库','604库10#','低纤维47%');E10[4]=getData('604库','604库10#','定制2粕');E10[5]=getData('604库','604库10#','大豆粉');E10[6]=getData('604库','604库1#','豆皮');E10[7]=getData('604库','604库10#','豆奶宝');E10[8]=getData('604库','604库10#','45%');E10[9]=getData('604库','604库10#','46%');
});
$.ajaxSettings.async=true;   //将ajax变为异步
var a1=new Storehouse('站台一库1#',A1[0],A1[1],A1[2],A1[3],A1[4],A1[5],A1[6],A1[7],A1[8],A1[9]);
var a2=new Storehouse('站台一库2#',A2[0],A2[1],A2[2],A2[3],A2[4],A2[5],A2[6],A2[7],A2[8],A2[9]);
var a3=new Storehouse('站台一库3#',A3[0],A3[1],A3[2],A3[3],A3[4],A3[5],A3[6],A3[7],A3[8],A3[9]);
var a4=new Storehouse('站台一库4#',A4[0],A4[1],A4[2],A4[3],A4[4],A4[5],A4[6],A4[7],A4[8],A4[9]);
var a5=new Storehouse('站台一库5#',A5[0],A5[1],A5[2],A5[3],A5[4],A5[5],A5[6],A5[7],A5[8],A5[9]);
var a6=new Storehouse('站台一库6#',A6[0],A6[1],A6[2],A6[3],A6[4],A6[5],A6[6],A6[7],A6[8],A6[9]);
var a7=new Storehouse('站台一库7#',A7[0],A7[1],A7[2],A7[3],A7[4],A7[5],A7[6],A7[7],A7[8],A7[9]);
var a8=new Storehouse('站台一库8#',A8[0],A8[1],A8[2],A8[3],A8[4],A8[5],A8[6],A8[7],A8[8],A8[9]);
var a9=new Storehouse('站台一库9#',A9[0],A9[1],A9[2],A9[3],A9[4],A9[5],A9[6],A9[7],A9[8],A9[9]);
var a10=new Storehouse('站台一库10#',A10[0],A10[1],A10[2],A10[3],A10[4],A10[5],A10[6],A10[7],A10[8],A10[9]);
var a11=new Storehouse('站台一库11#',A11[0],A11[1],A11[2],A11[3],A11[4],A11[5],A11[6],A11[7],A11[8],A11[9]);
var a12=new Storehouse('站台一库12#',A12[0],A12[1],A12[2],A12[3],A12[4],A12[5],A12[6],A12[7],A12[8],A12[9]);
var a13=new Storehouse('站台一库13#',A13[0],A13[1],A13[2],A13[3],A13[4],A13[5],A13[6],A13[7],A13[8],A13[9]);
var a14=new Storehouse('站台一库14#',A14[0],A14[1],A14[2],A14[3],A14[4],A14[5],A14[6],A14[7],A14[8],A14[9]);
var a15=new Storehouse('站台一库15#',A15[0],A15[1],A15[2],A15[3],A15[4],A15[5],A15[6],A15[7],A15[8],A15[9]);
var a16=new Storehouse('站台一库16#',A16[0],A16[1],A16[2],A16[3],A16[4],A16[5],A16[6],A16[7],A16[8],A16[9]);
var a17=new Storehouse('站台一库17#',A17[0],A17[1],A17[2],A17[3],A17[4],A17[5],A17[6],A17[7],A17[8],A17[9]);
var a18=new Storehouse('站台一库18#',A18[0],A18[1],A18[2],A18[3],A18[4],A18[5],A18[6],A18[7],A18[8],A18[9]);
const a=new Warehouse('站台一库',a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18);   //实例化站台一库


var b1=new Storehouse('站台二库1#',B1[0],B1[1],B1[2],B1[3],B1[4],B1[5],B1[6],B1[7],B1[8],B1[9]);
var b2=new Storehouse('站台二库2#',B2[0],B2[1],B2[2],B2[3],B2[4],B2[5],B2[6],B2[7],B2[8],B2[9]);
var b3=new Storehouse('站台二库3#',B3[0],B3[1],B3[2],B3[3],B3[4],B3[5],B3[6],B3[7],B3[8],B3[9]);
var b4=new Storehouse('站台二库4#',B4[0],B4[1],B4[2],B4[3],B4[4],B4[5],B4[6],B4[7],B4[8],B4[9]);
var b5=new Storehouse('站台二库5#',B5[0],B5[1],B5[2],B5[3],B5[4],B5[5],B5[6],B5[7],B5[8],B5[9]);
var b6=new Storehouse('站台二库6#',B6[0],B6[1],B6[2],B6[3],B6[4],B6[5],B6[6],B6[7],B6[8],B6[9]);
var b7=new Storehouse('站台二库7#',B7[0],B7[1],B7[2],B7[3],B7[4],B7[5],B7[6],B7[7],B7[8],B7[9]);
var b8=new Storehouse('站台二库8#',B8[0],B8[1],B8[2],B8[3],B8[4],B8[5],B8[6],B8[7],B8[8],B8[9]);
var b9=new Storehouse('站台二库9#',B9[0],B9[1],B9[2],B9[3],B9[4],B9[5],B9[6],B9[7],B9[8],B9[9]);
var b10=new Storehouse('站台二库10#',B10[0],B10[1],B10[2],B10[3],B10[4],B10[5],B10[6],B10[7],B10[8],B10[9]);
const b =new Warehouse('站台二库',b1,b2,b3,b4,b5,b6,b7,b8,b9,b10);  //实例化站台二库

var c1=new Storehouse('4号库1#',C1[0],C1[1],C1[2],C1[3],C1[4],C1[5],C1[6],C1[7],C1[8],C1[9]);
var c2=new Storehouse('4号库2#',C2[0],C2[1],C2[2],C2[3],C2[4],C2[5],C2[6],C2[7],C2[8],C2[9]);
var c3=new Storehouse('4号库3#',C3[0],C3[1],C3[2],C3[3],C3[4],C3[5],C3[6],C3[7],C3[8],C3[9]);
var c4=new Storehouse('4号库4#',C4[0],C4[1],C4[2],C4[3],C4[4],C4[5],C4[6],C4[7],C4[8],C4[9]);
var c5=new Storehouse('4号库5#',C5[0],C5[1],C5[2],C5[3],C5[4],C5[5],C5[6],C5[7],C5[8],C5[9]);
var c6=new Storehouse('4号库6#',C6[0],C6[1],C6[2],C6[3],C6[4],C6[5],C6[6],C6[7],C6[8],C6[9]);
var c7=new Storehouse('4号库7#',C7[0],C7[1],C7[2],C7[3],C7[4],C7[5],C7[6],C7[7],C7[8],C7[9]);
var c8=new Storehouse('4号库8#',C8[0],C8[1],C8[2],C8[3],C8[4],C8[5],C8[6],C8[7],C8[8],C8[9]);
var c9=new Storehouse('4号库9#',C9[0],C9[1],C9[2],C9[3],C9[4],C9[5],C9[6],C9[7],C9[8],C9[9]);
var c10=new Storehouse('4号库10#',C10[0],C10[1],C10[2],C10[3],C10[4],C10[5],C10[6],C10[7],C10[8],C10[9]);
const c =new Warehouse('4号库',c1,c2,c3,c4,c5,c6,c7,c8,c9,c10);  //实例化4号库

var d1=new Storehouse('曲4场库1#',D1[0],D1[1],D1[2],D1[3],D1[4],D1[5],D1[6],D1[7],D1[8],D1[9]);
var d2=new Storehouse('曲4场库2#',D2[0],D2[1],D2[2],D2[3],D2[4],D2[5],D2[6],D2[7],D2[8],D2[9]);
var d3=new Storehouse('曲4场库3#',D3[0],D3[1],D3[2],D3[3],D3[4],D3[5],D3[6],D3[7],D3[8],D3[9]);
var d4=new Storehouse('曲4场库4#',D4[0],D4[1],D4[2],D4[3],D4[4],D4[5],D4[6],D4[7],D4[8],D4[9]);
var d5=new Storehouse('曲4场库5#',D5[0],D5[1],D5[2],D5[3],D5[4],D5[5],D5[6],D5[7],D5[8],D5[9]);
var d6=new Storehouse('曲4场库6#',D6[0],D6[1],D6[2],D6[3],D6[4],D6[5],D6[6],D6[7],D6[8],D6[9]);
var d7=new Storehouse('曲4场库7#',D7[0],D7[1],D7[2],D7[3],D7[4],D7[5],D7[6],D7[7],D7[8],D7[9]);
var d8=new Storehouse('曲4场库8#',D8[0],D8[1],D8[2],D8[3],D8[4],D8[5],D8[6],D8[7],D8[8],D8[9]);
var d9=new Storehouse('曲4场库9#',D9[0],D9[1],D9[2],D9[3],D9[4],D9[5],D9[6],D9[7],D9[8],D9[9]);
var d10=new Storehouse('曲4场库10#',D10[0],D10[1],D10[2],D10[3],D10[4],D10[5],D10[6],D10[7],D10[8],D10[9]);
const d =new Warehouse('曲4场库',d1,d2,d3,d4,d5,d6,d7,d8,d9,d10);  //实例化曲4场库

var e1=new Storehouse('604库1#',E1[0],E1[1],E1[2],E1[3],E1[4],E1[5],E1[6],E1[7],E1[8],E1[9]);
var e2=new Storehouse('604库2#',E2[0],E2[1],E2[2],E2[3],E2[4],E2[5],E2[6],E2[7],E2[8],E2[9]);
var e3=new Storehouse('604库3#',E3[0],E3[1],E3[2],E3[3],E3[4],E3[5],E3[6],E3[7],E3[8],E3[9]);
var e4=new Storehouse('604库4#',E4[0],E4[1],E4[2],E4[3],E4[4],E4[5],E4[6],E4[7],E4[8],E4[9]);
var e5=new Storehouse('604库5#',E5[0],E5[1],E5[2],E5[3],E5[4],E5[5],E5[6],E5[7],E5[8],E5[9]);
var e6=new Storehouse('604库6#',E6[0],E6[1],E6[2],E6[3],E6[4],E6[5],E6[6],E6[7],E6[8],E6[9]);
var e7=new Storehouse('604库7#',E7[0],E7[1],E7[2],E7[3],E7[4],E7[5],E7[6],E7[7],E7[8],E7[9]);
var e8=new Storehouse('604库8#',E8[0],E8[1],E8[2],E8[3],E8[4],E8[5],E8[6],E8[7],E8[8],E8[9]);
var e9=new Storehouse('604库9#',E9[0],E9[1],E9[2],E9[3],E9[4],E9[5],E9[6],E9[7],E9[8],E9[9]);
var e10=new Storehouse('604库10#',E10[0],E10[1],E10[2],E10[3],E10[4],E10[5],E10[6],E10[7],E10[8],E10[9]);
const e =new Warehouse('604库',e1,e2,e3,e4,e5,e6,e7,e8,e9,e10);  //实例化604cd库



//获取库位和货位信息
const kuArr=[];
const kuweiArr={};
axios.get('http://localhost:3000/getwarehouseData').then(function(res){
	res.data.forEach(function(item,index,array){
		kuArr.push(item.warehousename);
		kuweiArr[item.warehousename]=item.storehouseArr;
	})
}).catch(function(err){
	console.log(err);
	return;
})
//获取物料信息
const materialArr=[];
axios.get('http://localhost:3000/getmaterialData').then(function(res){
	res.data[0].material.forEach(function(item,index,array){
		materialArr.push(item);
	})
}).catch(function(err){
	console.log(err);
	return;
})

//获取班组信息
const truckGroup={};
const truckBanArr=[];
axios.get('http://localhost:3000/getcrewData').then(function(res){
	res.data.forEach(function(item,index,array){
		truckBanArr.push(item.crewname);
		truckGroup[item.crewname]=item.group;
	})
}).catch(function(err){
	console.log(err);
})

let oClasses='';   //班次
$.ajaxSettings.async=false;  //将jquery ajax请求变为同步请求
$.getJSON('http://localhost:3000/getShiftInfo',function(res){
	oClasses=res[0].shiftBanci;
})
$.ajaxSettings.async=true;
const store=new Vuex.Store({
	state:{
		a:a,
		b:b,
		c:c,
		d:d,
		e:e,
		newPutInfoArr:[], //入库数据
		newOutInfoArr:[],  //出库数据
		newSaleInfoArr:[],  //装车数据
		newTruckInfoArr:[],  //兑车数据
		newBackInfoArr:[],   //回填数据
		shiftData:{},        //班次信息
		kuweiArr:kuweiArr,
		kuArr:kuArr,
		truckGroup:truckGroup,
		truckBanArr:truckBanArr,
		materialArr:materialArr,
		orderInfo:[
			{"ID":'01',"ton":'',"materialName":'',"carNum":''},
			{"ID":'02',"ton":'',"materialName":'',"carNum":''},
			{"ID":'03',"ton":'',"materialName":'',"carNum":''},
			{"ID":'04',"ton":'',"materialName":'',"carNum":''},
			{"ID":'05',"ton":'',"materialName":'',"carNum":''},
			{"ID":'06',"ton":'',"materialName":'',"carNum":''},
			{"ID":'07',"ton":'',"materialName":'',"carNum":''},
			{"ID":'08',"ton":'',"materialName":'',"carNum":''},
			{"ID":'09',"ton":'',"materialName":'',"carNum":''},
			{"ID":'10',"ton":'',"materialName":'',"carNum":''},
			{"ID":'11',"ton":'',"materialName":'',"carNum":''},
		],
		Classes:oClasses      //一个储存当前班次的变量
	},
	mutations:{
		getWarehouseObj(warehouse_name){     //取得货位对象
			var a={};
			switch (warehouse_name){
				case '站台一库':
					a =state.a
					break;
				case '站台二库':
					a=state.b
					break;
				case '4号库':
					a=state.c
					break;
				case '曲4场库':
					a=state.d
					break;
				case '604库':
					a=state.e
					break;
			}
			return a;
		},
		putAInfo(state,a){  //入库表中在detail中新增一条信息的方法
			state.newPutInfoArr.push(a);
		},
		changeInfo(state,b){
			state.newPutInfoArr.forEach(function(item,index,array){
				if(item._id == b._id){
					state.newPutInfoArr.splice(index,1,b);
					return;
				}
			})
		},
		delete_Info(state,c){
			state.newPutInfoArr.forEach(function(item,index,array){
				if(item._id == c){
					state.newPutInfoArr.splice(index,1);
					return;
				}
			})
		},
		outAInfo(state,d){  //出库表中新增一条数据
			state.newOutInfoArr.push(d);
		},
		out_changeInfo(state,e){
			state.newOutInfoArr.forEach(function(item,index,array){
				if(item._id == e._id){
					state.newOutInfoArr.splice(index,1,e);
					return;
				}
			})
		},
		saleAInfo(state,e){  //装车表中新增一条数据
			state.newSaleInfoArr.push(e);
		}, 
		sale_changeInfo(state,b){
			state.newSaleInfoArr.forEach(function(item,index,array){
				if(item._id == b._id){
					state.newSaleInfoArr.splice(index,1,b);
					return;
				}
			})
		},
		TruckAInfo(state,f){  //兑车表中新增一条数据
			state.newTruckInfoArr.push(f);
		},
		truck_changeInfo(state,b){
			state.newTruckInfoArr.forEach(function(item,index,array){
				if(item._id == b._id){
					state.newTruckInfoArr.splice(index,1,b);
					return;
				}
			})
		},
		BackAInfo(state,g){  //回填表中新增一条数据
			state.newBackInfoArr.push(g);  
		},
		back_changeInfo(state,b){
			state.newBackInfoArr.forEach(function(item,index,array){
				if(item._id == b._id){
					state.newBackInfoArr.splice(index,1,b);
					return;
				}
			})
		},
		shiftAInfo(state,h){
				state.shiftData=h;
		}

	},
	actions:{

	},
	getters:{

	}
}) ;

export default store;