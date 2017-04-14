<template>
    <div id="login">
    	<div class="wrapper">
			<div class="logo">
    			<img src="http://localhost:8082/src/assets/img/logo.png" alt="">
    		</div>
    		<canvas id="Mycanvas"></canvas>
    		<div class="loginBox">
    			<div class="text-center loginTitle">welcome</div>
    			<form role='form'>
    				<div class="form-group">
    					<label for="username">用户名</label>
    					<input type="text" class="form-control" id="username">
    				</div>
    				<div class="form-group">
    					<label for="password">密码</label>
    					<input type="password" class="form-control" id="password">
    				</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" id="rememberMe">记住我
						</label>
						<button class="btn btn-default pull-right" @click.prevent='login'>登陆</button>
					</div>
    			</form>
    		</div>
    	</div>
    </div>
</template>
<script>
	import qs from 'qs';
	export default{
		data(){
			return{

			}
		},
		mounted(){
			this.animate();
			//判断cookie
			const getcookie=(function(){
				if(document.cookie == ''){
					return ''
				}else{
					let usernamestr = document.cookie.split(',')[0];
					let passwordstr = document.cookie.split(',')[1];
					let username=usernamestr.split('=')[1];
					let password=passwordstr.split('=')[1];
					$('#username').val(username);
					$('#password').val(password);
					$('#rememberMe').prop({"checked":true});
				}
			})();
		},
		methods:{
			animate(){
					//定义画布宽高和生成点的个数
				var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35;
				
				var canvas = document.getElementById('Mycanvas');
				canvas.width = WIDTH,
				canvas.height = HEIGHT;
				var context = canvas.getContext('2d');
				context.strokeStyle = 'rgba(0,0,0,0.02)',
				context.strokeWidth = 1,
				context.fillStyle = 'rgba(0,0,0,0.05)';
				var circleArr = [];

				//线条：开始xy坐标，结束xy坐标，线条透明度
				function Line (x, y, _x, _y, o) {
					this.beginX = x,
					this.beginY = y,
					this.closeX = _x,
					this.closeY = _y,
					this.o = o;
				}
				//点：圆心xy坐标，半径，每帧移动xy的距离
				function Circle (x, y, r, moveX, moveY) {
					this.x = x,
					this.y = y,
					this.r = r,
					this.moveX = moveX,
					this.moveY = moveY;
				}
				//生成max和min之间的随机数
				function num (max, _min) {
					var min = arguments[1] || 0;
					return Math.floor(Math.random()*(max-min+1)+min);
				}
				// 绘制原点
				function drawCricle (cxt, x, y, r, moveX, moveY) {
					var circle = new Circle(x, y, r, moveX, moveY)
					cxt.beginPath()
					cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
					cxt.closePath()
					cxt.fill();
					return circle;
				}
				//绘制线条
				function drawLine (cxt, x, y, _x, _y, o) {
					var line = new Line(x, y, _x, _y, o)
					cxt.beginPath()
					cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
					cxt.moveTo(line.beginX, line.beginY)
					cxt.lineTo(line.closeX, line.closeY)
					cxt.closePath()
					cxt.stroke();

				}
				//初始化生成原点
				function init () {
					circleArr = [];
					for (var i = 0; i < POINT; i++) {
						circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
					}
					draw();
				}

				//每帧绘制
				function draw () {
					context.clearRect(0,0,canvas.width, canvas.height);
					for (var i = 0; i < POINT; i++) {
						drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
					}
					for (var i = 0; i < POINT; i++) {
						for (var j = 0; j < POINT; j++) {
							if (i + j < POINT) {
								var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
									B = Math.abs(circleArr[i+j].y - circleArr[i].y);
								var lineLength = Math.sqrt(A*A + B*B);
								var C = 1/lineLength*7-0.009;
								var lineOpacity = C > 0.03 ? 0.03 : C;
								if (lineOpacity > 0) {
									drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
								}
							}
						}
					}
				}
				init();
				setInterval(function () {
					for (var i = 0; i < POINT; i++) {
						var cir = circleArr[i];
						cir.x += cir.moveX;
						cir.y += cir.moveY;
						if (cir.x > WIDTH) cir.x = 0;
						else if (cir.x < 0) cir.x = WIDTH;
						if (cir.y > HEIGHT) cir.y = 0;
						else if (cir.y < 0) cir.y = HEIGHT;
						
					}
					draw();
				}, 16);
			},
			login(){
				//判断一下用户有没有点击记住我选项
				const _this=this;
				let username=$('#username').val(),
					password=$('#password').val();
					if(username == ''){
						alert('用户名不能为空');
						return;
					};
					if(password == ''){
						alert('密码不能为空');
						return;
					}
				this.$http.post('http://localhost:3000/checkLogin',qs.stringify({
					'username':$('#username').val(),
					'password':$('#password').val()
				})).then(function(res){
					console.log(typeof res.data);
					switch (res.data){
						case -2:
							alert('用户名不正确');
							break;
						case -1:
							alert('密码不正确');
							break;
						case 1:
							if($('#rememberMe').is(':checked')){
								var exp=new Date();
								exp.setMonth(exp.getMonth()+1);
								document.cookie ="username="+username+','+"password="+password+';expires='+exp.toGMTString();
							}else{
								var exp=new Date();
								exp.setTime(exp.getTime()-1);
								document.cookie ="username="+username+','+"password="+password+';expires='+exp.toGMTString();
							};
							_this.$router.push({path:'/index'});
							break;
					}
				}).catch(function(err){
					console.log(err);
					return;
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	#login{
		background: #F7FAFC;
		overflow: hidden;
		width:100%;
		height: 100%;
		.logo{
			padding:20px;
			position: absolute;
		}
		.loginBox{
			box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
			border: 1px solid #d5d5d5;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			height: 300px;
			width:400px;
			margin:auto;
			background-color: rbga(0,0,0,0);
			border-radius: 5px;
			.loginTitle{
				background-color: #7de7c4;
				color: #fff;
				padding:10px 0;
				font-size: 16px;
				border-radius: 5px 5px 0 0;
			}
			form{
				padding:20px;
				div label{
					font-weight: 500;
				}
				div input{
					background-color: transparent;
				}
				.checkbox{
					margin-top: 30px;
					button{
						background: #7de7c4;
						border: none;
						color: #fff;
					}
				}
			}
		}
	}
</style>