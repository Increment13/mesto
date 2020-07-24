export default class Card {
    constructor(item, cardTemplate, { handleCardClick }, { setRequest }, { delPopup }) {
        this._itemtext = item.name;
        this._itemsrc = item.link;
        this._cardTemplate = document.getElementById(cardTemplate);
        this._handleCardClick = handleCardClick;
        this._likes = item.likes; //кол-во лайков
        this._imageId = item._id; //id карточки
        this._idUserCreater = item.owner._id; //id пользователя создашего карточку 
        this._userId = document.querySelector('.profile__name').id; //мой ID 
        this._setRequest = setRequest;
        this._delPopup = delPopup;
    }

    //получение темплейта
    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector('.elements__element').cloneNode(true);
        return cardElement;
    }

    //генерация карты
    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.elements__image');
        this._elementImage.id = this._imageId;
        this._element.querySelector('.elements__title').textContent = this._itemtext;
        this._elementImage.alt = this._itemtext;
        this._elementImage.src = this._itemsrc;
        this._element.querySelector('.elements__likes-count').textContent = this._likes.length;

        ///проверка на добавленную картинку 
        if (this._userId === this._idUserCreater || this._idUserCreater === '') {
            this._element.querySelector('.elements__trash').classList.remove('elements__trash_hidden');
        }

        ///смотрим новая ли карточка
        if (this._likes.length > 0) {
            ///проверка на лайк от меня 
            this._likes.forEach((item) => {
                if (item._id === this._userId) {
                    this._element.querySelector('.elements__heart-image').classList.add('elements__heart-image_active');
                }
            })
        }

        this._setEventListeners();
        return this._element;
    }

    //кнопка сердешко
    _handlerHeartClick() {
        if (this._element.querySelector('.elements__heart-image').classList.contains('elements__heart-image_active')) {
            this._setRequest({ id: `/likes/${this._imageId}`, method: 'DELETE' });
            this._element.querySelector('.elements__likes-count').textContent = Number(this._element.querySelector('.elements__likes-count').textContent) - 1;
        } else {
            this._setRequest({ id: `/likes/${this._imageId}`, method: 'PUT' });
            this._element.querySelector('.elements__likes-count').textContent = Number(this._element.querySelector('.elements__likes-count').textContent) + 1;;
        }
        this._element.querySelector('.elements__heart-image').classList.toggle('elements__heart-image_active');
    }

    //кнопка удалить
    _handlerTrashClick() {
        this._delPopup.open();
        this._delPopup.setEventListenersTrash(
            this._imageId
        );
    }

    //слушатель
    _setEventListeners() {
        //клик сердешко
        this._element.querySelector('.elements__heart-image').addEventListener('click', () => {
            //api на пуш в сердешко 
            this._handlerHeartClick();
        });
        //клик мусор
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            ///api удаление карточки + id карточки 
            this._handlerTrashClick();
        });
        //клик на карту открытие
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}