<template>
	<div id="print"> 
		<button class="btn btn-warning" @click='stamp'><span class="glyphicon glyphicon-print"></span>打印</button>
	</div>
</template>
<script>
export default{
	props:["target"],
	methods:{
		stamp(){
			$("#"+this.target).print({
				    globalStyles: true,
				    mediaPrint: false,
				    stylesheet: null,
				    noPrintSelector: ".no-print",
				    iframe: true,
				    append: null,
				    prepend: null,
				    manuallyCopyFormValues: true,
				    deferred: $.Deferred()
			});
		}
	}
}
</script>
<style lang="scss" scoped>
	#print button{
		color:#fff;
	}
</style>
