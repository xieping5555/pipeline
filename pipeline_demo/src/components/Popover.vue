<template>
	<div id="popover">
		<div class="wrapper">
			<span class="glyphicon glyphicon-ok"></span>
			<h4>提交成功</h4>
			<span class="glyphicon glyphicon-remove" @click='hide'></span>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{

		}
	},
	mounted(){
	},
	methods:{
		hide(){
			$('#popover').fadeOut();	
		},
		show(){
			$('#popover').fadeIn();
		}
	}
}
</script>
<style lang='scss' scoped>
#popover{
	display: none;
}
	.wrapper{
		height: 75px;
		width: 200px;
		background: rgba(47,156,2,0.93);
		border: 1px solid #fff;
		border-radius: 10px;
		overflow:hidden;
		position: absolute;
		top: 50%;
		right: 50%;
		&:before{
			content:'';
			height: 100%;
			display: inline-block;
			vertical-align: middle;
		}
		span.glyphicon-ok{
			font-size: 24px;
			color: #fff;
			display: inline-block;
			height: 40px;
			width:40px;
			text-align: center;
			border-radius: 50%;
			background: #fff;
			color: green;
			line-height: 40px;
			vertical-align: middle;
			margin-left:10px;
		}
		h4{
			display: inline-block;
			color: #fff;
			font-size: 20px;
			vertical-align: middle;
			margin-left:10px;
		}
		span.glyphicon-remove{
			color: #fff;
			position: absolute;
			right: 6px;
			top: 6px;
			cursor: pointer;
			&:hover{
				background:#fff;
				color:#3ca212; 
			}
		}

	}
</style>