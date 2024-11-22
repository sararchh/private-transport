import dotenv from 'dotenv';
dotenv.config();

import { envSchema } from '@/schemas/environment.schema';

export const environment = envSchema.parse(process.env);
