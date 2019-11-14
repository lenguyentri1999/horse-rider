export interface TrailReviewEnums {
    difficulty: TrailDifficulty;
    waterCrossings: TrailWaterCrossings;
    bridges: TrailBridges;
    parking: TrailParkingForRigs;
    footing: TrailFooting;
}

export enum TrailDifficulty {
    Easy,
    Intermediate,
    Extreme
}

export enum TrailWaterCrossings {
    Puddles,
    Streams,
    Rivers
}

export enum TrailBridges {
    High,
    Low,
    Scary
}

export enum TrailParkingForRigs {
    Plenty,
    Limited,
    None,
}

export enum TrailFooting {
    Carriage,
    Sandy,
    Muddy,
    Rocky,
}

