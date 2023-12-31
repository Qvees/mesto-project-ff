//есть проблема при добавление новой карточки. 
//Когда я нажимаю сохранить появляется ошибка, 
//но карточка отправляется на сервер и если перезагрузить страницу она появится. В чем ошибка я так и не понял.
import "../index.css";
import {
  openPopup,
  closePopup,
  handleCloseButtonClick,
  handleOverlayClick,
  closeEscPopup,
} from "./modal.js";

import { createCard, deleteCard, handleLike} from "./card.js";
import { enableValidation, clearValidation } from './validation.js';
import {initialCards,getUserInfo,postNameAndAbout, postNewCard, removeCard,likeCard} from './api.js'


//  DOM узлы
const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const overlay = document.querySelectorAll(".popup");
const newPlaceForm = document.querySelector(".popup_type_new-card .popup__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupForm = document.querySelector(".popup__form");
const popupAllForms = document.querySelectorAll(".popup__form")
const popupInput = popupForm.querySelector(".popup__input")
const popupAllInputs = popupForm.querySelectorAll(".popup__input")
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDesctiption = document.querySelector(".profile__description");
const profileImg = document.querySelector('.profile__image')
const openedPopup = document.querySelector(".popup_is-opened");
const imagePopup = document.querySelector(".popup_type_image");
const photoFullImagePopup = imagePopup.querySelector(".popup__image");
const placeName = imagePopup.querySelector(".popup__caption");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const formError = popupForm.querySelector(`.${popupInput.id}-error`);


// Добавляем обработчик события на клик по аватарке


// функция для отрисовки всех карточек на странице
function renderCards(
  cards,
  container,
  deleteCallback,
  likeCallBack,
  imageClickCallBack,
  currentUser,
) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCallback,
      likeCallBack,
      imageClickCallBack,
      currentUser,
    );
    container.appendChild(cardElement);
  });
}



// слушатели для открытия закрытия попапов
profileAddButton.addEventListener("click", handleCardAddButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
closeButtons.forEach((button) => {
  button.addEventListener("click", () => handleCloseButtonClick(button));
});
overlay.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

// Прикрепляем обработчик к форме:
// слушатель на попапе профиля
popupForm.addEventListener("submit", handleFormInformationProfileSubmit);
 
//слушатель на попапе карточки
newPlaceForm.addEventListener("submit", (evt) => {
  handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup);
});

// Вызов функции enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: '.popup__input_type_error',
};

// Вызов clearValidation
clearValidation(popupForm, validationConfig);



//функция изменения имени и работы профиля
function handleFormInformationProfileSubmit(evt) {
  evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDesctiption.textContent = jobInput.value;
    
    //вызов функции отправки на сервер 
    postNameAndAbout(nameInput.value, jobInput.value)
    closePopup(editProfilePopup);

}

// обработчик кнопки открытия добавления карточки
function handleCardAddButtonClick() {
  openPopup(addCardPopup);
}

// обработчик кнопки открытия редактирования профиля
function handleEditProfileButtonClick() {
  // Заполнение полей ввода текущими данными пользователя
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesctiption.textContent;
  openPopup(editProfilePopup);
}

// функция для добавления новой карточки на страницу
function addNewCard(name, link,id ) {
  const newCardData = { name, link,id}; 

  const newCardElement = createCard(
    newCardData,
    deleteCard,
    handleLike,
    handleImageClick,
  );
  placesList.prepend(newCardElement);
}

// отправка формы добавления карточки
function handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  postNewCard(placeNameInput.value, linkInput.value)//отправляем карточку на сервер
  addNewCard(placeName, link); // добавляем новую карточку на страницу или эта функция уже не нужна так как все карточки грузятся с сервера 
  newPlaceForm.reset(); // очищаем форму после добавления карточки
  closePopup(addCardPopup);
}

// обработчик для клика по изображению карточки
function handleImageClick(cardData) {
  // изображение и текст описания
  photoFullImagePopup.src = cardData.link;
  photoFullImagePopup.alt = cardData.name;
  placeName.textContent = cardData.name;
  openPopup(imagePopup);
}

//функция подставления имени фотки и описания с сервера
function putNamePhotoAndJobProfile(name, job, avatar){
  profileName.textContent= name
  profileDesctiption.textContent = job
  profileImg.style.backgroundImage = `url('${avatar}')`
}

//промисы получения данных с сервера 
Promise.all([initialCards,getUserInfo]).then(value =>{
  const [initialCardsData, userInfo] = value;
  console.log(initialCardsData, userInfo);//потом удалить

  //параметры для функции отрисовки карточек
  renderCards(initialCardsData, placesList, deleteCard, handleLike, handleImageClick, userInfo._id);
  putNamePhotoAndJobProfile(userInfo.name, userInfo.about, userInfo.avatar);

 

}).catch(error => {
  console.error('Ошибка:', error);
});



