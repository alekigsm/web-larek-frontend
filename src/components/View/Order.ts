import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class Contacts extends Component<IShipping> {
    protected _payment: HTMLElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._address = ensureElement('input[name="address"]', this.container) as HTMLInputElement;
    }


    set address(value: string) {
        this._address.value = value
    }

}

