import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi'
import * as fs from 'fs';
import { EnvConfig } from './config.interface';

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath))
        this.envConfig = this.validateInput(config)
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(80),
            API_AUTH_ENABLED: Joi.boolean().required(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }


    public getPort(): number {
        return Number(this.envConfig.PORT)
    }

    get isAPiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED)
    }
}