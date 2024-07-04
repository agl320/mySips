/** Menu category is for grouping drinks together */
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "../interfaces/IMenu";

interface IGroupParams {
    uuid: string;
    groupName: string;
    groupDrinks: Array<string>;
}

class Group implements IGroupParams {
    uuid: string;

    groupName: string;

    groupDrinks: Array<string>;

    constructor(params: IGroupParams) {
        this.uuid = uuidv4();
        this.groupName = params.groupName;
        this.groupDrinks = params.groupDrinks;
    }

}

export type { IGroupParams };
export { Group };
