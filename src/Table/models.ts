import { ColumnDef, RowData } from '@tanstack/react-table';

export type ITableColumn<T extends RowData> = ColumnDef<T> & {
  // fix the column to the left
  fixed?: boolean;

  // fix the width of the column to that specified to size attribute
  fixedWidth?: boolean;

  // align the content inside the cell
  align?: 'center' | 'right';
  className?: string;
};
export interface ITableProps<T extends RowData> {
  data: Array<T>;
  columns: Array<ITableColumn<T>>;
  className?: string;
  height?: string;
  isLoading?: boolean;
  hasError?: boolean;
  onRowClick?: (row: T) => void;
  enableVerticalLines?: boolean;
  enableStripes?: boolean;
  enableRowSelector?: boolean;
  enableFixedHeader?: boolean;
  enableExportOption?: boolean;
  enableVirtualization?: boolean;
  enableRowNumbers?: boolean;
}
