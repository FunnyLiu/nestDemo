import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsRO, ProductRO } from './product.interface';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('products')
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ title: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.'})
  @Get()
  async findAll(@Query() query): Promise<ProductsRO> {
    return await this.productService.findAll(query);
  }
}