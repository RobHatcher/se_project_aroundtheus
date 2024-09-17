export default class UserInfo {
    constructor({ title, description, avatar }) {
        this._title = document.querySelector(title);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
    }

        getUserInfo() {
            return {
                title: this._title.textContent,
                description: this._description.textContent,
                avatar: this._avatar.textContent
            };
        }

        setUserInfo({ title, description, avatar }) {
            this._title.textContent = title;
            this._description.textContent = description;
            this._avatar.textContent = avatar;
        }

        setUserAvatar({ avatar }) {
            this._avatar.src = avatar;
        }
    }
