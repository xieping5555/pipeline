<template>
	<div id="exportEXCEL">
		<button class="btn btn-success" @click='derive'><span class="glyphicon glyphicon-save-file" style=""></span>导出</button>
	</div>
</template>
<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default{
		props:['tableId','filename'],
		data(){
			return{
				haha:'haha'
			}
		},
		computed:{
			...mapState([
				"Classes"
			])
		},
		methods:{
		    derive(){
		    	let date=new Date();
				let filename=this.filename.toString()+this.Classes;
		    	$(`#${this.tableId}`).table2excel({
		    		name:"Excel Document Name",
		    		filename:filename,
		    		exclude_img: true,
					exclude_links: true
		    	})
		    }
		}
	}
</script>
<style>
	
</style>