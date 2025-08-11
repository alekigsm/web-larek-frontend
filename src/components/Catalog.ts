import { IItem } from "../types";
import { IEvents } from "./base/events";

export class Catalog {
    protected products: IItem[];
    protected selectedProduct: IItem;

    constructor(protected events: IEvents) {

    }

    setProducts(products: IItem[]): void {

        this.products = products
        this.events.emit('catalog:changed');
    };
    getProducts(): IItem[] {
        return this.products
    }

    setSelectedProduct(product: IItem) {
        this.selectedProduct = product;
        this.events.emit('product:selected');
    }

    getSelectedProduct(): IItem {
        return this.selectedProduct;
    }

    getProduct(id: string): IItem {
        return this.products.find((item) => item.id === id);

    }



}