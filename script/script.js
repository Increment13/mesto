import Card from './card.js';
import FormValidator from './validate.js';

const formElement = document.querySelector('.page');
const formSub = document.forms.frmInput;
const editButton = formElement.querySelector('.profile__editButton');
const closeButton = formElement.querySelector('.popup__close');

const addButton = formElement.querySelector('.profile__addButton');

const formTitle = formElement.querySelector('.popup__header');
const popTitle1 = 'Редактировать профиль';
const popTitle2 = 'Новое место';

const form = formElement.querySelector('#popfrm');
const formCont = formElement.querySelector('.popup__container');

const formImage = formElement.querySelector('#popimg');
const popupImage = formElement.querySelector('.popup__image');

const nameTitle = formElement.querySelector('.profile__name');
const jobTitle = formElement.querySelector('.profile__profession');

const nameInput = formElement.querySelector('#inpFr');
const jobInput = formElement.querySelector('#inpSc');

const cardContainer = document.querySelector('.elements');

const closArray = Array.from(formElement.querySelectorAll('.popup__close'));

const popupArray = Array.from(formElement.querySelectorAll('.popup'));
const labelArray = Array.from(formElement.querySelectorAll('.popup__label-inp'));


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    }
];

///формируем блок елементс
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();

    cardContainer.prepend(cardElement);
});

///валидация форм
const Validation = (item) => {
    const envalid = new FormValidator(item.formSelector, item.inputSelector, item.submitButtonSelector, item.inactiveButtonClass, item.inputErrorClass);
    envalid.enableValidation();
};

/*открытие попапа*/
function openPopup(popTitle) {
    formSub.reset();

    labelArray.forEach(function(inputElement) {

        const errorElement = document.querySelector(`#${inputElement.querySelector('.popup__input').id}-error`);
        inputElement.classList.remove('popup_input-error');
        errorElement.textContent = '';
    });

    formTitle.textContent = popTitle;
    if (popTitle === 'Редактировать профиль') {
        ///если редактируем профиль, отправляем на кусто
        ///заполняем текущие данные
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
    } else { ///удаляем инпуты и формируем инпуты для место
        nameInput.setAttribute('minlength', '1');
        nameInput.setAttribute('maxlength', '30');
        jobInput.setAttribute('type', 'url');
        nameInput.setAttribute('placeholder', 'Название');
        jobInput.setAttribute('placeholder', 'Ссылка на картинку');
    };

    form.classList.add('popup_opened');
    form.classList.remove('popup_closed');
    /////////////////////////////////////////////////////enableValidation

    Validation({
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup_input-error',
    });

};

//Для передачи параментров + использование одного попапа
editButton.addEventListener('click', () => openPopup(popTitle1));
addButton.addEventListener('click', () => openPopup(popTitle2));

/*наполнение формы Имя/Професия  ------- сохранение формы*/
function formSubmitHandler(evt) {
    ///блочим submit
    evt.preventDefault();
    ///смотрим что открыли
    const popTitle = formElement.querySelector('.popup__header').textContent;
    if (popTitle === 'Редактировать профиль') {
        ///заполняем профиль
        nameTitle.textContent = nameInput.value;
        jobTitle.textContent = jobInput.value;
    } else {
        ///формируем карточку с фото
        const card = new Card(nameInput.value, jobInput.value);
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
formCont.addEventListener('submit', formSubmitHandler);

///Функция закрытия + плавный фейд
function addClassCl(tagElem) {
    if (tagElem.id === 'popimg') {
        tagElem.classList.remove('popup_opened-image');
    } else {
        tagElem.classList.remove('popup_opened');
    }
    tagElem.classList.add('popup_hide');
    setTimeout(function() {
        tagElem.classList.remove('popup_hide');
        tagElem.classList.add('popup_closed');
    }, 390);
};
/*закрытие Крестик*/
closArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        const tarOp = item.parentElement;
        addClassCl(tarOp);
    });
});
///закрытие по Click
popupArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup')) {
            addClassCl(item);
        };
    });
});
///закрытие по Esc
function EscCl(evt) {
    if (evt.key === 'Escape') {
        const itemEscIm = document.querySelector('.popup_opened-image');
        const itemEscF = document.querySelector('.popup_opened');
        if (itemEscIm) {
            addClassCl(itemEscIm);
        } else {
            addClassCl(itemEscF);
        }
    }
};
document.addEventListener('keydown', EscCl);

///вызов валидации формы
Validation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup_input-error',
});