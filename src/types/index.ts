
//товар
export interface IItem {
    id: string;   // уникальный номер товара
    title: string;          // Название товара 
    image: string;        // изображение товара
    category: string;     // Категория товара   
    description: string;   // Описание товара  
    price: number | null;  // Цена товара  
}


// покупатель
export interface IShipping {
    payment: string;      // Способ оплаты 
    address: string;     // Адрес доставки  
    email: string;       // Почта покупателя  
    phone: string;       // Телефон покупателя
}


/*
export interface IOrder extends IShipping {
    items: string[];    //список товаров
    total: number;      // Итог
}

export interface IOrderResult {
    id: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;


// Корзина
/* export interface IItemCatalog {
    items: IItem[];
    total: number;
    setItem(item: IItem[]): void; // добавить товар
    getItem(): IItem[]; // получить список товаров
    getTotal(total: number): number; // итоговая сумма
    delItem(id: string);
}
 */
// результат 



