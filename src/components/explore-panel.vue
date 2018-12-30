<template>
  <div
    v-if="!loadingUrlPlace"
    :class="{expanded}" class="explore-panel rel">
    <span ng-repeat="bc in breadCrumb" class="bc"><a href="javascript:void(0)" ng-click="breadCrumbClick($index)">{{bc}}</a>&nbsp;>&nbsp;</span><br />
    <div class="explore-thumbs">
      <div class="ribbon-thumbs" ng-repeat="item in collectionPage">
        <ng-include src="'views/thumbnail.html?v=<%=ResourcesVersion%>'"></ng-include>
      </div>

    </div>
    <label class="wwt-pager">
      <a href="javascript:void(0)" data-ng-disabled="currentPage == 0" ng-click="goBack()">
        <i class="fa fa-play reverse"></i>
      </a>
      {{(currentPage + 1)}} <span localize="of"></span> {{pageCount}}
      <a href="javascript:void(0)" ng-disabled="currentPage == pageCount - 1" ng-click="goFwd()">
        <i class="fa fa-play"></i>
      </a>
    </label>
    <a :class="{expanded}"
       class="btn tn-expander" ng-click="expandThumbnails()">
      <i class="fa fa-caret-down" ng-if="!expanded"></i>
      <i class="fa fa-caret-up" ng-if="expanded"></i>
    </a>
  </div>
</template>

<script>
import eventbus from '../components/eventbus';
export default {
  data:() => {
    return {
      loadingUrlPlace:false,
      expanded:false
    };
  },
  name: 'explore-panel',
  methods:{
    hashChanged(obj){}
  },
  mounted(){
    eventbus.$on('hashChange',this.hashChanged);
  },
  beforeDestroy(){
    eventbus.$off('hashChange',this.hashChanged);//necessary?
  }
};
</script>
