import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';


import './index.css';

import { initialCards } from '../utils/utils.js';

const formEdit = document.forms.formEdit;
const formAdd = document.forms.formAdd;
const titleInputValue = document.getElementById('input-names');
const descriptionInputValue = document.getElementById('input-position');

const formvalidatorEdit = new FormValidator('.popup__container_edit', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorEdit.enableValidation();

const formvalidatorAdd = new FormValidator('.popup__container_add', '.popup__input', '.popup__button', 'button_inactive', 'popup_input-error');
formvalidatorAdd.enableValidation();

//создаем экземпляр класса попапа картинки
const popupwithimage = new PopupWithImage('popup-image');

//создаем экземпляр класса для вставки элемента в разметку
const cardList = new Section({
        data: initialCards, //пул картинок
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
cardList.renderItems();

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
    formEdit);
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

///форма добавления карточки ADD
const addPopup = new PopupWithForm('popup-formadd', {
    handleFormSubmit: (item) => {
        //новая карточка
        const newcard = new Card({ name: item.place, link: item.link },
            'element-template', {
                handleCardClick: () => {
                    popupwithimage.open({
                        name: item.place,
                        link: item.link
                    });
                },
            }
        );
        const cardElement = newcard.generateCard();
        cardList.addItem(cardElement);
    },
}, formAdd);
addPopup.setEventListeners();
//слушаем для ADD
document.querySelector('.profile__add-button').addEventListener('click', () => {
    formvalidatorAdd.enableValidation();
    formvalidatorAdd.resetErrors(formAdd);
    addPopup.open();
});