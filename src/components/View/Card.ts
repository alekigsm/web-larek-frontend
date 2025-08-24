import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface Actions {
    onClick: () => void;
}

// Базовый класс Card с общими свойствами
export abstract class Card extends Component<IItem> {
    protected _cardPrice: HTMLElement;
    protected _cardImg: HTMLImageElement;
    protected _cardTitle: HTMLElement;
    protected _cardCategory: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._cardPrice = ensureElement('.card__price', this.container);
        this._cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;
        this._cardTitle = ensureElement('.card__title', this.container);
        this._cardCategory = ensureElement('.card__category', this.container);
    }

    set price(price: number | null) {
        if (!price) {
            this.setText(this._cardPrice, `Бесценно`);
            return;
        }
        this.setText(this._cardPrice, `${price} синапсов`);
    }

    set title(title: string) {
        this.setText(this._cardTitle, `${title}`);
    }

    set category(category: string) {
        this.setText(this._cardCategory, `${category}`);
        this.toggleClass(this._cardCategory, 'card__category_soft', category === 'софт-скил');
        this.toggleClass(this._cardCategory, 'card__category_hard', category === 'хард-скил');
        this.toggleClass(this._cardCategory, 'card__category_other', category === 'другое');
        this.toggleClass(this._cardCategory, 'card__category_additional', category === 'дополнительное');
        this.toggleClass(this._cardCategory, 'card__category_button', category === 'кнопка');
    }

    set image(value: string) {
        if (this._cardImg) {
            this.setImage(this._cardImg, value, this._cardTitle.textContent);
        }
    }
}

// Класс для карточки в каталоге
export class CardCatalog extends Card {
    constructor(container: HTMLElement, actions: Actions) {
        super(container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }
}

// Класс для карточки в превью
export class CardPreview extends Card {
    protected _cardText: HTMLElement;
    protected _cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container);
        this._cardText = ensureElement('.card__text', this.container);
        this._cardButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

        if (actions?.onClick) {
            this._cardButton.addEventListener('click', actions.onClick);
        }
    }

    set description(description: string) {
        this.setText(this._cardText, `${description}`);
    }

    set price(price: number | null) {
        if (!price) {
            this.setText(this._cardPrice, `Бесценно`);
            this.setDisabled(this._cardButton, true);
            return;
        }
        this.setText(this._cardPrice, `${price} синапсов`);
    }

    set buttonText(text: string) {
        this.setText(this._cardButton, text);
    }
}