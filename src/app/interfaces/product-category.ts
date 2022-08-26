import {ProductAttribute} from './product-attribute';

export interface ProductCategory {
  readOnly?: boolean;
  _id?: string;
  categoryName: string;
  categorySlug: string;
  priority?: number;
  attributes: string[] | ProductAttribute[];
  image: string;
}
