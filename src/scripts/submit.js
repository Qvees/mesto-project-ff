import { closePopup } from "./modal";
// отправка формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const formElement = document.querySelector(".popup__form");
  // Выберите элементы, куда должны быть вставлены значения полей
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");
  const profileName = document.querySelector(".profile__title");
  const profileDesctiption = document.querySelector(".profile__description");
  const openedPopup = document.querySelector(".popup_is-opened");

  profileName.textContent = nameInput.value;
  profileDesctiption.textContent = jobInput.value;

  if (openedPopup) {
    closePopup(openedPopup);
  }
}

export { handleFormSubmit };
