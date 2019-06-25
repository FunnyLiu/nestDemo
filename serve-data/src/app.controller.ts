import { Get, Controller } from '@nestjs/common';
// import { ElasticSearchService } from './elasticsearch/elasticsearch.service';

@Controller('api')
export class AppController {

  constructor(
    // private readonly esService:ElasticSearchService
  ){
    // console.log(this.esService.getClient())
    // this.esService.info()
  }
  @Get()
  root(): string {
    return 'Hello World!';
  }
}