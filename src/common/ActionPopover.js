import { Popover } from "@mui/material";
import PropTypes from "prop-types";

ActionPopover.propTypes = {
  open: PropTypes.node,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default function ActionPopover({ open, onClose, children }) {
  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      {children}
    </Popover>
  );
}
