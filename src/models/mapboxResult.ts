export interface MapboxResult {
    features: MapboxPlace[];
}

export interface MapboxPlace {
    place_name: string;
    geometry: {
        coordinates: number[]
    };
}
