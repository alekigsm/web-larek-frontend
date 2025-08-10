import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class CardCatalog extends Component<IItem> {
    protected _cardPrice: HTMLElement;
    protected _cardImg: HTMLImageElement;
    protected _cardTitle: HTMLElement;
    protected _cardCategory: HTMLElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._cardPrice = ensureElement('.card__price', this.container);
        this._cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._cardTitle = this.container.querySelector('.card__title');
        this._cardCategory = ensureElement('.card__category', this.container);

    }

    set price(price: number) {
        this._cardPrice.textContent = `${price} синапсов`;
    }
    set title(title: string) {
        this._cardTitle.textContent = `${title}`;
    }
    set category(category: string) {
        this._cardCategory.textContent = `${category}`;
    }

    set image(value: string) {
        if (this._cardImg) {
            this.setImage(this._cardImg, value, this._cardTitle.textContent);
        }
    }

}
