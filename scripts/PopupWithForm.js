import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }, formName) {
            super(popupSelector);
            this._handleFormSubmit = handleFormSubmit;
            this._form = formName;
            //инпаты формы вынесли
            this._inputList = this._popupSelector
                .querySelectorAll('.popup__input');
        }
        //поулчаем данные формы
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
            super.setEventListeners();
            //слушаем сабмит, забираем данные -> ресетим -> закрываем форму
            this._popupSelector.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues());

                this._form.reset();
                this.close();
            })
        }
        //открываем с предзаполненными данными !!! имена в UserInfo нужны для соответсвтия наполнения 
    open(item) {
        this._popupSelector.classList.add('popup_opened');
        this._popupSelector.classList.remove('popup_closed');

        this._inputList.forEach((input) => {
            input.value = item[input.name];
        });
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._popupSelector.classList.add('popup_hide');

        setTimeout(() => {
            this._popupSelector.classList.remove('popup_hide');
            this._popupSelector.classList.add('popup_closed');
        }, 390);

        this._form.reset();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

}