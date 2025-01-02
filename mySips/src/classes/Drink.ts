import ITag from "../interfaces/ITag";

interface DrinkRecord {
    /** Purchase day and time if applicable */
    date: string;
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
    // groups?: Record<string, { groupUid: string; userUid: string }>;

    sugarLevel?: 0 | 25 | 50 | 75 | 100;
    iceLevel?: 0 | 25 | 50 | 75 | 100;

    drinkRecordHistory?: Record<string, DrinkRecord>;

    dateCreated?: string;

    drinkPrice?: string;
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

    // groups?: Record<string, { groupUid: string; userUid: string }>;

    sugarLevel: 0 | 25 | 50 | 75 | 100;
    iceLevel: 0 | 25 | 50 | 75 | 100;

    dateCreated?: string;

    drinkRecordHistory: Record<string, DrinkRecord>;

    drinkPrice: string;

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
        // this.groups = params?.groups;
        this.sugarLevel = params?.sugarLevel ?? 50;
        this.iceLevel = params?.iceLevel ?? 50;
        this.dateCreated = params?.dateCreated;
        this.drinkRecordHistory = params?.drinkRecordHistory ?? {};

        this.drinkPrice = params?.drinkPrice ?? "0.00";
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
            // groups: this.groups ?? [],
            dateCreated: this.dateCreated ?? null,
            drinkRecordHistory: this.drinkRecordHistory,
            sugarLevel: this.sugarLevel ?? 50,
            iceLevel: this.iceLevel ?? 50,
            drinkPrice: this.drinkPrice,
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
            // groups: data.groups,
            dateCreated: data.dateCreated,
            drinkRecordHistory: data.drinkRecordHistory,
            sugarLevel: data.sugarLevel,
            iceLevel: data.iceLevel,
            drinkPrice: data.drinkPrice,
        });
    }
}

export { Drink };
export type { IDrinkParams };
