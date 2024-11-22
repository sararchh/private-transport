export function invalidDataError(details: string) {
  return {
    error_code: "INVALID_DATA",
    error_description: details,
  };
}

export function notFoundDriver(details: string) {
  return {
    error_code: "DRIVER_NOT_FOUND",
    error_description: details,
  };
}

export function invalidRides(details: string) {
  return {
    error_code: "INVALID_RIDES",
    error_description: details,
  };
}

export function invalidDriver(details: string) {
  return {
    error_code: "INVALID_DRIVER",
    error_description: details,
  };
}

export function noRidesFound(details: string) {
  return {
    error_code: "NO_RIDES_FOUND",
    error_description: details,
  };
}

export function invalidDistance(details: string) {
  return {
    error_code: "INVALID_DISTANCE",
    error_description: details,
  };
}



