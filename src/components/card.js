// экспорт
export { createCard, deleteCard, handleLike};
import { likeCard, removeLike, removeCard } from "./api.js";

// создание карточки
function createCard(
  cardData,
  deleteCallBack,
  likeCallBack,
  imageClickCallBack,
  currentUserId,
  cardId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const userId = cardData.owner._id
  
 

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
    // количество лайков из объекта cardData
  likeCounter.textContent = cardData.likes.length;

  // проверка наличия лайка от текущего пользователя
  const isLikedByCurrentUser = cardData.likes.some(
    (like) => like._id === currentUserId
  );

  // установка класса активного лайка в зависимости от наличия лайка от пользователя
  if (isLikedByCurrentUser) {
    handleLike(likeButton);
  }

  // обработчики событий для кнопок
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement, cardData._id); // Передаем ID карточки для удаления
    console.log(cardData._id)
  });


  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      // убираем класс активного лайка
      handleLike(likeButton);

      // отправляем запрос на сервер для удаления лайка
      removeLike(cardData._id)
        .then((updatedCard) => {
          // обновляем счетчик лайков
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка при удалении лайка:", error);
        });
    } else {
      // добавляем класс активного лайка
      handleLike(likeButton);

      // отправляем запрос на сервер для постановки лайка
      likeCard(cardData._id)
        .then((updatedCard) => {
          // обновляем счетчик лайков
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка при лайке карточки:", error);
        });
    }
  });

  cardImage.addEventListener("click", () => {
    imageClickCallBack(cardData);
  });

  // проверяем, совпадает ли ID пользователя с владельцем карточки
  if (currentUserId === userId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  return cardElement; // возвращаем созданный элемент карточки
}

// функция удаления карточки
function deleteCard(cardElement, cardId) {
  removeCard(cardId)
    .then(() => {
      console.log('ssfs',cardId)
      cardElement.remove(); // удаляем элемент карточки из DOM после успешного удаления с сервера
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

// обработчик для кнопки лайк
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

