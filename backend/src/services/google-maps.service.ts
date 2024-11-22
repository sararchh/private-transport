import { environment } from "@/configs/environment.config";
import {
  IGoogleConfig,
  IGoogleResponse,
} from "@/ts/interfaces/google-maps.interface";

async function getRoute(params: IGoogleConfig): Promise<IGoogleResponse> {
  const apiKey = environment.GOOGLE_API_KEY;

  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
  const data = {
    ...params,
    travelMode: "DRIVE",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }

  const result = await response.json();
  return result;
}

const googleMapsService = {
  getRoute,
};

export default googleMapsService;
