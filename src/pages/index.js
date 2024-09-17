// Imports //

// Project 7 imports

import Card from "../components/Card.js";
import FormValidator from "../components/Formvalidator.js";
import "./index.css";

//Project 8 imports

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import { validationConfig } from "../utils/Constants.js";

// Project 9
import Api from "../components/Api.js";
import ModalConfirmation from "../components/ModalConfirmation.js";

// Card Template
const cardTemplate = "#card-template";

// User Info
const userInfo = new UserInfo({
  title: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1c762117-d6f0-4feb-82f6-eea74884d6a4",
    "Content-Type": "application/json",
  },
});

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".avatar__edit-icon");

// Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Creating Card Function
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  );
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItems(card);
}

// Cards and Info
let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".cards__list"
    );

    section.renderItems();
  })
  .catch((err) => console.error(err));

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error(err));

// Validation
const profileEditForm = document.forms["profile-form"];
const addCardFormElement = document.forms["add-card-form"];
const avatarEditForm = document.forms["edit-avatar-form"];
const avatarFormValidator = new FormValidator(validationConfig, avatarEditForm);
const editFormValidator = new FormValidator(validationConfig, profileEditForm);
const addFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// ModalWithForm
// Update Profile
const profileEditModal = new ModalWithForm("#profile-edit-modal", (data) => {
  return api
    .updateUserProfile({
      name: data.title,
      about: data.description,
    })
    .then(() => {
      userInfo.setUserInfo({
        title: data.title,
        description: data.description,
      });
      profileEditModal.close();
    });
});
profileEditModal.setEventListeners();

// Add Card
const addCardModal = new ModalWithForm("#add-card-modal", (data) => {
  const name = data.title.trim();
  const link = data.url.trim();

  api.createCard({ name, link }).then(() => {
    renderCard({ name, link });
    addCardModal.close();
    addCardFormElement.reset();
  });
});
addCardModal.setEventListeners();

// Update Avatar
const editAvatarModal = new ModalWithForm("#edit-avatar-modal", (formData) => {
  return api.updateAvatar({ avatar: formData.avatar }).then((userData) => {
    userInfo.setUserAvatar({ avatar: userData.avatar });
  });
});

editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();

  editAvatarModal.setEventListeners();
});

// ModalWithImage
const cardImageModal = new ModalWithImage("#card-image-modal");
cardImageModal.setEventListeners();

/* Functions */
function handleImageClick(link, name) {
  cardImageModal.open({ link, name });
}

const deleteModalConfirmation = new ModalConfirmation(
  "#modal-confirm",
  (cardId, cardElement) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error(`Error On Card Deletion ${err}`);
      });
  }
);

function handleDeleteCard(cardId, cardElement) {
  deleteModalConfirmation.open(cardId, cardElement);
}

function handleLikeClick(cardData) {
  if (cardData._isLiked) {
    api
      .dislikeCard(cardData._id)
      .then(() => {
        cardData.toggleLike();
        cardData._isLiked = false;
      })
      .catch((err) => {
        console.error(`Error on Card Dislike ${err}`);
      });
  } else {
    api
      .likeCard(cardData._id)
      .then(() => {
        cardData.toggleLike();
        cardData._isLiked = true;
      })
      .catch((err) => {
        console.error(`Error on Card Like ${err}`);
      });
  }
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
