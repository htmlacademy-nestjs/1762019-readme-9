import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface BffConfig {
  userServiceUrl: string;
  blogServiceUrl: string;
  httpClientMaxRedirects: number;
  httpClientTimeout: number;
  environment: string;
  port: number;
}

const validationSchema = Joi.object<BffConfig>({
  userServiceUrl: Joi.string().required(),
  blogServiceUrl: Joi.string().required(),
  httpClientMaxRedirects: Joi.number().required(),
  httpClientTimeout: Joi.number().required(),
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: BffConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): BffConfig {
  const config: BffConfig = {
    userServiceUrl: process.env.USER_SERVICE_URL!,
    blogServiceUrl: process.env.BLOG_SERVICE_URL!,
    httpClientMaxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS!),
    httpClientTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT!),
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

const bffConfig = registerAs('bff', getConfig);

export { bffConfig };
