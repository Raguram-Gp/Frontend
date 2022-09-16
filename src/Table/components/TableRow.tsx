import React from "react";
import cn from "classnames";
import { Cell, Column, flexRender, Row, RowData } from "@tanstack/react-table";
import { calculateLeftPositionForFixedColumn } from "../utils";

interface ITableRowProps<T extends RowData> {
  row: Row<T>;
  columns: Array<Column<T>>;
  rowNumber: number;
  activeRowId: string;
  setActiveRowId: (rowId: string) => any;
  enableRowNumbers?: boolean;
  onRowClick?: (row: T) => void;
}

const TableRow = <T extends Object>({
  row,
  columns,
  rowNumber,
  activeRowId,
  setActiveRowId,
  onRowClick,
  enableRowNumbers,
}: ITableRowProps<T>) => {
  return (
    <tr
      onClick={() => {
        setActiveRowId(row.id);
        onRowClick && onRowClick(row.original as T);
      }}
      className={cn("table-cell", {
        "selectable-row": onRowClick,
        active: activeRowId === row.id,
      })}
    >
      {enableRowNumbers && (
        <td className={"table-data table-data"}>{rowNumber}</td>
      )}
      {row.getVisibleCells().map((cell: Cell<T>, index: number) => {
        const columnProps: any = cell.column.columnDef;

        const styleObj: any = {};
        if (columnProps.fixed) {
          styleObj.left = calculateLeftPositionForFixedColumn(
            columns.slice(0, index)
          );
        }

        return (
          <td
            key={cell.id}
            className={cn("table-data table-data", columnProps.className, {
              "fixed-column": columnProps.fixed,
              "mds-text-right": columnProps.align === "right",
              "mds-text-center": columnProps.align === "center",
            })}
            style={styleObj}
          >
            {flexRender(columnProps.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
