type ApiOptions = {
  baseUrl: string;
  headers: HeadersInit;
};

export class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private async _checkResponse(res: Response) {
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    return this._checkResponse(res);
  }

  async updateUserProfile(name: string, about: string) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });

    return this._checkResponse(res);
  }

  async addCard(name: string, link: string) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });

    return this._checkResponse(res);
  }

  async deleteCard(cardId: string) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._checkResponse(res);
  }

  async addLike(cardId: string) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });

    return this._checkResponse(res);
  }

  async removeLike(cardId: string) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._checkResponse(res);
  }

  async updateAvatar(avatar: string) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });

    return this._checkResponse(res);
  }
}