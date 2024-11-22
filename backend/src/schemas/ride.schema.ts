import { query } from "express";
import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
});

export const driverSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const postRideSchema = z.object({
  body: z
    .object({
      customer_id: z.string(),
      origin: z.string(),
      destination: z.string(),
    })
    .refine((data) => data.origin !== data.destination, {
      message: "Origin cannot be the same as destination",
      path: ["destination"],
    }),
});

export const rideConfirmSchema = z.object({
  body: z
    .object({
      customer_id: z.string(),
      origin: z.string(),
      destination: z.string(),
      distance: z.number(),
      duration: z.string(),
      driver: driverSchema,
      value: z.number(),
    })
    .refine((data) => data.origin !== data.destination, {
      message: "Origin cannot be the same as destination",
      path: ["destination"],
    }),
});

export const rideFindSchema = z.object({
  params: z.object({
    customer_id: z.string(),
  }),
  query: z.object({
    driver_id: z.string().optional(),
  }),
});
