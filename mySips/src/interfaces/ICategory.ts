/** Menu category is for grouping drinks together */
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "./IMenu";

interface ICategoryParams {
    // uuid: string;
    categoryName: string;
    categoryDrinks: IMenu;
}

class Category implements ICategoryParams {
    #uuid: string;

    categoryName: string;

    categoryDrinks: IMenu;

    constructor(params: ICategoryParams) {
        this.#uuid = uuidv4();
        this.categoryName = params.categoryName;
        this.categoryDrinks = params.categoryDrinks;
    }
}

export type { ICategoryParams };
export { Category };
