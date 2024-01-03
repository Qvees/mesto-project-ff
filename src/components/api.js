const token = "3b3afde6-a24d-4435-b967-1a1522a2423b";
const cohortId = "wff-cohort-3";

function getUserInfo() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}

function initialCards() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: token,
    },
  }).then((data) => {
    return data.json();
  });
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
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
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
  ) 
    .then((response) => { 
      if (!response.ok) { 
        throw new Error(`Ошибка: ${response.status}`); 
      } 
      return response.json(); 
    })
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
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
   
      return response.json();
    })
}

//функция смены аватарки
function changeAvatar(avatarLink) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarLink }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
}

export {
  initialCards,
  getUserInfo,
  postNameAndAbout,
  postNewCard,
  removeCard,
  likeCard,
  removeLike,
  changeAvatar,
};
