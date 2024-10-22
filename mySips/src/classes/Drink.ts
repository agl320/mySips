import ITag from "../interfaces/ITag";

interface DrinkRecord {
    /** Purchase day and time if applicable */
    timeStamp: string;
    quantity: number;
}
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
    tags?: Record<string, ITag>;

    /** Drink groups ; to be used for group tabs */
    groups?: Array<string>;

    sugarLevel?: string;
    iceLevel?: string;

    DrinkRecordHistory?: Array<DrinkRecord>;

    dateCreated?: string;
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
    tags?: Record<string, ITag>;

    groups?: Array<string>;

    sugarLevel?: string;
    iceLevel?: string;

    dateCreated?: string;

    DrinkRecordHistory: Array<DrinkRecord>;

    constructor(params: IDrinkParams) {
        this.uuid = params.uuid;
        this.name = params.name;
        this.description = params.description;
        this.rating = params?.rating;
        this.coordinates = params?.coordinates;
        this.storeUuid = params?.storeUuid;
        this.tags = params?.tags;
        this.groups = params?.groups;
        this.sugarLevel = params?.sugarLevel;
        this.iceLevel = params?.iceLevel;
        this.dateCreated = params?.dateCreated;
        this.DrinkRecordHistory = params?.DrinkRecordHistory ?? [];
    }

    toFirestore(): Record<string, any> {
        return {
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            rating: this.rating ?? null,
            coordinates: this.coordinates ?? null,
            address: this.address ?? null,
            storeUuid: this.storeUuid ?? null,
            tags: this.tags ?? {},
            groups: this.groups ?? [],
            dateCreated: this.dateCreated ?? null,
            DrinkRecordHistory: this.DrinkRecordHistory,
        };
    }

    static fromFirestore(data: IDrinkParams): Drink {
        return new Drink({
            uuid: data.uuid,
            name: data.name,
            description: data.description,
            rating: data.rating,
            coordinates: data.coordinates,
            address: data.address,
            storeUuid: data.storeUuid,
            tags: data.tags,
            groups: data.groups,
            dateCreated: data.dateCreated,
            DrinkRecordHistory: data.DrinkRecordHistory,
        });
    }

    addDrinkRecord(timeStamp: any, quantity: number) {
        this.DrinkRecordHistory.push({ timeStamp, quantity });
    }
}

export { Drink };
export type { IDrinkParams };
