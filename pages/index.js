import Card from "../components/Card.js";
import FormValidator from "../components/Formvalidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Wrappers */
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalImage = document.querySelector("#modal-image");
const cardImageModalTitle = document.querySelector("#modal-title");

/* Buttons and other DOM nodes */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalClose = profileEditModal.querySelector(
  "#profile-modal-close"
);
const addCardModalClose = addCardModal.querySelector("#add-modal-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardImageModalClose = cardImageModal.querySelector(
  "#card-image-modal-close"
);

/* Form Data */
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

/* Validation */

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(validationConfig, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* Functions */

document.addEventListener("DOMContentLoaded", (event) => {
  const modalList = document.querySelectorAll(".modal");

  modalList.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal(modal);
      }
    });
  });
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // resetModalForm(modal); 

  document.removeEventListener("keydown", closeModalByPressingESCKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("keydown", closeModalByPressingESCKey);
}

function closeModalByPressingESCKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) closeModal(modal);
  }
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  e.target.reset();
  editFormValidator.resetValidation();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardsWrap);
  addFormValidator.resetValidation();
  closeModal(addCardModal);
}

const handleImageClick = (link, name) => {
  cardImageModalImage.src = link;
  cardImageModalImage.alt = name;
  cardImageModalTitle.textContent = name;
  openModal(cardImageModal);
};

/* Form Listeners */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
// add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalClose.addEventListener("click", () => closeModal(addCardModal));
cardImageModalClose.addEventListener("click", () => closeModal(cardImageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
