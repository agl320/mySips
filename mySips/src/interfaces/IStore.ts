import { IMenu } from "./IMenu";

interface IStore {
    uid: string;
    storeName: string;
    storeAddress?: string;
    storeMenu: IMenu;
}

export type { IStore };
