<template>
	<div id="home">
		<!-- 模态框 -->
		<div class="modal fade" id="myHomeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		                <h4 class="modal-title" id="myModalLabel">请输入待办事项</h4>
		            </div>
		            <div class="modal-body"><textarea name="" id="" cols="30" rows="10" class='form-control'></textarea></div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click.prevent='issueSubmit'>提交</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
		<!-- 模态框 -->

		<div class="row">
			<div class="col-md-2">
				<div class="panel panel-primary">
					<div class="panel-heading">
				        <h3 class="panel-title text-center">站台一库</h3>
				    </div>
				    <div class="panel-body">
				       	<div class="media">
				       		<a class="pull-left">
				       			<img src="http://localhost:8082/src/assets/img/laba.png" height="20px" width="20px" class="media-object">
				       		</a>
				       		<div class="media-body backlog"><ol><li v-for='backlog in zhantaiyikuBACKLOG'>{{backlog}}</li></ol></div>
				       	</div>			        
				    </div>
				    <div class="panel-footer panel-info">
				    	<div class="row">
				    		<div class="col-md-8 col-md-offset-4">
				    			<button class="btn btn-danger btn-xs" id="zhantaiyikuClear" @click.prevent='clearBacklog'>清空</button>
				    			<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#myHomeModal' id="zhantaiyikuIssue" @click.prevent='getDistinguishID'>发布</button>
				    		</div>					    	
				    	</div>
				    </div>
				</div>
			</div>
			<div class="col-md-10">
				<div id="main1" style="height:400px;width:100%">
					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<div class="panel panel-primary">
					<div class="panel-heading">
				        <h3 class="panel-title text-center">站台二库</h3>
				    </div>
				    <div class="panel-body">
				       	<div class="media">
				       		<a class="pull-left">
				       			<img src="http://localhost:8082/src/assets/img/laba.png" height="20px" width="20px" class="media-object">
				       		</a>
				       		<div class="media-body backlog"><ol><li v-for='backlog in zhantaierkuBACKLOG'>{{backlog}}</li></ol></div>
				       	</div>			        
				    </div>
				    <div class="panel-footer panel-info">
				    	<div class="row">
				    		<div class="col-md-8 col-md-offset-4">
				    			<button class="btn btn-danger btn-xs" id="zhantaierkuClear" @click.prevent='clearBacklog'>清空</button>
				    			<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#myHomeModal' id="zhantaierkuIssue" @click.prevent='getDistinguishID'>发布</button>
				    		</div>					    	
				    	</div>
				    </div>
				</div>
			</div>
			<div class="col-md-10">
				<div id="main2" style="height:400px;width:100%">
					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<div class="panel panel-primary">
					<div class="panel-heading">
				        <h3 class="panel-title text-center">4号库</h3>
				    </div>
				    <div class="panel-body">
				       	<div class="media">
				       		<a class="pull-left">
				       			<img src="http://localhost:8082/src/assets/img/laba.png" height="20px" width="20px" class="media-object">
				       		</a>
				       		<div class="media-body backlog"><ol><li v-for='backlog in sihaokuBACKLOG'>{{backlog}}</li></ol></div>
				       	</div>			        
				    </div>
				    <div class="panel-footer panel-info">
				    	<div class="row">
				    		<div class="col-md-8 col-md-offset-4">
				    			<button class="btn btn-danger btn-xs" id="sihaokuClear" @click.prevent='clearBacklog'>清空</button>
				    			<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#myHomeModal' id="sihaokuIssue" @click.prevent='getDistinguishID'>发布</button>
				    		</div>					    	
				    	</div>
				    </div>
				</div>
			</div>
			<div class="col-md-10">
				<div id="main3" style="height:400px;width:100%">

					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<div class="panel panel-primary">
					<div class="panel-heading">
				        <h3 class="panel-title text-center">曲4场库</h3>
				    </div>
				    <div class="panel-body">
				       	<div class="media">
				       		<a class="pull-left">
				       			<img src="http://localhost:8082/src/assets/img/laba.png" height="20px" width="20px" class="media-object">
				       		</a>
				       		<div class="media-body backlog"><ol><li v-for='backlog in qusichangkuBACKLOG'>{{backlog}}</li></ol></div>
				       	</div>			        
				    </div>
				    <div class="panel-footer panel-info">
				    	<div class="row">
				    		<div class="col-md-8 col-md-offset-4">
				    			<button class="btn btn-danger btn-xs" id="qusichangkuClear" @click.prevent='clearBacklog'>清空</button>
				    			<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#myHomeModal' id="qusichangkuIssue" @click.prevent='getDistinguishID'>发布</button>
				    		</div>				 	    	
				    	</div>
				    </div>
				</div>
			</div>
			<div class="col-md-10">
				<div id="main4" style="height:400px;width:100%">
					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<div class="panel panel-primary">
					<div class="panel-heading">
				        <h3 class="panel-title text-center">604库</h3>
				    </div>
				    <div class="panel-body">
				       	<div class="media">
				       		<a class="pull-left">
				       			<img src="http://localhost:8082/src/assets/img/laba.png" height="20px" width="20px" class="media-object">
				       		</a>
				       		<div class="media-body backlog"><ol><li v-for='backlog in liulingsikuBACKLOG'>{{backlog}}</li></ol></div>
				       	</div>			        
				    </div>
				    <div class="panel-footer panel-info">
				    	<div class="row">
				    		<div class="col-md-8 col-md-offset-4">
				    			<button class="btn btn-danger btn-xs" id="liulingsikuClear" @click.prevent='clearBacklog'>清空</button>
				    			<button class="btn btn-primary btn-xs" data-toggle='modal' data-target='#myHomeModal' id="liulingsikuIssue" @click.prevent='getDistinguishID'>发布</button>
				    		</div>					    	
				    	</div>
				    </div>
				</div>
			</div>
			<div class="col-md-10">
				<div id="main5" style="height:400px;width:100%">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import echarts from 'echarts';
	import qs from 'qs';
	export default{
		data(){
			return {
				zhantaiyikuBACKLOG:'',
				zhantaierkuBACKLOG:'',
				sihaokuBACKLOG:'',
				qusichangkuBACKLOG:'',
				liulingsikuBACKLOG:'',
				distinguishID:''        //一个分辨是那个需要发布待办事项的库的ID
			}
		},
		computed:{
			...mapState([
				"a",
				"b",
				"c",
				"d",
				"e"
			])
		},
		methods:{
			getDistinguishID(ev){
				switch (ev.target.id){
					case 'zhantaiyikuIssue':
						this.distinguishID='01';
						break;
					case 'zhantaierkuIssue':
						this.distinguishID='02';
						break;
					case 'sihaokuIssue':
						this.distinguishID='03';
						break;
					case 'qusichangkuIssue':
						this.distinguishID='04';
						break;
					case 'liulingsikuIssue':
						this.distinguishID='05';
						break;
				}
			},
			issueSubmit(){
				const _this=this;
				let distinguishID=this.distinguishID,issueInfo=$('textarea').val();
				this.$http.post('http://localhost:3000/submitIssue',qs.stringify({
					issueInfo:issueInfo,
					distinguishID:distinguishID
				})).then(function(res){
					switch (distinguishID){
						case '01':
							_this.zhantaiyikuBACKLOG.push(issueInfo);
							break;
						case '02':
							_this.zhantaierkuBACKLOG.push(issueInfo);
							break;
						case '03':
							_this.sihaokuBACKLOG.push(issueInfo);
							break;
						case '04':
							_this.qusichangkuBACKLOG.push(issueInfo);
							break;
						case '05':
							_this.liulingsikuBACKLOG.push(issueInfo);
							break;
					}
					$('textarea').val('');
				}).catch(function(err){
					console.log(err);
					return;
				})
				$('#myHomeModal').modal('hide');
			},
			getBacklog(){
				const _this=this;
				this.$http.get('http://localhost:3000/getBacklog').then(function(res){
					const infoArr=res.data;
					infoArr.forEach(function(item,index,array){
						switch(item.ID){
							case '01':
								_this.zhantaiyikuBACKLOG=item.issueInfo;
								break;
							case '02':
								_this.zhantaierkuBACKLOG=item.issueInfo;
								break;
							case '03':
								_this.sihaokuBACKLOG=item.issueInfo;
								break;
							case '04':
								_this.qusichangkuBACKLOG=item.issueInfo;
								break;
							case '05':
								_this.liulingsikuBACKLOG=item.issueInfo;
								break;
						}
					})
				}).catch(function(){
					console.log(err);
					return;
				})
			},
			clearBacklog(ev){
				switch (ev.target.id){
					case 'zhantaiyikuClear':
						this.distinguishID='01';
						break;
					case 'zhantaierkuClear':
						this.distinguishID='02';
						break;
					case 'sihaokuClear':
						this.distinguishID='03';
						break;
					case 'qusichangkuClear':
						this.distinguishID='04';
						break;
					case 'liulingsikuClear':
						this.distinguishID='05';
						break;
				}
				const _this=this;
				this.$http.get('http://localhost:3000/clearBacklog',{
					params:{
						distinguishID:_this.distinguishID
					}
				}).then(function(res){
					switch (_this.distinguishID){
					case '01':
						_this.zhantaiyikuBACKLOG=[];
						break;
					case '02':
						_this.zhantaierkuBACKLOG=[];
						break;
					case '03':
						_this.sihaokuBACKLOG=[];
						break;
					case '04':
						_this.qusichangkuBACKLOG=[];
						break;
					case '05':
						_this.liulingsikuBACKLOG=[];
						break;
					}
					alert('清空成功');
				}).catch(function(err){
					console.log(err);
					return;
				})
			}
		},
		mounted(){
			this.getBacklog();
			function animated(el){
				const animateCB=function(){
				if(el.css('top') == '-200px'){
						el.css({"top":"200px"});
						el.animate({"top":"-200px"},9000,animateCB);
					}
				};
				el.animate({"top":"-200px"},9000,animateCB);
			};
			animated($($('.backlog')[0]));
			animated($($('.backlog')[1]));
			animated($($('.backlog')[2]));
			animated($($('.backlog')[3]));
			animated($($('.backlog')[4]));
			var mychart1 =echarts.init(document.getElementById('main1'));
			mychart1.setOption({
				title:{},
				legend:{
					data:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%']
				},
				tooltip:{},
				xAxis:{
					data:['1#','2#','3#','4#','5#','6#','7#','8#','9#','10#','11#','12#','13#','14#','15#','16#','17#','18#']
				},
				yAxis:{},
				series:[{
					name:'43%',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[0].num,this.a.a2.kind[0].num,this.a.a3.kind[0].num,this.a.a4.kind[0].num,this.a.a5.kind[0].num,this.a.a6.kind[0].num,this.a.a7.kind[0].num,this.a.a8.kind[0].num,this.a.a9.kind[0].num,this.a.a10.kind[0].num,this.a.a11.kind[0].num,this.a.a12.kind[0].num,this.a.a13.kind[0].num,this.a.a14.kind[0].num,this.a.a15.kind[0].num,this.a.a16.kind[0].num,this.a.a17.kind[0].num,this.a.a18.kind[0].num]
				},{
					name:'棕粒粕',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[1].num,this.a.a2.kind[1].num,this.a.a3.kind[1].num,this.a.a4.kind[1].num,this.a.a5.kind[1].num,this.a.a6.kind[1].num,this.a.a7.kind[1].num,this.a.a8.kind[1].num,this.a.a9.kind[1].num,this.a.a10.kind[1].num,this.a.a11.kind[1].num,this.a.a12.kind[1].num,this.a.a13.kind[1].num,this.a.a14.kind[1].num,this.a.a15.kind[1].num,this.a.a16.kind[1].num,this.a.a17.kind[1].num,this.a.a18.kind[1].num]
				},
				{
					name:'43%吨袋',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[2].num,this.a.a2.kind[2].num,this.a.a3.kind[2].num,this.a.a4.kind[2].num,this.a.a5.kind[2].num,this.a.a6.kind[2].num,this.a.a7.kind[2].num,this.a.a8.kind[2].num,this.a.a9.kind[2].num,this.a.a10.kind[2].num,this.a.a11.kind[2].num,this.a.a12.kind[2].num,this.a.a13.kind[2].num,this.a.a14.kind[2].num,this.a.a15.kind[2].num,this.a.a16.kind[2].num,this.a.a17.kind[2].num,this.a.a18.kind[2].num]
				},
				{
					name:'低纤维47%',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[3].num,this.a.a2.kind[3].num,this.a.a3.kind[3].num,this.a.a4.kind[3].num,this.a.a5.kind[3].num,this.a.a6.kind[3].num,this.a.a7.kind[3].num,this.a.a8.kind[3].num,this.a.a9.kind[3].num,this.a.a10.kind[3].num,this.a.a11.kind[3].num,this.a.a12.kind[3].num,this.a.a13.kind[3].num,this.a.a14.kind[3].num,this.a.a15.kind[3].num,this.a.a16.kind[3].num,this.a.a17.kind[3].num,this.a.a18.kind[3].num]
				},
				{
					name:'定制2粕',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[4].num,this.a.a2.kind[4].num,this.a.a3.kind[4].num,this.a.a4.kind[4].num,this.a.a5.kind[4].num,this.a.a6.kind[4].num,this.a.a7.kind[4].num,this.a.a8.kind[4].num,this.a.a9.kind[4].num,this.a.a10.kind[4].num,this.a.a11.kind[4].num,this.a.a12.kind[4].num,this.a.a13.kind[4].num,this.a.a14.kind[4].num,this.a.a15.kind[4].num,this.a.a16.kind[4].num,this.a.a17.kind[4].num,this.a.a18.kind[4].num]
				},
				{
					name:'大豆粉',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[5].num,this.a.a2.kind[5].num,this.a.a3.kind[5].num,this.a.a4.kind[5].num,this.a.a5.kind[5].num,this.a.a6.kind[5].num,this.a.a7.kind[5].num,this.a.a8.kind[5].num,this.a.a9.kind[5].num,this.a.a10.kind[5].num,this.a.a11.kind[5].num,this.a.a12.kind[5].num,this.a.a13.kind[5].num,this.a.a14.kind[5].num,this.a.a15.kind[5].num,this.a.a16.kind[5].num,this.a.a17.kind[5].num,this.a.a18.kind[5].num]
				},
				{
					name:'豆皮',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[6].num,this.a.a2.kind[6].num,this.a.a3.kind[6].num,this.a.a4.kind[6].num,this.a.a5.kind[6].num,this.a.a6.kind[6].num,this.a.a7.kind[6].num,this.a.a8.kind[6].num,this.a.a9.kind[6].num,this.a.a10.kind[6].num,this.a.a11.kind[6].num,this.a.a12.kind[6].num,this.a.a13.kind[6].num,this.a.a14.kind[6].num,this.a.a15.kind[6].num,this.a.a16.kind[6].num,this.a.a17.kind[6].num,this.a.a18.kind[6].num]
				},
				{
					name:'豆奶宝',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[7].num,this.a.a2.kind[7].num,this.a.a3.kind[7].num,this.a.a4.kind[7].num,this.a.a5.kind[7].num,this.a.a6.kind[7].num,this.a.a7.kind[7].num,this.a.a8.kind[7].num,this.a.a9.kind[7].num,this.a.a10.kind[7].num,this.a.a11.kind[7].num,this.a.a12.kind[7].num,this.a.a13.kind[7].num,this.a.a14.kind[7].num,this.a.a15.kind[7].num,this.a.a16.kind[7].num,this.a.a17.kind[7].num,this.a.a18.kind[7].num]
				},
				{
					name:'45%',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[8].num,this.a.a2.kind[8].num,this.a.a3.kind[8].num,this.a.a4.kind[8].num,this.a.a5.kind[8].num,this.a.a6.kind[8].num,this.a.a7.kind[8].num,this.a.a8.kind[8].num,this.a.a9.kind[8].num,this.a.a10.kind[8].num,this.a.a11.kind[8].num,this.a.a12.kind[8].num,this.a.a13.kind[8].num,this.a.a14.kind[8].num,this.a.a15.kind[8].num,this.a.a16.kind[8].num,this.a.a17.kind[8].num,this.a.a18.kind[8].num]
				},
				{
					name:'46%',
					type:'bar',
					stack:'种类',
					data:[this.a.a1.kind[9].num,this.a.a2.kind[9].num,this.a.a3.kind[9].num,this.a.a4.kind[9].num,this.a.a5.kind[9].num,this.a.a6.kind[9].num,this.a.a7.kind[9].num,this.a.a8.kind[9].num,this.a.a9.kind[9].num,this.a.a10.kind[9].num,this.a.a11.kind[9].num,this.a.a12.kind[9].num,this.a.a13.kind[9].num,this.a.a14.kind[9].num,this.a.a15.kind[9].num,this.a.a16.kind[9].num,this.a.a17.kind[9].num,this.a.a18.kind[9].num]
				},]
			});
			var mychart2 =echarts.init(document.getElementById('main2'));
			mychart2.setOption({
				title:{},
				legend:{
					data:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%']
				},
				tooltip:{},
				xAxis:{
					data:['1#','2#','3#','4#','5#','6#','7#','8#','9#','10#']
				},
				yAxis:{},
				series:[{
					name:'43%',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[0].num,this.b.a2.kind[0].num,this.b.a3.kind[0].num,this.b.a4.kind[0].num,this.b.a5.kind[0].num,this.b.a6.kind[0].num,this.b.a7.kind[0].num,this.b.a8.kind[0].num,this.b.a9.kind[0].num,this.b.a10.kind[0].num]
				},
				{
					name:'棕粒粕',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[1].num,this.b.a2.kind[1].num,this.b.a3.kind[1].num,this.b.a4.kind[1].num,this.b.a5.kind[1].num,this.b.a6.kind[1].num,this.b.a7.kind[1].num,this.b.a8.kind[1].num,this.b.a9.kind[1].num,this.b.a10.kind[1].num]
				},
				{
					name:'43%吨袋',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[2].num,this.b.a2.kind[2].num,this.b.a3.kind[2].num,this.b.a4.kind[2].num,this.b.a5.kind[2].num,this.b.a6.kind[2].num,this.b.a7.kind[2].num,this.b.a8.kind[2].num,this.b.a9.kind[2].num,this.b.a10.kind[2].num]
				},
				{
					name:'低纤维47%',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[3].num,this.b.a2.kind[3].num,this.b.a3.kind[3].num,this.b.a4.kind[3].num,this.b.a5.kind[3].num,this.b.a6.kind[3].num,this.b.a7.kind[3].num,this.b.a8.kind[3].num,this.b.a9.kind[3].num,this.b.a10.kind[3].num]
				},
				{
					name:'定制2粕',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[4].num,this.b.a2.kind[4].num,this.b.a3.kind[4].num,this.b.a4.kind[4].num,this.b.a5.kind[4].num,this.b.a6.kind[4].num,this.b.a7.kind[4].num,this.b.a8.kind[4].num,this.b.a9.kind[4].num,this.b.a10.kind[4].num]
				},
				{
					name:'大豆粉',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[5].num,this.b.a2.kind[5].num,this.b.a3.kind[5].num,this.b.a4.kind[5].num,this.b.a5.kind[5].num,this.b.a6.kind[5].num,this.b.a7.kind[5].num,this.b.a8.kind[5].num,this.b.a9.kind[5].num,this.b.a10.kind[5].num]
				},
				{
					name:'豆皮',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[6].num,this.b.a2.kind[6].num,this.b.a3.kind[6].num,this.b.a4.kind[6].num,this.b.a5.kind[6].num,this.b.a6.kind[6].num,this.b.a7.kind[6].num,this.b.a8.kind[6].num,this.b.a9.kind[6].num,this.b.a10.kind[6].num]
				},
				{
					name:'豆奶宝',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[7].num,this.b.a2.kind[7].num,this.b.a3.kind[7].num,this.b.a4.kind[7].num,this.b.a5.kind[7].num,this.b.a6.kind[7].num,this.b.a7.kind[7].num,this.b.a8.kind[7].num,this.b.a9.kind[7].num,this.b.a10.kind[7].num]
				},
				{
					name:'45%',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[8].num,this.b.a2.kind[8].num,this.b.a3.kind[8].num,this.b.a4.kind[8].num,this.b.a5.kind[8].num,this.b.a6.kind[8].num,this.b.a7.kind[8].num,this.b.a8.kind[8].num,this.b.a9.kind[8].num,this.b.a10.kind[8].num]
				},
				{
					name:'46%',
					type:'bar',
					stack:'种类',
					data:[this.b.a1.kind[9].num,this.b.a2.kind[9].num,this.b.a3.kind[9].num,this.b.a4.kind[9].num,this.b.a5.kind[9].num,this.b.a6.kind[9].num,this.b.a7.kind[9].num,this.b.a8.kind[9].num,this.b.a9.kind[9].num,this.b.a10.kind[9].num]
				}]
			});
			var mychart3 =echarts.init(document.getElementById('main3'));
			mychart3.setOption({
				title:{},
				legend:{
					data:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%']
				},
				tooltip:{},
				xAxis:{
					data:['1#','2#','3#','4#','5#','6#','7#','8#','9#','10#']
				},
				yAxis:{},
				series:[{
					name:'43%',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[0].num,this.c.a2.kind[0].num,this.c.a3.kind[0].num,this.c.a4.kind[0].num,this.c.a5.kind[0].num,this.c.a6.kind[0].num,this.c.a7.kind[0].num,this.c.a8.kind[0].num,this.c.a9.kind[0].num,this.c.a10.kind[0].num]
				},
				{
					name:'棕粒粕',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[1].num,this.c.a2.kind[1].num,this.c.a3.kind[1].num,this.c.a4.kind[1].num,this.c.a5.kind[1].num,this.c.a6.kind[1].num,this.c.a7.kind[1].num,this.c.a8.kind[1].num,this.c.a9.kind[1].num,this.c.a10.kind[1].num]
				},
				{
					name:'43%吨袋',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[2].num,this.c.a2.kind[2].num,this.c.a3.kind[2].num,this.c.a4.kind[2].num,this.c.a5.kind[2].num,this.c.a6.kind[2].num,this.c.a7.kind[2].num,this.c.a8.kind[2].num,this.c.a9.kind[2].num,this.c.a10.kind[2].num]
				},
				{
					name:'低纤维47%',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[3].num,this.c.a2.kind[3].num,this.c.a3.kind[3].num,this.c.a4.kind[3].num,this.c.a5.kind[3].num,this.c.a6.kind[3].num,this.c.a7.kind[3].num,this.c.a8.kind[3].num,this.c.a9.kind[3].num,this.c.a10.kind[3].num]
				},
				{
					name:'定制2粕',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[4].num,this.c.a2.kind[4].num,this.c.a3.kind[4].num,this.c.a4.kind[4].num,this.c.a5.kind[4].num,this.c.a6.kind[4].num,this.c.a7.kind[4].num,this.c.a8.kind[4].num,this.c.a9.kind[4].num,this.c.a10.kind[4].num]
				},
				{
					name:'大豆粉',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[5].num,this.c.a2.kind[5].num,this.c.a3.kind[5].num,this.c.a4.kind[5].num,this.c.a5.kind[5].num,this.c.a6.kind[5].num,this.c.a7.kind[5].num,this.c.a8.kind[5].num,this.c.a9.kind[5].num,this.c.a10.kind[5].num]
				},
				{
					name:'豆皮',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[6].num,this.c.a2.kind[6].num,this.c.a3.kind[6].num,this.c.a4.kind[6].num,this.c.a5.kind[6].num,this.c.a6.kind[6].num,this.c.a7.kind[6].num,this.c.a8.kind[6].num,this.c.a9.kind[6].num,this.c.a10.kind[6].num]
				},
				{
					name:'豆奶宝',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[7].num,this.c.a2.kind[7].num,this.c.a3.kind[7].num,this.c.a4.kind[7].num,this.c.a5.kind[7].num,this.c.a6.kind[7].num,this.c.a7.kind[7].num,this.c.a8.kind[7].num,this.c.a9.kind[7].num,this.c.a10.kind[7].num]
				},
				{
					name:'45%',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[8].num,this.c.a2.kind[8].num,this.c.a3.kind[8].num,this.c.a4.kind[8].num,this.c.a5.kind[8].num,this.c.a6.kind[8].num,this.c.a7.kind[8].num,this.c.a8.kind[8].num,this.c.a9.kind[8].num,this.c.a10.kind[8].num]
				},
				{
					name:'46%',
					type:'bar',
					stack:'种类',
					data:[this.c.a1.kind[9].num,this.c.a2.kind[9].num,this.c.a3.kind[9].num,this.c.a4.kind[9].num,this.c.a5.kind[9].num,this.c.a6.kind[9].num,this.c.a7.kind[9].num,this.c.a8.kind[9].num,this.c.a9.kind[9].num,this.c.a10.kind[9].num]
				}]
			});
			var mychart4 =echarts.init(document.getElementById('main4'));
			mychart4.setOption({
				title:{},
				legend:{
					data:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%']
				},
				tooltip:{},
				xAxis:{
					data:['1#','2#','3#','4#','5#','6#','7#','8#','9#','10#']
				},
				yAxis:{},
				series:[{
					name:'43%',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[0].num,this.d.a2.kind[0].num,this.d.a3.kind[0].num,this.d.a4.kind[0].num,this.d.a5.kind[0].num,this.d.a6.kind[0].num,this.d.a7.kind[0].num,this.d.a8.kind[0].num,this.d.a9.kind[0].num,this.d.a10.kind[0].num]
				},
				{
					name:'棕粒粕',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[1].num,this.d.a2.kind[1].num,this.d.a3.kind[1].num,this.d.a4.kind[1].num,this.d.a5.kind[1].num,this.d.a6.kind[1].num,this.d.a7.kind[1].num,this.d.a8.kind[1].num,this.d.a9.kind[1].num,this.d.a10.kind[1].num]
				},
				{
					name:'43%吨袋',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[2].num,this.d.a2.kind[2].num,this.d.a3.kind[2].num,this.d.a4.kind[2].num,this.d.a5.kind[2].num,this.d.a6.kind[2].num,this.d.a7.kind[2].num,this.d.a8.kind[2].num,this.d.a9.kind[2].num,this.d.a10.kind[2].num]
				},
				{
					name:'低纤维47%',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[3].num,this.d.a2.kind[3].num,this.d.a3.kind[3].num,this.d.a4.kind[3].num,this.d.a5.kind[3].num,this.d.a6.kind[3].num,this.d.a7.kind[3].num,this.d.a8.kind[3].num,this.d.a9.kind[3].num,this.d.a10.kind[3].num]
				},
				{
					name:'定制2粕',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[4].num,this.d.a2.kind[4].num,this.d.a3.kind[4].num,this.d.a4.kind[4].num,this.d.a5.kind[4].num,this.d.a6.kind[4].num,this.d.a7.kind[4].num,this.d.a8.kind[4].num,this.d.a9.kind[4].num,this.d.a10.kind[4].num]
				},
				{
					name:'大豆粉',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[5].num,this.d.a2.kind[5].num,this.d.a3.kind[5].num,this.d.a4.kind[5].num,this.d.a5.kind[5].num,this.d.a6.kind[5].num,this.d.a7.kind[5].num,this.d.a8.kind[5].num,this.d.a9.kind[5].num,this.d.a10.kind[5].num]
				},
				{
					name:'豆皮',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[6].num,this.d.a2.kind[6].num,this.d.a3.kind[6].num,this.d.a4.kind[6].num,this.d.a5.kind[6].num,this.d.a6.kind[6].num,this.d.a7.kind[6].num,this.d.a8.kind[6].num,this.d.a9.kind[6].num,this.d.a10.kind[6].num]
				},
				{
					name:'豆奶宝',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[7].num,this.d.a2.kind[7].num,this.d.a3.kind[7].num,this.d.a4.kind[7].num,this.d.a5.kind[7].num,this.d.a6.kind[7].num,this.d.a7.kind[7].num,this.d.a8.kind[7].num,this.d.a9.kind[7].num,this.d.a10.kind[7].num]
				},
				{
					name:'45%',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[8].num,this.d.a2.kind[8].num,this.d.a3.kind[8].num,this.d.a4.kind[8].num,this.d.a5.kind[8].num,this.d.a6.kind[8].num,this.d.a7.kind[8].num,this.d.a8.kind[8].num,this.d.a9.kind[8].num,this.d.a10.kind[8].num]
				},
				{
					name:'46%',
					type:'bar',
					stack:'种类',
					data:[this.d.a1.kind[9].num,this.d.a2.kind[9].num,this.d.a3.kind[9].num,this.d.a4.kind[9].num,this.d.a5.kind[9].num,this.d.a6.kind[9].num,this.d.a7.kind[9].num,this.d.a8.kind[9].num,this.d.a9.kind[9].num,this.d.a10.kind[9].num]
				}]
			});
			var mychart5 =echarts.init(document.getElementById('main5'));
			mychart5.setOption({
				title:{},
				legend:{
					data:['43%','棕粒粕','43%吨袋','低纤维47%','定制2粕','大豆粉','豆皮','豆奶宝','45%','46%']
				},
				tooltip:{},
				xAxis:{
					data:['1#','2#','3#','4#','5#','6#','7#','8#','9#','10#']
				},
				yAxis:{},
				series:[{
					name:'43%',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[0].num,this.e.a2.kind[0].num,this.e.a3.kind[0].num,this.e.a4.kind[0].num,this.e.a5.kind[0].num,this.e.a6.kind[0].num,this.e.a7.kind[0].num,this.e.a8.kind[0].num,this.e.a9.kind[0].num,this.e.a10.kind[0].num]
				},
				{
					name:'棕粒粕',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[1].num,this.e.a2.kind[1].num,this.e.a3.kind[1].num,this.e.a4.kind[1].num,this.e.a5.kind[1].num,this.e.a6.kind[1].num,this.e.a7.kind[1].num,this.e.a8.kind[1].num,this.e.a9.kind[1].num,this.e.a10.kind[1].num]
				},
				{
					name:'43%吨袋',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[2].num,this.e.a2.kind[2].num,this.e.a3.kind[2].num,this.e.a4.kind[2].num,this.e.a5.kind[2].num,this.e.a6.kind[2].num,this.e.a7.kind[2].num,this.e.a8.kind[2].num,this.e.a9.kind[2].num,this.e.a10.kind[2].num]
				},
				{
					name:'低纤维47%',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[3].num,this.e.a2.kind[3].num,this.e.a3.kind[3].num,this.e.a4.kind[3].num,this.e.a5.kind[3].num,this.e.a6.kind[3].num,this.e.a7.kind[3].num,this.e.a8.kind[3].num,this.e.a9.kind[3].num,this.e.a10.kind[3].num]
				},
				{
					name:'定制2粕',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[4].num,this.e.a2.kind[4].num,this.e.a3.kind[4].num,this.e.a4.kind[4].num,this.e.a5.kind[4].num,this.e.a6.kind[4].num,this.e.a7.kind[4].num,this.e.a8.kind[4].num,this.e.a9.kind[4].num,this.e.a10.kind[4].num]
				},
				{
					name:'大豆粉',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[5].num,this.e.a2.kind[5].num,this.e.a3.kind[5].num,this.e.a4.kind[5].num,this.e.a5.kind[5].num,this.e.a6.kind[5].num,this.e.a7.kind[5].num,this.e.a8.kind[5].num,this.e.a9.kind[5].num,this.e.a10.kind[5].num]
				},
				{
					name:'豆皮',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[6].num,this.e.a2.kind[6].num,this.e.a3.kind[6].num,this.e.a4.kind[6].num,this.e.a5.kind[6].num,this.e.a6.kind[6].num,this.e.a7.kind[6].num,this.e.a8.kind[6].num,this.e.a9.kind[6].num,this.e.a10.kind[6].num]
				},
				{
					name:'豆奶宝',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[7].num,this.e.a2.kind[7].num,this.e.a3.kind[7].num,this.e.a4.kind[7].num,this.e.a5.kind[7].num,this.e.a6.kind[7].num,this.e.a7.kind[7].num,this.e.a8.kind[7].num,this.e.a9.kind[7].num,this.e.a10.kind[7].num]
				},
				{
					name:'45%',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[8].num,this.e.a2.kind[8].num,this.e.a3.kind[8].num,this.e.a4.kind[8].num,this.e.a5.kind[8].num,this.e.a6.kind[8].num,this.e.a7.kind[8].num,this.e.a8.kind[8].num,this.e.a9.kind[8].num,this.e.a10.kind[8].num]
				},
				{
					name:'46%',
					type:'bar',
					stack:'种类',
					data:[this.e.a1.kind[9].num,this.e.a2.kind[9].num,this.e.a3.kind[9].num,this.e.a4.kind[9].num,this.e.a5.kind[9].num,this.e.a6.kind[9].num,this.e.a7.kind[9].num,this.e.a8.kind[9].num,this.e.a9.kind[9].num,this.e.a10.kind[9].num]
				}]
			})
		}
	}
</script>
<style lang='scss' scoped>
	#home{
		padding: 20px;
		background: #fff;
	}
	.media-body{
		width: 100%;
		height: 100%;
		word-break:break-all;
		position: relative;
		height: 170px;
		top: 200px;
		ol{
			padding-left: 0 !important;
		}
	}
	.panel-body{
		min-height: 200px;
	}
</style>