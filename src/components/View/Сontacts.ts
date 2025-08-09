import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class Contacts extends Component<IShipping> {
    protected _email: HTMLElement;
    protected _phone: HTMLElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._email = this.container.querySelector('input[name="email"]');
        this._phone = this.container.querySelector('input[name="phone"]');
    }



    set email(value: string) {
        this._email.textContent = value
    }
    set phone(value: string) {
        this._phone.textContent = value
    }

}

