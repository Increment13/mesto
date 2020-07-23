import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }, formName, { setRequest }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = formName;
        this._documentEscListener = this._documentEscListener.bind(this);
        this._setRequest = setRequest;
        this._listenersTrash = this._listenersTrash.bind(this);
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

    ///слушаем 
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._setRequest(this._getInputValues())
                .then((value) => {
                    this._handleFormSubmit(value);
                })
                .then(this._form.reset())

        })
    }

    _listenersTrash(evt) {
        evt.preventDefault();

        this.delElement = document.getElementById(this._idCard).parentElement.parentElement;
        this._setRequest({ id: `/${this._idCard}`, method: 'DELETE' });
        this.delElement.remove();
        this.delElement = null;

        document.removeEventListener('submit', this._listenersTrash);
    }

    setEventListenersTrash(idCard) {
        super.setEventListeners();
        this._idCard = idCard;
        //слушаем сабмит, -> удаляем карточку по ID API ->  удаляем DOM -> закрываем 
        this._popupSelector.addEventListener('submit', this._listenersTrash);
    }

    close() {
        super.close();
        this._form.reset();
    }

    _documentEscListener(evt) {
        super._documentEscListener(evt);
    }

}