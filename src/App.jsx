import "./App.css";
import CustomizedDialogs from "./components/employeeModal";
import { useStateContext } from "./context/StateContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function App() {
  const { employeesBook } = useStateContext();
  console.log(employeesBook,'yess')
  return (
    <div className="App">
      <div className="employee_container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Employees Book</h2>
        </div>

        {employeesBook.map((item) => (
          <Card
            key={item.team}
            sx={{ minWidth: 275 }}
            style={{ marginTop: "20px" }}
          >
            <CardContent onClick={() => console.log(item.employees)}>
              <strong style={{ minWidth: "150px" }}>{item.team} Team </strong>
              <p>
                {item.employees.length === 0
                  ? "No employees"
                  : item?.employees?.join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            minWidth: "100%",
          }}
        >
          <CustomizedDialogs />
        </div>
      </div>
    </div>
  );
}

export default App;
