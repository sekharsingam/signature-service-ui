import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import OverlayLoader from "src/common/OverlayLoader";
import DocumentView from "src/components/DocumentView";
import SignatureDialog from "src/components/SignatureDialog";
import { getPdfFile, uploadSignedPdfFile } from "src/services/ApiService";
import { blobToURL } from "src/utils/Utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DocumentSignaturePage() {
  const styles = {
    container: {
      maxWidth: 900,
      margin: "0 auto",
    },
    footer: {
      position: "fixed",
      left: 0,
      bottom: 0,
      height: 70,
      width: "100%",
      background: "#fff",
      borderTop: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      boxShadow: "0 0 8px rgb(0 0 0 / 10%)",
    },
  };
  const [pdf, setPdf] = useState(null);
  const [signatureURL, setSignatureURL] = useState(null);
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);

  const [showLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { accessCode } = useParams();

  useEffect(() => {
    downloadPdfFile();
  }, []);

  const downloadPdfFile = () => {
    setLoading(true);
    getPdfFile(accessCode).then(async (res) => {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const URL = await blobToURL(blob);
      setPdf(URL);
      setLoading(false);
    });
  };

  const submitSignedDocument = async () => {
    const pdfDoc = await PDFDocument.load(pdf);
    const pdfBytes = await pdfDoc.save();
    console.log(pdfBytes);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    console.log(blob);
    console.log(URL.createObjectURL(blob));
    const file = new File([blob], "signed_document_pdf", {
      type: "application/pdf",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("accessCode", accessCode);
    formData.append("file", file);

    setLoading(true);
    uploadSignedPdfFile(formData).then((res) => {
      setLoading(false);
      navigate(`/document/signature/${accessCode}/done`);
    });
  };

  const handleCancelSignatureDialog = () => {
    setOpenSignatureDialog(false);
  };

  const handleConfirmSignatureDialog = (url) => {
    setSignatureURL(url);
    setOpenSignatureDialog(false);
  };

  const onSetSignatureOnPdf = (pdf) => {
    setPdf(pdf);
  };

  return (
    <>
      {showLoading && <OverlayLoader show={true} />}
      <div style={styles.container}>
        <SignatureDialog
          open={openSignatureDialog}
          title={"Signature"}
          onCancel={handleCancelSignatureDialog}
          onConfirm={handleConfirmSignatureDialog}
        />

        <DocumentView
          pdf={pdf}
          signatureURL={signatureURL}
          setSignatureOnPdf={onSetSignatureOnPdf}
          setSignatureURL={(url) => setSignatureURL(url)}
        />
      </div>
      {pdf ? (
        <div style={styles.footer}>
          <button
            className="btn btn-primary btn-sm"
            style={{ padding: "0, 20px", display: "block" }}
            title={"Add signature"}
            onClick={() => setOpenSignatureDialog(true)}
          >
            Add Signature
          </button>
          {pdf ? (
            <button
              className="btn btn-primary btn-sm"
              style={{ padding: "0, 20px", display: "block" }}
              inverted={true}
              title={"Download"}
              onClick={submitSignedDocument}
            >
              Submit Signed document
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default DocumentSignaturePage;
