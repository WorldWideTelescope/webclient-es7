// wwtlib.BlendState

export class BlendState {

  constructor() {
    this._state = false;
    this._targetState = false;
    this._delayTime = 0;
    this._switchedTime = new Date(1990, 0, 0, 0, 0, 0, 0);
    this._state = false;
    this._targetState = this._state;
    this._delayTime = 1000;
  }
  static create(initialState, delayTime) {
    const temp = new BlendState();
    temp._state = initialState;
    temp._targetState = initialState;
    temp._delayTime = delayTime;
    return temp;
  }
  get_state() {
    if (this._targetState !== this._state) {
      const ts = ss.now() - this._switchedTime;
      if (ts > this._delayTime) {
        this._state = this._targetState;
      }
      return true;
    }
    return this._state;
  }
  set_state(value) {
    this._switchedTime = new Date(1990, 0, 0, 0, 0, 0, 0);
    this._state = value;
    this._targetState = this._state;
    return value;
  }
  get_targetState() {
    return this._targetState;
  }
  set_targetState(value) {
    if (this._targetState !== value) {
      this._switchedTime = ss.now();
      this._targetState = value;
    }
    return value;
  }
  get_opacity() {
    if (this._targetState !== this._state) {
      const ts = ss.now() - this._switchedTime;
      if (ts > this._delayTime) {
        this._state = this._targetState;
      } else {
        const opacity = (ts / this._delayTime);
        return (this._targetState) ? opacity : 1 - opacity;
      }
    }
    return (this._state) ? 1 : 0;
  }
  get_delayTime() {
    return this._delayTime;
  }
  set_delayTime(value) {
    this._delayTime = value;
    return value;
  }
};