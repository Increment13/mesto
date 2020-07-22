export default class Popup {
    constructor(popupSelector) {
            this._popupSelector = document.getElementById(popupSelector);
            this._documentEscListener = this._documentEscListener.bind(this);
        }
        //открытие
    open() {
            this._popupSelector.classList.add('popup_opened');
            this._popupSelector.classList.remove('popup_closed');
            //при открытии слушаем Esc
            document.addEventListener('keydown', this._documentEscListener);
        }
        //закрыте
    close() {
            this._popupSelector.classList.remove('popup_opened');
            this._popupSelector.classList.add('popup_closed');
        }
        //клик Esc
    _documentEscListener(evt) {
            if (evt.key === 'Escape') {
                document.removeEventListener('keydown', this._documentEscListener);
                this.close();
            }
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