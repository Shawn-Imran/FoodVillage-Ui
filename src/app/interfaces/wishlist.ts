import {Product} from './product';

export interface Wishlist {
  _id: string;
  product: Product;
}

export interface WishlistSchema {
  _id?: string;
  product: string;
  userId?: string;
}
