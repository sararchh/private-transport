import db from "@/db/sqlite.db";
import { notFoundDriver, invalidRides } from "@/errors/ride.error";
import { IDriver, IRideTable } from "@/ts/interfaces/ride.interface";

async function findDrivers(
  driver_id?: number
): Promise<IDriver | IDriver[] | {}> {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM drivers`;
    let params: (number | undefined)[] = [];

    if (driver_id !== undefined) {
      query += ` WHERE id = ?`;
      params.push(driver_id);
    }

    const callback = (err: Error | null, rows: IDriver[] | IDriver) => {
      if (err) {
        reject(
          notFoundDriver(
            driver_id !== undefined
              ? "Motorista não encontrado"
              : "Motoristas não encontrados"
          )
        );
      } else {
        resolve(
          driver_id !== undefined ? (rows as IDriver) : (rows as IDriver[])
        );
      }
    };

    if (driver_id !== undefined) {
      db.get(query, params, callback);
    } else {
      db.all(query, callback);
    }
  });
}

async function findRides(
  customer_id: string,
  driver_id?: number
): Promise<IRideTable | IRideTable[] | [] | {}> {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        rides.id,
        rides.origin,
        rides.destination,
        rides.distance,
        rides.duration,
        rides.value,
        rides.createdAt,
        drivers.id AS driver_id,
        drivers.name AS driver_name
      FROM rides
      JOIN drivers ON rides.driver_id = drivers.id
      WHERE rides.customer_id = ?
    `;
    let params: (string | number)[] = [customer_id];

    if (typeof driver_id === 'number' && !isNaN(driver_id)) {
      query += ` AND rides.driver_id = ?`;
      params.push(driver_id);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(invalidRides("Nenhum registro encontrado"));
      } else {
        const mappedRows = rows.map((row: any) => ({
          id: row.id,
          origin: row.origin,
          destination: row.destination,
          distance: row.distance,
          duration: row.duration,
          value: row.value,
          date: row.createdAt, 
          driver: {
            id: row.driver_id,
            name: row.driver_name,
          },
        }));
        resolve(mappedRows);
      }
    });
  });
}

async function createRide(ride: IRideTable): Promise<void> {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, value)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      ride.customer_id,
      ride.origin,
      ride.destination,
      ride.distance,
      ride.duration,
      ride.driver_id,
      ride.value,
    ];

    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const rideRepository = {
  findDrivers,
  findRides,
  createRide
};

export default rideRepository;
