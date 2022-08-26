export interface Product {
  discountType: import("f:/Web_Project/SoftLab/foodVillage/foodVillage/src/app/enum/discount-type.enum").DiscountTypeEnum;
  discountAmount: number;
  _id: any,
  name: string,
  size: string,
  price: number,
  images: string[];
  quantity: number;
  productSlug: string;
}
