import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';

import './index.css';

import { initialCards } from '../scripts/utils.js';

const formEdit = document.forms.formEdit;
const formAdd = document.forms.formAdd;


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
    formvalidatorEdit.enableValidation();

    Array.from(formEdit.querySelectorAll('.popup__input')).forEach(function(inputElement) {
        formvalidatorEdit.hideInputError(inputElement);
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

    //валидвация для add
    formvalidatorAdd.enableValidation();

    Array.from(formAdd.querySelectorAll('.popup__input')).forEach(function(inputElement) {
        formvalidatorAdd.hideInputError(inputElement);
    });
});
//закрытие по Esc 
function escClose(evt) {
    if (evt.key === 'Escape') {
        const itemEscForm = document.querySelector('.popup_opened');
        //проверяем наличие открытого попапа
        if (itemEscForm) {
            if (itemEscForm.id == 'popup-formadd') {
                addPopup.close();
            }
            if (itemEscForm.id == 'popup-formedit') {
                editPopup.close();
            }
            if (itemEscForm.id == 'popup-image') {
                popupwithimage.close();
            }
        }
    }
};
document.addEventListener('keydown', escClose);