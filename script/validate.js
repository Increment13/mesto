const showInputError = (formElement, inputElement, errorMessage, item) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(item.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, item) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(item.inputErrorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, item) => {

    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(item.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(item.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
    }
};



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

///вызов ошибок
const checkInputValidity = (formElement, inputElement, item) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, item);
    } else {
        hideInputError(formElement, inputElement, item);
    }
};



///////////////////////////////////////
const setEventListeners = (formElement, item) => {

    const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
    const buttonElement = formElement.querySelector(item.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, item);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, item);
            toggleButtonState(inputList, buttonElement, item);
        });
    });
};
////////////////////////////////////






const enableValidation = (item) => {
    const formList = Array.from(document.querySelectorAll(item.formSelector));
    formList.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(item.formSelector));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, item);
        });

    });
};