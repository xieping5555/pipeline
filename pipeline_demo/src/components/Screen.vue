<template>
	<div id="screen">
		<div class="screen_wrapper">
			<div class="container">
				<div class="row">
					<Window name='一号流水线' ID='01' :nodeStatus='pipelineReturnData[0].nodeStatus' :sensorStatus='pipelineReturnData[0].sensorStatus' :lineTask='pipelineReturnData[0].lineTask' :lineDone='pipelineReturnData[0].lineDone' :totalLine='pipelineReturnData[0].totalLine' :time='pipelineReturnData[0].time' :RemainingTime='pipelineReturnData[0].RemainingTime'></Window>
					<Window name='二号流水线' ID='02'></Window>
				</div>
				<div class="row">
					<Window name='三号流水线' ID='03'></Window>
					<Window name='四号流水线' ID='04'></Window>
				</div>
				<div class="row">
					<Window name='五号流水线' ID='05'></Window>
					<Window name='六号流水线' ID='06'></Window>
				</div>
				<div class="row">
					<Window name='七号流水线' ID='07'></Window>
					<Window name='八号流水线' ID='08'></Window>
				</div>
				<div class="row">
					<Window name='九号流水线' ID='09'></Window>
					<Window name='十号流水线' ID='10'></Window>
				</div>
				<div class="row">
					<Window name='十一号流水线' ID='11'></Window>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	import Window from './window.vue'
	export default{
		data(){
			return {
				time:'',
				pipelineReturnData:[   //流水线上位机返回的状态
					{
						'ID':'01',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'02',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{	
						'ID':'03',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'04',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'05',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'06',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'07',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'08',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'09',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'10',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					},{
						'ID':'11',
						'nodeStatus':'',
				      	'sensorStatus':'',
				      	'lineTask':'',
				      	'lineDone':'',
				      	'totalLine':'',
				      	'time':'',
				      	'RemainingTime':''
					}
				]
			}
		},
		computed:{
			
		},
		mounted(){
			const _this=this;
			this.$socket.on('returnData',function(data){
				_this.pipelineReturnData.forEach(function(item,index,array){
					data.forEach(function(oItem,oIndex,oArray){
						if(item.ID==oItem.ID){
							switch(oItem.nodeStatus){
								case '00':
									item.nodeStatus='无任务';
									break;
								case '01':
									item.nodeStatus='正在生产';
									break;
								case '02':
									item.nodeStatus='完成生产';
									break;
							};
							switch(oItem.sensorStatus){
								case '00':
									item.sensorStatus='主:yes/备:yes';
									break;
								case '01':
									item.sensorStatus='主:yes/备:no';
									break;
								case '02':
									item.sensorStatus='主:no/备:yes';
									break;
								case '03':
									item.sensorStatus='主:no/备:no';
									break;
							};
							item.lineTask=oItem.lineTask;
							item.lineDone=oItem.lineDone;
							item.totalLine=oItem.totalLine;
							item.time=oItem.time.substr(0,4)+"-"+oItem.time.substr(4,2)+'-'+oItem.time.substr(6,2)+' '+oItem.time.substr(8,2)+':'+oItem.time.substr(10,2)+':'+oItem.time.substr(12,2);
							item.RemainingTime=_this.countDown(_this.totalHours(oItem.lineTask-oItem.lineDone));
						}
					})
				})		
			});
		},
		components:{
			"Window":Window
		},
		methods:{
			totalHours(num){
				let totalTime = num*5;
				let h,m,s;
				h=Math.floor(totalTime/3600)>9?Math.floor(totalTime/3600):"0"+Math.floor(totalTime/3600);
				m=Math.floor(Math.floor(totalTime%3600)/60)>9?Math.floor(Math.floor(totalTime%3600)/60):"0"+Math.floor(Math.floor(totalTime%3600)/60);
				s=Math.floor(Math.floor(totalTime%3600)%60)>9?Math.floor(Math.floor(totalTime%3600)%60):"0"+Math.floor(Math.floor(totalTime%3600)%60);
				return h+':'+m+':'+s;
			},
			countDown(a){
				let arr=a.split(':');
				let h=arr[0],m=arr[1],s=arr[2];
				s--;
				if(s <= -1){
					m--;
					if(h == 0&&m <=0&&s <=0){
						return "00:00:00";
					};
					s=59;
					if(m <= -1){
						h--;
						m=59;
					}
				}
				let hh=h,mm=m,ss=s;
				if(hh.toString().length == 1){
					hh="0"+hh;
				};
				if(mm.toString().length == 1){
					mm="0"+mm;
				};
				if(ss.toString().length == 1){
					ss="0"+ss;
				};
				return hh+':'+mm+':'+ss;
			}
		}
	}
</script>
<style scoped lang="scss">
	.screen_wrapper{
		padding:15px;
	}
</style>