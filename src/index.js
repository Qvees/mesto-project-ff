import "./index.css";
import {
  closePopup,
  handleCardAddButtonClick,
  handleEditProfileButtonClick,
  handleCloseButtonClick,
  handleOverlayClick,
  handleDocumentKeydown,
} from "./scripts/modal.js";
import { handleFormSubmit } from "./scripts/submit.js";
import {
  initialCards,
  renderCards,
  deleteCard,
  handleLike,
  handleImageClick,
  addNewCard,
  handleNewPlaceFormSubmit,
} from "./scripts/cards.js";

//  DOM узлы
const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelectorAll(".popup__close");
const overlay = document.querySelectorAll(".popup");
const newPlaceForm = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");

// Функция создания карточки
renderCards(initialCards, placesList, deleteCard, handleLike, handleImageClick);

// слушатели для открытия закрытия попапов
profileAddButton.addEventListener("click", handleCardAddButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
closeButton.forEach((button) => {
  button.addEventListener("click", () => handleCloseButtonClick(button));
});
overlay.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});
document.addEventListener("keydown", handleDocumentKeydown);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//обработчик submit
newPlaceForm.addEventListener("submit", (evt) => {
  handleNewPlaceFormSubmit(evt, addNewCard, newPlaceForm, closePopup);
});
