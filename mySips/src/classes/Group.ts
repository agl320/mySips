/** Menu category is for grouping drinks together */
import { v4 as uidv4 } from "uuid";
import { IMenu } from "../interfaces/IMenu";

interface IGroupParams {
    uid: string;
    groupName: string;
    accessUids?: Array<string>;
    ownerUid: string;
}

class Group implements IGroupParams {
    uid: string;

    groupName: string;

    accessUids: Array<string>;

    ownerUid: string;

    constructor(params: IGroupParams) {
        this.uid = params.uid;
        this.groupName = params.groupName;
        this.accessUids = params.accessUids ?? [];
        this.ownerUid = params.ownerUid;
    }

    toFirestore(): Record<string, any> {
        return {
            uid: this.uid,
            groupName: this.groupName,
            accessUids: this.accessUids,
            ownerUid: this.ownerUid,
        };
    }

    static fromFirestore(data: IGroupParams): Group {
        return new Group({
            uid: data.uid,
            groupName: data.groupName,
            accessUids: data.accessUids,
            ownerUid: data.ownerUid,
        });
    }
}

export type { IGroupParams };
export { Group };
