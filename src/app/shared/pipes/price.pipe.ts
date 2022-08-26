import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../interfaces/product';
import {DiscountTypeEnum} from '../../enum/discount-type.enum';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(product: Product, type: string, quantity?: number): number {

    if (product) {
      switch (type) {
        case 'priceWithDiscount': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            const disPrice = (product?.discountAmount / 100) * product?.price;
            if (quantity) {
              return Math.floor((product?.price - disPrice) * quantity);
            }
            return Math.floor(product?.price - disPrice);
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return Math.floor((product?.price - product.discountAmount) * quantity);
            }
            return Math.floor(product?.price - product.discountAmount);
          } else {
            if (quantity) {
              return Math.floor((product?.price) * quantity);
            }
            return Math.floor(product?.price);
          }
        }
        case 'discountPrice': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return ((product?.discountAmount / 100) * product?.price) * quantity;
            }
            return (product?.discountAmount / 100) * product?.price;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return product?.discountAmount * quantity;
            }
            return product?.discountAmount;
          } else {
            return 0;
          }
        }
        case 'discountPercentage': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return product?.discountAmount;
            }
            return product?.discountAmount;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return Math.round((product?.discountAmount / product?.price) * 100);
            }
            return Math.round((product?.discountAmount / product?.price) * 100);
          } else {
            return 0;
          }
        }
        default: {
          return product?.price;
        }
      }
    } else {
      return 0;
    }

  }

}
