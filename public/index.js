import { defaultFormConfig } from "./utils/constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
//selectores
const profileForm = document.querySelector("#edit-profile-form");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
    renderCard(formData["place-name"], formData.link);
    newCardFormValidator.resetValidation();
});
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
    userInfo.setUserInfo({
        name: formData.name,
        job: formData.description,
    });
    editFormValidator.resetValidation();
});
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
const editFormValidator = new FormValidator(defaultFormConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
imagePopup.setEventListeners();
newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
//funciones
function renderCard(name, link) {
    const card = new Card({ name, link }, "#card-template", handleImageClick);
    const cardElement = card.getView();
    cardSection.addItem(cardElement);
}
function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    inputName.value = userData.name;
    inputDescription.value = userData.job;
}
function handleImageClick(name, link) {
    imagePopup.open(name, link);
}
const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        renderCard(cardData.name, cardData.link);
    },
}, ".cards__list");
cardSection.renderItems();
addCardButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
editProfileButton.addEventListener("click", () => {
    fillProfileForm();
    editFormValidator.resetValidation();
    editProfilePopup.open();
});
