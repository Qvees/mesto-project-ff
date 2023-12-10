// экспорт
export { createCard, deleteCard, handleLike };

// создания карточки
function createCard(
  cardData,
  deleteCallBack,
  likeCallBack,
  imageClickCallBack
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  //  обработчики событий для кнопок
  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeCallBack(likeButton);
  });

  cardImage.addEventListener("click", () => {
    imageClickCallBack(cardData);
  });

  return cardElement; // возвращаем созданный элемент карточки
}

// функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// обработчик для кнопки лайк
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
