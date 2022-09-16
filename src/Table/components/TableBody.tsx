import { Column, Row, RowData } from "@tanstack/react-table";
import TableRow from "./TableRow";

export interface ITableBodyProps<T extends RowData> {
  rows: Array<Row<T>>;
  columns: Array<Column<T>>;
  activeRowId: string;
  setActiveRowId: (rowId: string) => any;
  enableRowNumbers?: boolean;
  onRowClick?: (row: T) => void;
}

const TableBody = <T extends RowData>({
  rows,
  columns,
  activeRowId,
  setActiveRowId,
  onRowClick,
  enableRowNumbers,
}: ITableBodyProps<T>) => {
  return (
    <tbody className="table-body">
      {rows.map((row: Row<T>, index: number) => {
        return (
          <TableRow
            key={row.id}
            row={row}
            columns={columns}
            rowNumber={index + 1}
            activeRowId={activeRowId}
            setActiveRowId={setActiveRowId}
            onRowClick={onRowClick}
            enableRowNumbers={enableRowNumbers}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
