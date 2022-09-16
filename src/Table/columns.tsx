import { ITableColumn } from "./models";

export const VESSEL_NAME_COLUMN: ITableColumn<any> = {
  id: "vesselName",
  header: "Vessel name",
  accessorKey: "vesselName",
  fixed: true,
  // cell: ({ row }) => {
  //   const data = row._getAllCellsByColumnId();
  //   return (
  //     <a
  //       href={getEnergyPlatformLink(data.imo.getValue())}
  //       rel={'noopener noreferrer'}
  //       target={'_blank'}
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       {data.vesselName.getValue()}
  //     </a>
  //   );
  // },
};
export const VESSEL_IMO_COLUMN: ITableColumn<any> = {
  id: "imo",
  header: "Vessel IMO",
  accessorKey: "imo",
  size: 70,
  fixed: true,
  fixedWidth: true,
};
