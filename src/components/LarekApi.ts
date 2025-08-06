import { IItem, IOrder, IOrderResult } from "../types";
import { Api, ApiListResponse } from "./base/api"

export class LarekApi extends Api {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    /*     getLotItem(id: string): Promise<ILot> {
            return this.get(`/lot/${id}`).then(
                (item: ILot) => ({
                    ...item,
                    image: this.cdn + item.image,
                })
            ); 
        }
    
        getLotUpdate(id: string): Promise<LotUpdate> {
            return this.get(`/lot/${id}/_auction`).then(
                (data: LotUpdate) => data
            );
        } */

    getProductList(): Promise<IItem[]> {
        return this.get('/product').then((data: ApiListResponse<IItem>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    /*     placeBid(id: string, bid: IBid): Promise<LotUpdate> {
            return this.post(`/lot/${id}/_bid`, bid).then(
                (data: ILot) => data
            );
        } */

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }


}