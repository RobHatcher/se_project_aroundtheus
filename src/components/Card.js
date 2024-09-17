export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeClick = handleLikeClick;
  }

  // Event Listeners
  _setEventListeners() {
    this._cardElement.addEventListener("click", () => {
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this.handleLikeClick(this);
        });
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard(this._id, this._cardElement);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._link, this._name);
      });
  }

  toggleLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // Handlers
  // _handleLikeIcon() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }
  handleLikeButton(isLiked) {
    if (isLiked !== undefined) {
      this._isLiked = isLiked;
    }
    if (this._isLiked) {
      this.toggleLike();
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__text").textContent = this._name;
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this.handleLikeButton(this._isLiked);

    this._setEventListeners();
    return this._cardElement;
  }
}
