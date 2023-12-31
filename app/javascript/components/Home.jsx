import React from "react";
import CurrencyConverter from "./CurrencyConverter";

export default () => (
  <div className="vw-100 vh-100 d-flex align-items-center justify-content-center card" style={{backgroundColor:" #8881b4"}}>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container text-white">
        <h1 className="display-4">Currency Converter</h1>
        <hr className="my-4" />
        <CurrencyConverter/>
      </div>
    </div>
  </div>
);
