<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default{
  name:'app',
}
</script>

<style lang="scss">
@font-face{
  font-family: 'hanyi';
  src:url('./assets/fonts/hanyi92.ttf') format('trueType');
  font-weight: normal;
  font-style: normal;
}
#app{
  height:100%;
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;;
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
}
</style>
