import "./index.css"; // немного не понял на счет файла index.js  он должен находится в папке components? Просто в коде вы выделили именно импорт index.css
import {
  openPopup,
  closePopup,
  handleCloseButtonClick,
  handleOverlayClick,
  closeEscPopup,
} from "./scripts/modal.js";

import { createCard, deleteCard, handleLike } from "./scripts/card.js";

import { initialCards } from "./scripts/cards.js";

//  DOM узлы
const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const overlay = document.querySelectorAll(".popup");
const newPlaceForm = document.querySelector(".popup_type_new-card .popup__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const allPopupForm = document.querySelector(".popup__content");
const formElementProfile = allPopupForm.querySelector(".popup__form");
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDesctiption = document.querySelector(".profile__description");
const openedPopup = document.querySelector(".popup_is-opened");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const placeName = imagePopup.querySelector(".popup__caption");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const addCardPopup = document.querySelector(".popup_type_new-card");

// функция для отрисовки всех карточек на странице
function renderCards(
  cards,
  container,
  deleteCallback,
  likeCallBack,
  imageClickCallBack
) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCallback,
      likeCallBack,
      imageClickCallBack
    );
    container.appendChild(cardElement); // добавляем карточку в контейнер
  });
}

// Функция создания карточки
renderCards(initialCards, placesList, deleteCard, handleLike, handleImageClick);

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
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener(
  "submit",
  handleFormInformationProfileSubmit
);

//обработчик submit
newPlaceForm.addEventListener("submit", (evt) => {
  handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup);
});

//функция изменения имени и работы профиля
function handleFormInformationProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей

  profileName.textContent = nameInput.value;
  profileDesctiption.textContent = jobInput.value;

  if (openedPopup) {
    closePopup(openedPopup);
  }
}

// обработчик кнопки открытия добавления карточки
function handleCardAddButtonClick() {
  openPopup(addCardPopup);
}

// обработчик кнопки открытия редактирования профиля
function handleEditProfileButtonClick() {
  const editProfilePopup = document.querySelector(".popup_type_edit");
  // Заполнение полей ввода текущими данными пользователя
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesctiption.textContent;
  openPopup(editProfilePopup);
}

// функция для добавления новой карточки на страницу
function addNewCard(name, link) {
  const newCardData = { name, link }; // создаем новый объект с данными для карточки
  // создаем новую карточку и добавляем её в начало списка
  const newCardElement = createCard(
    newCardData,
    deleteCard,
    handleLike,
    handleImageClick
  );
  placesList.prepend(newCardElement);
}

// отправка формы добавления карточки
function handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  addNewCard(placeName, link); // добавляем новую карточку
  newPlaceForm.reset(); // очищаем форму после добавления карточки
  closePopup(addCardPopup);
}

// обработчик для клика по изображению карточки
function handleImageClick(cardData) {
  // изображение и текст описания
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  placeName.textContent = cardData.name;
  openPopup(imagePopup);
}
