export class Popup {
    constructor(popupSelector) {
        this._handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}
