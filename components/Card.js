const modalElement = document.querySelector(".modal");
const modalImage = document.querySelector(".modal__image");
const cardImageModal = document.querySelector("#card-image-modal");
const modalCloseButton = cardImageModal.querySelector(
  "#card-image-modal-close"
);
const cardImageModalTitle = document.querySelector("#modal-title");

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
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
        this._handleOpenModal(this._cardElement);
      });

    modalCloseButton.addEventListener("click", () => {
      this._handleCloseModal();
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

  _handleOpenModal() {
    modalImage.src = this._link;
    cardImageModalTitle.textContent = this._name;
    cardImageModal.classList.add("modal_opened");
  }

  _handleCloseModal() {
    //modalImage.src = "";
    modalElement.classList.remove("modal_opened");
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

    this._setEventListeners();
    return this._cardElement;
  }
}
