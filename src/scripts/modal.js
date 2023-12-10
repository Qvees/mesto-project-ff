function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
    document.removeEventListener("keydown", closeEscPopup);
  }
}

// обработчик кнопки закрытия окна
function handleCloseButtonClick(button) {
  const popup = button.closest(".popup");
  closePopup(popup);
}

// обработчик клика по оверлею
function handleOverlayClick(evt) {
  const popup = evt.currentTarget;
  // если клик был по самому оверлею закрываем окно
  if (evt.target === popup) {
    closePopup(popup);
  }
}

// экспорт
export {
  openPopup,
  closePopup,
  handleCloseButtonClick,
  handleOverlayClick,
  closeEscPopup,
};
