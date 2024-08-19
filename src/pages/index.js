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

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");


// Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

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

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ title: data.title, description: data.description });
  profileEditModal.close();
}

function handleAddCardFormSubmit(data) {
  const name = data.title.trim();
  const link = data.url.trim();

  renderCard({ name, link });
  addCardModal.close();
  addCardFormElement.reset();
}

function handleImageClick(link, name) {
  cardImageModal.open({ link, name });
}

// Form Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title.trim();
  profileDescriptionInput.value = userData.description.trim();
  editFormValidator.resetValidation();
  profileEditModal.open();
});

// add new card
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

