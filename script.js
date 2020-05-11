
const formElement = document.querySelector('.page');

const editButton = formElement.querySelector('.profile__editButton');
const closeButton = formElement.querySelector('.popup__close');
const saveButton = formElement.querySelector('.popup__button');
const form = formElement.querySelector('.popup');

let nameInput = formElement.querySelector('.popup__input');
let jobInput = formElement.querySelector('.popup__container');

function openPopup() {
    form.classList.add('popup_opened');

    let nameTitle = formElement.querySelector('.profile__name');
    let jobTitle = formElement.querySelector('.profile__profession');

    let nameInput = formElement.querySelector('.popup__inputName');
    let jobInput = formElement.querySelector('.popup__inputJob');

    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
}

function closePopup() {
    form.classList.remove('popup_opened');
}

function formSubmitHandler () {

    let nameInput = formElement.querySelector('.popup__inputName');
    let jobInput = formElement.querySelector('.popup__inputJob');

    let nameTitle = formElement.querySelector('.profile__name');
    let jobTitle = formElement.querySelector('.profile__profession');

    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', formSubmitHandler);

