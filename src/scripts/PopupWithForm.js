import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }, formName, { api }, apiaddcard) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = formName;
        this._documentEscListener = this._documentEscListener.bind(this);
        this._api = api;
        this._listenersTrash = this._listenersTrash.bind(this);
        this._apiaddcard = apiaddcard;
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

    ///для поста
    _apiRun(data) {
            this._apiaddcard.postTask(data)
                .then((value) => {
                    this._handleFormSubmit(value);
                })
        }
        ///слушаем 
    setEventListeners() {
        super.setEventListeners();
        //слушаем сабмит, забираем данные -> ресетим -> закрываем форму
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (!this._api) {
                this._apiRun(this._getInputValues());
            } else {
                this._api(this._getInputValues());
                this._handleFormSubmit(this._getInputValues());
            }
            this._form.reset();
            this.close();
        })
    }

    _listenersTrash(evt) {
        evt.preventDefault();

        this.delElement = document.getElementById(this._idCard).parentElement.parentElement;
        this._api({ id: `/${this._idCard}`, method: 'DELETE' });

        this.delElement.remove();
        this.delElement = null;
        this.close();

        document.removeEventListener('submit', this._listenersTrash);
    }

    setEventListenersTrash(idCard) {
        super.setEventListeners();
        this._idCard = idCard;
        //слушаем сабмит, -> удаляем карточку по ID API ->  удаляем DOM -> закрываем 
        this._popupSelector.addEventListener('submit', this._listenersTrash);
    }

    //открываем 
    open() {
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    _documentEscListener(evt) {
        super._documentEscListener(evt);
        // this._form.reset();//в 8 ревью пропущено
    }

}