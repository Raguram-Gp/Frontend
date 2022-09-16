import React, { useMemo, useRef, useState } from "react";
import cn from "classnames";
import "./Table.scss";
import "./MDSTable.scss";
import ClipLoader from "react-spinners/ClipLoader";
// import "./Table.css";
// import "./MDSTable.css";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { CSVLink } from "react-csv";

import { ITableProps } from "./models";
import { sortingFn } from "./utils";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

const Table = <T extends Object>({
  columns,
  data,
  height,
  isLoading,
  hasError,
  className,
  onRowClick,
  enableStripes,
  enableVerticalLines,
  enableFixedHeader,
  enableExportOption,
  enableVirtualization,
  enableRowNumbers,
}: ITableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeRowId, setActiveRowId] = useState<string>("");
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // add default values to the columns
  columns = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        sortingFn: column.sortingFn ? column.sortingFn : sortingFn,
        sortDescFirst: false,
      })),
    [columns]
  );

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const { rows: tableRows } = getRowModel();
  const tableHeaderGroups = getHeaderGroups();
  const tableColumns = getAllColumns();

  const tableBody = useMemo(() => {
    return (
      <TableBody
        rows={tableRows}
        columns={tableColumns}
        activeRowId={activeRowId}
        setActiveRowId={setActiveRowId}
        onRowClick={onRowClick}
        enableRowNumbers={enableRowNumbers}
      />
    );
  }, [
    enableVirtualization,
    tableContainerRef,
    tableRows,
    tableColumns,
    activeRowId,
    setActiveRowId,
    onRowClick,
    enableRowNumbers,
  ]);
  const color = "#0dcaf0";

  return (
    <div className="ReactTable">
      <div
        className={cn("TableWrapper", className)}
        style={{ maxHeight: height }}
        ref={tableContainerRef}
      >
        <table
          className={cn(
            "table mds-table mds-table--small",
            "mds-table--vertical-grid-lines",
            {
              "mds-table--zebra-stripes": enableStripes,
              "mds-table--row-highlight-on-hover":
                !isLoading && data.length > 0,
              "mds-table--sticky-header": enableFixedHeader,
            }
          )}
        >
          <TableHead
            columns={tableColumns}
            headerGroups={tableHeaderGroups}
            enableRowNumbers={enableRowNumbers}
          />
          {!isLoading ? (
            data.length === 0 ? (
              <div>No Data</div>
            ) : (
              tableBody
            )
          ) : (
            <ClipLoader color={color} size={30} />
          )}
        </table>
      </div>
    </div>
  );
};
export default Table;
