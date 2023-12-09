// функция для открытия попапа окна
function openPopup(popup) {
    // добавляем класс для анимации открытия
    popup.classList.add('popup_is-animated');
    // задержка для плавного отображения окна
    setTimeout(() => {
      // добавляем класс открывающий окно
      popup.classList.add('popup_is-opened');
    }, 100);
  }
  
  // функция для закрытия попапа окна
  function closePopup(popup) {

    popup.classList.add('popup_is-animated');
    
 
    setTimeout(() => {
      popup.classList.remove('popup_is-opened');
    }, 100);
    

    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 1000);
  }
  
  // обработчик кнопки открытия добавления карточки
  function handleCardAddButtonClick() {
    const addCardPopup = document.querySelector('.popup_type_new-card');
    openPopup(addCardPopup);
  }
  
  // обработчик кнопки открытия редактирования профиля
  function handleEditProfileButtonClick() {
    const editProfilePopup = document.querySelector('.popup_type_edit');
    openPopup(editProfilePopup);
  }
  
  // обработчик кнопки закрытия окна
  function handleCloseButtonClick(button) {

    const popup = button.closest('.popup');
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
  
  // обработчик нажатия клавиши Esc
  function handleDocumentKeydown(evt) {
    // проверяем, была ли нажата клавиша Esc
    if (evt.key === 'Escape') {
      // находим открытое всплывающее окно
      const openedPopup = document.querySelector('.popup_is-opened');

      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  // экспорт
  export {
    openPopup,
    closePopup,
    handleCardAddButtonClick,
    handleEditProfileButtonClick,
    handleCloseButtonClick,
    handleOverlayClick,
    handleDocumentKeydown
  };
  