import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}



export class CardBasket extends Component<IItem> {
    protected _basketItem: HTMLElement;
    protected _cardPrice: HTMLElement;
    protected _cardTitle: HTMLElement;
    protected _itemDeleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._basketItem = ensureElement('.basket__item-index', this.container);
        this._cardPrice = ensureElement('.card__price', this.container);
        this._cardTitle = this.container.querySelector('.card__title');
        this._itemDeleteButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

        if (actions?.onClick)
            this._itemDeleteButton.addEventListener('click', actions.onClick)
    }


    set cardPrice(price: number) {
        this._cardPrice.textContent = `${price} синапсов`;
    }

    set cardTitle(title: string) {
        this._cardTitle.textContent = title;
    }

    set counter(count: number) {
        this._basketItem.textContent = `${count}`
    }
}
