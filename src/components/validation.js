// функция показ ошибки
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: ".popup__input_type_error",
  };
// не много не понял сути задания (нужно передать как параметры при вызове функций или так как я сделал) остальное все поправил вроде
function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.style.fontSize = '12px';
    inputElement.classList.add(inputErrorClass);
    inputElement.classList.add(validationConfig.inputErrorClass); // использовал селектор из конфига
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
}

// скрыть ошибку
function hideInputError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    inputElement.classList.remove(validationConfig.inputErrorClass); // использовал селектор из конфига
    errorElement.classList.remove('form__input-error_visible');
    errorElement.textContent = '';
}

// Проверка валидности регулярки
function isRegularInvalid(inputElement) {
    const regular = /^[a-zA-Zа-яА-Я\s\-]+$/;
    return inputElement.getAttribute('type') !== 'url' && !regular.test(inputElement.value);
}

// Проверка валидность ввода отображение ошибок 
function checkInputValidity(formElement, inputElement, inputErrorClass) {
    if (inputElement.getAttribute('type') === 'url') {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.dataset.customError || inputElement.validationMessage;
            showInputError(formElement, inputElement, errorMessage, inputErrorClass);
        } else {
            hideInputError(formElement, inputElement, inputErrorClass);
        }
    } else if (!inputElement.validity.valid) {
        const errorMessage = inputElement.dataset.customError || inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, inputErrorClass);
    } else if (isRegularInvalid(inputElement)) {
        const errorMessage = inputElement.dataset.customError || 'Используйте только латинские и кириллические буквы, знаки дефиса и пробелы.';
        showInputError(formElement, inputElement, errorMessage, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass);
    }
}

//  обработчики событий для формы, полей ввода и кнопки отправки
function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass);
            toggleButtonState(inputList, submitButton);
        });
    });
}

//  состояние кнопки в зависимости от валидности полей
function toggleButtonState(inputList, buttonElement) {
    const isAnyInvalid = inputList.some(inputElement => {
        const isStandardInvalid = !inputElement.validity.valid;
        const isCustomInvalid = inputElement.dataset.customError && inputElement.dataset.customError !== '';
        const isRegularInvalidFlag = isRegularInvalid(inputElement);
        return isStandardInvalid || isCustomInvalid || isRegularInvalidFlag;
    });

    if (isAnyInvalid) {
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.removeAttribute('disabled');
    }
}

//  валидация для указанных элементов формы
function enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inputErrorClass);
    });
}

// Очищает валидацию для указанной формы
function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass);
    });
    
    submitButton.setAttribute('disabled', true);
}


export { enableValidation, clearValidation };
