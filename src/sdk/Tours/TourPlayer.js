import {BlendState} from '../BlendState';
import ss from '../scriptsharp/ss';
import {LayerManager} from '../Layers/LayerManager';
import {Settings} from '../settings';
import {SpaceTimeController} from '../SpaceTimeController';
import {WWTControl} from '../WWTControl';
import {CameraParameters} from '../CameraParameters';
import {Vector2d} from '../Double3d';
import {Util} from '../Util';
import {ViewMoverKenBurnsStyle} from '../ViewMover';

export function TourPlayer() {
  this._overlayBlend = BlendState.create(false, 1000);
  this._playerState = BlendState.create(false, 2000);
  this._middleHover = false;
  this._leftHover = false;
  this._rightHover = false;
  this._middleDown = false;
  this._leftDown = false;
  this._rightDown = false;
  this._top = 1;
  this._center = 1;
  this._lastHit = ss.now();
  this._imageCount = 0;
  this._imageLoadCount = 0;
  this._imagesLoaded = false;
  this._downloading = false;
  this._tour = null;
  this._onTarget = false;
  this._currentMasterSlide = null;
  this._callStack = new ss.Stack();
}
TourPlayer.get_playing = () => TourPlayer._playing;
TourPlayer.set_playing = value => {
  TourPlayer._playing = value;
  return value;
};
TourPlayer.add_tourEnded = value => {
  TourPlayer.__tourEnded = ss.bindAdd(TourPlayer.__tourEnded, value);
};
TourPlayer.remove_tourEnded = value => {
  TourPlayer.__tourEnded = ss.bindSub(TourPlayer.__tourEnded, value);
};
export const TourPlayer$ = {
  render: function (renderContext) {
    if (this._tour == null || this._tour.get_currentTourStop() == null || !TourPlayer._playing) {
      return;
    }
    renderContext.save();
    this.updateSlideStates();
    if (!this._onTarget) {
      this._slideStartTime = ss.now();
      if (renderContext.onTarget(this.get_tour().get_currentTourStop().get_target())) {
        this._onTarget = true;
        this._overlayBlend.set_state(!this.get_tour().get_currentTourStop().get_fadeInOverlays());
        this._overlayBlend.set_targetState(true);
        if (this._tour.get_currentTourStop().get_musicTrack() != null) {
          this._tour.get_currentTourStop().get_musicTrack().play();
        }
        if (this._tour.get_currentTourStop().get_voiceTrack() != null) {
          this._tour.get_currentTourStop().get_voiceTrack().play();
        }
        let caption = '';
        const $enum1 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
        while ($enum1.moveNext()) {
          var overlay = $enum1.current;
          if (overlay.get_name().toLowerCase() === 'caption') {
            const text = ss.safeCast(overlay, TextOverlay);
            if (text != null) {
              caption = text.textObject.text;
            }
          }
          overlay.play();
        }
        LayerManager.setVisibleLayerList(this._tour.get_currentTourStop().layers);
        if (this._tour.get_currentTourStop().get_endTarget() != null && this._tour.get_currentTourStop().get_endTarget().get_zoomLevel() !== -1) {
          if (this._tour.get_currentTourStop().get_target().get_type() === 4) {
          }
          renderContext.viewMover = new ViewMoverKenBurnsStyle(this._tour.get_currentTourStop().get_target().get_camParams(), this._tour.get_currentTourStop().get_endTarget().get_camParams(), this._tour.get_currentTourStop().get_duration() / 1000, this._tour.get_currentTourStop().get_startTime(), this._tour.get_currentTourStop().get_endTime(), this._tour.get_currentTourStop().get_interpolationType());
        }
        Settings.tourSettings = this._tour.get_currentTourStop();
        SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
        SpaceTimeController.set_syncToClock(false);
        WWTControl.scriptInterface._fireSlideChanged(caption);
      }
    }
    if (renderContext.gl != null) {
      renderContext.setupMatricesOverlays();
      if (this._currentMasterSlide != null) {
        const $enum2 = ss.enumerate(this._currentMasterSlide.get_overlays());
        while ($enum2.moveNext()) {
          var overlay = $enum2.current;
          overlay.set_tweenFactor(1);
          overlay.draw3D(renderContext, false);
        }
      }
      if (this._onTarget) {
        const $enum3 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
        while ($enum3.moveNext()) {
          var overlay = $enum3.current;
          if (overlay.get_name().toLowerCase() !== 'caption' || WWTControl.scriptInterface.get_showCaptions()) {
            overlay.set_tweenFactor(CameraParameters.easeCurve(this._tour.get_currentTourStop().get_tweenPosition(), (overlay.get_interpolationType() === 5) ? this._tour.get_currentTourStop().get_interpolationType() : overlay.get_interpolationType()));
            overlay.draw3D(renderContext, false);
          }
        }
      }
      renderContext.restore();
    } else {
      renderContext.device.scale(renderContext.height / 1116, renderContext.height / 1116);
      const aspectOrig = 1920 / 1116;
      const aspectNow = renderContext.width / renderContext.height;
      renderContext.device.translate(-((1920 - (aspectNow * 1116)) / 2), 0);
      if (this._currentMasterSlide != null) {
        const $enum4 = ss.enumerate(this._currentMasterSlide.get_overlays());
        while ($enum4.moveNext()) {
          var overlay = $enum4.current;
          overlay.set_tweenFactor(1);
          overlay.draw3D(renderContext, false);
        }
      }
      if (this._onTarget) {
        const $enum5 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
        while ($enum5.moveNext()) {
          var overlay = $enum5.current;
          if (overlay.get_name().toLowerCase() !== 'caption' || WWTControl.scriptInterface.get_showCaptions()) {
            overlay.set_tweenFactor(CameraParameters.easeCurve(this._tour.get_currentTourStop().get_tweenPosition(), (overlay.get_interpolationType() === 5) ? this._tour.get_currentTourStop().get_interpolationType() : overlay.get_interpolationType()));
            overlay.draw3D(renderContext, false);
          }
        }
      } else {
        const i = 0;
      }
      renderContext.restore();
      this._drawPlayerControls(renderContext);
    }
  },
  _drawPlayerControls: function (renderContext) {
    this._loadImages();
    if (!this._imagesLoaded) {
      return;
    }
    if (this._playerState.get_state()) {
      const span = ss.now() - this._lastHit;
      if (span > 7000) {
        this._playerState.set_targetState(false);
      }
      const ctx = renderContext.device;
      ctx.save();
      ctx.globalAlpha = this._playerState.get_opacity();
      this._top = renderContext.height - 60;
      this._center = renderContext.width / 2;
      const left = (this._leftDown) ? this._buttonPreviousPressed : ((this._leftHover) ? this._buttonPreviousHover : this._buttonPreviousNormal);
      const middle = (TourPlayer.get_playing()) ? ((this._middleDown) ? this._buttonPausePressed : ((this._middleHover) ? this._buttonPauseHover : this._buttonPauseNormal)) : ((this._middleDown) ? this._buttonPlayPressed : ((this._middleHover) ? this._buttonPlayHover : this._buttonPlayNormal));
      const right = (this._rightDown) ? this._buttonNextPressed : ((this._rightHover) ? this._buttonNextHover : this._buttonNextNormal);
      ctx.drawImage(left, this._center - 110, this._top);
      ctx.drawImage(right, this._center, this._top);
      ctx.drawImage(middle, this._center - 32, this._top - 4);
      ctx.restore();
    }
  },
  _hitTextPlayerControls: function (point, click, act) {
    if (click) {
      this._leftDown = false;
      this._rightDown = false;
      this._middleDown = false;
    } else {
      this._leftHover = false;
      this._rightHover = false;
      this._middleHover = false;
    }
    if (point.y < (this._top - 2)) {
      return false;
    }
    if (point.x < (this._center - 32) && point.x > (this._center - 105)) {
      if (click) {
        this._leftDown = true;
      } else {
        this._leftHover = true;
      }
      if (act) {
        this._playPreviousSlide();
        this._lastHit = ss.now();
      }
      return true;
    }
    if (point.x < (this._center + 105) && point.x > (this._center + 32)) {
      if (click) {
        this._rightDown = true;
      } else {
        this._rightHover = true;
      }
      if (act) {
        this._playNextSlide();
        this._lastHit = ss.now();
      }
      return true;
    }
    if (point.x < (this._center + 32) && point.x > (this._center - 32)) {
      if (click) {
        this._middleDown = true;
      } else {
        this._middleHover = true;
      }
      if (act) {
        this.pauseTour();
        this._lastHit = ss.now();
      }
      return true;
    }
    return false;
  },
  _loadImages: function () {
    if (!this._imagesLoaded && !this._downloading) {
      this._buttonNextDisabled = this._loadImageElement('images/button_next_disabled.png');
      this._buttonNextHover = this._loadImageElement('images/button_next_hover.png');
      this._buttonNextNormal = this._loadImageElement('images/button_next_normal.png');
      this._buttonNextPressed = this._loadImageElement('images/button_next_pressed.png');
      this._buttonPauseDisabled = this._loadImageElement('images/button_pause_disabled.png');
      this._buttonPauseHover = this._loadImageElement('images/button_pause_hover.png');
      this._buttonPauseNormal = this._loadImageElement('images/button_pause_normal.png');
      this._buttonPausePressed = this._loadImageElement('images/button_pause_pressed.png');
      this._buttonPlayDisabled = this._loadImageElement('images/button_play_disabled.png');
      this._buttonPlayHover = this._loadImageElement('images/button_play_hover.png');
      this._buttonPlayNormal = this._loadImageElement('images/button_play_normal.png');
      this._buttonPlayPressed = this._loadImageElement('images/button_play_pressed.png');
      this._buttonPreviousDisabled = this._loadImageElement('images/button_previous_disabled.png');
      this._buttonPreviousHover = this._loadImageElement('images/button_previous_hover.png');
      this._buttonPreviousNormal = this._loadImageElement('images/button_previous_normal.png');
      this._buttonPreviousPressed = this._loadImageElement('images/button_previous_pressed.png');
    }
  },
  _loadImageElement: function (url) {
    const $this = this;

    this._imageCount++;
    this._imagesLoaded = false;
    this._downloading = true;
    const temp = document.createElement('img');
    temp.src = url;
    temp.addEventListener('load', e => {
      $this._imageLoadCount++;
      if ($this._imageLoadCount === $this._imageCount) {
        $this._downloading = false;
        $this._imagesLoaded = true;
      }
    }, false);
    return temp;
  },
  get_tour: function () {
    return this._tour;
  },
  set_tour: function (value) {
    this._tour = value;
    return value;
  },
  nextSlide: function () {
    if (this._tour.get_currentTourStop() != null) {
      if (!this._tour.get_currentTourStop().get_masterSlide()) {
        if (this._tour.get_currentTourStop().get_musicTrack() != null) {
          this._tour.get_currentTourStop().get_musicTrack().stop();
        }
        if (this._tour.get_currentTourStop().get_voiceTrack() != null) {
          this._tour.get_currentTourStop().get_voiceTrack().stop();
        }
        const $enum1 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          overlay.stop();
        }
      } else {
        this._currentMasterSlide = this._tour.get_currentTourStop();
      }
    }
    if (this._tour.get_currentTourstopIndex() < (this._tour.get_tourStops().length - 1) || this._tour.get_currentTourStop().get_isLinked()) {
      if (this._tour.get_currentTourStop().get_endTarget() != null) {
        WWTControl.singleton.gotoTargetFull(false, true, this._tour.get_currentTourStop().get_endTarget().get_camParams(), this._tour.get_currentTourStop().get_target().get_studyImageset(), this._tour.get_currentTourStop().get_target().get_backgroundImageset());
        WWTControl.singleton.set__mover(null);
      }
      this._onTarget = false;
      if (this._tour.get_currentTourStop().get_isLinked()) {
        try {
          switch (this._tour.get_currentTourStop().get_nextSlide()) {
            case 'Return':
              if (this._callStack.count > 0) {
                this._playFromTourstop(this._tour.get_tourStops()[this._callStack.pop()]);
              } else {
                this._tour.set_currentTourstopIndex(this._tour.get_tourStops().length - 1);
              }
              break;
            default:
              this._playFromTourstop(this._tour.get_tourStops()[this._tour.getTourStopIndexByID(this._tour.get_currentTourStop().get_nextSlide())]);
              break;
          }
        } catch ($e2) {
          if ((this._tour.get_currentTourstopIndex() < (this._tour.get_tourStops().length - 1))) {
            this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() + 1) - 1;
          }
        }
      } else {
        this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() + 1) - 1;
      }
      if (this._currentMasterSlide != null && this._tour.get_currentTourStop().get_masterSlide()) {
        this._stopCurrentMaster();
      }
      let instant = false;
      switch (this._tour.get_currentTourStop().get__transition()) {
        case 0:
          break;
        case 1:
          instant = true;
          break;
        case 2:
          instant = true;
          break;
        case 3:
          instant = true;
          break;
        case 5:
          instant = true;
          break;
        case 4:
          instant = true;
          break;
        default:
          break;
      }
      WWTControl.singleton.gotoTarget(this._tour.get_currentTourStop().get_target(), false, instant, false);
      this._slideStartTime = ss.now();
      Settings.tourSettings = this._tour.get_currentTourStop();
      SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
      SpaceTimeController.set_syncToClock(false);
    } else {
      this._stopCurrentMaster();
      TourPlayer._playing = false;
      if (Settings.get_current().autoRepeatTour) {
        this._tour.set_currentTourstopIndex(-1);
        this.play();
      } else {
        WWTControl.singleton._freezeView();
        if (TourPlayer.__tourEnded != null) {
          TourPlayer.__tourEnded(this, new ss.EventArgs());
        }
        this.showEndTourPopup();
        WWTControl.singleton._hideUI(false);
        WWTControl.scriptInterface._fireTourEnded();
      }
    }
  },
  _stopCurrentMaster: function () {
    if (this._currentMasterSlide != null) {
      if (this._currentMasterSlide.get_musicTrack() != null) {
        this._currentMasterSlide.get_musicTrack().stop();
      }
      if (this._currentMasterSlide.get_voiceTrack() != null) {
        this._currentMasterSlide.get_voiceTrack().stop();
      }
      const $enum1 = ss.enumerate(this._currentMasterSlide.get_overlays());
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.stop();
      }
      this._currentMasterSlide = null;
    }
  },
  showEndTourPopup: () => {
  },
  play: function () {
    if (this._tour == null) {
      return;
    }
    if (TourPlayer._playing) {
      this.stop(true);
    } else {
      TourPlayer._playing = true;
    }
    WWTControl.singleton._hideUI(true);
    TourPlayer._playing = true;
    if (this._tour.get_tourStops().length > 0) {
      this._onTarget = false;
      if (this._tour.get_currentTourstopIndex() === -1) {
        this._tour.set_currentTourStop(this._tour.get_tourStops()[0]);
      }
      if (this._tour.get_currentTourstopIndex() > 0) {
        this._playMasterForCurrent();
      }
      WWTControl.singleton.gotoTarget(this._tour.get_currentTourStop().get_target(), false, true, false);
    }
    this._slideStartTime = ss.now();
    TourPlayer._playing = true;
  },
  _playMasterForCurrent: function () {
    if (!this._tour.get_currentTourStop().get_masterSlide()) {
      const currentMaster = this._tour.elapsedTimeSinceLastMaster(this._tour.get_currentTourstopIndex());
      if (currentMaster != null && this._currentMasterSlide != null) {
        const elapsed = currentMaster.durration;
        this._currentMasterSlide = currentMaster.master;
        if (this._currentMasterSlide.get_musicTrack() != null) {
          this._currentMasterSlide.get_musicTrack().play();
          this._currentMasterSlide.get_musicTrack().seek(elapsed);
        }
        if (this._currentMasterSlide.get_voiceTrack() != null) {
          this._currentMasterSlide.get_voiceTrack().play();
          this._currentMasterSlide.get_voiceTrack().seek(elapsed);
        }
        const $enum1 = ss.enumerate(this._currentMasterSlide.get_overlays());
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          overlay.play();
          overlay.seek(elapsed);
        }
      }
    }
  },
  stop: function (noSwitchBackFullScreen) {
    if (TourPlayer._switchedToFullScreen && !noSwitchBackFullScreen) {
    }
    Settings.tourSettings = null;
    TourPlayer._playing = false;
    if (this._tour.get_currentTourStop() != null) {
      if (this._tour.get_currentTourStop().get_musicTrack() != null) {
        this._tour.get_currentTourStop().get_musicTrack().stop();
      }
      if (this._tour.get_currentTourStop().get_voiceTrack() != null) {
        this._tour.get_currentTourStop().get_voiceTrack().stop();
      }
      const $enum1 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
      while ($enum1.moveNext()) {
        var overlay = $enum1.current;
        overlay.stop();
      }
    }
    if (this._currentMasterSlide != null) {
      if (this._currentMasterSlide.get_musicTrack() != null) {
        this._currentMasterSlide.get_musicTrack().stop();
      }
      if (this._currentMasterSlide.get_voiceTrack() != null) {
        this._currentMasterSlide.get_voiceTrack().stop();
      }
      const $enum2 = ss.enumerate(this._currentMasterSlide.get_overlays());
      while ($enum2.moveNext()) {
        var overlay = $enum2.current;
        overlay.stop();
      }
    }
    WWTControl.singleton._hideUI(TourPlayer.noRestoreUIOnStop);
    WWTControl.scriptInterface._fireTourEnded();
  },
  updateSlideStates: function () {
    let slideChanging = false;
    let slideElapsedTime = ss.now() - this._slideStartTime;
    if (slideElapsedTime > this._tour.get_currentTourStop().get_duration() && TourPlayer._playing) {
      this.nextSlide();
      slideChanging = true;
    }
    slideElapsedTime = ss.now() - this._slideStartTime;
    if (this._tour.get_currentTourStop() != null) {
      this._tour.get_currentTourStop().set_tweenPosition(Math.min(1, (slideElapsedTime / this._tour.get_currentTourStop().get_duration())));
    }
    if (this._tour.get_currentTourStop() != null) {
      this._tour.get_currentTourStop().faderOpacity = 0;
      const elapsedSeconds = this._tour.get_currentTourStop().get_tweenPosition() * this._tour.get_currentTourStop().get_duration() / 1000;
      if (slideChanging) {
        WWTControl.singleton.set_crossFadeFrame(false);
      }
      switch (this._tour.get_currentTourStop().get__transition()) {
        case 0:
          this._tour.get_currentTourStop().faderOpacity = 0;
          WWTControl.singleton.set_crossFadeFrame(false);
          break;
        case 2:
          if (slideChanging) {
          }
          if (elapsedSeconds < (elapsedSeconds - this._tour.get_currentTourStop().get__transitionHoldTime())) {
            WWTControl.singleton.set_crossFadeFrame(true);
            this._tour.get_currentTourStop().faderOpacity = 1;
          } else {
            this._tour.get_currentTourStop().faderOpacity = 0;
            WWTControl.singleton.set_crossFadeFrame(false);
          }
          break;
        case 1:
          WWTControl.singleton.set_crossFadeFrame(true);
          var opacity = Math.max(0, 1 - Math.min(1, (elapsedSeconds - this._tour.get_currentTourStop().get__transitionHoldTime()) / this._tour.get_currentTourStop().get__transitionTime()));
          this._tour.get_currentTourStop().faderOpacity = opacity;
          if (slideChanging) {
          }
          break;
        case 3:
        case 4:
          WWTControl.singleton.set_crossFadeFrame(false);
          var opacity = Math.max(0, 1 - Math.max(0, elapsedSeconds - this._tour.get_currentTourStop().get__transitionHoldTime()) / this._tour.get_currentTourStop().get__transitionTime());
          this._tour.get_currentTourStop().faderOpacity = opacity;
          break;
        case 5:
          WWTControl.singleton.set_crossFadeFrame(false);
          break;
        default:
          break;
      }
      if (!this._tour.get_currentTourStop().get_isLinked() && this._tour.get_currentTourstopIndex() < (this._tour.get_tourStops().length - 1)) {
        const nextTrans = this._tour.get_tourStops()[this._tour.get_currentTourstopIndex() + 1].get__transition();
        const nextTransTime = this._tour.get_tourStops()[this._tour.get_currentTourstopIndex() + 1].get__transitionOutTime();
        switch (nextTrans) {
          case 5:
          case 3:
            if (!this._tour.get_currentTourStop().faderOpacity) {
              WWTControl.singleton.set_crossFadeFrame(false);
              var opacity = Math.max(0, 1 - Math.min(1, ((this._tour.get_currentTourStop().get_duration() / 1000) - elapsedSeconds) / nextTransTime));
              this._tour.get_currentTourStop().faderOpacity = opacity;
            }
            break;
          default:
            break;
        }
      }
    }
  },
  updateTweenPosition: function (tween) {
    const slideElapsedTime = ss.now() - this._slideStartTime;
    if (tween > -1) {
      return this._tour.get_currentTourStop().set_tweenPosition(Math.min(1, tween));
    } else {
      return this._tour.get_currentTourStop().set_tweenPosition(Math.min(1, (slideElapsedTime / this._tour.get_currentTourStop().get_duration())));
    }
  },
  close: function () {
    if (this._tour != null) {
      if (TourPlayer.get_playing()) {
        this.stop(TourPlayer._switchedToFullScreen);
      }
      this._tour = null;
    }
  },
  mouseDown: function (sender, e) {
    let location;
    location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    for (let i = this._tour.get_currentTourStop().get_overlays().length - 1; i >= 0; i--) {
      if (this._tour.get_currentTourStop().get_overlays()[i].hitTest(location)) {
        if (!ss.emptyString(this._tour.get_currentTourStop().get_overlays()[i].get_url())) {
          const linkItem = this._tour.get_currentTourStop().get_overlays()[i];
          Util._openUrl(linkItem.get_url(), true);
          return true;
        }
        if (!ss.emptyString(this._tour.get_currentTourStop().get_overlays()[i].get_linkID())) {
          this._callStack.push(this._tour.get_currentTourstopIndex());
          this._playFromTourstop(this._tour.get_tourStops()[this._tour.getTourStopIndexByID(this._tour.get_currentTourStop().get_overlays()[i].get_linkID())]);
          return true;
        }
      }
    }
    if (this._playerState.get_state()) {
      return this._hitTextPlayerControls(new Vector2d(e.offsetX, e.offsetY), true, true);
    } else {
      this._playerState.set_targetState(true);
      this._lastHit = ss.now();
    }
    return false;
  },
  mouseUp: function (sender, e) {
    if (this._leftDown || this._rightDown || this._middleDown) {
      this._leftDown = false;
      this._rightDown = false;
      this._middleDown = false;
      return true;
    }
    return false;
  },
  mouseMove: function (sender, e) {
    let location;
    try {
      location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
    } catch ($e1) {
      return false;
    }
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    for (let i = this._tour.get_currentTourStop().get_overlays().length - 1; i >= 0; i--) {
      if (this._tour.get_currentTourStop().get_overlays()[i].hitTest(location) && (!ss.emptyString(this._tour.get_currentTourStop().get_overlays()[i].get_url()) || !ss.emptyString(this._tour.get_currentTourStop().get_overlays()[i].get_linkID()))) {
        return true;
      }
    }
    if (this._playerState.get_state()) {
      return this._hitTextPlayerControls(new Vector2d(e.offsetX, e.offsetY), false, false);
    }
    return false;
  },
  mouseClick: (sender, e) => false,
  click: (sender, e) => false,
  mouseDoubleClick: (sender, e) => false,
  keyDown: function (sender, e) {
    switch (e.keyCode) {
      case 27:
        this.stop(TourPlayer._switchedToFullScreen);
        WWTControl.singleton._closeTour();
        return true;
      case 32:
        this.pauseTour();
        return true;
      case 39:
        this._playNextSlide();
        return true;
      case 37:
        this._playPreviousSlide();
        return true;
      case 35:
        if (this._tour.get_tourStops().length > 0) {
          this._playFromTourstop(this._tour.get_tourStops()[this._tour.get_tourStops().length - 1]);
        }
        return true;
      case 36:
        if (this._tour.get_tourStops().length > 0) {
          this._playFromTourstop(this._tour.get_tourStops()[0]);
        }
        return true;
    }
    return false;
  },
  _playNextSlide: function () {
    if ((this._tour.get_currentTourstopIndex() < this._tour.get_tourStops().length - 1) && this._tour.get_tourStops().length > 0) {
      this._playFromTourstop(this._tour.get_tourStops()[this._tour.get_currentTourstopIndex() + 1]);
    }
  },
  _playPreviousSlide: function () {
    if (this._tour.get_currentTourstopIndex() > 0) {
      this._playFromTourstop(this._tour.get_tourStops()[this._tour.get_currentTourstopIndex() - 1]);
    }
  },
  _playFromTourstop: function (tourStop) {
    this.stop(true);
    this._tour.set_currentTourStop(tourStop);
    WWTControl.singleton.gotoTarget(this._tour.get_currentTourStop().get_target(), false, true, false);
    SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
    SpaceTimeController.set_syncToClock(false);
    this.play();
  },
  pauseTour: function () {
    if (TourPlayer._playing) {
      this.stop(TourPlayer._switchedToFullScreen);
      WWTControl.singleton._freezeView();
      WWTControl.scriptInterface._fireTourPaused();
    } else {
      this.play();
      WWTControl.scriptInterface._fireTourResume();
    }
  },
  keyUp: (sender, e) => false,
  hover: pnt => {
    if (TourPlayer._playing) {
      return true;
    }
    return false;
  },
  pointToView: pnt => {
    const clientHeight = WWTControl.singleton.canvas.height;
    const clientWidth = WWTControl.singleton.canvas.width;
    const viewWidth = (clientWidth / clientHeight) * 1116;
    const x = ((pnt.x) / (clientWidth) * viewWidth) - ((viewWidth - 1920) / 2);
    const y = (pnt.y) / clientHeight * 1116;
    return new Vector2d(x, y);
  }
};