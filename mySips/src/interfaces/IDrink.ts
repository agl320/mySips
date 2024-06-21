import ITag from "./ITag";

interface IDrink {
  uuid: string;
  /** Drink name */
  name: string;
  /** Drink description */
  description: string;
  rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /** Drink coordinates/location */
  coordinates?: { lat: string; long: string };
  address?: string;
  /** Store id */
  storeUuid?: string;
  tags?: Record<string,ITag>;
  menuCategory?: string;
}

export type { IDrink };
