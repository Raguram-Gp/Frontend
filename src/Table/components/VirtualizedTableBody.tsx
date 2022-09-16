import { Row, RowData } from "@tanstack/react-table";
import React from "react";
import { useVirtual, VirtualItem } from "react-virtual";
import { ITableBodyProps } from "./TableBody";
import TableRow from "./TableRow";

interface IVirtualizedTableBodyProps<T extends RowData>
  extends ITableBodyProps<T> {
  tableContainerRef: React.RefObject<HTMLDivElement>;
}

const VirtualizedTableBody = <T extends RowData>({
  tableContainerRef,
  rows,
  columns,
  activeRowId,
  setActiveRowId,
  onRowClick,
  enableRowNumbers,
}: IVirtualizedTableBodyProps<T>) => {
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const topGap = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const bottomGap =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  console.log("virtualized");
  return (
    <tbody className="table-body">
      {topGap > 0 && (
        <tr>
          <td style={{ height: `${topGap}px` }} />
        </tr>
      )}

      {virtualRows.map((virtualRow: VirtualItem) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <TableRow
            key={row.id}
            row={row}
            columns={columns}
            rowNumber={virtualRow.index + 1}
            activeRowId={activeRowId}
            setActiveRowId={setActiveRowId}
            onRowClick={onRowClick}
            enableRowNumbers={enableRowNumbers}
          />
        );
      })}

      {bottomGap > 0 && (
        <tr>
          <td style={{ height: `${bottomGap}px` }} />
        </tr>
      )}
    </tbody>
  );
};

export default VirtualizedTableBody;
