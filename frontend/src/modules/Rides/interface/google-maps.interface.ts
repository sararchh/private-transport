export interface IGoogleResponse {
  routes: Array<{
    legs: Array<{
      startLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
      endLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
    }>;
    distanceMeters: number;
    duration: string;
  }>;
}