import { ModuleMetadata } from '@nestjs/common/interfaces';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { OverrideBy } from './interfaces';
import { TestingModule } from './testing-module';
export declare class TestingModuleBuilder {
    private readonly applicationConfig;
    private readonly container;
    private readonly overloadsMap;
    private readonly scanner;
    private readonly instanceLoader;
    private readonly module;
    constructor(metadataScanner: MetadataScanner, metadata: ModuleMetadata);
    overridePipe<T = any>(typeOrToken: T): OverrideBy;
    overrideFilter<T = any>(typeOrToken: T): OverrideBy;
    overrideGuard<T = any>(typeOrToken: T): OverrideBy;
    overrideInterceptor<T = any>(typeOrToken: T): OverrideBy;
    overrideProvider<T = any>(typeOrToken: T): OverrideBy;
    compile(): Promise<TestingModule>;
    private override;
    private createOverrideByBuilder;
    private applyOverloadsMap;
    private getRootModule;
    private createModule;
    private applyLogger;
}
