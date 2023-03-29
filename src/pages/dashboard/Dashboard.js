import styled from "@emotion/styled";
import { IconButton, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import ActionPopover from "src/common/ActionPopover";
import TableList from "src/common/TableList";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaFileDownload,
  FaTimesCircle,
} from "react-icons/fa";
import { CheckCircle } from "@mui/icons-material";

const StyledContent = styled("div")(() => ({
  boxShadow: "0 0 8px rgb(0 0 0 / 10%)",
  background: "#fff",
  maxWidth: "calc(100% - 2em)",
  margin: "1em",
}));

function Dashboard() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedOrderForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedOrderForAction(null);
  };

  const TABLE_COLUMNS = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    {
      id: "file",
      label: "File",
      dataFormat: (cell) => (
        <FaFileDownload style={{ marginLeft: 5, cursor: "pointer" }} />
      ),
    },
    {
      id: "",
      label: "",
      dataFormat: (cell, row) => (
        <IconButton
          size="small"
          color="inherit"
          onClick={(e) => handleOpenMenu(e, row)}
        >
          <FaEllipsisV />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto" }}>
      <div>
        <Typography variant="h5">Dashboard</Typography>
        <StyledContent>
          <TableList
            size={"medium"}
            data={[{ id: "1", name: "sekhar", email: "test@gmail.com" }]}
            columns={TABLE_COLUMNS}
            noDataText={"No data"}
          />
          <ActionPopover open={openPopover} onClose={handlePopoverClose}>
            <>
              <MenuItem>
                <FaCheckCircle style={{ marginRight: 5, color: "green" }} />
                Approve
              </MenuItem>
              <MenuItem>
                <FaTimesCircle style={{ marginRight: 5, color: "red" }} />
                Reject
              </MenuItem>
            </>
          </ActionPopover>
        </StyledContent>
      </div>
    </div>
  );
}

export default Dashboard;
