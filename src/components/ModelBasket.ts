import { IItem } from "../types";

export class ModelBasket {
    protected items: IItem[] = [];
    //добавить товар
    addProduct(item: IItem) {
        this.items.push(item)
    }
    //удалить товар
    delProduct(id: string) {
        this.items = this.items.filter((item) => item.id !== id)
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
    hasProduct() {
        if (this.items.length > 0) {
            return console.log('товар есть');
        }
        else {
            return console.log('товара нет');
        }
    }

}