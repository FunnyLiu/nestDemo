import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmHealthIndicator, TerminusModuleOptions, TerminusModule } from '@nestjs/terminus';

const getTerminusOptions = (
    db: any,
  ): TerminusModuleOptions => ({
    endpoints: [
      {
        // The health check will be available with /health
        url: '/health',
        // All the indicator which will be checked when requesting /health
        healthIndicators: [
          // Set the timeout for a response to 300ms
          async () => db.pingCheck('database', { timeout: 300 })
        ],
      },
    ],
  });


@Module({
  imports:[
    TypeOrmModule.forRoot(),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: db => getTerminusOptions(db)
    })
  ]
})
export class HealthModule {}