import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [conversionRate, setConversionRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    fetchCurrencyList();
    fetchCurrencyData();
  }, []);

  const fetchDataFromAPI = () => {
    axios.get('/homepage/fetch_data')
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchConversionRate();
    }
  }, [fromCurrency, toCurrency]);

  const fetchCurrencyList = async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      const currencies = Object.keys(data.rates);
      setCurrencyList(currencies);
    } catch (error) {
      console.error("Error fetching currency list:", error);
    }
  };

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      setCurrencyData(data.rates);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  const fetchConversionRate = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConversionRate(rate);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };

  const handleConvertClick = () => {
    const convertedValue = amount * conversionRate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  const handleDownloadClick = () => {
    const formattedData = formatCurrencyData(currencyData);
    const csvData = convertToCSV(formattedData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "currency_rates.csv");
    fetchDataFromAPI();
    alert("Done");
  };

  const formatCurrencyData = (data) => {
    return Object.entries(data).map(([currency, rate]) => ({
      Currency: currency,
      Rate: rate
    }));
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return `${headers}\n${rows.join("\n")}`;
  };

  const handleResetClick = () => {
    setAmount("");
    setFromCurrency("");
    setToCurrency("");
    setConversionRate(0);
    setConvertedAmount(0);
  };

  return (
    <div className="container">
      <div className="card bg-light">
        <div className="card-body" style={{backgroundColor:"#89aef1"}}>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select
              className="form-control"
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="">Select Currency</option>
              {currencyList.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="toCurrency">To Currency:</label>
            <select
              className="form-control"
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="">Select Currency</option>
              {currencyList.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn btn-outline-dark mt-2" onClick={handleConvertClick}>
            Convert
          </button>
          {convertedAmount > 0 && (
            <div className="mt-2" >
              <p>
                Converted Amount: {convertedAmount} {toCurrency}
              </p>
              <button
                className="btn btn-success"
                onClick={handleDownloadClick}
              >
                Download Currency Rates
              </button>
            </div>
          )}
          <button
            className="btn btn-secondary mt-2 text-left"
            onClick={handleResetClick}
            style={{ marginleft: "250px"}}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
