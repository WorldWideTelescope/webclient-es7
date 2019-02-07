import util from '../lib/util';
export default{
  namespaced:true,
  state:{
    isMobile:false,
    browsers:{},
    activePanel:'Explore',
    viewport:{}
  },
  mutations:{
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    },
    setLookAt(state, {lookAt, imageryName, noUpdate, keepCamera}) {
      state.lookAt = lookAt;
      this.commit('ui/lookAtChanged', {imageryName, noUpdate, keepCamera});
      //setTimeout(wwt.resize, 1200);
    },
    lookAtChanged(state,{imageryName, dropdownInvoked, noUpdate, keepCamera}) {
      //setTimeout(wwt.resize, 120);
      if (!keepCamera) {
        util.resetCamera(true);
      }
      $timeout(function () {
        if ($('#lstLookAt').length) {
          $scope.lookAt = $('#lstLookAt option:selected').text();
        }
        if ($scope.lookAt === '') {
          $scope.lookAt = 'Sky';
        }
        var collection = $scope.imagery[$.inArray($scope.lookAt, $scope.lookTypes)];
        if (collection[0] !== '-')
          collection.splice(0, 0, '-');
        if (imageryName == '') imageryName = '-';
        $scope.surveys = collection;
        var foundName = false;


        // HACK ALERT (Mars was hardcoded from Visible Imagery)
        if (imageryName === 'Mars') {
          imageryName = 'Visible Imagery';
        }
        if (imageryName) {
          $.each(collection, function (i, item) {
            if (item !== '' && item.get_name && (item.get_name().indexOf(imageryName) === 0 || imageryName.indexOf(item.get_name()) === 0)) {
              $scope.backgroundImagery = item;
              foundName = true;
            }
          });
        }
        if (!foundName) {
          if (initialPass || dropdownInvoked) {
            setTimeout(function () {
              initialPass = false;
            }, 500);
            $timeout(function () {
              $scope.backgroundImagery = collection[1];
              $scope.setSurveyBg();

            }, 123);
            return;
          } else if (!noUpdate) {
            $scope.backgroundImagery = collection[0];
            return;
          } else {
            return;
          }
        }
        $scope.setSurveyBg();
      }, 100);
    }
  }
}