<template>
  <div>
    <ul class="dropdown-menu" role="menu" ref="ribbonMenu" v-if="activeMenu.items" tabindex="0"
        :style="{left:px(activeMenu.left)}" @blur="activeMenu.items = null">
      <li v-for="(actions,label) in activeMenu.items"
          :key="label" :class="{divider:label.startsWith('sep')}">
        <a v-if="!label.startsWith('sep')" @click="menuClick(actions)">{{_(label)}}</a>
      </li>
    </ul>
    <div id="ribbon">

      <!--
          todo:login component
          <span class="pull-right" ng-controller="LoginController">
          <a class="btn pull-right" ng-click="login()" ng-show="liveAppId && liveAppId.length && !loggedIn">
              <span localize="Sign In"></span>
          </a>
          <a class="btn pull-right" ng-click="logout()" ng-show="liveAppId && liveAppId.length && loggedIn">
              <span localize="Sign Out"></span>
          </a>

          </span>-->
      <a class="btn pull-right" @click="nav('/Download/')" target="wwt">
        <i class="fa fa-download"></i>
        <span>{{_('Install Windows Client')}}</span>
      </a>
      <a class="home-icon" @click="nav('/home')">
        <i class="fa fa-home"></i>
      </a>
      <ul class="wwt-tabs">

        <li v-for="tab in tabs" :key="tab.label" :class="{active:activePanel === tab.label}">
          <div class="outer">
            <a href="javascript:void(0)">
              <span class="label" @click="tabClick(tab)">{{_(tab.label)}}</span>
              <div class="menu" @click="showMenu($event, tab.menu)" @mouseenter="activeMenu.items && showMenu($event, tab.menu)">
                <i class="fa fa-caret-down"></i>
              </div>
            </a>
          </div>
        </li>

        <!--
        todo: current tour
        <li data-ng-class="activePanel == 'currentTour'  ? 'active' : currentTour && currentTour._title ? '' :'hide'">
          <div class="outer">
            <a href="javascript:void(0)" ng-click="activePanel = 'currentTour';initSlides()">
              <span class="label" style="padding-right:22px">{{currentTour._title}}</span>
              <span ng-click="closeTour($event)" class="close-tour"><i class="fa fa-close"></i></span>
            </a>

          </div>
        </li>-->
      </ul>
    </div>
    <div class="top-panel">
      <explore-panel></explore-panel>
    </div>

  </div>
</template>

<script>

//////******tabMenu is next todo
import {mapMutations, mapState, mapGetters} from 'vuex';
import dom from '../lib/dom';
import lib from '../lib/util';
import Vue from 'vue';
import explorePanel from './explore-panel';

export default {
  data: () => {
    return {
      activePanel: 'Explore',
      activeMenu: {
        top: 0, left: 0,
        items: null
      },
      tabs: [
        {
          label: 'Explore',
          button: 'rbnExplore',
          mobileLabel: 'Explore Collections',
          mobileAction: function () {//todo:refactor this
            $('#exploreModalLink').click();
          },
          menu: {
            Open: {
              'Tour...': ['openItem', 'tour'],
              'Collection...': ['openItem', 'collection'],
              'Image...': ['openItem', 'image'],
              'FITS Image...': ['openItem', 'FITS image']
            },
            sep1: null,
            'Tour WWT Features': ['open', 'tourFeatures'],
            'Show Welcome Tips': ['open', 'showTips'],
            'Show Finder (right click)': ['open', 'finderScope'],
            'WorldWide Telescope Home': ['nav', '/home'],
            'Getting Started (Help)': ['nav', '/Learn/'],
            'WorldWide Telescope Terms of Use': ['nav', '/Terms'],
            'About WorldWide Telescope': ['nav', '/About']
          }
        }, {
          label: 'Guided Tours',
          button: 'rbnTours',
          menu: {
            'Tour Home Page': ['nav', '/Learn/Exploring#guidedtours'],
            'Music and other Tour Resources': ['nav', '/Download/TourAssets'],
            sep2: null,
            'Create a New Tour...': ['createNewTour']
          }
        }, {
          label: 'Search',
          button: 'rbnSearch',
          menu: {
            'Search Now': ['changePanel', 'search'],
            'VO Cone Search': ['open', 'VOCone']//todo: roll into modal store
          }
        },
        {
          label: 'Communities',
          button: 'rbnCommunities',
          menu: {
            'Search Communities': ['nav', '/Community']
          }
        }, {
          label: 'View',
          button: 'rbnView',
          menu: {
            'Reset Camera': ['resetCamera'],
            'Share this View': ['open', 'share'],
            'Toggle Full Screen View (F11)': ['toggleFullScreen'],
            'Toggle Layer Manager': ['toggleLayerManager']
          }
        }, {
          label: 'Settings',
          button: 'rbnSettings',
          menu: {
            'Restore Defaults': ['restoreDefaultSettings'],
            'Product Support': ['nav', '/Support/IssuesAndBugs']
          }
        }]
    };
  },
  computed: {
    ...mapState(['ctrlInst']),
    ...mapGetters(['_', 'px'])
  },
  components:{explorePanel},
  name: 'ribbon',
  methods: {
    ...mapMutations('modals', ['open']),
    ...mapMutations(['toggleAny']),
    menuClick(actions){
      this[actions[0]](actions[1]);
    },
    openItem(name) {
      this.open('open-' + name);
    },
    toggleFullScreen() {
      dom.toggleFullScreen();
    },
    nav(href) {
      location.href = location.host.indexOf('localhost') > -1 ?
        `//worldwidetelescope.org${href}` : href;
    },
    createNewTour() {
      console.log('tba');//todo: new tour
    },
    changePanel(panel) {
      console.log(`changePanel(${panel}) tba`);//todo
    },
    resetCamera(leaveHash) {
      if (!leaveHash) {
        location.hash = '/';
      }
      this.ctrlInst.gotoRaDecZoom(0, 0, 60, true);
    },
    toggleLayerManager() {
      this.toggleAny('layerManagerHidden');
    },
    restoreDefaultSettings() {
      //todo:wireup appstate store
    },
    showMenu(e, items) {
      let el = e.srcElement;
      while (el.tagName !== 'LI'){
        el = el.offsetParent;
      }
      this.activeMenu.left = el.offsetLeft;
      this.activeMenu.items = items;
      let menu =
      Vue.nextTick().then(() => {
        //console.log({refs:this.$refs});
        this.$refs.ribbonMenu && this.$refs.ribbonMenu.focus();
      });
    }
  },
  mounted() {

  }
};

</script>
<style lang="less" scoped>
  .dropdown-menu {
    position: absolute;
    top:30px;
    display:block;
    &:focus{
      outline:none;
    }
    border-radius: 0 0 2px 2px;
    li.divider{
      opacity: .33;
    }
  }
</style>

