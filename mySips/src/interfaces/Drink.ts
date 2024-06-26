import ITag from "./ITag";

interface IDrinkParams {
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
}

class Drink implements IDrinkParams {

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

  constructor(params: IDrinkParams) 
  {
    this.uuid = params.uuid;
    this.name = params.name;
    this.description = params.description;
    this.rating = params?.rating;
    this.coordinates = params?.coordinates;
    this.storeUuid = params?.storeUuid;
    this.tags = params?.tags;
  }
}

export { Drink };
export type { IDrinkParams };
