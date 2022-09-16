import Card from "react-bootstrap/Card";
import { Button, ToggleButton } from "react-bootstrap";
import "./CircularData.css";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import axios from "axios";

function Circular_data({ setisVisibileReport, setshowFrodo }: any) {
  const [masterImo, setMasterImo] = useState([]);
  const [reportImo, setReportImo] = useState([]);

  useEffect(() => {
    console.log("useEffect for the get Master data------");
    const res = axios
      .get("https://localhost:7267/api/Report/getMasterData")
      .then((res) => {
        setMasterImo(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect for the get Report data------");

    const res = axios
      .get("https://localhost:7267/api/Report/getReportImo")
      .then((res) => {
        setReportImo(res.data);
      });
  }, []);

  const SubmittedReport = reportImo.length - masterImo.length;
  const NonSubmittedReport = masterImo.length;

  function showTritonReport(e: any) {
    setisVisibileReport(true);
    setshowFrodo(false);
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(loading);
    }, 1000);
  }, []);

  function showFrodoReport(e: any) {
    setisVisibileReport(true);
    setshowFrodo(true);
  }
  function handleReload() {
    if (localStorage.getItem("canAutoReload")) {
      localStorage.removeItem("canAutoReload");
    } else {
      localStorage.setItem("canAutoReload", "true");
      window.location.reload();
    }
  }

  const color = "#0dcaf0";

  return (
    <div>
      {loading ? (
        <ClipLoader color={color} loading={loading} size={30} />
      ) : (
        <div>
          <div className="Navbar">
            <h4 className="heading-nav">Maersk</h4>
            <div>
              <ToggleButton
                className="toggle"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={
                  localStorage.getItem("canAutoReload") as unknown as boolean
                }
                value="1"
                onChange={handleReload}
              >
                {localStorage.getItem("canAutoReload")
                  ? "Stop "
                  : "Auto Refresh"}
              </ToggleButton>
            </div>
          </div>

          <div className="circular_row">
            <Card className="text-center w-25 rounded p-2">
              <Card.Body>
                <Card.Title>Non Submitted Vessels</Card.Title>
                <Card.Text>
                  The vessels which haven't submitted the report
                </Card.Text>
                <Card.Text className="fs-3 fw-bold">
                  {NonSubmittedReport}
                </Card.Text>
                <Button
                  id="FrodoButton"
                  className="button-card"
                  onClick={showFrodoReport}
                >
                  Frodo Reports
                </Button>
              </Card.Body>
            </Card>

            <Card className="text-center w-25 card rounded p-2">
              <Card.Body>
                <Card.Title className="card-title">
                  Submitted Vesssels
                </Card.Title>
                <Card.Text>
                  The vessels which already submitted the report
                </Card.Text>
                <Card.Text className="fs-3 fw-bold">
                  {" "}
                  {SubmittedReport}
                </Card.Text>
                <Button className="button-card" onClick={showTritonReport}>
                  Triton Reports
                </Button>
              </Card.Body>
            </Card>
          </div>
          <Link to="/report">Vessel Report Count</Link>
        </div>
      )}
    </div>
  );
}

export default Circular_data;
