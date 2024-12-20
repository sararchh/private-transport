import { z } from "zod";

export const envSchema = z.object({
  ENV: z.enum(["development", "tests", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  GOOGLE_API_KEY: z.string(),
});
