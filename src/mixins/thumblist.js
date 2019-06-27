import store from '../store/store';

let setAny = obj => store.commit('setAny',obj);
let state = key => store.state[key];

let thumblistBase = {
  data: () => {
    return {
      pageCount:1,
      pageSize:1,
      currentPage:0,
      expanded:false,
      dropdownClass:'dropdown menu-container',
      popupPosition:'bottom',
      activeItem:null,
      collection:[]
    };
  },
  methods:{
    listReady(name){
      if (name === 'context' && state['ui/isMobile']){
        this.dropdownClass = 'dropup menu-container';
        this.popupPosition = 'top';
      }
    },
    preventClickBubble: e => e.stopImmediatePropagation(),
    expandThumbnails(expand){// toggles the expanded thumbnail view to show 1 or 5 rows of thumbs
      this.currentPage = 0;
      this.expanded = expand !== undefined ? expand : !this.expanded;
      setAny({ribbonExpanded: this.expanded});
      calcPageSize(name === 'context');
    },
    clickThumb(item){},//virtual function - component must override
    setActiveItem(item){},//virtual function - component must override
    clickThumbBase(item, outParams, callback) {
      /* todo: grok all cases (aka, what was I thinking??) */
      setTimeout(function(){
        setAny({instant: false});
      },2222);

      if (item['contextMenuEvent']) {
        return outParams;
      }
      if (!outParams) {
        outParams = {};
      }
      //todo: rethink guids and serialization
      this.activeItem = item.get_thumbnailUrl() + item.name;
      this.setActiveItem(item);
      state('ctrlInst').clearAnnotations();
      if (item.name === 'Up Level') {
        //$('body').append($('#researchMenu'));
        this.currentPage = 0;
        outParams.depth--;
        outParams.breadCrumb.pop();
        this.breadCrumb = outParams.breadCrumb;
        outParams.cache.pop();
        this.collection = outParams.cache[outParams.cache.length - 1];
        this.calcPageSize(false);
        return outParams;
      }
      if (item.get_url && item.get_url() && item.get_url().indexOf('?wwtfull') !== -1) {
        window.open(item.get_url());
        return outParams;
      }
      if (item.isFolder) {
        this.currentPage = 0;
        outParams.depth++;
        outParams.breadCrumb.push(item.get_name());
        this.breadCrumb = outParams.breadCrumb;
        store.dispatch('places/getChildren', item).then( (result) => {
          if (Array.isArray(result[0])) {
            result = result[0];
          }
          const unique = [];
          result.forEach((index, el) => {
            if (unique.includes(el)) unique.push(el);
          });
          this.collection = unique;
          calcPageSize(false);
          outParams.cache.push(result);
          if (outParams.openCollection) {
            if (outParams.newCollectionUrl) {
              let i = 0;
              while (result[i].url && result[i].url.indexOf(outParams.newCollectionUrl) === -1) i++;

              this.clickThumb(result[i]);
              outParams.newCollectionUrl = null;
            } else if (result.length) {
              this.clickThumb(result[0]);
            }
          }

          if (callback) {
            callback();
          }
        });
        return outParams;
      } else if (outParams.openCollection) {
        outParams.openCollection = false;
      } /*else if (listModel.$hide) {
    listModel.$hide();
    //$rootScope.searchModal = false;
  } else if (util.isMobile) {
    //$('#explorerModal').modal('hide');
  }
*/
      if ((item.isFGImage && item.imageSet && listModel.lookAt !== 'Sky') || item.isSurvey) {
        if (item.guid && item.guid.toLowerCase().indexOf('mars.') === -1) {
          store.dispatch('setLookAt',{lookAt:'Sky', imageryName:item.name, noUpdate:true, keepCamera:item.isSurvey});
        }
        if (item.isSurvey) {
          listModel.setSurveyBg(item.get_name(), item);
        } else {
          listModel.setForegroundImage(item);
        }
        if (listModel.$hide) {
          listModel.$hide();
          $rootScope.searchModal = false;
        }
        return outParams;
      }
      else if (item.isPanorama) {
        listModel.setLookAt('Panorama', item.get_name());
      } else if (item.isEarth) {
        listModel.setLookAt('Earth', item.get_name());
      } else if (util.getIsPlanet(item)) {

        if (listModel.lookAt === 'Sky') {
          wwtlib.WWTControl.singleton.gotoTarget3(item.get_camParams());
          return outParams;

        }
        if (listModel.lookAt !== 'SolarSystem') {

          listModel.setLookAt('Planet', item._name || '');
        }
      }
      if ((ss.canCast(item, wwtlib.Place) || item.isEarth) && !item.isSurvey) {
        listModel.setForegroundImage(item);
      }
      if (ss.canCast(item, wwtlib.Tour)) {
        listModel.playTour(item.get_tourUrl());
      }
      return outParams;


    },
    showMenu(){}//?
  }
};



function calcPageSize(listModel, isContextPanel) {
  const list = listModel.collection;
  const tnWid = 116;
  let winWid = document.body.offsetWidth;

  if (isContextPanel && (listModel.lookAt === 'Sky' || listModel.lookAt === 'SolarSystem')) {
    winWid = winWid - 216; //angular.element('body.desktop .fov-panel').width();
  }
  listModel.pageSize = store.state.isMobile ? 99999 : Math.floor(winWid / tnWid);

  if (listModel.expanded) {
    listModel.pageSize *= 5;
  }
  const listLength = list ? list.length : 2;
  //$timeout(function () {
  listModel.pageCount = Math.ceil(listLength / listModel.pageSize);
  spliceOnePage(listModel);
  //}, 10);
};

function goBack(scope) {

  scope.currentPage = scope.currentPage === 0 ? scope.currentPage : scope.currentPage - 1;
  return spliceOnePage(scope);
};

function goFwd(scope) {
  scope.currentPage = scope.currentPage === scope.pageCount - 1 ? scope.currentPage : scope.currentPage + 1;
  return spliceOnePage(scope);
};

function spliceOnePage(scope) {
  if (scope.collection) {
    const start = scope.currentPage * scope.pageSize;
    scope.collectionPage = scope.collection.slice(start, start + scope.pageSize);
  }
};
export default {
  init,
  clickThumb,
  calcPageSize,
  spliceOnePage,
  goFwd,
  goBack
};
