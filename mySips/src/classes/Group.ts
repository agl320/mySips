/** Menu category is for grouping drinks together */
import { v4 as uidv4 } from "uuid";
import { IMenu } from "../interfaces/IMenu";

interface IGroupParams {
    uid: string;
    groupName: string;
    groupDrinks: Array<string>;
}

class Group implements IGroupParams {
    uid: string;

    groupName: string;

    groupDrinks: Array<string>;

    constructor(params: IGroupParams) {
        this.uid = uidv4();
        this.groupName = params.groupName;
        this.groupDrinks = params.groupDrinks;
    }
}

export type { IGroupParams };
export { Group };
