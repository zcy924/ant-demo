export interface Product {
  app_name: string;
  owner: string;
  package_name: string;
  state: number;
  _id?:string;
}
export interface Mail {
  content: string;
  id: string;
  title: string;
}

export interface ViolationRecord {
  alarm_content: string;
  alarm_emails: any[];
  associate_email: string[];
  content: string;
  deadline: string;
  finished: boolean;
  level: number;
  measure: string;
  need_alarm: boolean;
  owner: string[];
  owner_type: string;
  package_names: string[];
  results: string;
  status: string;
  time: string;
}

export interface TableListItem {
  key: number;
  platform: string;
  account: string;
  state: number;
  company: string;
  owner: string;
  source_emails: Mail[];
  products: Product[];
  violation_records: ViolationRecord[];
  _id:string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
