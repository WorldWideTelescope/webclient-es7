import store from '../store/store';

let setAny = obj=>store.commit('setAny',obj);
let state = key => store.state[key];

const api = {
  init,
  clickThumb,
  calcPageSize,
  spliceOnePage,
  goFwd,
  goBack
};


// Each component calls init and passes in the view model to extend
function init(listModel, name) {
  listModel.pageCount = 1;
  listModel.pageSize = 1;
  listModel.currentPage = 0;
  listModel.preventClickBubble = e => e.stopImmediatePropagation();
  listModel.goBack = () => goBack(listModel);
  listModel.goFwd = () => goFwd(listModel);

  listModel.showMenu = function (i) {
    //todo: refactor
  };

  // toggles the expanded thumbnail view to show 1 or 5 rows of thumbs
  listModel.expandThumbnails = function (flag) {
    listModel.currentPage = 0;
    listModel.expanded = flag != undefined ? flag : !listModel.expanded;
    listModel.expandTop(listModel.expanded, name);
    calcPageSize(listModel, name === 'context');
  };
  listModel.dropdownClass = name === 'context' && !util.isMobile ? 'dropup menu-container' : 'dropdown menu-container';
  listModel.popupPosition = name === 'context' && !util.isMobile ? 'top' : 'bottom';
}

function clickThumb(item, listModel, outParams, callback) {
/* todo: grok all cases (aka, what was I thinking??) */
  setTimeout(function(){
    setAny({instant: false});
  },2222);

  if (item.contextMenuEvent) {
    return outParams;
  }
  if (!outParams) {
    outParams = {};
  }
  listModel.activeItem = item.get_thumbnailUrl() + item.get_name();
  listModel.setActiveItem(item);
  state('ctrlInst').clearAnnotations();
  if (item.get_name() === 'Up Level') {
    //$('body').append($('#researchMenu'));
    listModel.currentPage = 0;
    outParams.depth--;
    outParams.breadCrumb.pop();
    listModel.breadCrumb = outParams.breadCrumb;
    outParams.cache.pop();
    listModel.collection = outParams.cache[outParams.cache.length - 1];
    calcPageSize(listModel, false);
    return outParams;
  }
  if (item.get_url && item.get_url() && item.get_url().indexOf('?wwtfull') !== -1) {
    window.open(item.get_url());
    return outParams;
  }
  if (item.get_isFolder()) {
    //$('#folderLoadingModal').modal('show');
    //$('body').append($('#researchMenu'));
    listModel.currentPage = 0;
    outParams.depth++;
    outParams.breadCrumb.push(item.get_name());
    listModel.breadCrumb = outParams.breadCrumb;
    store.dispatch('places/getChildren', item).then( (result) =>{
      //$('#folderLoadingModal').modal('hide'); todo
      if (Array.isArray(result[0])) {
        result = result[0];
      }
      const unique = [];
      $.each(result, function (index, el) {
        if ($.inArray(el, unique) === -1) unique.push(el);
      });
      listModel.collection = unique;
      calcPageSize(listModel, false);
      outParams.cache.push(result);
      if (outParams.openCollection) {
        if (outParams.newCollectionUrl) {
          let i = 0;
          while (result[i].url && result[i].url.indexOf(outParams.newCollectionUrl) === -1) i++;

          listModel.clickThumb(result[i]);
          outParams.newCollectionUrl = null;
        } else if (result.length) {
          listModel.clickThumb(result[0]);
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
    if (item.guid && item.guid.toLowerCase().indexOf('mars.') == -1) {
      listModel.setLookAt('Sky', item.get_name(), true, item.isSurvey);
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

  
};

function calcPageSize(listModel, isContextPanel) {
  const list = listModel.collection;
  const tnWid = 116;
  let winWid = document.body.offsetWidth;

  if (isContextPanel && (listModel.lookAt === 'Sky' || listModel.lookAt === 'SolarSystem')) {
    winWid = winWid - 216; //angular.element('body.desktop .fov-panel').width();
  }
  listModel.pageSize = util.isMobile ? 99999 : Math.floor(winWid / tnWid);

  if (listModel.expanded) {
    listModel.pageSize *= 5;
  }
  const listLength = list ? list.length : 2;
  $timeout(function () {
    listModel.pageCount = Math.ceil(listLength / listModel.pageSize);
    spliceOnePage(listModel);
  }, 10);
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
export default api;