<template>
  <div
    v-if="!loadingUrlPlace"
    :class="{expanded}" class="explore-panel rel">
    <span v-for="(bc,i) in breadCrumb" class="bc" :key="i">
      <a @click="listModel.breadCrumbClick(i)">{{_(bc)}}</a>&nbsp;>
    </span>
    <br />
    <div class="explore-thumbs">
      <div v-if="collectionPage && collectionPage.length" class="ribbon-thumbs" v-for="(item,i) in collectionPage" :key="i">
        <thumb :item="item"/>
      </div>

    </div>
    <label class="wwt-pager">
      <a href="javascript:void(0)" :disabled="listModel.currentPage === 0" @click="listModel.goBack()">
        <i class="fa fa-play reverse"></i>
      </a>
      {{(listModel.currentPage + 1)}} <span>{{_('of')}}</span> {{listModel.pageCount}}
      <a href="javascript:void(0)" :disabled="listModel.currentPage === pageCount - 1" @click="listModel.goFwd()">
        <i class="fa fa-play"></i>
      </a>
    </label>
    <a :class="{expanded}"
       class="btn tn-expander" @click="expandThumbnails()">
      <i class="fa fa-caret-up" v-if="expanded"></i>
      <i class="fa fa-caret-down" v-else></i>
    </a>
  </div>
</template>

<script>
import eventbus from '../components/eventbus';
import thumbList from '../lib/thumblist';
import thumb from '../components/thumb';
import {mapGetters,mapActions} from 'vuex';

export default {
  data:() => {
    return {
      exploreRoot:{},
      listModel:{},
      loadingUrlPlace:false,
      expanded:false,
      breadCrumb:['Collections'],
      hashObj:{},
      collectionPlace:{},
      openCollection:{},
      collectionPlaceIndex:{},
      cache:[],
      currentPage:0,
      pageCount:0,
      collectionPage:[]
    };
  },
  components:{thumb},
  computed:{
    ...mapGetters(['_'])
  },
  name: 'explore-panel',
  methods:{
    ...mapActions('places',['getRoot','findChildById']),
    hashChanged(obj){
      if (obj['place'] && isNaN(parseInt(obj['place'].charAt(0)))) {
        this.hashObj = obj;
        this.collectionPlace = obj['place'];
        this.collectionPlaceIndex = 1;
        this.loadingUrlPlace = true;
        //$('#loadingModal').modal('show');todo:show this
        this.getRoot().then(function () {
          this.breadCrumb = bc = [this._('Collections')];
          //$('body').append($('#researchMenu'));
          this.collection = this.exploreRoot;
          this.findCollectionChild();
        });
      }
    },
    breadCrumbClick(){
      //tba
    },
    findCollectionChild() {
      /*let guidParts = this.collectionPlace.split('.');
      let relevantPart = guidParts.slice(0, this.collectionPlaceIndex).join('.');
      let child = this.findChildById(relevantPart, this.collection);
      if (this.collectionPlaceIndex < guidParts.length) {
        collectionPlaceIndex++;
        $scope.clickThumb(child, findCollectionChild);
      } else {
        $timeout(function () {
          $scope.loadingUrlPlace = false;
          $scope.clickThumb(child);
          $('#loadingModal').modal('hide');

          if (hashObj['ra']) {
            var timer = hashObj['place'].toLowerCase().indexOf('hirise') !== -1 ? 6666 : 3333;
            setTimeout(function () {
              $rootScope.ctl.gotoRaDecZoom(
                parseFloat(hashObj['ra']) * 15,
                parseFloat(hashObj['dec']),
                parseFloat(hashObj['fov']),
                false
              );
            }, timer);
          }
          location.hash = '/';
        }, 2222);
      }*/
    },
    init(hashChange){
      let model = this.listModel;
      thumbList.init(model, 'explore');
      if (!hashChange) {
        this.getRoot().then(result => {
          //$('body').append($('#researchMenu'));
          model.collection = this.exploreRoot = result;

          this.cache = [result];
          console.log(this.cache);
          thumbList.calcPageSize(model);
          this.collectionPage = this.listModel.collectionPage;
          this.pageCount = model.pageCount;
          console.log(model);
          /*result.forEach((item,i) => {
            if (item._name === 'Open Collections') {
              result.splice(0, 0, result.splice(i, 1)[0]);
              if (item.get_name() === 'Open Collections') {
                this.openCollection = true;
                model.clickThumb(item);
              }
            }
          });*/

        });
      }
    }
  },
  watch:{
    collectionPage(p){
      console.log({p});
    }
  },
  mounted(){
    eventbus.$on('hashChange',this.hashChanged);
    this.init();
  },
  beforeDestroy(){
    eventbus.$off('hashChange',this.hashChanged);//necessary?
  }
};
</script>
