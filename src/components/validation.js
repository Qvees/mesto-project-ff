// функция показ ошибки
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActive) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorActive);
    errorElement.textContent = errorMessage;
   
}

// скрыть ошибку
function hideInputError(formElement, inputElement, inputErrorClass, errorActive) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorActive);
    errorElement.textContent = '';
}

// Проверка валидности регулярки
function isRegularInvalid(inputElement) {
    const regular = /^[a-zA-Zа-яА-Я\s\-]+$/;
    return inputElement.getAttribute('type') !== 'url' && !regular.test(inputElement.value);
}

// Проверка валидность ввода отображение ошибок 
function checkInputValidity(formElement, inputElement, inputErrorClass, errorActive) {
    if (inputElement.getAttribute('type') === 'url') {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.dataset.customError || inputElement.validationMessage;
            showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActive);
        } else {
            hideInputError(formElement, inputElement, inputErrorClass, errorActive);
        }
    } else if (!inputElement.validity.valid) {
        const errorMessage = inputElement.dataset.customError || inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActive);
    } else if (isRegularInvalid(inputElement)) {
        const errorMessage = inputElement.dataset.customError || 'Используйте только латинские и кириллические буквы, знаки дефиса и пробелы.';
        showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActive);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorActive);
    }
}

//  обработчики событий для формы, полей ввода и кнопки отправки
function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass,errorActive) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass,errorActive);
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

        setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inputErrorClass, validationConfig.errorActive);
    });
}

// Очищает валидацию для указанной формы
function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorActive);
    });
    
    submitButton.setAttribute('disabled', true);
}


export { enableValidation, clearValidation };
