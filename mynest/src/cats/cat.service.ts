import {Cat} from './interfaces/cat.interface'
import { Injectable } from '@nestjs/common';



//define a service based on interface Cat
@Injectable()
export class CatsService{
    private readonly cats:Cat[]=[];

    create(cat:Cat){
        this.cats.push(cat) 
    }
    findAll():Cat[]{
        return this.cats;
    }
}