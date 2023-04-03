import axios from "axios";

export const uploadDocument = async (payload) => {
  const res = await axios.post("/api/v1/signature/upload", payload);
  return res;
};

export const generateSignature = async (name) => {
  const res = await axios.get(`/api/v1/signature/generateimage?name=${name}`);
  return res;
};

export const getPdfFile = async (accessCode) => {
  const res = await axios.get(
    `/api/v1/signature/download?accessCode=${accessCode}`
  );
  return res;
};

export const uploadSignedPdfFile = async (payload) => {
  const res = await axios.post("/api/v1/signature/uploadsigned", payload);
  return res;
};

export const downloadSignedPdfFile = async (accessCode) => {
  const res = await axios.get(
    `/api/v1/signature/downloadsigned?accessCode=${accessCode}`,
    {
      responseType: "blob",
    }
  );
  return res;
};

export const getSignedDocumentsList = async () => {
  const res = await axios.get("/api/v1/signature/list");
  return res;
};

export const setStatusToDocumentListItem = async (accessCode, status) => {
  const res = await axios.get(
    `api/v1/signature/approve?accessCode=${accessCode}&status=${status}`
  );
  return res;
};
