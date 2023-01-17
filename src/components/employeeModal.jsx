import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import AutocompleteDropdown from "./employeesAutoComplete";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const {
    AddNewTeam,
    setNewTeam,
    newTeam,
    team,
    newEmployee,
    setNewEmployee,
    selectedTeam,
    setSelectedTeam,
    setEmployeesList,
    employeesBook,
    AddEmployeeToExistingTeam,
  } = useStateContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewEmployee("");
    setNewTeam("");
    setSelectedTeam("");
    setEmployeesList([]);
  };

  function handleAddEmployee() {
    if (!selectedTeam || !newEmployee) {
      toast.error("Please select team and type employee name");
    } else {
      AddEmployeeToExistingTeam();
      handleClose();
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Team / Add Employees
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // maxWidth={"800px"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Team / Employees
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <h5>Create New team</h5>

            <TextField
              id="standard-basic"
              label="New Team"
              variant="outlined"
              value={newTeam}
              onChange={(e) => {
                setNewTeam(e.target.value);
              }}
            />
            <Typography>
              <Button
                style={{
                  marginTop: "20px",
                }}
                variant="contained"
                onClick={() => {
                  if (!newTeam) {
                    toast.error("Please type team name");
                  } else {
                    AddNewTeam();
                    setNewTeam("");
                    //   handleClose();
                  }
                }}
              >
                Create Team
              </Button>
            </Typography>
          </Typography>
          {/* <Typography gutterBottom> */}
          <h5>Add Employee to Team</h5>
          <FormControl style={{ width: "160px" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Team
            </InputLabel>
            <Select
              value={selectedTeam}
              label="team"
              onChange={(e) => {
                setSelectedTeam(e.target.value);
                setEmployeesList(
                  employeesBook.find((item) => item.team === e.target.value)
                    .employees
                );
              }}
            >
              {team.map((team) => {
                return <MenuItem value={team}>{team}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div>
            <AutocompleteDropdown />
            <Button
              style={{
                marginTop: "20px",
              }}
              variant="contained"
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </div>

          {/* </Typography> */}
          <Typography gutterBottom>
            Note - Please select team while adding the new Employee
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
