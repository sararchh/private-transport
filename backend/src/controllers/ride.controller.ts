import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import rideService from "@/services/ride.service";
import { invalidDataError } from "@/errors/ride.error";

const estimate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { customer_id, origin, destination } = req.body;

    const data = await rideService.estimate({
      customer_id,
      origin,
      destination,
    });

    return res.status(StatusCodes.OK).send(data);
  } catch (error) {
    if (error.error_code === "INVALID_DATA") {
      return res.status(StatusCodes.BAD_REQUEST).send(error);
    }

    if (error.error_code === "DRIVER_NOT_FOUND") {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        invalidDataError(
          "Os dados fornecidos no corpo da requisição são inválidos"
        )
      );
  }
};

const confirm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;

    await rideService.confirm({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    });

    return res.status(StatusCodes.OK).send({
      success: true,
    });
  } catch (error) {
    if (error.error_code === "INVALID_DATA") {
      return res.status(StatusCodes.BAD_REQUEST).send(error);
    }

    if (error.error_code === "DRIVER_NOT_FOUND") {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    if (error.error_code === "INVALID_DISTANCE") {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        invalidDataError(
          "Os dados fornecidos no corpo da requisição são inválidos"
        )
      );
  }
};

const find = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    const data = await rideService.find(customer_id, Number(driver_id));

    return res.status(StatusCodes.OK).send(data);
  } catch (error) {
    if (error.error_code === "INVALID_DRIVER") {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    if (error.error_code === "NO_RIDES_FOUND") {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        invalidDataError(
          "Os dados fornecidos no corpo da requisição são inválidos"
        )
      );
  }
};

const findAllDrivers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await rideService.findAllDrivers();

    return res.status(StatusCodes.OK).send(data);
  } catch (error) {
    if (error.error_code === "DRIVER_NOT_FOUND") {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        invalidDataError(
          "Os dados fornecidos no corpo da requisição são inválidos"
        )
      );
  }
}

const rideController = {
  estimate,
  confirm,
  find,
  findAllDrivers
};

export default rideController;
