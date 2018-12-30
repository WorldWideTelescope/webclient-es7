const api = {
  init,
  clickThumb,
  calcPageSize,
  spliceOnePage,
  goFwd,
  goBack
};



const modelDefaults = {
  pageCount:1,
  pageSize:1,
  currentPage:0,
  preventClickBubble : e=>e.stopImmediatePropagation()
};

const modelProto = {
  goBack:function(){goBack(this)}
}

// Each controller calls init and passes in the controller
// scope
function init(listModel, name) {
  listModel.pageCount = 1;
  listModel.pageSize = 1;
  listModel.currentPage = 0;

  listModel.preventClickBubble = function (event) {
    event.stopImmediatePropagation();
  };
  listModel.goBack = function () {
    goBack(listModel);
  };
  listModel.goFwd = function () {
    goFwd(listModel);
  };
  listModel.showMenu = function (i) {
    if (!$('#researchMenu').length) {
      return $templateRequest('views/research-menu.html').then(function (tplContent) {
        var template = $compile(tplContent)(listModel);
        $('body').append(template);
        listModel.showMenu(i);
      });
    }

    var item = listModel.collectionPage[i];
    item.contextMenuEvent = true;
    $('.popover-content .close-btn').click();
    if (!item.get_isFolder() && item.get_name() !== 'Up Level') {
      var menuContainer = $((name === 'context' ? '.nearby-objects ' : '.top-panel ') + '#menuContainer' + i);
      if (util.isMobile) {
        menuContainer = $('#' + name + 'Container #menuContainer' + i);
      }
      menuContainer.append($('#researchMenu'));
      setTimeout(function () {
        $('.popover-content .close-btn').click();
        menuContainer.find('#researchMenu')
          .addClass('open')
          .off('click')
          .on('click', function (event) {
            event.stopPropagation();
          });
        menuContainer.find('.drop-toggle').click();
        $timeout(function () {
          if (!util.isMobile) {
            $('.dropdown-backdrop').off('contextmenu');
            $('.dropdown-backdrop').on('contextmenu', function (event) {
              $(this).click();
              event.preventDefault();
            });
          }
          listModel.setMenuContextItem(item, true);
          item.contextMenuEvent = false;
        }, 10);

      }, 10);
    }
  };

  // toggles the expanded thumbnail view to show 1 or 5 rows of thumbs
  listModel.expandThumbnails = function (flag) {
    $('body').append($('#researchMenu'));
    listModel.currentPage = 0;
    listModel.expanded = flag != undefined ? flag : !listModel.expanded;
    listModel.expandTop(listModel.expanded, name);
    calcPageSize(listModel, name === 'context');
  };
  listModel.dropdownClass = name === 'context' && !util.isMobile ? 'dropup menu-container' : 'dropdown menu-container';
  listModel.popupPosition = name === 'context' && !util.isMobile ? 'top' : 'bottom';
}

