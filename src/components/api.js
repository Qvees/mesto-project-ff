const token = '3b3afde6-a24d-4435-b967-1a1522a2423b'; 
const cohortId = 'wff-cohort-3'; 



  let getUserInfo = new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
  headers: {
    authorization: token
  },
})
  .then(response => {
    resolve(response.json());
    })
})

let  initialCards = new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`,{
      headers: {
        authorization: token
      }
    })
      .then(data =>{
        resolve (data.json());
      })
    })

    function postNameAndAbout(name, about) {
      return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      });
    }


    function postNewCard(name, link) {
      return fetch(`https://nomoreparties.co/v1/${cohortId}/cards` , {
        method: 'POST',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
          
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
         
        }
        return response.json();
      });
    }

    function removeCard(cardId) {
      return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      });
    }

   function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((updatedCard) => {
    // Возвращаем объект с информацией о карточке из ответа на PUT-запрос
    return updatedCard;
  })
  .catch((error) => {
    throw new Error(`Ошибка при лайке карточки: ${error.message}`);
  });
}

function removeLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    // Возвращаем данные о карточке из ответа на DELETE-запрос
    return response.json();
  })
  .catch((error) => {
    throw new Error(`Ошибка при удалении лайка: ${error.message}`);
  });
}


  export{initialCards,getUserInfo, postNameAndAbout,postNewCard,removeCard,likeCard,removeLike}

