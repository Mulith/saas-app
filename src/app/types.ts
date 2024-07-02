export type ColumnType = 'text' | 'select' | 'checkbox' | 'status' | 'profile' | 'rating' | 'members';

export interface ColumnConfig {
  name: string;
  visible: boolean;
  sortable: boolean;
  type: ColumnType;
  headerAlignment: string;
  contentAlignment: string;
  columnWidth:string;
  label:string;
}

export interface SearchConfig {
  visible: boolean;
  placeholder: string;
  alignment: string;
}

export interface FiltersConfig {
  visible: boolean;
}

export interface ToolsConfig {
  visible: boolean;
  allowExport: boolean;
  allowCustomColumns: boolean;
  allowChangeView: boolean;
  allowGraph: boolean;
  supportedViews: string[];
}

export interface GridActionsConfig {
  visible: boolean;
  delete: boolean;
  edit: boolean;
  menu: boolean;
}

export interface GridTableProps {
  visible: boolean;
  gridActions: GridActionsConfig;
  columns: ColumnConfig[];
  allowCheckboxes: boolean;
  resultsPerPage: number;
  start: number;
  pagination: boolean;
}

export interface User {
  avatarUrl: string;
  email: string;
  handle: string;
  name: string;
  rating: number;
  role: string;
  status: string;
}

export interface Teams {
  users: string[];
  email: string;
  name: string;
  projects: string;
  status: string;
}

export interface PageConfig {
  type: string;
  heading: string;
  subHeading: string;
  search: SearchConfig;
  filters: FiltersConfig;
  tools: ToolsConfig;
  grid: GridTableProps;
  start: number;
}

// GenericEntity type for dynamic entity handling
export interface GenericEntity {
  [key: string]: any;
}

