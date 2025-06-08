import { registerAs } from '@nestjs/config';
import Joi from 'joi';

interface BffConfig {
  userServiceUrl: string;
  blogServiceUrl: string;
  httpClientMaxRedirects: number;
  httpClientTimeout: number;
}

const validationSchema = Joi.object<BffConfig>({
  userServiceUrl: Joi.string().required(),
  blogServiceUrl: Joi.string().required(),
  httpClientMaxRedirects: Joi.number().required(),
  httpClientTimeout: Joi.number().required(),
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
  };

  validateConfig(config);
  return config;
}

const bffConfig = registerAs('bff', getConfig);

export type { BffConfig };
export { bffConfig };
