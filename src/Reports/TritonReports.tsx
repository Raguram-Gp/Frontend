import { useState, useEffect } from "react";
// import { ReactComponent as SeeIcon } from "../assets/Eye.svg";
import { ReactComponent as DownloadIcon } from "../assets/Download.svg";
import "./TritonReport.css";
import ReactTable, { ITableColumn } from "../Table";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TritonReports() {
  const [searchVal, setSearchVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [Data, setData] = useState<IData[]>([]);
  const [startDate, setStartDate] = useState("2015-12-29 11:22:38.015");
  const [endDate, setEndDate] = useState("2015-12-29 11:22:38.015");
  // const [DateFilteredData, setDateFilteredData] = useState<IData[]>([]);

  useEffect(() => {
    console.log("useEffect for the table data");

    const res = axios
      .get(
        "https://localhost:7267/api/Report/getTableData/" +
          startDate +
          "/" +
          endDate
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, [startDate, endDate]);
  interface IData {
    id: string;
    seqNo: number;
    imo: number;
    periodStart: string;
    periodEnd: string;
    reportType: string;
    spec: string;
    bridge: JSON;
    engineRoom: JSON;
    createdAt: string;
    modifiedAt: string;
    submittedAt: string;
    receivedOnShoreAt: string;
    transferredToDatalakeAt: string;
    warnings: string;
  }

  let FilteredData = Data.filter((val) => {
    if (searchVal === "") {
      return val;
    } else if (
      val.id.toLowerCase().includes(searchVal.toLowerCase()) ||
      val.seqNo.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      val.imo.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      val.periodStart.toLowerCase().includes(searchVal.toLowerCase()) ||
      val.periodEnd
        .toString()
        .toLowerCase()
        .includes(searchVal.toLowerCase()) ||
      val.reportType.toString().toLowerCase().includes(searchVal.toLowerCase())
    ) {
      return val;
    }
  });

  // const extractColumn = (obj: object) => {
  //   return Object.keys(obj);
  // };

  // const downloadFile = ({ data, fileName, fileType }) => {
  //   const blob = new Blob([data], { type: fileType });

  //   const a = document.createElement("a");
  //   a.download = fileName;
  //   a.href = window.URL.createObjectURL(blob);
  //   const clickEvt = new MouseEvent("click", {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   a.dispatchEvent(clickEvt);
  //   a.remove();
  // };

  // const exportToCsv = (e, data) => {
  //   e.preventDefault();
  //   console.log("downloading");
  //   let headers = extractColumn(Data[0]).join(",");

  //   let usersCsv = Data.reduce((acc: Array<string>, user) => {
  //     const values = Object.values(user);
  //     acc.push(values.join(","));
  //     return acc;
  //   }, []);
  //   console.log(usersCsv);

  //   var filename = Date.now().toString() + ".csv";
  //   downloadFile({
  //     data: [headers, ...usersCsv].join("\n"),
  //     fileName: filename,
  //     fileType: "text/csv",
  //   });
  // };

  const columns: ITableColumn<any>[] = [
    {
      id: "1",
      header: "ID",
      accessorKey: "id",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },
    {
      id: "2",
      header: "Sequence Number",
      accessorKey: "seqNo",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },
    {
      id: "3",
      header: "IMO",
      accessorKey: "imo",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },
    {
      id: "4",
      header: "Start Period",
      accessorKey: "periodStart",
      size: 70,
      // fixed: true,
      fixedWidth: true,
      cell: ({ getValue }) => {
        return moment(getValue()).format("DD-MM-YYYY hh:mm:ss");
      },
    },
    {
      id: "5",
      header: "End Period",
      accessorKey: "periodEnd",
      size: 70,
      // fixed: true,
      fixedWidth: true,
      cell: ({ getValue }) => {
        return moment(getValue()).format("DD-MM-YYYY hh:mm:ss");
      },
    },
    {
      id: "6",
      header: "Report Type",
      accessorKey: "reportType",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },

    {
      id: "7",
      header: "Download",
      accessorKey: "imo",
      size: 70,
      fixed: true,
      fixedWidth: true,
      enableSorting: false,
      maxSize: 10,
      cell: ({ row }) => (
        <div>
          <Button
            className="svg-button"
            onClick={() => {
              // setRowData(row.original);
              setShowModal(true);
            }}
          >
            {/* <SeeIcon /> */}
          </Button>
          <Button
            className="svg-button m-1"
            // key={Date.now()}
            // onClick={exportToCsv(Event, row.original)}
          >
            <DownloadIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h4 className="heading">Triton Report</h4>
      <div className="Filtering">
        <label>StartDate </label>
        <DatePicker
          wrapperClassName="datePicker"
          dateFormat="dd/MM/yyyy"
          selected={moment(startDate).toDate()}
          onChange={(date: Date) =>
            setStartDate(moment(date).format("YYYY-MM-DD hh:mm:ss"))
          }
        />
        <label>EndDate </label>
        <DatePicker
          wrapperClassName="datePicker"
          dateFormat="dd/MM/yyyy"
          selected={moment(endDate).toDate()}
          onChange={(date: Date) =>
            setEndDate(moment(date).format("YYYY-MM-DD hh:mm:ss"))
          }
        />
      </div>
      <div className="main-header">
        <Form.Control
          className="w-25 m-3"
          placeholder="Search..."
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
        />
      </div>

      <div className="table">
        <ReactTable
          columns={columns}
          data={FilteredData}
          enableFixedHeader
          enableVerticalLines
          enableStripes
          enableRowNumbers
          enableVirtualization
          height="50vh"
          // onRowClick={(data) => console.log(data)}
        />
      </div>
    </div>
  );
}
export default TritonReports;
