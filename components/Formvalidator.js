export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formEl;

    this._inputEls = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
   const isValid = this._inputEls.every((inputEl) => inputEl.validity.valid);
   if (isValid) {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
   } else {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
   }
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            this._checkInputValidity(inputEl);
            this._toggleButtonState();
        });
    });

    this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
        this._hideInputError(inputEl);
    });
    this._toggleButtonState();
}
}
