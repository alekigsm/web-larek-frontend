import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

export class Order extends Form<IShipping> {
    protected _payment: HTMLElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
    set payment(value: boolean) {

    }

}
