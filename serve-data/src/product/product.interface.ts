import { ProductEntity } from './product.entity';

interface ProductData {
  name: string;
  description: string;
  createdAt?: Date
  updatedAt?: Date
}


export interface ProductRO {
  product: ProductEntity;
}

export interface ProductsRO {
  products: ProductEntity[];
  productsCount: number;
}

