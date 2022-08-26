
import {Product} from './product';


export interface Cart {
  _id?: string;
  product: Product | string;
  selectedQty: number;
  user?: string;
}
