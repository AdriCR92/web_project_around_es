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
const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach(function (card) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.innerHTML = `
    <img
      class="card__image"
      src="${card.link}"
      alt="${card.name}"
    />
    <button
      class="card__delete-button"
      type="button"
    ></button>
    <div class="card__description">
      <h2 class="card__title">${card.name}</h2>
      <button
        class="card__like-button"
        type="button"
      ></button>
    </div>
  `;

  cardsContainer.append(cardElement);
});
const profileForm = document.querySelector("#edit-profile-form");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const popupClose = editProfileModal.querySelector(".popup__close");
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editProfileButton.addEventListener("click", handleOpenEditModal);
popupClose.addEventListener("click", () => closeModal(editProfileModal));

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description",
);
function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(editProfileModal);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);
