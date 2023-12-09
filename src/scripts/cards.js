import {
  openPopup, 
} from './modal.js';


const initialCards = [

    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// создания карточки 
function createCard(cardData, deleteCallBack, likeCallBack, imageClickCallBack) {
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

// функция для отрисовки всех карточек на странице
function renderCards(cards, container, deleteCallback, likeCallBack, imageClickCallBack) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCallback, likeCallBack, imageClickCallBack);
    container.appendChild(cardElement); // добавляем карточку в контейнер
  });
}

// функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove(); 
}

// обработчик для кнопки лайк
function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active'); 
}

// обработчик для клика по изображению карточки
function handleImageClick(cardData) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  // изображение и текст описания
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup); 
}

// функция для добавления новой карточки на страницу
function addNewCard(name, link) {
  const placesList = document.querySelector(".places__list");
  const newCardData = { name, link }; // создаем новый объект с данными для карточки
  
  // создаем новую карточку и добавляем её в начало списка
  const newCardElement = createCard(newCardData, deleteCard, handleLike, handleImageClick);
  placesList.prepend(newCardElement);
}

// отправка формы добавления карточки
function handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup) {
  evt.preventDefault();

  // находим поля ввода в форме и получаем их значения
  const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
  const linkInput = newPlaceForm.querySelector('.popup__input_type_url');
  const placeName = placeNameInput.value;
  const link = linkInput.value;

  addNewCard(placeName, link); // добавляем новую карточку
  newPlaceForm.reset(); // очищаем форму после добавления карточки

  const addCardPopup = document.querySelector('.popup_type_new-card');
  closePopup(addCardPopup); 
}

// экспорт 
export {
  initialCards,
  createCard,
  renderCards,
  deleteCard,
  handleLike,
  handleImageClick,
  addNewCard,
  handleNewPlaceFormSubmit
};
