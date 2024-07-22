export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Event Listeners
  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteButton = this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    const imagePreview = this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._link);
      });
  }

  // Handlers
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    if (typeof this._handleImageClick === "function") {
      this._handleImageClick(this._link);
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    return this._cardElement;
  }
}
