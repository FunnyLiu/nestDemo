import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`.env.${process.env.NODE_ENV}`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule { } 