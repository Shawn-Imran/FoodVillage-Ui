
export interface SslInitResponse {
  status: string;
  failedreason: string;
  sessionkey: string;
  gw: Gw;
  redirectGatewayURL: string;
  directPaymentURLBank: string;
  directPaymentURLCard: string;
  directPaymentURL: string;
  redirectGatewayURLFailed: string;
  GatewayPageURL: string;
  storeBanner: string;
  storeLogo: string;
  store_name: string;
  desc: Desc[];
  is_direct_pay_enable: string;
}

export interface Gw {
  visa: string;
  master: string;
  amex: string;
  othercards: string;
  internetbanking: string;
  mobilebanking: string;
}

export interface Desc {
  name: string;
  type: string;
  logo: string;
  gw: string;
  r_flag: string;
  redirectGatewayURL: string;
}
