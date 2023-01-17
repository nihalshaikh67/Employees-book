import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { data } from "../constants/data";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [employeesBook, setEmployeesBook] = useState(data);
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [newEmployee, setNewEmployee] = useState("");

  useEffect(() => {
    setTeam(employeesBook.map((item) => item.team));
  }, [employeesBook]);

  const AddNewTeam = () => {
    setEmployeesBook([...employeesBook, { team: newTeam, employees: [] }]);
    toast.success("New team is added successfully");
  };

  const AddEmployeeToExistingTeam = () => {
    const currentTeam = employeesBook.find(
      (item) => item.team === selectedTeam
    );
    console.log(currentTeam);
    currentTeam.employees = [...currentTeam?.employees, newEmployee];

    setEmployeesBook(
      employeesBook.map((item) => {
        if (item.team === selectedTeam) {
          return { ...item, employees: currentTeam.employees };
        }

        return item;
      })
    );
    toast.success(`${newEmployee} is added to ${selectedTeam} team`);
    setNewEmployee("");
    setSelectedTeam("");
  };
  return (
    <Context.Provider
      value={{
        employeesBook,
        setEmployeesBook,
        team,
        setTeam,
        newTeam,
        setNewTeam,
        newEmployee,
        setNewEmployee,
        AddNewTeam,
        selectedTeam,
        employeesList,
        setSelectedTeam,
        setEmployeesList,
        AddEmployeeToExistingTeam,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
