import rideRepository from "@/repositories/ride.repository";
import {
  IEstimateRide,
  IOption,
  IRideBody,
  ICustomerRides,
  IEstimate,
} from "@/ts/interfaces/ride.interface";
import { IGoogleResponse } from "@/ts/interfaces/google-maps.interface";
import googleMapsService from "@/services/google-maps.service";
import { IDriver } from "@/ts/interfaces/ride.interface";
import {
  invalidDistance,
  invalidDriver,
  noRidesFound,
  notFoundDriver,
} from "@/errors/ride.error";

async function estimate(estimateRide: IEstimateRide): Promise<IEstimate> {
  const { customer_id, origin, destination } = estimateRide;

  const routeResponse: IGoogleResponse = await googleMapsService.getRoute({
    origin: { address: origin },
    destination: { address: destination },
  });

  const distanceMeters = routeResponse.routes[0].distanceMeters;
  const distanceKilometers = distanceMeters / 1000;
  const duration = routeResponse.routes[0].duration;

  const drivers = (await rideRepository.findDrivers()) as IDriver[];

  if (!drivers || (Array.isArray(drivers) && drivers.length === 0)) {
    throw notFoundDriver("Motoristas não encontrados");
  }
  const filteredDrivers: IOption[] = [];

  for (const driver of drivers) {
    if (distanceKilometers >= driver.min_km) {
      filteredDrivers.push({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
        value: distanceKilometers * driver.value,
      });
    }
  }

  filteredDrivers.sort((a, b) => a.value - b.value);

  return {
    origin: routeResponse.routes[0].legs[0].startLocation.latLng,
    destination: routeResponse.routes[0].legs[0].endLocation.latLng,
    distance: distanceMeters,
    duration,
    options: filteredDrivers,
    routeResponse,
  };
}

async function confirm(rideBody: IRideBody): Promise<boolean> {
  const {
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  } = rideBody;

  const driverExists = (await rideRepository.findDrivers(driver.id)) as IDriver;

  if (!driverExists) {
    throw notFoundDriver("Motorista não encontrado");
  }

  if (distance / 1000 < driverExists.min_km) {
    throw invalidDistance("Quilometragem inválida para o motorista");
  }

  await rideRepository.createRide({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver_id: driver.id,
    value,
  });

  return true;
}

async function find(
  customer_id: string,
  driver_id: number
): Promise<ICustomerRides> {
  if (driver_id) {
    const driverExists = (await rideRepository.findDrivers(
      driver_id
    )) as IDriver;

    if (!driverExists) {
      throw invalidDriver("Motorista invalido");
    }
  }

  const rides = await rideRepository.findRides(customer_id, driver_id);

  if (!rides || (Array.isArray(rides) && rides.length === 0)) {
    throw noRidesFound("Nenhum registro encontrado");
  }

  return {
    customer_id,
    rides: Array.isArray(rides) ? rides : [rides],
  };
}

const rideService = {
  estimate,
  confirm,
  find,
};

export default rideService;
