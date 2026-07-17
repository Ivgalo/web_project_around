import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement =
      this._popup.querySelector(".popup__image");

    this._captionElement =
      this._popup.querySelector(".popup__paragraph");
  }

  open(src, caption) {
    this._imageElement.src = src;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;

    super.open();
  }
}