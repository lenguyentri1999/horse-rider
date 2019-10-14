export interface TrailReviewEnums {
    moderate: TrailModerate;
    waterCrossings: TrailWaterCrossings;
    bridges: TrailBridges;
    parking: TrailParkingForRigs;
    footing: TrailFooting;
}

enum TrailModerate {
    Challenging,
    Intermediate,
    Extreme
}

enum TrailWaterCrossings {
    Puddles,
    Streams,
    Rivers
}

enum TrailBridges {
    High,
    Low,
    Scary
}

enum TrailParkingForRigs {
    Plenty = 'Plenty of parking for big & small rigs',
    Limited = 'Limited parking',
    None = 'No Big Rig Parking'
}

enum TrailFooting {
    Carriage = 'Carriage Trails',
    Sandy = 'Sandy Loamy',
    Muddy = 'Muddy',
    Rocky = 'Rocky'
}

