import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

OverlayLoader.propTypes = {
  open: PropTypes.string,
};

export default function OverlayLoader({ show }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
      //   onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
