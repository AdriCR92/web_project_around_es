import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private _image: HTMLImageElement;
  private _caption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    this._image = this._popup.querySelector(".popup__image") as HTMLImageElement;
    this._caption = this._popup.querySelector(".popup__caption") as HTMLElement;
  }

  open(name?: string, link?: string): void {
    if (name && link) {
      this._image.src = link;
      this._image.alt = name;
      this._caption.textContent = name;
    }

    super.open();
  }
}