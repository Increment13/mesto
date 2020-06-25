export default class FormValidator {
    constructor(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
            this._formSelector = formSelector;
            this._inputSelector = inputSelector;
            this._submitButtonSelector = submitButtonSelector;
            this._inactiveButtonClass = inactiveButtonClass;
            this._inputSelector = inputSelector;
            this._inputErrorClass = inputErrorClass;
        }
        ///отображение ошибки
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
    };
    ///прячем ошибки
    hideInputError = (inputElement) => {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.textContent = '';
    };

    ///вызов ошибок
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    }

    ///изменение кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput(this.inputList)) {
            // сделай кнопку неактивной
            document.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
            document.querySelector(this._submitButtonSelector).setAttribute('disabled', 'disabled');
        } else {
            // иначе сделай кнопку активной
            document.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
            document.querySelector(this._submitButtonSelector).removeAttribute('disabled', 'disabled');
        }
    }

    ///отображаем валидный или нет
    _hasInvalidInput = () => {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    ///////слушаем изменение формы
    _setEventListeners(fieldSet) {
        this.inputList = Array.from(document.querySelectorAll(this._inputSelector));
        this._toggleButtonState();

        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formEl) => {
            formEl.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            const fieldsetList = Array.from(document.querySelectorAll(this._formSelector));
            fieldsetList.forEach((fieldSet) => {
                this._setEventListeners(fieldSet);
            });

        });
    }
}