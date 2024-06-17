interface IDrink {
  uuid: string;
  /** Drink name */
  name: string;
  /** Drink description */
  description: string;
  rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /** Drink coordinates/location */
  coordinates?: { lat: string; long: string };
  /** Store id */
  storeUuid?: string;
  tags?: Array<string>;
}

export type { IDrink };
