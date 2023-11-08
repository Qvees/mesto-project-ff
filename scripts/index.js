// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popUpTypeNewCard = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButton = popUpTypeNewCard.querySelector(".popup__close");


// @todo: Функция создания карточки
function createCard(cardData, deleteCallBack) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCallBack(cardElement);
  });

  return cardElement;
}

// Функция для добавления всех карточек на страницу
function renderCards(cards, container, deleteCallback) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCallback);
    container.appendChild(cardElement);
  });
}

// @todo: Функция удаления для карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// добавил от себя
function addNewCard() {
  //  открытие попапа
  addButton.addEventListener("click", function () {
    popUpTypeNewCard.style.display = "flex";
  });

  //  закрытие попапа
  closeButton.addEventListener("click", function () {
    popUpTypeNewCard.style.display = "none";
  });
}

renderCards(initialCards, placesList, deleteCard);
addNewCard();
