//функция для обновления текста кнопок отправки формы
function updateButtonState(buttons, newState) {
    buttons.forEach((button) => {
      button.textContent = newState;
      button.disabled = newState === "Сохранение..."; 
    });
  }

  export{updateButtonState}