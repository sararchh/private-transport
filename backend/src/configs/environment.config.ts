import dotenv from 'dotenv';
dotenv.config();

import { envSchema } from '@/schemas/environment.schema';

process.env.TZ = 'America/Sao_Paulo';

export const environment = envSchema.parse(process.env);
