import React, { useState } from "react";
import "./table.css";

function Table() {
  const [currentValue, setCurrentValue] = useState("");
  const [values, setValues] = useState(
    sessionStorage.values ? JSON.parse(sessionStorage.values) : []
  );

  sessionStorage.setItem("values", JSON.stringify(values));

  const onPressEnter = ({ code }) => {
    if (currentValue === "") return;
    if (code === "Enter") {
      setValues([...values, { id: values.length + 1, value: currentValue }]);
      setCurrentValue("");
    }
  };

  const onChangeInput = ({ target }) => setCurrentValue(target.value);

  const deleteItem = (id) => {
    const intermediateArray = JSON.parse(sessionStorage.values).filter(
      (value) => value.id !== id
    );
    intermediateArray.forEach((el, index) => (el.id = index + 1));
    sessionStorage.setItem("values", JSON.stringify(intermediateArray));
    setValues(JSON.parse(sessionStorage.values));
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Значение</td>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.value}</td>
              <td onClick={() => deleteItem(value.id)}>X</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        autoFocus={true}
        type="text"
        value={currentValue}
        onChange={onChangeInput}
        onKeyPress={onPressEnter}
      />
    </>
  );
}

export default Table;
