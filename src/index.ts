import { defaultFormConfig } from "./utils/constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";

import { apiConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";

//selectores
const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: apiConfig.headers,
});

const profileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const editProfileButton = document.querySelector(".profile__edit-button") as HTMLFormElement;

const addCardButton = document.querySelector(".profile__add-button") as HTMLFormElement;
const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  api.addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      renderCard(cardData);
    })
    .catch((err) => console.error(err));

  newCardFormValidator.resetValidation();
});
const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-popup",
  () => {
    console.log("Confirmar eliminación");
  }
);
const cardSection = new Section<CardData>(
  {
    items: [],
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  ".cards__list"
);

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  api.updateUserProfile(formData.name, formData.description)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
    })
    .catch((err) => console.error(err));
  editFormValidator.resetValidation();
});

const inputName = document.querySelector(".popup__input_type_name") as HTMLInputElement;
const inputDescription = document.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");

const editFormValidator = new FormValidator(defaultFormConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);


editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
imagePopup.setEventListeners();
newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();

//funciones

type CardData = {
  name: string;
  link: string;
  _id: string;
  owner?: string;
  isLiked?: boolean;
};

function renderCard(cardData: CardData): void {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();

  cardSection.addItem(cardElement);
}

function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputDescription.value = userData.job;
}

function handleImageClick(name: string, link: string): void {
  imagePopup.open(name, link);
}


//Eventos

addCardButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

//Inicializacion
Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, cards]) => {

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cards.forEach((cardData: CardData) => {
      renderCard(cardData);
    });

  })
  .catch((err) => {
    console.error(err);
  });