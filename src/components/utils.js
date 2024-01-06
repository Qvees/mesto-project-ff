//функция для обновления текста кнопок отправки формы
function updateButtonState(button, newState) {
  button.textContent = newState;
  button.disabled = newState === "Сохранение...";
}
  export{updateButtonState}