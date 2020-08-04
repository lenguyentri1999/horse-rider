import { MapboxPlace } from './mapboxResult';

export interface MapboxSource {
  getClusterExpansionZoom(clusterId: any, arg1: (err: any, zoom: any) => void);
    setData(data: MapboxSourceOptions['data']);
}

export interface MapboxSourceOptions {
    type: 'geojson';
    data: {
        type: 'FeatureCollection';
        features: MapboxPlace[];
    };
    cluster?: boolean;
    clusterRadius?: number;
    clusterMaxZoom?: number;
}

export interface MapboxMap {
  getCanvas();
  easeTo(arg0: { center: any; zoom: any; });
  setCenter(center: number[]);
  getCenter(): number[];
  addLayer(layer: any);
  addSource(source: string, options: MapboxSourceOptions);
  getSource(source: string): MapboxSource;
  setZoom(level: number);
  on(event: string, action: any);
  on(event1: string, event2: string, action: any);
  queryRenderedFeatures(point: any, layers: any);
  resize();
}

export interface MapboxMapOptions {
  container?: string | HTMLElement;
  style?: string;
  center?: number[];
  zoom?: number;
}
