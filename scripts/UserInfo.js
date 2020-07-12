export default class UserInfo {
    constructor(nameTitle, jobTitle) {
            this._nameTitle = nameTitle;
            this._jobTitle = jobTitle;
        }
        //текущие данные 
    getUserInfo() {
            return {
                name: this._nameTitle.textContent,
                position: this._jobTitle.textContent
            };
        }
        //устанавливаем 
    setUserInfo({ newName, newLink }) {
        this._nameTitle.textContent = newName;
        this._jobTitle.textContent = newLink;
    }
}