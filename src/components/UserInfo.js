export default class UserInfo {
    constructor(nameTitle, jobTitle, avatarUser, { setRequest }) {
        this._nameTitle = nameTitle;
        this._jobTitle = jobTitle;
        this._avatarUser = avatarUser;
        this._setRequest = setRequest;
    }

    //текущие данные 
    getUserInfo() {
        return {
            name: this._nameTitle.textContent,
            position: this._jobTitle.textContent
        };
    }

    //устанавливаем 
    setUserInfo() {
        this._setRequest()
            .then((data) => {
                this._avatarUser.src = data.avatar;
                this._nameTitle.textContent = data.name;
                this._nameTitle.id = data._id;
                this._jobTitle.textContent = data.about;
            });
    }
}