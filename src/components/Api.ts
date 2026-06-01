type ApiOptions = {
  baseUrl: string;
  headers: HeadersInit;
};

export class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: {
    baseUrl: string;
    headers: HeadersInit;
  }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  updateUserProfile(name: string, about: string) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => res.json());
  }

  addCard(name: string, link: string) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => res.json());
  }
}