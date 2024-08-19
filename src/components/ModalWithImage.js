// import { NormalModule } from "webpack";
import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
    constructor(modalSelector) {
        super({ modalSelector });
        this._modalImage = this._modalElement.querySelector("#modal-image");
        this._modalImageTitle = this._modalElement.querySelector("#modal-title");
    }

    open({ link, name }) {
        this._modalImage.src = link;
        this._modalImage.alt = name;
        this._modalImageTitle.textContent = name;
        super.open();
    }
}