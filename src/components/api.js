const token = "3b3afde6-a24d-4435-b967-1a1522a2423b";
const cohortId = "wff-cohort-3";
const url = "https://nomoreparties.co/v1/";


function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function getUserInfo() {
  return fetch(`${url}${cohortId}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function getCards() { // извиняюсь из головы вылетело
  return fetch(`${url}${cohortId}/cards`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function updateUserInfo(name, about) {
  return fetch(`${url}${cohortId}/users/me`, {
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
  return fetch(`${url}${cohortId}/cards`, {
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
  return fetch(`${url}${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

function likeCard(cardId) {
  return fetch(
    `${url}${cohortId}/cards/likes/${cardId}`,
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
    `${url}${cohortId}/cards/likes/${cardId}`,
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
  return fetch(`${url}${cohortId}/users/me/avatar`, { 
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
  updateUserInfo,
  postNewCard,
  removeCard,
  likeCard,
  removeLike,
  changeAvatar,
};