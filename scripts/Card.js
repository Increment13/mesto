export default class Card {
    constructor(itemtext, itemsrc, cardTamplate) {
        this._itemtext = itemtext;
        this._itemsrc = itemsrc;
        this._cardTamplate = cardTamplate;

    }

    _getTemplate() {
        const cardElement = this._cardTamplate.content.querySelector('.elements__element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__title').textContent = this._itemtext;
        this._element.querySelector('.elements__image').alt = this._itemtext;
        this._element.querySelector('.elements__image').src = this._itemsrc;

        this._setEventListeners();

        return this._element;
    }

    _handlerHeartClick() {
        this._element.querySelector('.elements__heart-image').classList.toggle('elements__heart-image_active');
    }

    _handlerTrashClick() {
        this._element.remove();
    }

    _popupOpen() {
        document.querySelector('.popup__image').src = this._element.querySelector('.elements__image').getAttribute("src");
        document.querySelector('.popup__sign').textContent = this._element.querySelector('.elements__image').getAttribute("alt");
        document.querySelector('#popup-image').classList.add('popup_opened-image');
    }

    _setEventListeners() {
        this._element.querySelector('.elements__heart-image').addEventListener('click', () => {
            this._handlerHeartClick();
        });

        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handlerTrashClick();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._popupOpen();
        });
    }
}