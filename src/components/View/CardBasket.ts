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
/* <template id="card-preview">
        <div class="card card_full">
            <img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
            <div class="card__column">
                <span class="card__category card__category_other">другое</span>
                <h2 class="card__title">Бэкенд-антистресс</h2>
                <p class="card__text">Если планируете решать задачи в тренажёре, берите два.</p>
                <div class="card__row">
                    <button class="button card__button">В корзину</button>
                    <span class="card__price">1000 синапсов</span>
                </div>
            </div>
        </div>
    </template> */