function clickThumb(item, scope, outParams, callback) {
  setTimeout(function(){
    $rootScope.instant = false;
  },2222);
  if (item.contextMenuEvent) {
    return outParams;
  }
  if (!outParams) {
    outParams = {};
  }
  scope.activeItem = item.get_thumbnailUrl() + item.get_name();
  scope.setActiveItem(item);
  wwt.wc.clearAnnotations();
  if (item.get_name() === 'Up Level') {
    $('body').append($('#researchMenu'));
    scope.currentPage = 0;
    outParams.depth--;
    outParams.breadCrumb.pop();
    scope.breadCrumb = outParams.breadCrumb;
    outParams.cache.pop();
    scope.collection = outParams.cache[outParams.cache.length - 1];
    calcPageSize(scope, false);
    return outParams;
  }
  if (item.get_url && item.get_url() && item.get_url().indexOf('?wwtfull') !== -1) {
    window.open(item.get_url());
    return outParams;
  }
  if (item.get_isFolder()) {
    $('#folderLoadingModal').modal('show');
    $('body').append($('#researchMenu'));
    scope.currentPage = 0;
    outParams.depth++;
    outParams.breadCrumb.push(item.get_name());
    scope.breadCrumb = outParams.breadCrumb;
    places.getChildren(item).then(function (result) {
      $('#folderLoadingModal').modal('hide');
      if ($.isArray(result[0])) {
        result = result[0];
      }
      var unique = [];
      $.each(result, function (index, el) {
        if ($.inArray(el, unique) === -1) unique.push(el);
      });
      scope.collection = unique;
      calcPageSize(scope, false);
      outParams.cache.push(result);
      if (outParams.openCollection) {
        if (outParams.newCollectionUrl) {
          var i = 0;
          while (result[i].url && result[i].url.indexOf(outParams.newCollectionUrl) === -1) i++;

          scope.clickThumb(result[i]);
          outParams.newCollectionUrl = null;
        } else if (result.length) {
          scope.clickThumb(result[0]);
        }
      }

      if (callback) {
        callback();
      }
    });
    return outParams;
  } else if (outParams.openCollection) {
    outParams.openCollection = false;
  } else if (scope.$hide) {
    scope.$hide();
    $rootScope.searchModal = false;
  } else if (util.isMobile) {
    $('#explorerModal').modal('hide');
  }

  if ((item.isFGImage && item.imageSet && scope.lookAt !== 'Sky') || item.isSurvey) {
    if (item.guid && item.guid.toLowerCase().indexOf('mars.') == -1) {
      scope.setLookAt('Sky', item.get_name(), true, item.isSurvey);
    }
    if (item.isSurvey) {
      scope.setSurveyBg(item.get_name(), item);
    } else {
      scope.setForegroundImage(item);
    }
    if (scope.$hide) {
      scope.$hide();
      $rootScope.searchModal = false;
    }
    return outParams;
  }
  else if (item.isPanorama) {
    scope.setLookAt('Panorama', item.get_name());
  } else if (item.isEarth) {
    scope.setLookAt('Earth', item.get_name());
  } else if (util.getIsPlanet(item)) {

    if (scope.lookAt === 'Sky') {
      //var c = item.get_camParams();
      //c.zoom = 0.1;

      wwtlib.WWTControl.singleton.gotoTarget3(item.get_camParams());
      return outParams;

    }
    if (scope.lookAt !== 'SolarSystem') {

      scope.setLookAt('Planet', item._name || '');
    }
  }
  if ((ss.canCast(item, wwtlib.Place) || item.isEarth) && !item.isSurvey) {
    scope.setForegroundImage(item);
  }
  if (ss.canCast(item, wwtlib.Tour)) {
    scope.playTour(item.get_tourUrl());
  }
  return outParams;

  
};

function calcPageSize(scope, isContextPanel) {
  var list = scope.collection;
  var tnWid = 116;
  var winWid = $(window).width();

  if (isContextPanel && (scope.lookAt === 'Sky' || scope.lookAt === 'SolarSystem')) {
    winWid = winWid - 216; //angular.element('body.desktop .fov-panel').width();
  }
  scope.pageSize = util.isMobile ? 99999 : Math.floor(winWid / tnWid);

  if (scope.expanded) {
    scope.pageSize *= 5;
  }
  var listLength = list ? list.length : 2;
  $timeout(function () {
    scope.pageCount = Math.ceil(listLength / scope.pageSize);
    spliceOnePage(scope);
  }, 10);
};

function goBack(scope) {
  $('body').append($('#researchMenu'));
  scope.currentPage = scope.currentPage === 0 ? scope.currentPage : scope.currentPage - 1;
  return spliceOnePage(scope);
};

function goFwd(scope) {
  $('body').append($('#researchMenu'));
  scope.currentPage = scope.currentPage === scope.pageCount - 1 ? scope.currentPage : scope.currentPage + 1;
  return spliceOnePage(scope);
};

function spliceOnePage(scope) {
  if (scope.collection) {
    var start = scope.currentPage * scope.pageSize;
    scope.collectionPage = scope.collection.slice(start, start + scope.pageSize);
  }
};
export default api;