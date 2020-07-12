import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
            super(popupSelector);
        }
        //забираем данные для открытия
    open(item) {
        super.open();
        this._popupSelector.querySelector('.popup__image').src = item.link;
        this._popupSelector.querySelector('.popup__sign').textContent = item.name;
        this.setEventListeners();
    }

    close() {
        super.close();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        super.setEventListeners();
    }

}