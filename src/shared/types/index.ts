export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocationPermission {
  granted: boolean;
  denied: boolean;
  loading: boolean;
  error: string | null;
}
