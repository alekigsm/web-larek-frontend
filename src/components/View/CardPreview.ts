import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

export class CardPreview extends Component<IItem> {
    protected _cardPrice: HTMLElement;
    protected _cardImg: HTMLImageElement;
    protected _cardTitle: HTMLElement;
    protected _cardCategory: HTMLElement;
    protected _cardText: HTMLElement;
    protected _cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._cardPrice = ensureElement('.card__price', this.container);
        this._cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._cardTitle = this.container.querySelector('.card__title');
        this._cardCategory = this.container.querySelector('.card__category');
        this._cardText = ensureElement('.card__text', this.container)
        this._cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

        if (actions?.onClick)
            this._cardButton.addEventListener('click', actions.onClick)
    }

    set description(description: string) {
        this._cardText.textContent = `${description}`;
    }

    set price(price: number) {
        this._cardPrice.textContent = `${price} синапсов`;
    }

    set title(title: string) {
        this._cardTitle.textContent = title;
    }
    set category(category: string) {
        this._cardCategory.textContent = `${category}`;
    }

    set image(image: string) {
        if (this._cardImg) {
            this.setImage(this._cardImg, image, this._cardTitle.textContent);
        }
    }

}
