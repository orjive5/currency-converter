import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  const [defaultCurrencies, setDefaultCurrencies] = useState([
    "RSD",
    "USD",
    "EUR",
    "GBP",
  ]);
  const [currencyList, setCurrencyList] = useState([]);
  const [openCurList, setOpenCurList] = useState(false);
  const toggleCurList = () => {
    setOpenCurList(!openCurList);
  };
  const chooseCur = (e) => {
    toggleCurList();
    setDefaultCurrencies((prevCur) => {
      return [e.target.innerText, ...prevCur.slice(1)];
    });
    onChangeCurrency(e.target.innerText);
  };
  useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((res) => res.json())
      .then((data) => {
        let curList = [];
        for (const cur in data.rates) {
          if (!cur.includes("VEF")) {
            curList.push(cur);
          }
        }
        setCurrencyList(curList);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get the rates!");
      });
  }, []);
  return (
    <div className="flex flex-col gap-4 relative">
      <ul className="flex justify-center border border-r-0">
        {defaultCurrencies.map((el) => {
          return (
            <li
              onClick={() => onChangeCurrency(el)}
              className={
                currency === el
                  ? `flex-1 border-r text-center bg-green-500 hover:bg-green-600 hover:cursor-pointer text-gray-100`
                  : `flex-1 border-r text-center hover:bg-gray-100 hover:cursor-pointer`
              }
              key={el}
            >
              {el}
            </li>
          );
        })}
        <li
          onClick={toggleCurList}
          className="flex-1 border-r flex justify-center hover:bg-gray-100 hover:cursor-pointer"
        >
          <Icon
            path={mdiChevronDown}
            title="Chevron down"
            size={1}
            color="black"
          />
        </li>
        {openCurList && (
          <ul className="absolute right-0 top-[25px] z-1 bg-white border w-[58px] text-center max-h-80 overflow-y-scroll overflow-x-hidden">
            {currencyList.map((el) => {
              return (
                <li
                  onClick={chooseCur}
                  className="hover:cursor-pointer hover:bg-gray-100"
                  key={el}
                >
                  {el}
                </li>
              );
            })}
          </ul>
        )}
      </ul>
      <input
        className="border p-4 rounded outline-gray-900"
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  );
};
export default Block;
