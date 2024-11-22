import { Router, Request, Response } from "express";
import rideRoutes from "./v1/ride.routes";

const router = Router();

router.get("/", (_req: Request, res: Response) =>
  res.send("Server running success! 🟢 🚀")
);

router.use("/ride", rideRoutes);

export default router;