import { TextField, Typography } from "@mui/material";
import { convertToRaw, EditorState } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uploadDocument } from "src/services/ApiService";
import "./UploadDocumentPage.css";

export default function UploadDocumentPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [file, setFile] = useState();
  const [subject, setSubject] = useState();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append(
      "message",
      draftjsToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append("file", file);

    uploadDocument(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <Typography variant="h5">Upload Document</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#fff",
          margin: 10,
        }}
      >
        <div style={{ width: "85%" }}>
          <div className="form-property">
            <label className="form-label">Name</label>
            <div className="form-field">
              <TextField
                type="text"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                name="name"
                value={name}
                onChange={handleNameChange}
              ></TextField>
            </div>
          </div>

          <div className="form-property">
            <label className="form-label">Email</label>
            <div className="form-field">
              <TextField
                type="email"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                name="email"
                value={email}
                onChange={handleEmailChange}
              ></TextField>
            </div>
          </div>

          <div className="form-property">
            <label className="form-label">Subject</label>
            <div className="form-field">
              <TextField
                type="email"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
              ></TextField>
            </div>
          </div>

          <div className="form-property">
            <label className="form-label">Message</label>
            <div className="form-field">
              <Editor
                editorState={editorState}
                wrapperClassName={"email-wrapper"}
                editorClassName={"email-editor"}
                onEditorStateChange={setEditorState}
              />
            </div>
          </div>

          <div className="form-property" style={{ marginTop: 135 }}>
            <label className="form-label">File</label>
            <div className="form-field">
              <TextField
                type="file"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                name="file"
                onChange={handleFileChange}
              ></TextField>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
