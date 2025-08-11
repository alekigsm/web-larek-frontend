import { IItem } from "../types";
import { IEvents } from "./base/events";

export class ModelBasket {
    protected items: IItem[] = [];

    constructor(protected events: IEvents) { }
    //добавить товар
    addProduct(item: IItem) {
        this.items.push(item)
        this.events.emit('basket:changed')
    }
    //удалить товар
    delProduct(id: string) {
        this.items = this.items.filter((item) => item.id !== id)
        this.events.emit('basket:changed')
    }

    clearBasket() {
        this.items = [];
        this.events.emit('basket:changed')
    }
    //получить количество товаров
    getCountProduct() {
        return this.items.length
    }
    //получить список товаров
    getListedProduct(): IItem[] {
        return [...this.items];
    }
    // сумма цены товара
    getTotalPrice(): number {
        return this.items.reduce((sum, items) => sum + items.price, 0);
    }
    // наличие товара
    hasProduct(item: IItem): boolean {
        return this.items.some((product) => product.id == item.id)
    }

}