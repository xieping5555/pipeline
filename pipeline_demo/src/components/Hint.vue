<template>
	<div id="hint">
		<div v-bind:class='wrapper'>
			<span class="glyphicon glyphicon-remove" @click='hide'></span>
			<p>{{msg}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		props: ['msg','wrapper'],
		methods:{
			hide(){
				$("."+this.wrapper).hide();
			},
			show(){
				$("."+this.wrapper).show();
			}
		}

	}
</script>
<style lang="scss" scoped>
	#hint>div{
		display:none;
		height:33.99px;
		width: 100%;
		background: rgba(255,0,0,0.74);
		border-radius: 5px; 
		color: #fff;
		text-align: center;
		overflow: hidden;
		span{
			float:left;
			display:inline-block;
			height:33.99px;
			line-height:33.99px;
			margin-left:10px;
			cursor: pointer;
		}
		p{
			display: inline-block;
			line-height:33.99px;
			margin:0;
		}
	}
</style>