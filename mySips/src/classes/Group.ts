/** Menu category is for grouping drinks together */
import { v4 as uidv4 } from "uuid";
import { IMenu } from "../interfaces/IMenu";

interface IGroupParams {
    uid: string;
    groupName: string;
    groupDrinks?: Array<string>;
    userUids?: Array<string>;
}

class Group implements IGroupParams {
    uid: string;

    groupName: string;

    groupDrinks: Array<string>;

    userUids: Array<string>;

    constructor(params: IGroupParams) {
        this.uid = params.uid;
        this.groupName = params.groupName;
        this.groupDrinks = params.groupDrinks ?? [];
        this.userUids = params.userUids ?? [];
    }

    toFirestore(): Record<string, any> {
        return {
            uid: this.uid,
            groupName: this.groupName,
            groupDrinks: this.groupDrinks,
            userUids: this.userUids,
        };
    }

    static fromFirestore(data: IGroupParams): Group {
        return new Group({
            uid: data.uid,
            groupName: data.groupName,
            groupDrinks: data.groupDrinks,
            userUids: data.userUids,
        });
    }
}

export type { IGroupParams };
export { Group };
