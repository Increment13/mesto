export default class Popup {
    constructor(popupSelector) {
            this._popupSelector = document.getElementById(popupSelector);
        }
        //открытие, не подходит для форм, разный клас открытия, нужно изменить на единый клас
    open() {
            this._popupSelector.classList.add('popup_opened-image');
            this._popupSelector.classList.remove('popup_hide');
        }
        //закрыте
    close() {
            this._popupSelector.classList.remove('popup_opened-image');
            this._popupSelector.classList.add('popup_hide');
            //прячем плавно
            setTimeout(() => {
                this._popupSelector.classList.remove('popup_hide');
                this._popupSelector.classList.add('popup_closed');
            }, 390);
        }
        //закрытие по Esc
    _handleEscClose(evt) {
            if (evt.key === 'Escape') {
                this.close();
            }
        }
        //слуашаем 
    setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
}