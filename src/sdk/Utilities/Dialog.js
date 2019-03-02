import ss from '../scriptsharp/ss';
import {LayerManager} from '../Layers/LayerManager';

export class Dialog {


  add_showDialogHook(value) {
    this.__showDialogHook = ss.bindAdd(this.__showDialogHook, value);
  }
  remove_showDialogHook(value) {
    this.__showDialogHook = ss.bindSub(this.__showDialogHook, value);
  }
  show(dialogArgs, e) {
    if (this.__showDialogHook != null) {
      this.__showDialogHook(dialogArgs, e);
    }
  }
}

export class SimpleInput{
  constructor(title, label, text, v3) {
    this.title = 'Tile';
    this.label = 'Enter Text Below';
    this.text = '';
    this._textElement = null;
    this._ignoreNextClick = false;
    this.title = title;
    this.label = label;
    this.text = text;
  }
  showDialog(){return 1;}
  nonMenuClick(e) {
    if (!this._ignoreNextClick) {
      this._close();
    }
    this._ignoreNextClick = false;
  }
  show(position, callback) {
    const simpleInputElement = document.getElementById('simpleinput');
    const modalElement = document.getElementById('simplemodal');
    modalElement.style.display = 'block';
    simpleInputElement.style.display = 'block';
    simpleInputElement.style.marginLeft = position.x.toString() + 'px';
    simpleInputElement.style.marginTop = position.y.toString() + 'px';
    this._textElement = document.getElementById('inputtext');
    this._textElement.value = this.text;
    const titleDiv = document.getElementById('simpletitle');
    const labelDiv = document.getElementById('inputlabel');
    titleDiv.innerText = this.title;
    labelDiv.innerText = this.label;
    this._textElement.addEventListener('change', ss.bind('textChanged', this), false);
    this._textElement.addEventListener('click', ss.bind('ignoreMe', this), true);
    const okButton = document.getElementById('simpleinputok');
    const cancelButton = document.getElementById('simpleinputcancel');
    okButton.addEventListener('click', ss.bind('okClicked', this), false);
    cancelButton.addEventListener('click', ss.bind('cancelClicked', this), false);
    this._okCallback = callback;
  }
  okClicked(e) {
    this._close();
    if (this._okCallback != null) {
      this._okCallback();
    }
  }
  cancelClicked(e) {
    this._close();
  }
  _close() {
    const simpleInputElement = document.getElementById('simplemodal');
    simpleInputElement.style.display = 'none';
    this._textElement.removeEventListener('change', ss.bind('textChanged', this), false);
    const okButton = document.getElementById('simpleinputok');
    const cancelButton = document.getElementById('simpleinputcancel');
    okButton.removeEventListener('click', ss.bind('okClicked', this), false);
    cancelButton.removeEventListener('click', ss.bind('cancelClicked', this), false);
  }
  ignoreMe(e) {
    this._ignoreNextClick = true;
  }
  textChanged(e) {
    this.text = this._textElement.value;
    this._ignoreNextClick = true;
  }
}

export class FrameWizard extends Dialog{
  constructor() {
    super();
  }
  OK(frame){
    LayerManager.referenceFrameWizardFinished(frame);
  }
}

export class ReferenceFrameProps extends Dialog{
  constructor() {
    super();
  }
  OK(frame){
    LayerManager.loadTree();
  }
}

export class GreatCircleDialog extends Dialog{
  constructor() {
    super();
  }
  OK(frame){
    return this;
  }
}

export class DataVizWizard extends Dialog{
  constructor() {
    super();
  }
  OK(frame){
    return this;
  }
}
