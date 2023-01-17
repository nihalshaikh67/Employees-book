import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import TextField from "@mui/material/TextField";
const AutocompleteDropdown = () => {
  const { employeesList, newEmployee, setNewEmployee } = useStateContext();

  const [options, setOptions] = useState(employeesList);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(employeesList);
  const [showDropdown, setShowDropDown] = useState(false);
  console.log(filteredOptions, "mihir");
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setNewEmployee(inputValue);
    setShowDropDown(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  };
  useEffect(() => {
    setFilteredOptions(employeesList);
    setOptions(employeesList);
  }, [employeesList]);

  useEffect(() => {
    setFilteredOptions(
      options?.filter((option) =>
        option?.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  }, [options, inputValue]);

  const handleOptionSelect = (option) => {
    setNewEmployee(option);
    setInputValue(option);
    setShowDropDown(false);
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        style={{
          marignLeft: "30px",
          marginTop: "30px",
        }}
        value={newEmployee}
        label="Employee name"
        variant="outlined"
        onChange={handleInputChange}
      />

      <div
        style={{
          width: "45%",
          display: "flex",
          justifyContent: "center",
          alignitems: "center",
        }}
      >
        <div
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            width: "100%",
          }}
        >
          {newEmployee.length > 0 &&
            showDropdown &&
            filteredOptions?.map((option) => (
              <p
                style={{ cursor: "pointer" }}
                key={option}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteDropdown;
