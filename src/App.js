import React, { useEffect, useState } from "react";
import Block from "./Block";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("RSD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        console.log(data.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get the rates!");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    setToPrice(value);
  };

  return (
    <div className="bg-indigo-100 h-screen flex justify-center items-center">
      <div className="bg-white flex p-8 rounded-lg flex gap-4">
        <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
};

export default App;
