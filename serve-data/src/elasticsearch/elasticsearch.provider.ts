import { Client } from '@elastic/elasticsearch'
import { ElasticsearchModuleOptions } from './elasticsearch.interface';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elasticsearch.constants';


export const ELASTICSEARCH_CLIENT = 'ELASTICSEARCH_CLIENT';


export const createElasticSearchClient = () => ({
    provide: ELASTICSEARCH_CLIENT,
    useFactory: (options: ElasticsearchModuleOptions) => {
        return new Client(options);
    },
    inject: [ELASTICSEARCH_MODULE_OPTIONS]
})

