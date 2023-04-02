import styled from "@emotion/styled";
import { Chip, IconButton, MenuItem, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaFileDownload,
  FaSyncAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ActionPopover from "src/common/ActionPopover";
import OverlayLoader from "src/common/OverlayLoader";
import TableList from "src/common/TableList";
import {
  getSignedDocumentsList,
  setStatusToDocumentListItem,
} from "src/services/ApiService";

const StyledContent = styled("div")(() => ({
  boxShadow: "0 0 8px rgb(0 0 0 / 10%)",
  background: "#fff",
  maxWidth: "calc(100% - 2em)",
  margin: "1em",
}));

function Dashboard() {
  const [signedDocumentsList, setSignedDocumentList] = useState([]);
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedItemForAction, setSelectedItemForAction] = useState(null);
  const [showLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpenMenu = (event, item) => {
    setPopoverOpen(event.currentTarget);
    setSelectedItemForAction(item);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedItemForAction(null);
  };

  useEffect(() => {
    getAllSignatureFileList();
  }, []);

  const getAllSignatureFileList = () => {
    setLoading(true);
    getSignedDocumentsList()
      .then((res) => {
        setSignedDocumentList(res.data);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const handleListAction = (status) => {
    setStatusToDocumentListItem(selectedItemForAction.accessCode, status).then(
      (res) => {
        handlePopoverClose();
        getAllSignatureFileList();
      }
    );
  };

  const navigateToUploadDocumentPage = () => {
    navigate("/suchi/document/upload");
  };

  const TABLE_COLUMNS = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    {
      id: "createdAt",
      label: "Created At",
      dataFormat: (cell) => {
        const stillUtc = moment.utc(cell).toDate();
        return (
          <span>
            {moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss A")}
          </span>
        );
      },
    },
    {
      id: "file",
      label: "File",
      dataFormat: (cell) => (
        <FaFileDownload style={{ marginLeft: 5, cursor: "pointer" }} />
      ),
    },
    {
      id: "status",
      label: "Status",
      dataFormat: (cell) => {
        return cell === "APPROVED" ? (
          <Chip
            label={cell}
            icon={<FaCheckCircle />}
            color="success"
            size="small"
          />
        ) : (
          <Chip
            label={cell}
            icon={<FaTimesCircle />}
            color="error"
            size="small"
          />
        );
      },
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
      {showLoading && <OverlayLoader show={true} />}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 18px",
          }}
        >
          <Typography variant="h5">Dashboard</Typography>
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-primary btn-sm"
              style={{ padding: "0, 20px", display: "block" }}
              title={"Upload Document"}
              onClick={() => navigateToUploadDocumentPage()}
            >
              Upload New Document
            </button>
            <button
              className="btn btn-primary btn-sm"
              style={{ padding: "0, 20px", display: "block" }}
              title={"Upload Document"}
              onClick={() => getAllSignatureFileList()}
            >
              <FaSyncAlt style={{ marginRight: 5 }} />
              Refresh
            </button>
          </div>
        </div>
        <StyledContent>
          <TableList
            size={"medium"}
            data={signedDocumentsList}
            columns={TABLE_COLUMNS}
            noDataText={"No data"}
          />
          <ActionPopover open={openPopover} onClose={handlePopoverClose}>
            <>
              <MenuItem onClick={() => handleListAction("APPROVED")}>
                <FaCheckCircle style={{ marginRight: 5, color: "green" }} />
                Approve
              </MenuItem>
              <MenuItem onClick={() => handleListAction("REJECTED")}>
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
