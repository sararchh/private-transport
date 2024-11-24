import { IGoogleResponse } from "./google-maps.interface";

export type TFormValues = {
  origin: string;
  destination: string;
  customer_id: string;
};

export type TFormValuesHistory = {
  customer_id: string;
  driver_id: string;
  driver?: { items: { id: number; name: string, value: string }[] } | any;
};

export interface IRideParams {
  driver_id?: number;
}

export interface IEstimateRide {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface IEstimate {
  origin: ILocation;
  destination: ILocation;
  distance: number;
  duration: string;
  options: IOption[];
  routeResponse: IGoogleResponse;
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

interface IRideError {
  error_code: string;
  error_description: string;
}

export interface IError {
  response: {
    data: IRideError;
  };
}

export interface IRideLocalStorage {
  step: number;
  origin?: string;
  destination?: string;
  estimate?: IEstimate;
  customer_id?: string;
}

export interface IRideBody {
  customer_id: string;
  origin: string;
  date: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
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
