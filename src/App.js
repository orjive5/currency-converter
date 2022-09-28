import React, { useEffect, useRef, useState } from "react";
import Block from "./Block";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("RSD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});

  useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((res) => res.json())
      .then((data) => {
        ratesRef.current = data.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get the rates!");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

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
