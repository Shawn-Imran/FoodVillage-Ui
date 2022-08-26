export interface Address {
  _id?: string;
  addressType: number;
  name: string;
  phoneNo: string;
  email: string;
  alternativePhoneNo?: string;
  city: string;
  area: string;
  zone?: string;
  postCode: string;
  shippingAddress: string;
}
