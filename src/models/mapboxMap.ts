import { MapboxPlace } from './mapboxResult';

export interface MapboxSource {
    setData(data: MapboxSourceOptions['data']);
}

export interface MapboxSourceOptions {
    type: 'geojson';
    data: {
        type: 'FeatureCollection';
        features: MapboxPlace[];
    };
}

export interface MapboxMap {
  setCenter(center: number[]);
  getCenter(): number[];
  addLayer(layer: any);
  addSource(source: string, options: MapboxSourceOptions);
  getSource(source: string): MapboxSource;
  setZoom(level: number);
  on(event: string, action: any);
  resize();
}

export interface MapboxMapOptions {
  container?: string | HTMLElement;
  style?: string;
  center?: number[];
  zoom?: number;
}
