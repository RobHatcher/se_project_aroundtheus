import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
    constructor( modalSelector, handleFormSubmit ) {
        super({ modalSelector });
        this._modalForm = this._modalElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._modalForm.querySelectorAll('.modal__input');
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        this._modalForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const formData = this._getInputValues();
            this._handleFormSubmit(formData);
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        this._modalForm.reset();
        super.close();
    }
}
