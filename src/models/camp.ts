export interface Camp {
    id: string;
    name: string;
    address: string;
    description: string;
    url?: string;
    attributes: {
        // Camp attributes
        bigRigFriendly?: boolean,
        petFriendly?: boolean,
        wifi?: boolean,
        // Trail attributes
        difficulty?: string;
        waterCrossings?: string;
        parking?: string;
        footing?: string;
        bridges?: string;
    };
    coords?: {
        lat: number;
        long: number;
    };
    pictures?: Array<string>;
    distance?: number;
    city?: string;
    state?: string;
}
