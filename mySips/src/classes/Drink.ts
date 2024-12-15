import ITag from "../interfaces/ITag";

interface DrinkRecord {
    /** Purchase day and time if applicable */
    timeStamp: string;
    quantity: number;
}
interface IDrinkParams {
    uid: string;
    /** Drink name */
    name: string;
    /** Drink description */
    description: string;
    rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    /** Drink coordinates/location */
    coordinates?: { lat: string; long: string };
    /** Store id */
    store?: { storeUid?: string; storeName?: string; storeAddress?: string };
    tags?: Record<string, ITag>;

    /** Drink groups ; to be used for group tabs */
    groups?: Array<string>;

    sugarLevel?: string;
    iceLevel?: string;

    DrinkRecordHistory?: Array<DrinkRecord>;

    dateCreated?: string;
}

class Drink implements IDrinkParams {
    uid: string;
    /** Drink name */
    name: string;
    /** Drink description */
    description: string;

    rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    /** Drink coordinates/location */
    coordinates?: { lat: string; long: string };

    /** Store id */
    store: { storeUid?: string; storeName?: string; storeAddress?: string };

    tags?: Record<string, ITag>;

    groups?: Array<string>;

    sugarLevel?: string;
    iceLevel?: string;

    dateCreated?: string;

    DrinkRecordHistory: Array<DrinkRecord>;

    constructor(params: IDrinkParams) {
        this.uid = params.uid;
        this.name = params.name;
        this.description = params.description;
        this.rating = params?.rating;
        this.coordinates = params?.coordinates;
        this.store = {
            storeUid: params?.store?.storeUid,
            storeName: params?.store?.storeName,
            storeAddress: params?.store?.storeAddress,
        };
        this.tags = params?.tags;
        this.groups = params?.groups;
        this.sugarLevel = params?.sugarLevel;
        this.iceLevel = params?.iceLevel;
        this.dateCreated = params?.dateCreated;
        this.DrinkRecordHistory = params?.DrinkRecordHistory ?? [];
    }

    toFirestore(): Record<string, any> {
        return {
            uid: this.uid,
            name: this.name,
            description: this.description,
            rating: this.rating ?? null,
            coordinates: this.coordinates ?? null,
            store: {
                storeUid: this.store.storeUid ?? null,
                storeName: this.store.storeName ?? null,
                storeAddress: this.store.storeAddress ?? null,
            },
            tags: this.tags ?? {},
            groups: this.groups ?? [],
            dateCreated: this.dateCreated ?? null,
            DrinkRecordHistory: this.DrinkRecordHistory,
        };
    }

    static fromFirestore(data: IDrinkParams): Drink {
        return new Drink({
            uid: data.uid,
            name: data.name,
            description: data.description,
            rating: data.rating,
            coordinates: data.coordinates,
            store: {
                storeUid: data.store?.storeUid,
                storeName: data.store?.storeName,
                storeAddress: data.store?.storeAddress,
            },
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
