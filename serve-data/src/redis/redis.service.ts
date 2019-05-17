import { Injectable, Logger } from "@nestjs/common";
import * as redis from 'redis';
import { promisify } from "util";

@Injectable()
export class RedisService {
    constructor(
    ){
        this.initRedis()
    }
    private client:redis.RedisClient = redis.createClient()
    private readonly logger = new Logger(RedisService.name)

    private initRedis() {
        this.logger.log('Redis connecting...')
        this.client.on('error',this.onError.bind(this))
        this.client.on('ready',this.onReady.bind(this))
        this.client.on('reconnection',this.onReconnection.bind(this))

    }

    private onReady() {
        this.logger.log(`Redis connect success`)
    }

    private onError(err:redis.RedisError) {
        this.logger.error(`Redis connect failed`)
        this.logger.error(`error info: ${JSON.stringify(err)}`)
    }

    private onReconnection() {
        this.logger.warn(`Redis is reconnecting...`)
    }

    public async get(key:string) {
        this.logger.log(`Redis get Key: ${key}`)
        const getAsync = promisify(this.client.get).bind(this.client)

        return await getAsync(key)
    }

    public set(key:string,value:any ){
        this.logger.log(`Redis set Key: ${key}`)
        return this.client.set(key, value)
    }

    public async del(key:string){
        this.logger.log(`Redis del Key: ${key}`)
        const delAsync = promisify(this.client.del).bind(this.client)

        return await delAsync(key)
    }
}
