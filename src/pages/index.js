import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Api from '../scripts/Api.js';

import './index.css';

const confId = '5229601f-d8d9-495f-a3df-ffdf9a243fe9';

const formEdit = document.forms.formEdit;
const formAdd = document.forms.formAdd;
const formAvatar = document.forms.formAvatar;
const titleInputValue = document.getElementById('input-names');
const descriptionInputValue = document.getElementById('input-position');

const configuser = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
    headers: {
        'authorization': confId,
        'Content-Type': 'application/json'
    }
};

const configcard = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
    headers: {
        'authorization': confId,
        'Content-Type': 'application/json'
    }
};


const apicard = new Api(configcard);

///Форма удаления
const delPopup = new PopupWithForm('popup-formdel', {}, formDel, {
    api: (data) => {
        apicard.updateTask({
            id: data.id,
            method: 'DELETE'
        }, '');
    }
});

///API подгружаем юзера
const apiuser = new Api(configuser);
apiuser.getTasks()
    .then((data) => {
        document.querySelector('.profile__avatar').src = data.avatar;
        document.querySelector('.profile__name').textContent = data.name;
        document.querySelector('.profile__profession').textContent = data.about;
        document.querySelector('.profile__name').id = data._id;
    })
    .catch(err => console.log(err));

//экземпляр секци
const cardListAdd = new Section({
        data: [],
        renderer: (item) => { //перебираем картинки и передаем функцию
            const card = new Card(item, 'element-template', {
                handleCardClick: () => {
                    popupwithimage.open(item);
                },
            });
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    '.elements'
);

//API подгружаем карты, создаем экземпляр класса для вставки элемента в разметку
apicard.getTasks()
    .then((data) => {
        const cardList = new Section({
                data: data, //пул картинок
                renderer: (item) => { //перебираем картинки и передаем функцию
                    const card = new Card(item, 'element-template', {
                        handleCardClick: () => {
                            popupwithimage.open(item);
                        },
                    }, {
                        apiTask: (item) => {
                            apicard.updateTask({
                                id: item.id,
                                method: item.method
                            });
                        },
                    }, { delPopup }, );
                    const cardElement = card.generateCard();
                    cardList.addItem(cardElement);
                },
            },
            '.elements'
        );
        cardList.renderItems();
    })
    .catch(err => console.log(err));

//Валидация
const formvalidatorEdit = new FormValidator('.popup__container_edit', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorEdit.enableValidation();

const formvalidatorAdd = new FormValidator('.popup__container_add', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorAdd.enableValidation();

const formvalidatorAvatar = new FormValidator('.popup__container_avatar', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorAdd.enableValidation();

//создаем экземпляр класса попапа картинки
const popupwithimage = new PopupWithImage('popup-image');

//текущие имя/работа
const userinfo = new UserInfo(document.querySelector('.profile__name'), document.querySelector('.profile__profession'));

//форма изменения имя/работа EDIT
const editPopup = new PopupWithForm('popup-formedit', {
        handleFormSubmit: (data) => {
            //устанавливаем изменения
            userinfo.setUserInfo({
                newName: data.name,
                newLink: data.position
            });
        },
    },
    formEdit, {
        api: (data) => {
            //устанавливаем изменения
            apiuser.patchTask({
                name: data.name,
                about: data.position
            }, '');
        },
    }, );
editPopup.setEventListeners();
//слушатель изменить данные EDIT
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    //получаем текущие данные
    const currentUserInfo = userinfo.getUserInfo();
    titleInputValue.value = currentUserInfo.name;
    descriptionInputValue.value = currentUserInfo.position;

    formvalidatorEdit.enableValidation();
    formvalidatorEdit.resetErrors(formEdit);
    editPopup.open();
});

const apiaddcard = new Api(configcard);
///форма добавления карточки ADD
const addPopup = new PopupWithForm('popup-formadd', {
    handleFormSubmit: (item) => {
        //новая карточка
        const newcard = new Card(item,
            'element-template', {
                //Сабмит для сохранения карточки
                handleCardClick: () => {
                    popupwithimage.open({
                        name: item.place,
                        link: item.link
                    });
                },
            }, { ///Like
                apiTask: (data) => {
                    apicard.updateTask({
                        id: data.id,
                        method: data.method
                    }, '')

                },
                ///Форма удаления (корзина)
            }, { delPopup },
        );
        const cardElement = newcard.generateCard();
        cardListAdd.addItem(cardElement);
    },
}, formAdd, {}, apiaddcard);
addPopup.setEventListeners();
//слушаем для ADD
document.querySelector('.profile__add-button').addEventListener('click', () => {
    formvalidatorAdd.enableValidation();
    formvalidatorAdd.resetErrors(formAdd);
    addPopup.open();
});

///форма изменения аватара 
const avatarPopup = new PopupWithForm('popup-formavatar', {
    handleFormSubmit: (data) => {
        document.querySelector('.profile__avatar').src = data.avatar;
    }
}, formAvatar, {
    api: (data) => {
        //устанавливаем изменения
        apiuser.patchTask({
            avatar: data.avatar
        }, '/avatar');
    },
}, );
avatarPopup.setEventListeners();
//слушаем для Avatar
document.querySelector('.profile__paint').addEventListener('click', () => {
    formvalidatorAvatar.enableValidation();
    formvalidatorAvatar.resetErrors(formAvatar);
    avatarPopup.open();
});