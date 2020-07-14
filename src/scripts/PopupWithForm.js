import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }, formName) {
            super(popupSelector);
            this._handleFormSubmit = handleFormSubmit;
            this._form = formName;
        }
        //поулчаем данные формы
    _getInputValues() {
        this._inputList = this._popupSelector
            .querySelectorAll('.popup__input');
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
        //открываем 
    open() {
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

}