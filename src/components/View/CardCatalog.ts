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

        if (actions?.onClick)
            this.container.addEventListener('click', actions.onClick)
    }

    set price(price: number | null) {
        if (!price) {
            this._cardPrice.textContent = `Бесценно`;
            return;
        }
        this._cardPrice.textContent = `${price} синапсов`;
    }
    set title(title: string) {
        this._cardTitle.textContent = `${title}`;
        // this._cardTitle.classList.add('.card__full')
    }
    set category(category: string) {
        this._cardCategory.textContent = `${category}`;
        this._cardCategory.classList.toggle('card__category_soft', category === 'софт-скил')
        this._cardCategory.classList.toggle('card__category_hard', category === 'хард-скил')
        this._cardCategory.classList.toggle('card__category_other', category === 'другое')
        this._cardCategory.classList.toggle('card__category_additional', category === 'дополнительное')
        this._cardCategory.classList.toggle('card__category_button', category === 'кнопка')
    }

    set image(value: string) {
        if (this._cardImg) {
            this.setImage(this._cardImg, value, this._cardTitle.textContent);
        }
    }

}
