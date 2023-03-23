import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

SignatureDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
const SignatureBox = styled("div")({
  border: "1px solid #ccc",
  height: 100,
  width: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
});

// function toDataURL(src, callback) {
//   var image = new Image();
//   image.crossOrigin = "anonymous";
//   image.src = src;
//   image.onload = function () {
//     var canvas = document.createElement("canvas");
//     var context = canvas.getContext("2d");
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     context.drawImage(this, 0, 0);
//     var dataURL = canvas.toDataURL("image/jpeg");
//     callback(dataURL);
//   };
// }

function toDataURL(url, callback) {
  //   axios.get(url).then((res) => {
  //     // callback(res);
  //     const reader = new FileReader();
  //     reader.onloadend = function () {
  //       callback(reader.result);
  //     };
  //     reader.readAsDataURL(new Blob([res.data]));
  //   });
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export default function SignatureDialog({ open, title, onConfirm, onCancel }) {
  const [name, setName] = useState("");
  const sigRef = useRef(null);

  const handleConfirm = () => {
    // const sigURL = sigRef.current;
    // onConfirm(sigURL);
    toDataURL(sigRef.current.src, (sigURL) => {
      //   alert(dataURL);
      onConfirm(sigURL);
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <div style={{ margin: "20px 50px" }}>
            <label className="form-label">Signatue</label>
            <div
              className="form-field1"
              style={{
                width: 400,
                marginTop: 5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                type="text"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </div>
            <div style={{ marginTop: 20 }}>
              <label className="form-label">Generated Signatue</label>
              <SignatureBox>
                <img
                  src={`http://localhost:8080/api/v1/signature/generateimage?name=${name}`}
                  alt={"Signature"}
                  width={300}
                  ref={sigRef}
                  //   draggable
                  //   onDragStart={handleDragStart}
                />
              </SignatureBox>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
