export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._cardSelector = cardSelector;
    this._popupImage = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });
  }

  _trash() {
    this._element
      .querySelector(".main__button_trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
  }

  _handleCardClick() {
    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () => {
        this._popupImage.open(this._link, this._name);
      });
  }

  _setEventsListener() {
    this._like();
    this._trash();
    this._handleCardClick();
  }

  getCreateCard() {
    this._element = this._getTemplate();
    this._setEventsListener();

    this._element.querySelector(".main__gallery-image").src = this._link;
    this._element.querySelector(".main__gallery-image").alt = this._name;
    this._element.querySelector(
      ".main__gallery-paragraph"
    ).textContent = this._name;

    this.updateLike({
      isLiked: this._isLiked,
    });

    return this._element;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLike(cardData) {
    this._isLiked = cardData.isLiked;

    this._element
      .querySelector(".main__button_like")
      .classList.toggle("main__button_like_active", this._isLiked);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}