import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class Contacts extends Component<IShipping> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._email = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
        this._phone = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;
    }



    set email(value: string) {
        this._email.value = value
    }
    set phone(value: string) {
        this._phone.value = value
    }

}
