export default class Card {
    constructor(itemtext, itemsrc) {
        this._itemtext = itemtext;
        this._itemsrc = itemsrc;
    }

    _getTemplate() {
        const cardElement = document.querySelector('#element-template').content.querySelector('.elements__element').cloneNode(true);
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
        this._element.querySelector('.elements__heartImage').classList.toggle('elements__heartImage_active');
    }

    _handlerTrashClick() {
        this._element.remove();
    }

    _popOp() {
        document.querySelector('.popup__image').src = this._element.querySelector('.elements__image').getAttribute("src");
        document.querySelector('.popup__sign').textContent = this._element.querySelector('.elements__image').getAttribute("alt");
        document.querySelector('#popimg').classList.add('popup_opened-image');
    }

    _setEventListeners() {
        this._element.querySelector('.elements__heartImage').addEventListener('click', () => {
            this._handlerHeartClick();
        });

        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handlerTrashClick();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._popOp();
        });
    }
}