import {
  Column,
  flexRender,
  Header,
  HeaderGroup,
  RowData,
} from "@tanstack/react-table";
import cn from "classnames";
import { calculateLeftPositionForFixedColumn } from "../utils";
import { ReactComponent as SortIcon } from "../../assets/column-no-sort.svg";
import { ReactComponent as SortAscIcon } from "../../assets/column-sort-asc.svg";
import { ReactComponent as SortDescIcon } from "../../assets/column-sort-desc.svg";

interface ITableHeadProps<T extends RowData> {
  headerGroups: Array<HeaderGroup<T>>;
  columns: Array<Column<T>>;
  enableRowNumbers?: boolean;
}

// sortedOrder can be false, asc, desc.
const getSortIcon = (sortedOrder: string | boolean) => {
  return (
    {
      asc: <SortAscIcon />,
      desc: <SortDescIcon />,
    }[sortedOrder as string] ?? <SortIcon />
  );
};

const TableHead = <T extends Object>({
  headerGroups,
  columns,
  enableRowNumbers,
}: ITableHeadProps<T>) => {
  return (
    <thead className="table-header">
      {headerGroups.map((headerGroup: HeaderGroup<T>) => (
        <tr className={"table-row column-head"} key={headerGroup.id}>
          {enableRowNumbers && (
            <th className="table-header-column" key="#">
              <div style={{ width: 30 }}>#</div>
            </th>
          )}
          {headerGroup.headers.map((header: Header<T>, index: number) => {
            const column = header.column;
            const columnProps: any = column.columnDef;
            const styleObj: any = {};
            if (columnProps.fixed) {
              styleObj.left = calculateLeftPositionForFixedColumn(
                columns.slice(0, index)
              );
            }
            return (
              <th
                key={header.id}
                className={cn("table-header-column", {
                  "fixed-column": columnProps.fixed as boolean,
                  "with-sorter": column.getCanSort(),
                  "mds-text-right": columnProps.align === "right",
                  "mds-text-center": columnProps.align === "center",
                })}
                style={styleObj}
                onClick={column.getToggleSortingHandler()}
              >
                <div
                  className={cn({
                    "sort-column-wrapper": column.getCanSort(),
                  })}
                  style={{
                    width:
                      columnProps.fixed || columnProps.fixedWidth
                        ? header.column.getSize()
                        : "max-content",
                    maxWidth: header.column.getSize(),
                  }}
                >
                  {flexRender(columnProps.header, header.getContext())}
                  {header.column.getCanSort() &&
                    getSortIcon(header.column.getIsSorted())}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
