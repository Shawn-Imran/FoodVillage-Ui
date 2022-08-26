export interface AdminRoleData {
  _id: string;
  username: string;
  role: string;
  access: Access[];
}

export interface Access {
  page: string;
  pageId: string;
  modify: number[];
}
