const formElement = document.querySelector('.page');

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

const clos = formElement.querySelectorAll('.popup__close');
const closArray = Array.from(clos);

const cardTemp = document.querySelector('#element-template').content;


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

function CardCreate(itemtext, itemsrc) {
    let cardElement = cardTemp.cloneNode(true);
    let cardimgEl = cardElement.querySelector('.elements__image');

    cardElement.querySelector('.elements__title').textContent = itemtext;
    cardimgEl.setAttribute('alt', itemtext);
    cardimgEl.setAttribute('src', itemsrc);
    cardContainer.prepend(cardElement);

    formElement.querySelector('.elements__heartImage').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__heartImage_active');
    });

    formElement.querySelector('.elements__trash').addEventListener('click', function(evt) {
        evt.target.parentElement.parentElement.remove();
    });

    formElement.querySelector('.elements__image').addEventListener('click', function(evt) {
        popupImage.setAttribute('src', evt.target.getAttribute("src"));
        formElement.querySelector('.popup__sign').textContent = evt.target.getAttribute("alt");
        formImage.classList.add('popup_opened-image');
    });
};

///формируем блок елементс
initialCards.forEach(function(item) {
    CardCreate(item.name, item.link);
});

/*открытие попапа*/
function openPopup(popTitle, nameTitle, jobTitle) {

    formTitle.textContent = popTitle;

    if (popTitle === 'Редактировать профиль') { ///если редактируем профиль, отправляем на кусто
        nameInput.value = nameTitle.textContent;
        jobInput.value = jobTitle.textContent;
    } else { ///удаляем инпуты и формируем инпуты для место
        nameInput.value = '';
        jobInput.value = '';
        nameInput.setAttribute('placeholder', 'Название');
        jobInput.setAttribute('placeholder', 'Ссылка на картинку');
    };

    form.classList.add('popup_opened');
    form.classList.remove('popup_closed');
};
//Для передачи параментров + использование одного попапа
editButton.addEventListener('click', () => openPopup(popTitle1, nameTitle, jobTitle));
addButton.addEventListener('click', () => openPopup(popTitle2, nameTitle, jobTitle));

/*наполнение формы Имя/Професия  ------- сохранение формы*/
function formSubmitHandler(evt) {
    ///блочим submit
    evt.preventDefault();

    ///смотрим что открыли
    let popTitle = formElement.querySelector('.popup__header').textContent;
    if (popTitle === 'Редактировать профиль') {
        ///заполняем профиль
        nameTitle.textContent = nameInput.value;
        jobTitle.textContent = jobInput.value;
    } else {
        ///формируем карточку с фото
        CardCreate(nameInput.value, jobInput.value);
    }

    form.classList.remove('popup_opened');
    form.classList.add('popup_hide');
    setTimeout(function() {
        form.classList.remove('popup_hide');
        form.classList.add('popup_closed');
    }, 300);

};
formCont.addEventListener('submit', formSubmitHandler);

/*закрытие ПопАпа*/
closArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        if (evt.target.parentElement.id === 'popimg') {
            evt.target.parentElement.classList.remove('popup_opened-image');
        } else {
            evt.target.parentElement.classList.remove('popup_opened');
        }
        evt.target.parentElement.classList.add('popup_hide');
        setTimeout(function() {
            evt.target.parentElement.classList.remove('popup_hide');
            evt.target.parentElement.classList.add('popup_closed');
        }, 300);
    })
});