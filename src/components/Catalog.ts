import { IItem } from "../types";

export class Catalog {
    protected products: IItem[];
    protected selectedProduct: IItem;

    constructor() {

    }

    setProducts(products: IItem[]): void {
        this.products = products
    };
    getProducts(): IItem[] {
        return this.products
    }

    setSelectedProduct(product: IItem) {
        this.selectedProduct = product;
    }

    getSelectedProduct(): IItem {
        return this.selectedProduct;
    }

    getProduct(id: string): IItem {
        return this.products.find((item) => item.id === id);
    }

}