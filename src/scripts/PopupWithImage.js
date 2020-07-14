import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
            super(popupSelector);
            this._popupImage = this._popupSelector.querySelector('.popup__image');
            this._popupImageSign = this._popupSelector.querySelector('.popup__sign');
            this._documentEscListener = this._documentEscListener.bind(this);
        }
        //забираем данные для открытия
    open(item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupImageSign.textContent = item.name;
        this.setEventListeners();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }

    _documentEscListener(evt) {
        super._documentEscListener(evt);
    }

}