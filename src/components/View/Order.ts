import { IItem, IShipping } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

export class Order extends Form<IShipping> {
    protected paymentCardButton: HTMLButtonElement;
    protected paymentCashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.paymentCardButton = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container)
        this.paymentCashButton = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container)
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
    set payment(value: string) {
        this.paymentCardButton.classList.toggle('button_alt-active', value == 'card')
        this.paymentCashButton.classList.toggle('button_alt-active', value == 'cash')
    }

}
