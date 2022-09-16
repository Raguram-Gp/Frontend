import { ITableColumn } from "../Table";

export interface Idata {
  id: number;
  VesselName: string;
  reportId: number;
  created: string;
  modified: string;
  type: string;
  status: string;
  Download: string;
}

export const columns: ITableColumn<Idata>[] = [
  {
    id: "VesselName",
    header: "Vessel Name",
    accessorKey: "VesselName",
  },
  {
    id: "reportId",
    header: "Report ID",
    accessorKey: "reportId",
  },
  {
    id: "modified",
    header: "Modified Date",
    accessorKey: "modified",
  },
  {
    id: "created",
    header: "Created Date",
    accessorKey: "created",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
  },
  {
    id: "type",
    header: "Type",
    accessorKey: "type",
  },
];
