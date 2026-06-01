import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector(".popup__button_type_confirm");
        this._handleSubmit = handleSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener("click", () => {
            this._handleSubmit();
        });
    }
}
