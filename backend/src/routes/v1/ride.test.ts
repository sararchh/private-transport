import request from "supertest";
import express from "express";
import rideRouter from "./ride.routes";

const app = express();
app.use(express.json());
app.use("/rides", rideRouter);

describe("Ride Routes", () => {
  it("test_estimate_ride_success", async () => {
    const response = await request(app).post("/rides/estimate").send({
      customer_id: "123",
      origin: "São Paulo, São Paulo",
      destination: "Vitória, Espirito Santo",
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      origin: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      destination: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      distance: expect.any(Number),
      duration: expect.any(String),
      options: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          vehicle: expect.any(String),
          review: expect.objectContaining({
            rating: expect.any(Number),
            comment: expect.any(String),
          }),
          value: expect.any(Number),
        }),
      ]),
      routeResponse: expect.objectContaining({
        routes: expect.arrayContaining([
          expect.objectContaining({
            legs: expect.arrayContaining([
              expect.objectContaining({
                startLocation: expect.objectContaining({
                  latLng: expect.objectContaining({
                    latitude: expect.any(Number),
                    longitude: expect.any(Number),
                  }),
                }),
                endLocation: expect.objectContaining({
                  latLng: expect.objectContaining({
                    latitude: expect.any(Number),
                    longitude: expect.any(Number),
                  }),
                }),
              }),
            ]),
            distanceMeters: expect.any(Number),
            duration: expect.any(String),
          }),
        ]),
      }),
    });
  });

  it("test_confirm_ride_invalid_origin_destination", async () => {
    const response = await request(app)
      .patch("/rides/confirm")
      .send({
        customer_id: "123",
        origin: "Point A",
        destination: "Point A",
        distance: 10,
        duration: "316s",
        driver: { id: 1, name: "Driver A" },
        value: 100,
      });

    expect(response.status).toBe(422);
  });

  it("test_confirm_ride_success", async () => {
    const response = await request(app)
      .patch("/rides/confirm")
      .send({
        customer_id: "123",
        origin: "São Paulo, São Paulo",
        destination: "Vitória, Espirito Santo",
        distance: 1000,
        duration: "3600s",
        driver: { id: 1, name: "Driver A" },
        value: 150,
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
    });
  });

  it("test_find_rides_no_rides_found", async () => {
    const response = await request(app).get("/rides/nonexistent_customer_id");

    expect(response.status).toBe(404);
  });

  it("test_find_rides_by_customer_id", async () => {
    const response = await request(app).get("/rides/123");
  
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      rides: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          origin: expect.any(String),
          destination: expect.any(String),
          distance: expect.any(Number),
          duration: expect.any(String),
          driver: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
          value: expect.any(Number),
          date: expect.any(String),
        }),
      ]),
    });
  });

  it("test_find_all_drivers", async () => {
    const response = await request(app).get("/rides/drivers/all");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          vehicle: expect.any(String),
          rating: expect.any(Number),
          comment: expect.any(String),
          value: expect.any(Number),
          min_km: expect.any(Number),
        }),
      ])
    );
  });
});
