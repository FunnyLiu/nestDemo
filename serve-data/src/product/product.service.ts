import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { ProductEntity } from './product.entity';

import {ProductRO, ProductsRO } from './product.interface';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(query): Promise<ProductsRO> {

    const qb = await getRepository(ProductEntity)
      .createQueryBuilder('product')

    qb.where("1 = 1");

    if ('name' in query) {
      qb.andWhere("product.name LIKE :name", { tag: `%${query.name}%` });
    }


    qb.orderBy('product.created', 'DESC');

    const productsCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const products = await qb.getMany();

    return {products, productsCount};
  }

  async create(productData: CreateProjectDto): Promise<ProductEntity> {
    let product = new ProductEntity()
    product = Object.assign(_.pick(productData, ['name', 'description']))

    const newProduct = await this.productRepository.save(product)

    return newProduct
  }
}
