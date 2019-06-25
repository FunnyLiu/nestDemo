import { Module, DynamicModule, Provider } from "@nestjs/common";
import { ElasticsearchModuleOptions, ElasticsearchModuleAsyncOptions, ElasticsearchOptionsFactory } from "./elasticsearch.interface";
import { createElasticSearchClient } from "./elasticsearch.provider";
import { ELASTICSEARCH_MODULE_OPTIONS } from "./elasticsearch.constants";
import { ElasticSearchService } from "./elasticsearch.service";
import { ConfigService } from "@/config/config.service";

@Module({
    providers: [ElasticSearchService],
    exports: [ElasticSearchService]
})
export class ElasticSearchModule {
    /**
     * Synchronous registration method
     * @param {ElasticsearchModuleOptions} options 
     */
    static register(options: ElasticsearchModuleOptions): DynamicModule {
        return {
            module: ElasticSearchModule,
            providers: [
                createElasticSearchClient(),
                { provide: ELASTICSEARCH_MODULE_OPTIONS, useValue: options }
            ]
        }
    }
    /**
     * Asynchronous registration method,
     * sometimes you want to use config,
     * so you have to register this module async
     * @param {ElasticsearchModuleOptions} options 
     */
    static registerAsync(options: ElasticsearchModuleAsyncOptions): DynamicModule {
        return {
            module: ElasticSearchModule,
            imports: options.imports || [],
            providers: [
                createElasticSearchClient(),
                ...this.createAsyncProviders(options)
            ]
        };
    }


    private static createAsyncProviders(
        options: ElasticsearchModuleAsyncOptions
    ): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }

    private static createAsyncOptionsProvider(
        options: ElasticsearchModuleAsyncOptions
    ): Provider {
        if (options.useFactory) {
            return {
                provide: ELASTICSEARCH_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: ELASTICSEARCH_MODULE_OPTIONS,
            useFactory: async (optionsFactory: ElasticsearchOptionsFactory) =>
                await optionsFactory.createElasticsearchOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
}