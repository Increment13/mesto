const formElement = document.querySelector('.page');

const editButton = formElement.querySelector('.profile__editButton');
const closeButton = formElement.querySelector('.popup__close');

const form = formElement.querySelector('.popup');
const formCont = formElement.querySelector('.popup__container');

const nameTitle = formElement.querySelector('.profile__name');
const jobTitle = formElement.querySelector('.profile__profession');

const nameInput = formElement.querySelector('#inpName');
const jobInput = formElement.querySelector('#inpJob');


function openPopup() {
    /* form.classList.add('popup_opened');*/
    form.setAttribute("style", "display: flex;");
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
}

function closePopup() {
    form.setAttribute("style", "display: none;");
    /*form.classList.remove('popup_opened');*/
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;
    closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formCont.addEventListener('submit', formSubmitHandler);