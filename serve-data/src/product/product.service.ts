import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slug from 'unique-slug'
import * as _ from 'lodash';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { ProductEntity } from './product.entity';

import {ProductRO, ProductsRO } from './product.interface';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ErrorException } from '../common/exceptions/error.execption';

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
      qb.andWhere("product.name LIKE :name", { name: `%${query.name}%` });
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
  
  async create(productData: CreateProductDto): Promise<ProductEntity> {
    let product = new ProductEntity()
    const { name } = productData
    // if(!productData || !productData.name) {
    //   throw new HttpException('name not provided', HttpStatus.BAD_REQUEST)
    // }

    //check unique of product.slug and name
    const slug = this.slugify(name)
    const qb = await getRepository(ProductEntity)
      .createQueryBuilder('product')
      .where('product.slug = :slug', { slug })
      .orWhere('product.name = :name', { name })
    const productOne = await qb.getOne()
    if (productOne) {
      // throw new HttpException( 'name must be unique', HttpStatus.BAD_REQUEST);
      throw new ErrorException('name must be unique');
    }

    product = Object.assign(_.pick(productData, ['name', 'description']))
    product.slug = this.slugify(productData.name)

    const newProduct = await this.productRepository.save(product)

    return newProduct
  }

  async update(slug: string, productData: UpdateProductDto): Promise<ProductRO> {
    const toUpdate = await this.productRepository.findOne({ slug })
    const updated = Object.assign(toUpdate, productData)
    const product = await this.productRepository.save(updated)
    return { product }
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.productRepository.delete({ slug: slug })
  }

  slugify(str: string) {
    return slug(str)
  }
}
