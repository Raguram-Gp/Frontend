import "./Report.css";
import ReactTable, { ITableColumn } from "../Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import { Form } from "react-bootstrap";
import randomColor from "randomcolor";

function Report() {
  const [data, setData] = useState<IReportCount[]>([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    console.log("useEffect for the Report Count data");

    const res = axios
      .get("https://localhost:7267/api/Report/GetImoReportCount")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  let FilteredData = data.filter((val) => {
    if (searchVal === "") {
      return val;
    } else if (
      val.imo.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      val.reportCount.toString().toLowerCase().includes(searchVal.toLowerCase())
    ) {
      return val;
    }
  });

  // const pieData = [
  //   { title: "9149823", value: 1, color: "#E38627" },
  //   { title: "9202649", value: 1, color: "#C13C37" },
  //   { title: "9840697", value: 2, color: "#6A2135" },
  // ];
  const pieData = [{ title: "9149893", value: 1, color: "#E38627" }];

  for (var i of FilteredData) {
    pieData.push({
      title: i.imo.toString(),
      value: i.reportCount,
      color: randomColor(),
    });
  }
  console.log("----------->", pieData);

  // let PieChartData: IPieChartData = FilteredData.forEach((element) => {
  //   element.filter((val) => {
  //     return {
  //       title: val.imo.toString(),
  //       value: val.reportCount,
  //       color: "#E38627",
  //     };
  //   });
  // });

  interface IPieChartData {
    title: string;
    value: number;
    color: Function;
  }

  interface IReportCount {
    imo: number;
    reportCount: number;
  }
  const columns: ITableColumn<any>[] = [
    {
      id: "1",
      header: "IMO",
      accessorKey: "imo",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },
    {
      id: "2",
      header: "Reports Count",
      accessorKey: "reportCount",
      size: 70,
      // fixed: true,
      fixedWidth: true,
    },
  ];
  return (
    <div>
      <h2>Reports</h2>

      <div className="report">
        <div className="table">
          <div className="main-header">
            <Form.Control
              className="w-50 m-3 "
              placeholder="Search..."
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </div>
          <ReactTable
            columns={columns}
            data={FilteredData}
            enableStripes
            height="75vh"
          />
        </div>
        <div className="piechart">
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  );
}
export default Report;
