import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _handleFormSubmit: (data: Record<string, string>) => void;

  constructor(
    popupSelector: string,
    handleFormSubmit: (data: Record<string, string>) => void
  ) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(".popup__input")
    ) as HTMLInputElement[];
  }

  private _getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  setEventListeners(): void {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues()); 
    });
  }
  close(): void {
    super.close();
    this._form.reset();
  }
  setButtonText(text: string): void {
  const submitButton = this._form.querySelector(".popup__button") as HTMLButtonElement;
  submitButton.textContent = text;
}
}