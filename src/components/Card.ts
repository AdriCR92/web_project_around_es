type CardData = {
  name?: string;
  link?: string;
};

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;

  private _element!: HTMLElement;
  private _cardImage!: HTMLImageElement;
  private _cardTitle!: HTMLElement;
  private _likeButton!: HTMLButtonElement;
  private _deleteButton!: HTMLButtonElement;

  constructor(
    cardData: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._name = cardData.name || "Sin título";
    this._link = cardData.link || "./images/placeholder.jpg";
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  private _handleLikeClick(): void {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  private _handleDeleteClick(): void {
    this._element.remove();
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
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

    this._setEventListeners();

    return this._element;
  }
}