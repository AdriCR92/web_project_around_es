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

//profile
const profileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const editProfileButton = document.querySelector(".profile__edit-button") as HTMLFormElement;
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  editProfilePopup.setButtonText("Guardando...");

  api.updateUserProfile(formData.name, formData.description)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.error("Fallo al cargar datos iniciales:", err))
    .finally(() => {
      editProfilePopup.setButtonText("Guardar");
    });

  editFormValidator.resetValidation();
});

//cards
const addCardButton = document.querySelector(".profile__add-button") as HTMLFormElement;
const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  newCardPopup.setButtonText("Guardando...");
  api.addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      renderCard(cardData);
      newCardPopup.close();
    })
    .catch((err) => console.error("Fallo al cargar datos iniciales:", err))
    .finally(() => {
      newCardPopup.setButtonText("Crear");
    });
  newCardFormValidator.resetValidation();
});
const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-popup",
  () => {
    if (!selectedCardId || !selectedCardElement) {
      return;
    }
    api.deleteCard(selectedCardId)
      .then(() => {
        selectedCardElement?.remove();
        deleteCardPopup.close();

        selectedCardId = null;
        selectedCardElement = null;
      })
      .catch((err) => console.error("Fallo al cargar datos iniciales:", err));
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


//inputs
const inputName = document.querySelector(".popup__input_type_name") as HTMLInputElement;
const inputDescription = document.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

//image
const imagePopup = new PopupWithImage("#image-popup");

//avatar
const avatarForm = document.querySelector("#avatar-form") as HTMLFormElement;
const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
) as HTMLButtonElement;
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.setButtonText("Guardando...");

  api.updateAvatar(formData.avatar)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.error("Fallo al cargar datos iniciales:", err))
    .finally(() => {
      avatarPopup.setButtonText("Guardar");
    });

  avatarFormValidator.resetValidation();
});

//validators
const editFormValidator = new FormValidator(defaultFormConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);

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
let selectedCardId: string | null = null;
let selectedCardElement: HTMLElement | null = null;

type CardData = {
  name: string;
  link: string;
  _id: string;
  owner?: string;
  isLiked?: boolean;
};

function renderCard(cardData: CardData): void {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCardClick,
    (cardId, isLiked) => {
      handleLikeCardClick(cardId, isLiked, card);
    }
  );
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

function handleDeleteCardClick(
  cardId: string,
  cardElement: HTMLElement
): void {
  selectedCardId = cardId;
  selectedCardElement = cardElement;
  deleteCardPopup.open();
}

function handleLikeCardClick(
  cardId: string,
  isLiked: boolean,
  card: Card
): void {
  const request = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  request
    .then((updatedCard) => {
      card.setLike(updatedCard.isLiked);
    })
    .catch((err) => console.error("Fallo al cargar datos iniciales:", err));
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
    console.error("Fallo al cargar datos iniciales:", err);
  });