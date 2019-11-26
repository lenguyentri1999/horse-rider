export interface TrailReviewEnums {
    difficulty: TrailDifficulty;
    waterCrossings: TrailWaterCrossings;
    bridges: TrailBridges;
    parking: TrailParkingForRigs;
    footing: TrailFooting;
}

export enum TrailDifficulty {
    Easy = 'Easy',
    Intermediate = 'Intermediate',
    Extreme = 'Extreme'
}

export enum TrailWaterCrossings {
    Puddles = 'Puddles',
    Streams = 'Streams',
    Rivers = 'Rivers',
}

export enum TrailBridges {
    High = 'High',
    Low = 'Low',
    Scary = 'Scary'
}

export enum TrailParkingForRigs {
    Plenty = 'Plenty',
    Limited = 'Limited',
    None = 'None',
}

export enum TrailFooting {
    Carriage = 'Carriage',
    Sandy = 'Sandy',
    Muddy = 'Muddy',
    Rocky = 'Rocky',
}

