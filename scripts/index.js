import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';

import '../pages/index.css';


import { initialCards } from './utils.js';

const formEdit = document.forms.formEdit;
const formAdd = document.forms.formAdd;

const validation = (item) => {
    const formvalidator = new FormValidator(item.formSelector, item.inputSelector, item.submitButtonSelector, item.inactiveButtonClass, item.inputErrorClass);
    formvalidator.enableValidation();
};
//валидация формы
validation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup_input-error',
});

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

//форма изменения имя/работа
const editPopup = new PopupWithForm('popup-formedit', {
    handleFormSubmit: (data) => {
        //устанавливаем изменения
        userinfo.setUserInfo({
            newName: data.name,
            newLink: data.position
        });
    },
}, formEdit);
editPopup.setEventListeners();
//слушатель изменить данные
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    //получаем текущие данные
    editPopup.open(userinfo.getUserInfo());
    //валидвация для edit
    validation({
        formSelector: '.popup__container',
        inputSelector: '.popup__input-edit',
        submitButtonSelector: '.popup__button-edit',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup_input-error',
    });
});

///форма добавления карточки
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
//слушаем для add
document.querySelector('.profile__add-button').addEventListener('click', () => {
    //передаем пустоту
    addPopup.open({ place: '', link: '' });
    validation({
        formSelector: '.popup__container',
        inputSelector: '.popup__input-add',
        submitButtonSelector: '.popup__button-add',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup_input-error',
    });
});