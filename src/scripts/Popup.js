export default class Popup {
    constructor(popupSelector) {
            this._popupSelector = document.getElementById(popupSelector);
        }
        //открытие, не подходит для форм, разный клас открытия, нужно изменить на единый клас
    open() {
            this._popupSelector.classList.add('popup_opened');
            this._popupSelector.classList.remove('popup_closed');
        }
        //закрыте
    close() {
            this._popupSelector.classList.remove('popup_opened');
            this._popupSelector.classList.add('popup_closed');
            /*     this._popupSelector.classList.add('popup_hide');
                 //прячем плавно
                 setTimeout(() => {
                     this._popupSelector.classList.remove('popup_hide');
                     this._popupSelector.classList.add('popup_closed');
                 }, 390);
             */
        }
        //слуашаем 
    setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });

        this._popupSelector.addEventListener('click', (evt) => {

            if (evt.target == this._popupSelector) {
                this.close();
            }
        });

    }
}