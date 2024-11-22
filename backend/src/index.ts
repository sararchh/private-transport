import routes from "@/routes";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/configs/swagger.config";

import { environment } from "@/configs/environment.config";
import { initializeDatabase } from "@/db/sqlite.db";

const startServer = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // Configuração do Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.on("error", (error) => {
    console.error(`❌ Server error: ${error}`);
  });

  process.on("unhandledRejection", (error) => {
    console.error(`❌ Unhandled rejection: ${error}`);
  });

  process.on("uncaughtException", (error) => {
    console.error(`❌ Uncaught exception: ${error}`);
  });

  await initializeDatabase();
  app.use(routes);

  app.listen(environment.PORT, () => {
    console.log(`🚀 Server running on PORT ${environment.PORT}`);
  });
};

startServer();
