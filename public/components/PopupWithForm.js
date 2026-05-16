import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close(); // 👈 importante
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}
