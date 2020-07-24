import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';

import './index.css';

const confId = '5229601f-d8d9-495f-a3df-ffdf9a243fe9';

const formEdit = document.forms.formEdit;
const formAdd = document.forms.formAdd;
const formAvatar = document.forms.formAvatar;
const titleInputValue = document.getElementById('input-names');
const descriptionInputValue = document.getElementById('input-position');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__paint');
const linkUser = 'users/me';
const linkCard = 'cards';

const config = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/',
    headers: {
        'authorization': confId,
        'Content-Type': 'application/json'
    }
};

//эекземпляр апи
const api = new Api(config);

//Валидация
const formvalidatorEdit = new FormValidator('.popup__container_edit', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorEdit.enableValidation();

const formvalidatorAdd = new FormValidator('.popup__container_add', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorAdd.enableValidation();

const formvalidatorAvatar = new FormValidator('.popup__container_avatar', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorAdd.enableValidation();

//Текущие данные пользователя
const userinfo = new UserInfo(document.querySelector('.profile__name'), document.querySelector('.profile__profession'), document.querySelector('.profile__avatar'), {
    setRequest: () => {
        return api.getRequest(linkUser)
    }
});
userinfo.getUserInfo();

//Форма удаления
const delPopup = new PopupWithForm('popup-formdel', {}, formDel, {
    setRequest: (data) => {
        return api.updateRequest({
                id: data.id,
                method: 'DELETE'
            }, linkCard)
            .then(() => delPopup.close())
    }
});

//экземпляр секции
const cardList = new Section({
        renderer: (item) => { //перебираем картинки и передаем функцию
            const card = new Card(item, 'element-template', {
                handleCardClick: () => {
                    popupWithImage.open(item);
                },
            }, {
                setRequest: (item) => {
                    api.updateRequest({
                        id: item.id,
                        method: item.method
                    }, linkCard);
                },
            }, { delPopup }, );
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    '.elements'
);

//подгружаем карточки
api.getRequest(linkCard)
    .then((data) => {
        cardList.renderItems(data);
    })
    .catch(err => console.log(err));

//создаем экземпляр класса попапа картинки
const popupWithImage = new PopupWithImage('popup-image');

//форма изменения имя/о себе
const editPopup = new PopupWithForm('popup-formedit', {
        handleFormSubmit: (data) => {
            userinfo.setUserInfo({
                newName: data.name,
                newLink: data.about
            });
        },
    },
    formEdit, {
        setRequest: (data) => {
            return api.patchRequest({
                    name: data.name,
                    about: data.position
                }, linkUser)
                .catch(err => console.log(err))
                .finally(() => editPopup.close())

        },
    }, );
editPopup.setEventListeners();

//слушатель изменить данные EDIT
editButton.addEventListener('click', () => {
    //получаем текущие данные
    const currentUserInfo = userinfo.getUserInfo();
    titleInputValue.value = currentUserInfo.name;
    descriptionInputValue.value = currentUserInfo.position;

    formvalidatorEdit.enableValidation();
    formvalidatorEdit.resetErrors(formEdit);
    editPopup.open();
});

///форма изменения аватара 
const avatarPopup = new PopupWithForm('popup-formavatar', {
    handleFormSubmit: (data) => {
        document.querySelector('.profile__avatar').src = data.avatar;
    }
}, formAvatar, {
    setRequest: (data) => {
        //устанавливаем изменения
        return api.patchRequest({
                avatar: data.avatar
            }, `${linkUser}/avatar`)
            .catch(err => console.log(err))
            .finally(() => avatarPopup.close())
    },
}, );
avatarPopup.setEventListeners();
//слушаем для Avatar
avatarButton.addEventListener('click', () => {
    formvalidatorAvatar.enableValidation();
    formvalidatorAvatar.resetErrors(formAvatar);
    avatarPopup.open();
});

///форма добавления карточки ADD
const addPopup = new PopupWithForm('popup-formadd', {
    handleFormSubmit: (item) => {
        //новая карточка
        const newcard = new Card(item,
            'element-template', {
                handleCardClick: () => {
                    popupWithImage.open({
                        name: item.place,
                        link: item.link
                    });
                },
            }, { ///Like
                setRequest: (data) => {
                    api.updatetRequest({
                        id: data.id,
                        method: data.method
                    }, linkCard)
                },
            }, { delPopup },
        );
        const cardElement = newcard.generateCard();
        cardList.addItem(cardElement);
    },
}, formAdd, {
    setRequest: (data) => {
        return api.postRequest(data, linkCard)
            .catch(err => console.log(err))
            .finally(() => addPopup.close())
    }
}, );
addPopup.setEventListeners();
//слушаем для ADD
addButton.addEventListener('click', () => {
    formvalidatorAdd.enableValidation();
    formvalidatorAdd.resetErrors(formAdd);
    addPopup.open();
});