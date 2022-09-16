import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Circular_data from "./Components/CircularData/CircularData";
import "bootstrap/dist/css/bootstrap.min.css";
import FrodoReports from "./Reports/FrodoReports";
import TritonReports from "./Reports/TritonReports";

function App() {
  const [isVisibleTable, setisVisibleTable] = useState(false);
  const [showFrodo, setshowFrodo] = useState(false);
  useEffect(() => {
    var canReload = localStorage.getItem("canAutoReload");
    console.log(canReload);

    if (canReload) {
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }
  }, []);

  return (
    <div className="App">
      <Circular_data
        setisVisibileReport={setisVisibleTable}
        setshowFrodo={setshowFrodo}
      />
      {isVisibleTable && (showFrodo ? <FrodoReports /> : <TritonReports />)}
    </div>
  );
}

export default App;
