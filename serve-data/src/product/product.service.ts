import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slug from 'unique-slug'
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
    const { name } = productData
    if(!productData || !productData.name) {
      throw new HttpException('name not provided', HttpStatus.BAD_REQUEST)
    }

    //check unique of product.slug and name
    const slug = this.slugify(name)
    const qb = await getRepository(ProductEntity)
      .createQueryBuilder('product')
      .where('product.slug = :slug', { slug })
      .orWhere('product.name = :name', { name })
    const productOne = await qb.getOne()
    if (productOne) {
      const errors = { name: 'name must be unique.' };
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    }

    product = Object.assign(_.pick(productData, ['name', 'description']))
    product.slug = this.slugify(productData.name)

    const newProduct = await this.productRepository.save(product)

    return newProduct
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.productRepository.delete({ slug: slug })
  }

  slugify(str: string) {
    return slug(str)
  }
}
