export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;
  private _avatarElement: HTMLImageElement;

  constructor({
    nameSelector,
    jobSelector,
    avatarSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
    avatarSelector: string;
  }) {
    this._nameElement = document.querySelector(nameSelector)!;
    this._jobElement = document.querySelector(jobSelector)!;
    this._avatarElement = document.querySelector(
      avatarSelector
    ) as HTMLImageElement;
  }


  getUserInfo(): { name: string; job: string } {
    return {
      name: this._nameElement.textContent || "",
      job: this._jobElement.textContent || "",
    };
  }

  setUserInfo({
  name,
  job,
  avatar,
}: {
  name: string;
  job: string;
  avatar?: string;
}): void {
  this._nameElement.textContent = name;
  this._jobElement.textContent = job;

  if (avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = name;
  }
}
}