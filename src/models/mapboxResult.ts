export interface MapboxResult {
    features: MapboxPlace[];
}

export interface MapboxPlace {
    type: 'Feature';
    place_name: string;
    geometry: {
        type: 'Point';
        coordinates: number[]
    };
    properties: {
        title: string;
        description: string;
        id: string;
    };
    context?: [MapboxContext];
}

export interface MapboxContext {
    id: string;
    text: string;
}
