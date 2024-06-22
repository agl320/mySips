import { IMenu } from "./IMenu";

interface IStore {
  uuid: string;
  storeName: string;
  storeAddress?: string;
  storeMenu: IMenu;
}

export type { IStore };
