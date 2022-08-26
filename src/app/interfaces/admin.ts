import {AdminRole} from './admin-role';

export interface Admin {
  readOnly?: boolean;
  _id?: string;
  name: string;
  profileImg?: string;
  email?: string;
  username: string;
  phoneNo: string;
  role: string | AdminRole;
  hasAccess: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
