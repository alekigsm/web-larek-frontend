import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { Card } from "./Card";

interface Actions {
    onClick: () => void;
}

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
