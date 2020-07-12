export default class Card {
    constructor(item, cardTemplate, { handleCardClick }) {
        this._itemtext = item.name;
        this._itemsrc = item.link;
        this._cardTemplate = document.getElementById(cardTemplate);
        this._handleCardClick = handleCardClick;
    }

    //получение темплейта
    _getTemplate() {
            const cardElement = this._cardTemplate.content.querySelector('.elements__element').cloneNode(true);
            return cardElement;
        }
        //генерация карты
    generateCard() {
            this._element = this._getTemplate();
            this._element.querySelector('.elements__title').textContent = this._itemtext;
            this._element.querySelector('.elements__image').alt = this._itemtext;
            this._element.querySelector('.elements__image').src = this._itemsrc;

            this._setEventListeners();

            return this._element;
        }
        //кнопка сердешко
    _handlerHeartClick() {
            this._element.querySelector('.elements__heart-image').classList.toggle('elements__heart-image_active');
        }
        //кнопка удалить
    _handlerTrashClick() {
            this._element.remove();
        }
        //слушатель
    _setEventListeners() {
        //клик сердешко
        this._element.querySelector('.elements__heart-image').addEventListener('click', () => {
            this._handlerHeartClick();
        });
        //клик мусор
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handlerTrashClick();
        });
        //клик на карту открытие
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}