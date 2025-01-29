import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class AuthServerConfig {
  public static readonly SECRET: string = env
    .get('JWT_SECRET')
    .required()
    .asString();

  public static readonly PRIVATE_KEY: string = env
    .get('JWT_PRIVATE_KEY')
    .required()
    .asString();

  public static readonly PUBLIC_KEY: string = env
    .get('JWT_PUBLIC_KEY')
    .required()
    .asString();
}
