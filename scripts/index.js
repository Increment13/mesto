import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './utils.js';

const formElement = document.querySelector('.page');
const formInput = document.forms.formInput;
const editButton = formElement.querySelector('.profile__edit-button');
const addButton = formElement.querySelector('.profile__add-button');
const formTitle = formElement.querySelector('.popup__header');
const profilePopupTitle = 'Редактировать профиль';
const placePopupTitle = 'Новое место';
const form = formElement.querySelector('#popup-form');
const formContainer = formElement.querySelector('.popup__container');
const nameTitle = formElement.querySelector('.profile__name');
const jobTitle = formElement.querySelector('.profile__profession');
const nameInput = formElement.querySelector('#input-names');
const jobInput = formElement.querySelector('#input-place');
const cardContainer = document.querySelector('.elements');

const closeArray = Array.from(formElement.querySelectorAll('.popup__close'));
const popupArray = Array.from(formElement.querySelectorAll('.popup'));
const labelArray = Array.from(formElement.querySelectorAll('.popup__label-input'));

const cardTemplate = document.querySelector('#element-template');

//формируем блок елементс
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, cardTemplate);
    const cardElement = card.generateCard();

    cardContainer.prepend(cardElement);
});

//валидация форм
const validation = (item) => {
    const formvalidator = new FormValidator(item.formSelector, item.inputSelector, item.submitButtonSelector, item.inactiveButtonClass, item.inputErrorClass);
    formvalidator.enableValidation();
};

//открытие попапа
function openPopup(popupTitle) {
    formInput.reset();

    labelArray.forEach(function(inputElement) {

        const errorElement = document.querySelector(`#${inputElement.querySelector('.popup__input').id}-error`);
        inputElement.classList.remove('popup_input-error');
        errorElement.textContent = '';
    });

    formTitle.textContent = popupTitle;
    if (popupTitle === 'Редактировать профиль') {
        //если редактируем профиль, отправляем на кусто
        //заполняем текущие данные
        nameInput.value = nameTitle.textContent;
        jobInput.value = jobTitle.textContent;
        //удаляем атрибуты
        jobInput.removeAttribute('type', 'url');
        //доб атрибуты
        nameInput.setAttribute('minlength', '2');
        nameInput.setAttribute('maxlength', '40');
        jobInput.setAttribute('minlength', '2');
        jobInput.setAttribute('maxlength', '200');
        nameInput.setAttribute('placeholder', 'Имя');
        jobInput.setAttribute('placeholder', 'Род занятий');
    } else { //удаляем инпуты и формируем инпуты для место
        nameInput.setAttribute('minlength', '1');
        nameInput.setAttribute('maxlength', '30');
        jobInput.setAttribute('type', 'url');
        nameInput.setAttribute('placeholder', 'Название');
        jobInput.setAttribute('placeholder', 'Ссылка на картинку');
    };

    form.classList.add('popup_opened');
    form.classList.remove('popup_closed');

    validation({
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup_input-error',
    });
};

//Для передачи параментров + использование одного попапа
editButton.addEventListener('click', () => openPopup(profilePopupTitle));
addButton.addEventListener('click', () => openPopup(placePopupTitle));

//наполнение формы Имя/Професия сохранение формы
function formSubmitHandler(evt) {
    //блочим submit
    evt.preventDefault();
    //смотрим что открыли
    const popupTitle = formElement.querySelector('.popup__header').textContent;
    if (popupTitle === 'Редактировать профиль') {
        //заполняем профиль
        nameTitle.textContent = nameInput.value;
        jobTitle.textContent = jobInput.value;
    } else {
        //формируем карточку с фото
        const card = new Card(nameInput.value, jobInput.value, cardTemplate);
        const cardElement = card.generateCard();
        cardContainer.prepend(cardElement);
    }
    form.classList.remove('popup_opened');
    form.classList.add('popup_hide');
    setTimeout(function() {
        form.classList.remove('popup_hide');
        form.classList.add('popup_closed');
    }, 390);
};
formContainer.addEventListener('submit', formSubmitHandler);

//Функция закрытия + плавный фейд
function addClassClose(openedEelement) {
    if (openedEelement.id === 'popup-image') {
        openedEelement.classList.remove('popup_opened-image');
    } else {
        openedEelement.classList.remove('popup_opened');
    }
    openedEelement.classList.add('popup_hide');
    setTimeout(function() {
        openedEelement.classList.remove('popup_hide');
        openedEelement.classList.add('popup_closed');
    }, 390);
};
//закрытие Крестик
closeArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        const targetPopup = item.parentElement;
        addClassClose(targetPopup);
    });
});
//закрытие по Click
popupArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup')) {
            addClassClose(item);
        };
    });
});
//закрытие по Esc
function escClose(evt) {
    if (evt.key === 'Escape') {
        const itemEscImage = document.querySelector('.popup_opened-image');
        const itemEscForm = document.querySelector('.popup_opened');
        if (itemEscImage) {
            addClassClose(itemEscImage);
        } else {
            addClassClose(itemEscForm);
        }
    }
};
document.addEventListener('keydown', escClose);

//вызов валидации формы
validation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup_input-error',
});