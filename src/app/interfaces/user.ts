export interface User {
  _id?: string;
  first_name: string;
  last_name?: string;
  email?: string;
  birthday?: Date;
  password?: string;
  confirm_password?: string;
}
