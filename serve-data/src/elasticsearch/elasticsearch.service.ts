import { Injectable, Inject, Logger } from "@nestjs/common";
import { Client } from '@elastic/elasticsearch'
import { ELASTICSEARCH_CLIENT } from "./elasticsearch.provider";
import { Search } from "@elastic/elasticsearch/api/requestParams";

@Injectable()
export class ElasticSearchService {
    constructor(
        @Inject(ELASTICSEARCH_CLIENT) private readonly esClient:Client
    ){
    }
    private readonly logger = new Logger(ElasticSearchService.name)

    public getClient():Client{
        return this.esClient
    }

    public async search(options:Search){
        this.logger.log(`ES search`)
        return await this.esClient.search(options)
    }

    public info(){
        this.esClient.info(console.log)
    }
}