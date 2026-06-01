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
const profileForm = document.querySelector("#edit-profile-form");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
    api.addCard(formData["place-name"], formData.link)
        .then((cardData) => {
        renderCard(cardData);
    })
        .catch((err) => console.error(err));
    newCardFormValidator.resetValidation();
});
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup", () => {
    if (!selectedCardId || !selectedCardElement) {
        return;
    }
    api.deleteCard(selectedCardId)
        .then(() => {
        selectedCardElement === null || selectedCardElement === void 0 ? void 0 : selectedCardElement.remove();
        deleteCardPopup.close();
        selectedCardId = null;
        selectedCardElement = null;
    })
        .catch((err) => console.error(err));
});
const cardSection = new Section({
    items: [],
    renderer: (cardData) => {
        renderCard(cardData);
    },
}, ".cards__list");
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
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
const avatarForm = document.querySelector("#avatar-form");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
    api.updateAvatar(formData.avatar)
        .then((data) => {
        userInfo.setUserInfo({
            name: data.name,
            job: data.about,
            avatar: data.avatar,
        });
        avatarPopup.close();
    })
        .catch((err) => console.error(err));
    avatarFormValidator.resetValidation();
});
const editFormValidator = new FormValidator(defaultFormConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
//validaciones y eventos
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
imagePopup.setEventListeners();
newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarFormValidator.enableValidation();
avatarPopup.setEventListeners();
profileAvatarButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
//funciones
let selectedCardId = null;
let selectedCardElement = null;
function renderCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick, handleDeleteCardClick, (cardId, isLiked) => {
        handleLikeCardClick(cardId, isLiked, card);
    });
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
function handleDeleteCardClick(cardId, cardElement) {
    selectedCardId = cardId;
    selectedCardElement = cardElement;
    deleteCardPopup.open();
}
function handleLikeCardClick(cardId, isLiked, card) {
    const request = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
    request
        .then((updatedCard) => {
        card.setLike(updatedCard.isLiked);
    })
        .catch((err) => console.error(err));
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
    cards.forEach((cardData) => {
        renderCard(cardData);
    });
})
    .catch((err) => {
    console.error(err);
});
