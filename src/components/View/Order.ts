import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class Contacts extends Component<IShipping> {
    protected _payment: HTMLElement;
    protected _address: HTMLElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._payment = this.container.querySelector('input[name="email"]');
        this._address = this.container.querySelector('input[name="address"]');
    }



    set address(value: string) {
        this._address.textContent = value
    }
    /*  set payment(value: boolean) {
         
     } */

}

