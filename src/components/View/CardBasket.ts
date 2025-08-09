import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class CardBasket extends Component<IItem> {
    protected _basketItem: HTMLElement;
    protected _price: HTMLElement;
    protected _Title: HTMLElement;
    protected _itemDeleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._basketItem = ensureElement('.basket__item-index', this.container);
        this._price = ensureElement('.card__price', this.container);
        this._Title = this.container.querySelector('.card__title');
        this._itemDeleteButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

        if (actions?.onClick)
            this._itemDeleteButton.addEventListener('click', actions.onClick)
    }


    set price(price: number) {

        this._price.textContent = `${price} синапсов`;
    }

    set title(title: string) {
        this._Title.textContent = `${title} синапсов`;
    }

    set counter(count: number) {
        this._basketItem.textContent = `${count}`
    }
}
