// Project 7 imports

import Card from "../components/Card.js";
import FormValidator from "../components/Formvalidator.js";
import "./index.css";

//Project 8 imports

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import { initialCards, validationConfig } from "../utils/Constants.js"

// Card Template
const cardTemplate = "#card-template";

// User Info
const userInfo = new UserInfo({
  title: ".profile__title",
  description: ".profile__description",
});

/* Wrappers */
// const cardsWrap = document.querySelector(".cards__list");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const addCardModal = document.querySelector("#add-card-modal");
// const profileEditForm = profileEditModal.querySelector(".modal__form");
// const addCardFormElement = addCardModal.querySelector(".modal__form");
// const cardImageModal = document.querySelector("#card-image-modal");
// const cardImageModalImage = document.querySelector("#modal-image");
// const cardImageModalTitle = document.querySelector("#modal-title");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
// const profileModalClose = profileEditModal.querySelector(
//   "#profile-modal-close"
// );
// const addCardModalClose = addCardModal.querySelector("#add-modal-close");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
// const cardImageModalClose = cardImageModal.querySelector(
//   "#card-image-modal-close"
// );

// Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
// const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Creating Card Function
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItems(card);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

// Validation 
const profileEditForm = document.forms["profile-form"];
const addCardFormElement = document.forms["add-card-form"];
const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// ModalWithForm 
const profileEditModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();
const addCardModal = new ModalWithForm("#add-card-modal", handleAddCardFormSubmit);
addCardModal.setEventListeners();

// ModalWithImage
const cardImageModal = new ModalWithImage("#card-image-modal");
cardImageModal.setEventListeners();


/* Functions */

// document.addEventListener("DOMContentLoaded", (event) => {
//   const modalList = document.querySelectorAll(".modal");

//   modalList.forEach((modal) => {
//     modal.addEventListener("click", (e) => {
//       if (e.target.classList.contains("modal")) {
//         closeModal(modal);
//       }
//     });
//   });
// });

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   // resetModalForm(modal);

//   document.removeEventListener("keydown", closeModalByPressingESCKey);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");

//   document.addEventListener("keydown", closeModalByPressingESCKey);
// }

// function closeModalByPressingESCKey(evt) {
//   if (evt.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     if (modal) closeModal(modal);
//   }
// }

// Added Above (DELETE IF FUNCTIONING)
// function createCard(cardData) {
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   return card.getView();
// }

// function renderCard(cardData, wrapper) {
//   const card = createCard(cardData);
//   wrapper.prepend(card);
// }

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ title: data.title, description: data.description });
  profileEditModal.close();

  // e.preventDefault();
  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  // closeModal(profileEditModal);
  // e.target.reset();
  // editFormValidator.toggleButtonState();
}

function handleAddCardFormSubmit(data) {
  const name = data.title.trim();
  const link = data.url.trim();

  renderCard({ name, link });
  addCardModal.close();
  addCardFormElement.reset();
  // e.preventDefault();
  // const name = cardTitleInput.value;
  // const link = cardUrlInput.value;
  // e.target.reset();
  // renderCard({ name, link }, cardsWrap);
  // addFormValidator.toggleButtonState();
  // closeModal(addCardModal);
}

function handleImageClick(link, name) {
  cardImageModal.open({ link, name });
}

// Form Listeners
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title.trim();
  profileDescriptionInput.value = userData.description.trim();
  editFormValidator.resetValidation();
  profileEditModal.open();
});
// profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
// add new card
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// openModal(addCardModal));
// addCardModalClose.addEventListener("click", () => closeModal(addCardModal));
// cardImageModalClose.addEventListener("click", () => closeModal(cardImageModal));

//initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
