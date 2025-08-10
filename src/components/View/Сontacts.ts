import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

export class Contacts extends Form<IShipping> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

}
