type CardData = {
  name?: string;
  link?: string;
  _id: string;
  isLiked?: boolean;
};

export class Card {
  private _id: string;
  private _name: string;
  private _link: string;
  private _isLiked: boolean;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void;
  private _handleLikeClick: (cardId: string, isLiked: boolean) => void;

  private _element!: HTMLElement;
  private _cardImage!: HTMLImageElement;
  private _cardTitle!: HTMLElement;
  private _likeButton!: HTMLButtonElement;
  private _deleteButton!: HTMLButtonElement;

  constructor(
    cardData: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void,
    handleLikeClick: (cardId: string, isLiked: boolean) => void
  ) {
    this._id = cardData._id;
    this._name = cardData.name || "Sin título";
    this._link = cardData.link || "./images/placeholder.jpg";
    this._isLiked = cardData.isLiked || false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  private _getTemplate(): HTMLElement {
    const template = document.querySelector(
      this._templateSelector
    ) as HTMLTemplateElement;

    const cardElement = template.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private _setLikeState(): void {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  setLike(isLiked: boolean): void {
    this._isLiked = isLiked;
    this._setLikeState();
  }

  private _setEventListeners(): void {
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

  getView(): HTMLElement {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(
      ".card__image"
    ) as HTMLImageElement;
    this._cardTitle = this._element.querySelector(".card__title") as HTMLElement;
    this._likeButton = this._element.querySelector(
      ".card__like-button"
    ) as HTMLButtonElement;
    this._deleteButton = this._element.querySelector(
      ".card__delete-button"
    ) as HTMLButtonElement;

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setLikeState();
    this._setEventListeners();

    return this._element;
  }
}