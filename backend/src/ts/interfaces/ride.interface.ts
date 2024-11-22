import { IGoogleResponse } from "./google-maps.interface";

export interface IEstimateRide {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IReview {
  rating: number;
  comment: string;
}

export interface IOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: IReview;
  value: number;
}

export interface IEstimate {
  origin: ILocation;
  destination: ILocation;
  distance: number;
  duration: string;
  options: IOption[];
  routeResponse: IGoogleResponse;
}

export interface IRide {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
}

export interface ICustomerRides {
  customer_id: string;
  rides: IRide[];
}

export interface IRideBody {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
}

export interface IRideTable {
  id?: number;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver_id: number;
  value: number;
  createdAt?: string;
}

export interface IDriver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
  min_km: number;
}
