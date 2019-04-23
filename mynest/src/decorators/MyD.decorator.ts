import { createParamDecorator } from '@nestjs/common';
import {Request} from 'express'

export const MyD = createParamDecorator((data:string, req:Request) => {
  return `${data}: ${req.originalUrl}`;
});

export default {
    MyD
}