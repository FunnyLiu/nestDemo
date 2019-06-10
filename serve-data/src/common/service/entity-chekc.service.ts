import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { WarnException } from "../exceptions/warn.exception";

@Injectable()
export class EntityCheckService {
    constructor(
        @InjectEntityManager() private entityManager: EntityManager
    ){

    }

    async checkNameExist(entityClass:any, name: string){
        const exist = await this.entityManager.findOne(entityClass,{name})
        if(exist){
            throw new WarnException('Name already exists')
        }
    }
}