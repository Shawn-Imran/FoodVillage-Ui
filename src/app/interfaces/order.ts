import {User} from './user';
import {Product} from './product';

export interface OrderItem {
  product: string | Product;
  deletedProduct?: any;
  deleteDeliveryStatus?: string;
  price: number;
  discountType: number;
  discountAmount?: number;
  quantity: number;
  orderType: string;
}


export interface Order {
  _id?: string;
  orderId?: string;
  checkoutDate: Date;
  deliveryDate?: Date;
  deliveryStatus: number;
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  totalAmountWithDiscount: number;
  deletedProduct: boolean;
  refundAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  user?: string | User;
  name: string;
  phoneNo: string;
  email: string;
  alternativePhoneNo?: string;
  city: string;
  area: string;
  postCode: string;
  shippingAddress: string;
  couponId?: string | any;
  couponValue?: number;
  orderTimeline?: OrderTimeline;
  hasPreorderItem?: boolean;
  orderedItems: OrderItem[];
  orderNotes?: string;
  sessionkey?: string;
  smsTemp?: object;
  select?: boolean;
}

export interface OrderTimeline {
  others: boolean;
  othersData: Date;
  orderPlaced: boolean;
  orderPlacedDate: Date;
  orderProcessing: boolean;
  orderProcessingDate: Date;
  orderPickedByDeliveryMan: boolean;
  orderPickedByDeliveryManDate: Date;
  orderDelivered: boolean;
  orderDeliveredDate: Date;
}

/*




 */
