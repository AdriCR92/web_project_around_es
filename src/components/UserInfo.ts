export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor({
    nameSelector,
    jobSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
  }) {
    this._nameElement = document.querySelector(nameSelector)!;
    this._jobElement = document.querySelector(jobSelector)!;
  }

  getUserInfo(): { name: string; job: string } {
    return {
      name: this._nameElement.textContent || "",
      job: this._jobElement.textContent || "",
    };
  }

  setUserInfo({ name, job }: { name: string; job: string }): void {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}