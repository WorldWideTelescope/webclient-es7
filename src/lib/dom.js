
import eventbus from '../components/eventbus';
let isFullScreen = false;

const requestFullScreen = (element=document.body) => {

  if (element.requestFullscreen) {
    isFullScreen = true;
    return element.requestFullscreen();
  }
};
const exitFullScreen = function() {//todo:check for cb param (deleted)

  let previousFullScreen = isFullScreen && document.fullScreenElement;
  if (previousFullScreen) {
    if (previousFullScreen.cancelFullScreen) {
      previousFullScreen.cancelFullScreen();
    }
  }
  isFullScreen = false;
};

const toggleFullScreen = () => {
  if (isFullScreen){
    exitFullScreen();
  }else{
    requestFullScreen();
  }
};
eventbus.$on('escKey',() => isFullScreen = false);

export default {
  requestFullScreen,
  exitFullScreen,
  toggleFullScreen
};
//todo: namespaced store?