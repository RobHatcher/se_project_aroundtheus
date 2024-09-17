export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
// Card functions
// Loading cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then(this._handleResponse);
  }

  //Adding a new card
  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(card),
    }).then(this._handleResponse);
  }

  // Deleting a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._handleResponse);
  }

  // Adding and removing likes
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._handleResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._handleResponse);
}

// Edit Info
//Loading user information from the server
getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then(this._handleResponse);
}

// Editing the profile
updateUserProfile(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(userData),
    }).then(this._handleResponse);
}

// Updating profile picture
updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(avatar),
    }).then(this._handleResponse);
}

}
