
import { IItem } from "../../types";
import { cloneTemplate, createElement, ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";


interface Actions {
    onClick: () => void;
}

interface IBasketView {
    items: HTMLElement[]; // не получается добавить в корзину элементы
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected actions: Actions) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__button', this.container) as HTMLButtonElement;
        if (actions?.onClick)
            this._button.addEventListener('click', actions.onClick);

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        //    this.setText(this._totalPrice, formatNumber(total));
        this._totalPrice.textContent = `${total} синапсов`;
        if (this._button) {
            this.setDisabled(this._button, total <= 0);
        }
    }
}