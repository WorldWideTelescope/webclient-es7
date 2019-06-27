<template>
  <div class="fs-player wwt-webclient-wrapper" @click="appClick($event)" @keyup="keyHandler($event)">
    <ribbon/>
    <div id="WorldWideTelescopeControlHost" class="fullscreen">
      <div id="WWTCanvas" @contextmenu="showFinder" :style="{height,width}"></div>
      <!--<div class="testmove" ref="someTarget">
        <movable className="test" target="someTarget" @move="log">modal beh</movable>
      </div>
      <movable className="testmove" posTop="444" :grid="20"><span>grid:20</span></movable>
      <movable className="testmove" posLeft="444" :bounds="{x:[0,0]}"><span>bounds:only y</span></movable>
      <movable className="testmove" posTop="444" posLeft="444" :bounds="{y:[0,0]}"><span>bounds:only x</span></movable>-->
      <colorpicker value="#abcdef" style="position:absolute;top:333px;left:555px;"/>
    </div>
  </div>
</template>
<script>

import ribbon from './views/ribbon';
import {mapMutations,mapGetters,mapActions,mapState} from 'vuex';
import eventbus from './components/eventbus';
const listenResize = cb => {
  window.addEventListener('resize',cb);
};
export default {
  name:'wwt-web-client',
  data:() => {
    return{
      height:'0px',
      width:'0px'
    };
  },
  components:{ribbon},
  computed:{
    ...mapGetters(['px']),
    ...mapState(['ctrlInst','wwtlib'])
  },
  methods:{
    ...mapActions(['initLocalization']),
    ...mapMutations(['init']),
    showFinder(){},
    resize(e){
      this.height = this.px(document.body.offsetHeight);
      this.width = this.px(document.body.offsetWidth);
    },
    log(args){
      console.log(args);
    },
    appClick(event){
      eventbus.$emit('appclick',event);
    },
    keyHandler(event){
      switch (event.keyCode) {
        case 27:
          eventbus.$emit('escKey');
          break;
      }
    }
  },
  mounted() {
    this.initLocalization();
    let ctl = wwtlib.WWTControl.initControlParam('WWTCanvas', true);
    ctl.add_ready(() => {
      this.init({ctl,wwtlib});
      this.$store.dispatch('places/init');
      this.$store.dispatch('setLanguage','EN');
    });

    listenResize(this.resize);
    this.resize();
  },
  watch:{

  }
};
</script>
<style>
  @import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>
<style lang="less">
@import "assets/webclient.less";
.testmove{
  position:absolute;
  top:0;
  height:100px;
  width:100px;
  margin:200px;
  background:#333;color:white;
  span,.test{
    background:blue;
    color:white;
  }
}
html,body, .fullscreen{
    height:100%;
    width:100%;
  }
  .fullscreen{
    canvas{
      height:100%;
      width:100%;
    }
    position:fixed;
    top:0;left:0;
  }
</style>
