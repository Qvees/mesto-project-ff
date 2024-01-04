const token = "3b3afde6-a24d-4435-b967-1a1522a2423b";
const cohortId = "wff-cohort-3";


function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function getUserInfo() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function getCards() { // извиняюсь из головы вылетело
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function postNameAndAbout(name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

function postNewCard(name, link) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function likeCard(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
}

function removeLike(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
}

function changeAvatar(avatarLink) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarLink }),
  }).then(checkResponse);
}

export {
  getCards,
  getUserInfo,
  postNameAndAbout,
  postNewCard,
  removeCard,
  likeCard,
  removeLike,
  changeAvatar,
};