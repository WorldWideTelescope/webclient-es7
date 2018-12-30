<template>
  <div class="fs-player wwt-webclient-wrapper" @click="appClick($event)" @keyup="keyHandler($event)">
    <ribbon/>
    <div id="WorldWideTelescopeControlHost" class="fullscreen">
      <div id="WWTCanvas" @contextmenu="showFinder" :style="{height,width}"></div>
    </div>
  </div>
</template>
<script>
import ribbon from './components/ribbon';
import {mapMutations,mapGetters,mapActions} from 'vuex';
import eventbus from './components/eventbus';
const listenResize = cb => {
  window.addEventListener('resize',cb);
}
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
    ...mapGetters(['px'])
  },
  methods:{
    ...mapActions(['initLocalization']),
    ...mapMutations(['init']),
    showFinder(){},
    resize(e){
      this.height = this.px(document.body.offsetHeight);
      this.width = this.px(document.body.offsetWidth);
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
    this.init(wwtlib.WWTControl.initControlParam('WWTCanvas', true));
    this.$store.dispatch('places/init');
    this.$store.dispatch('setLanguage','EN');
    listenResize(this.resize);
    this.resize();
  }
};
</script>
<style>
  @import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>
<style lang="less">
@import "assets/webclient.less";

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
