export class Popup {
  protected _popup: HTMLElement;

  constructor(popupSelector: string) {
    this._popup = document.querySelector(popupSelector)!;
  }

  open(): void {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(): void {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  private _handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners(): void {
    const closeButton = this._popup.querySelector(".popup__close")!;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}