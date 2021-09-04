import React, { useEffect, useState } from "react";
import "./table.css";

function Table() {
  const [currentValue, setCurrentValue] = useState("");
  const [values, setValues] = useState(
    sessionStorage.values ? JSON.parse(sessionStorage.values) : []
  );
  const [sortedById, setSortedById] = useState(false);
  const [sortedByValue, setSortedByValue] = useState(false);
  useEffect(() => sessionStorage.setItem("values", JSON.stringify(values)));

  const onPressEnter = ({ code }) => {
    if (currentValue === "") return;
    if (code === "Enter") {
      sortedById
        ? setValues([{ id: values.length + 1, value: currentValue }, ...values])
        : setValues([
            ...values,
            { id: values.length + 1, value: currentValue },
          ]);
      setCurrentValue("");
    }
  };

  const onChangeInput = ({ target }) => setCurrentValue(target.value);

  const sortValuesById = () => {
    const sortedArray = values.sort((a, b) =>
      sortedById ? a.id - b.id : b.id - a.id
    );
    setValues([...sortedArray]);
    setSortedById(!sortedById);
  };

  const sortValuesByValues = () => {
    const sortedArray = values.sort((a, b) =>
      sortedByValue
        ? (a.value > b.value) - (a.value < b.value)
        : (a.value < b.value) - (a.value > b.value)
    );
    setValues([...sortedArray]);
    setSortedByValue(!sortedByValue);
  };

  const deleteItem = (id) => {
    const intermediateArray = values.filter((value) => value.id !== id);
    sortedById
      ? intermediateArray.forEach(
          (el, index) => (el.id = intermediateArray.length - index)
        )
      : intermediateArray.forEach((el, index) => (el.id = index + 1));
    setValues(intermediateArray);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <td onClick={sortValuesById}>ID</td>
            <td onClick={sortValuesByValues}>Значение</td>
            <td>Удалить</td>
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
