export class Card {
    constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._id = cardData._id;
        this._name = cardData.name || "Sin título";
        this._link = cardData.link || "./images/placeholder.jpg";
        this._isLiked = cardData.isLiked || false;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        const cardElement = template.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    _setLikeState() {
        if (this._isLiked) {
            this._likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this._likeButton.classList.remove("card__like-button_is-active");
        }
    }
    setLike(isLiked) {
        this._isLiked = isLiked;
        this._setLikeState();
    }
    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick(this._id, this._isLiked);
        });
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteClick(this._id, this._element);
        });
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    getView() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardTitle = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setLikeState();
        this._setEventListeners();
        return this._element;
    }
}
