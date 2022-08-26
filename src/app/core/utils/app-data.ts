import { AdminRoleEnum } from "src/app/enum/admin-role.enum";
import { Select } from "src/app/interfaces/select";



export const ADMIN_ROLES: Select[] = [
  {value: AdminRoleEnum.SUPER_ADMIN, viewValue: 'Super Admin'},
  {value: AdminRoleEnum.ADMIN, viewValue: 'Admin'},
  {value: AdminRoleEnum.EDITOR, viewValue: 'Editor'}
];

export const GENDERS: Select[] = [
  {value: 'Male', viewValue: 'Male'},
  {value: 'Female', viewValue: 'Female'},
  {value: 'Others', viewValue: 'Others'}
];

export const REPORT_FILTER: Select[] = [
  // {value: 0, viewValue: 'Today'},
  {value: 1, viewValue: 'Last Day'},
  {value: 7, viewValue: 'Last 7 days'},
  {value: 15, viewValue: 'Last 15 days'},
  {value: 30, viewValue: 'Last 30 days'},
  {value: 60, viewValue: 'Last 60 days'},
  {value: 90, viewValue: 'Last 90 days'}
];

