import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popimage, poptext) {
    super(popupSelector);
    this._imageElement = popimage;
    this._captionElement = poptext;
  }

  open(src, caption) {
    this._imageElement.src = src;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;
    super.open();
  }
}