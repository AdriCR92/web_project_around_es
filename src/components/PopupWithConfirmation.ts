import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private _submitButton: HTMLButtonElement;
  private _handleSubmit: () => void;

  constructor(popupSelector: string, handleSubmit: () => void) {
    super(popupSelector);

    this._submitButton = this._popup.querySelector(
      ".popup__button_type_confirm"
    ) as HTMLButtonElement;

    this._handleSubmit = handleSubmit;
  }

  setEventListeners(): void {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}