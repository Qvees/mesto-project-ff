
import {
  openPopup, 
  closePopup,
  handleCloseButtonClick,
  handleOverlayClick,
  closeEscPopup,
} from "./modal.js";
import '../index.css';

import { createCard, deleteCard, handleLike} from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getCards, 
  getUserInfo,
  updateUserInfo,
  postNewCard,
  removeCard,
  likeCard,
  changeAvatar,
} from "./api.js";
import { updateButtonState } from "./utils.js";


//  DOM узлы
const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const overlay = document.querySelectorAll(".popup");
const newPlaceForm = document.querySelector(".popup_type_new-card .popup__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupForm = document.querySelector(".popup__form");
const popupAllForms = document.querySelectorAll(".popup__form");
const popupInput = popupForm.querySelector(".popup__input");
const popupAllInputs = popupForm.querySelectorAll(".popup__input");
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDesctiption = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
const openedPopup = document.querySelector(".popup_is-opened");
const imagePopup = document.querySelector(".popup_type_image");
const photoFullImagePopup = imagePopup.querySelector(".popup__image");
const placeName = imagePopup.querySelector(".popup__caption");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const formError = popupForm.querySelector(`.${popupInput.id}-error`);
const popupProfilePhoto = document.querySelector(".popup-profile-photo");
const addAvatarPopup = document.querySelector(".popup__form-image-profile")
const editAvatar = document.querySelector(".edit-icon");
const avatarUrlInput = document.querySelector(".popup__input_avatar");
const likeCounter = document.querySelector(".card__like-counter");
const popupButtons = document.querySelectorAll(".popup__button");
const addNewAvaratPopup = document.querySelector("#popup-form-image-profile");
const saveInfoProfileButton = document.querySelector(".save-info-profile-button");
const saveNewAvatardButton  = document.querySelector(".save-new-avatar-button");
const saveNewCardButton = document.querySelector(".save-new-card-button")


// функция для отрисовки всех карточек на странице
function renderCards(
  cards,
  container,
  deleteCallback,
  likeCallBack,
  imageClickCallBack,
  currentUserId,
){
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCallback,
      likeCallBack,
      imageClickCallBack,
      currentUserId,
    );
    container.appendChild(cardElement);
  });
}

// слушатели для открытия закрытия попапов
profileAddButton.addEventListener("click", handleCardAddButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
editAvatar.addEventListener("click", handleAddNewPhotoProfile);
closeButtons.forEach((button) => {
  button.addEventListener("click", () => handleCloseButtonClick(button));
});
overlay.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});


// слушатель на попапе профиля
editProfilePopup.addEventListener("submit", handleFormInformationProfileSubmit); // переименовал на editProfilePopup так как он уже определен в начале index.js

//слушатель на попапе карточки
newPlaceForm.addEventListener("submit", (evt) => {
  handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup);
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: ".popup__input_type_error",
  errorActive: "form__input-error_active"
};

enableValidation(validationConfig);



//функция изменения имени и занятия профиля
function handleFormInformationProfileSubmit(evt) {
  evt.preventDefault();
  updateButtonState(saveInfoProfileButton, "Сохранение...");
  
  updateUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDesctiption.textContent = jobInput.value;
      closePopup(editProfilePopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении информации:", error);
    })
    .finally(() => {
      updateButtonState(saveInfoProfileButton, "Сохранить");
    });
}


// слушатель на отправку формы изменения аватара
popupProfilePhoto.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newAvatarLink = avatarUrlInput.value; // Получаем новую ссылку на аватар из поля формы
  updateButtonState(saveNewAvatardButton, "Сохранение...");
  
  changeAvatar(newAvatarLink)
    .then((updatedUserData) => {
      // если запрос на сервер выполнен успешно, обновляем аватар на странице
      profileImg.style.backgroundImage = `url('${newAvatarLink}')`;
      closePopup(popupProfilePhoto);
    })
    .catch((error) => {
      console.error("Ошибка при смене аватара:", error);
    })
    .finally(() => {
      updateButtonState(saveNewAvatardButton, "Сохранить");
    });
});


// обработчик кнопки открытия добавления карточки
function handleCardAddButtonClick() {
  newPlaceForm.reset()
  openPopup(addCardPopup);
  clearValidation(addCardPopup, validationConfig);
}

// обработчик кнопки открытия редактирования профиля
function handleEditProfileButtonClick() {
  // Заполнение полей ввода текущими данными пользователя
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesctiption.textContent;
  openPopup(editProfilePopup);
  clearValidation(popupForm, validationConfig);
}

// обработчик кнопки добавления фото профиля
function handleAddNewPhotoProfile() {
  openPopup(popupProfilePhoto);
  addAvatarPopup.reset();
  clearValidation(addNewAvaratPopup, validationConfig);
}

// функция для добавления новой карточки на страницу
function addNewCard(name, link, likes, userId, cardId) {
  const newCardData = { name, link, likes, owner: { _id: userId }, _id: cardId };
  const newCardElement = createCard(
    newCardData,
    deleteCard,
    handleLike,
    handleImageClick,
    userId,
    cardId
  );
  placesList.prepend(newCardElement);
}

// отправка формы добавления карточки
function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  const likes = likeCounter;
  updateButtonState(saveNewCardButton, "Сохранение...");
  
  postNewCard(placeName, link, likes)
    .then((newCard) => {
      const userId = newCard.owner._id;
      addNewCard(newCard.name, newCard.link, newCard.likes, userId, newCard._id);
      newPlaceForm.reset(); // Очищаем форму после добавления карточки
      closePopup(addCardPopup);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      updateButtonState(saveNewCardButton, "Сохранить");
    });
}

// обработчик для клика по изображению карточки
function handleImageClick(cardData) {
  // изображение и текст описания
  photoFullImagePopup.src = cardData.link;
  photoFullImagePopup.alt = cardData.name;
  placeName.textContent = cardData.name;
  openPopup(imagePopup);
}

//функция замены имени фотки и описания с сервера
function putNamePhotoAndJobProfile(name, job, avatar) {
  profileName.textContent = name;
  profileDesctiption.textContent = job;
  profileImg.style.backgroundImage = `url('${avatar}')`;
}

function loadDataFromServer() {
  return Promise.all([getUserInfo(), getCards()]);
}

// использование Promise.all() для загрузки данных
loadDataFromServer()
  .then(([userInfo, cardsData]) => {
   
    renderCards(cardsData, placesList, deleteCard, handleLike, handleImageClick, userInfo._id);
    putNamePhotoAndJobProfile(userInfo.name, userInfo.about, userInfo.avatar);
  })
  .catch((error) => {
    console.error('Ошибка при загрузке данных:', error);
  });
  


