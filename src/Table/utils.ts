import { Cell, Column, Row } from '@tanstack/react-table';

const COLUMN_PADDING = 12;
// Calculates the width of all fixed columns before the current one
export const calculateLeftPositionForFixedColumn = (
  columns: Array<Column<any>>
) => {
  return columns.reduce((aggWidth: number, curColumn: Column<any>) => {
    const columnDef: any = curColumn.columnDef;

    if (!columnDef.fixed) return aggWidth;
    return aggWidth + curColumn.getSize() + COLUMN_PADDING * 2;
  }, 0);
};

// returns asc or desc
const getSortOrder = (cell: Cell<any>) => cell.column.getIsSorted();

export const sortingFn = (rowA: Row<any>, rowB: Row<any>, columnId: string) => {
  const isAsc =
    getSortOrder(rowA._getAllCellsByColumnId()[columnId]) === 'asc'
      ? true
      : false;

  const firstValue: any = rowA.getValue(columnId);
  const secondValue: any = rowB.getValue(columnId);

  const isFirstString = typeof firstValue == 'string';
  const isSecondString = typeof secondValue == 'string';

  // Sort all null values last
  if (firstValue == null && secondValue == null) return 0;
  if (firstValue == null) return isAsc ? 1 : -1;
  if (secondValue == null) return isAsc ? -1 : 1;

  // Sort booleans
  if (typeof firstValue === 'boolean' && typeof secondValue === 'boolean') {
    return firstValue > secondValue ? 1 : -1;
  }

  // Sort string values
  if (isFirstString && isSecondString)
    return firstValue.localeCompare(secondValue);

  // Put strings at the end if we are sorting numbers
  if (isFirstString) return isAsc ? 1 : -1;
  if (isSecondString) return isAsc ? -1 : 1;

  // Sort numbers
  return firstValue - secondValue;
};


export const sortData = <T>(
  data: Array<T>,
  key: keyof T,
  asc: boolean
): Array<T> => {
  const strings = data.filter((d) => typeof d[key] === 'string');
  const numbers = data.filter((d) => typeof d[key] === 'number');
  const others = data.filter(
    (d) => typeof d[key] !== 'number' && typeof d[key] !== 'string'
  );
  return [
    ...numbers.sort(customDataCompare(key, asc)),
    ...strings.sort(customDataCompare(key, asc)),
    ...others.sort(customDataCompare(key, asc)),
  ];
};

export function isValidDate(value: string) {
  const dateWrapper = new Date(value);
  if (dateWrapper instanceof Date && dateWrapper.getTime()) return true;
}

const customDataCompare =
  (attr: string | number | symbol, ascending: boolean) =>
  (a: any | null, b: any | null): number => {
    // equal items sort equall
    if (a[attr] === b[attr]) {
      return 0;
    }
    // otherwise, if we're ascending, lowest sorts first
    if (ascending) {
      return a[attr] < b[attr] ? -1 : 1;
    }
    // if descending, highest sorts first
    return a[attr] > b[attr] ? -1 : 1;
  };
