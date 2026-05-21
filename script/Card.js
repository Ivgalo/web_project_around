import { imagePopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".main__gallery-card")
      .cloneNode(true);

    return cardElement;
  }

  _like() {
    this._element
      .querySelector(".main__button_like")
      .addEventListener("click", (e) => {
        e.target.classList.toggle("main__button_like_active");
      });
  }

  _trash() {
    this._element
      .querySelector(".main__button_trash")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }

  _popup() {
    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () => {
        imagePopup(this._name, this._link);
      });
  }

  _setListener() {
    this._like();
    this._trash();
    this._popup();
  }

  getCreateCard() {
    this._element = this._getTemplate();
    this._setListener();

    this._element.querySelector(".main__gallery-image").src = this._link;
    this._element.querySelector(".main__gallery-image").alt = this._link;
    this._element.querySelector(".main__gallery-paragraph").textContent =
      this._name;

    return this._element;
  }
}

class FormCard extends Card {
  constructor(cardSelector) {
    super({}, cardSelector);
  }
  handleCreateCard(title, link) {
    this._name = title;
    this._link = link;
  }
}

export { Card, FormCard };