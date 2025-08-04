import { IItem, IShipping } from "../types";

export class Buyer {
    protected persons: IShipping;



    setPerson(data: IShipping) {
        this.persons = data;
    }

    getSavePersonInfo(): IShipping {
        return this.persons;
    }

    isValid(data: IShipping): boolean {
        if (data.address !== '' && data.email !== '' && data.payment !== '' && data.phone !== '')
            return true
    };
}