import {User} from './user';
import {Product} from './product';

export interface ReviewControl {
  _id?: string;
  user?: string | User;
  product?: string | Product;
  name?: string;
  reviewDate: string;
  review: string;
  rating: number;
  status: boolean;
  reply: string;
  replyDate: string;
}
