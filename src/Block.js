import React from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  const defaultCurrencies = ["RSD", "USD", "EUR", "GBP"];
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex justify-center border border-r-0">
        {defaultCurrencies.map((el) => {
          return (
            <li
              onClick={() => onChangeCurrency(el)}
              className={
                currency === el
                  ? `flex-1 border-r text-center bg-green-300 hover:bg-green-400 hover:cursor-pointer`
                  : `flex-1 border-r text-center hover:bg-gray-100 hover:cursor-pointer`
              }
              key={el}
            >
              {el}
            </li>
          );
        })}
        <li className="flex-1 border-r flex justify-center hover:bg-gray-100 hover:cursor-pointer">
          <Icon
            path={mdiChevronDown}
            title="Chevron down"
            size={1}
            color="black"
          />
        </li>
      </ul>
      <input
        className="border p-4 rounded"
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  );
};
export default Block;
