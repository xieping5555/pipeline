<template>
	 <div id="index">
	 	<Sidebar></Sidebar>
	      <div class="right_content" >
	        <div id="header">
            <p class="welcome">欢迎你 {{admin}}</p>
	        </div>
	        <div class="detail">
	          <router-view></router-view>
	        </div>
	      </div>
	 </div>
</template>
<script>
	import Sidebar from './Sidebar.vue';
	export default{
		data(){
			return{
        admin:''
			}
		},
		mounted(){
      const _this=this;
			this.$router.replace({path:'/index/home'});
      const cookie = (function(){
        let usernamestr = document.cookie.split(',')[0];
        let username=usernamestr.split('=')[1];
        _this.admin=username;
      })()
		},
		components:{
			"Sidebar":Sidebar
		}
	}
</script>
<style scoped lang='scss'>
	.right_content{
    position:relative;
    margin-left: 200px;
    overflow:hidden;
    #header{
      height:50px;
      width:100%;
      background:#3c8dbc;
      position:fixed;
      z-index: 2;
      .welcome{
        position: absolute;
        right: 230px;
        top: 14px;
        color:#fff;
      }
      .hamburger{
        height:100%;
        display:inline-block;
        float:left;
        padding:0 15px;
        cursor:pointer;
        &:hover{
          background:#367fa9;
        }
        span{
          margin-top: 18px;
          color:#fff;
        }
      }
    }
    .detail{
      margin-top: 50px;
      z-index:1;
      overflow:hidden;
    }
  }
</style>