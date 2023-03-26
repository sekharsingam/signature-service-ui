import { PDFDocument } from "pdf-lib";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DraggableSignature from "src/components/DraggableSignature";
import PagingControl from "src/components/PagingControl";
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
    sigBlock: {
      display: "inline-block",
      border: "1px solid #000",
    },
    documentBlock: {
      maxWidth: 800,
      margin: "20px auto",
      marginTop: 8,
      // border: "1px solid #999",
    },
    controls: {
      maxWidth: 800,
      margin: "0 auto",
      marginTop: 8,
    },
    footer: {
      position: "fixed",
      bottom: 0,
      height: 80,
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
  const [position, setPosition] = useState(null);
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  // const [textInputVisible, setTextInputVisible] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);

  const documentContainerRef = useRef(null);
  const documentRef = useRef(null);

  useEffect(() => {
    downloadPdfFile();
  }, []);

  const downloadPdfFile = () => {
    getPdfFile().then(async (res) => {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const URL = await blobToURL(blob);
      setPdf(URL);
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
    formData.append("accessCode", "06161790-5ea6-4457-89d9-b2ec7b0d059c");
    formData.append("file", file);
    uploadSignedPdfFile(formData).then((res) => {});
  };

  const handleCancelSignatureDialog = () => {
    setOpenSignatureDialog(false);
  };

  const handleConfirmSignatureDialog = (url) => {
    setSignatureURL(url);
    setOpenSignatureDialog(false);
  };

  return (
    <div>
      <div style={styles.container}>
        {/* {signatureDialogVisible ? ( */}
        <SignatureDialog
          open={openSignatureDialog}
          title={"Reason for Reject the Customer"}
          onCancel={handleCancelSignatureDialog}
          onConfirm={handleConfirmSignatureDialog}
        />
        {/* ) : null} */}

        {pdf ? (
          <div>
            <div style={styles.controls}>
              {/* <button
                className="btn btn-primary btn-sm"
                //   marginRight={8}
                style={{ width: 200, display: "block" }}
                title={"Add signature"}
                onClick={() => setOpenSignatureDialog(true)}
              >
                Add Signature
              </button> */}
              <PagingControl
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPages={totalPages}
              />
              {/* {pdf ? (
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: 200, display: "block" }}
                  inverted={true}
                  title={"Download"}
                  onClick={submitSignedDocument}
                >
                  Download
                </button>
              ) : null} */}
            </div>
            <div
              ref={documentContainerRef}
              style={{ height: "calc(100vh - 120px)", overflow: "auto" }}
            >
              <div ref={documentRef} style={styles.documentBlock}>
                {/* {textInputVisible ? (
                  <DraggableText
                    initialText={
                      textInputVisible === "date"
                        ? moment().format("M/d/YYYY")
                        : null
                    }
                    onCancel={() => setTextInputVisible(false)}
                    onEnd={setPosition}
                    onSet={async (text) => {
                      const { originalHeight, originalWidth } = pageDetails;
                      const scale =
                        originalWidth / documentRef.current.clientWidth;

                      const y =
                        documentRef.current.clientHeight -
                        (position.y +
                          12 * scale -
                          position.offsetY -
                          documentRef.current.offsetTop);
                      const x =
                        position.x -
                        166 -
                        position.offsetX -
                        documentRef.current.offsetLeft;

                      // new XY in relation to actual document size
                      const newY =
                        (y * originalHeight) / documentRef.current.clientHeight;
                      const newX =
                        (x * originalWidth) / documentRef.current.clientWidth;

                      const pdfDoc = await PDFDocument.load(pdf);

                      const pages = pdfDoc.getPages();
                      const firstPage = pages[pageNum];

                      firstPage.drawText(text, {
                        x: newX,
                        y: newY,
                        size: 20 * scale,
                      });

                      const pdfBytes = await pdfDoc.save();
                      const blob = new Blob([new Uint8Array(pdfBytes)]);

                      const URL = await blobToURL(blob);
                      setPdf(URL);
                      setPosition(null);
                      setTextInputVisible(false);
                    }}
                  />
                ) : null} */}
                {signatureURL ? (
                  <DraggableSignature
                    url={signatureURL}
                    onCancel={() => {
                      setSignatureURL(null);
                    }}
                    onSet={async () => {
                      const { originalHeight, originalWidth } = pageDetails;
                      const scale =
                        originalWidth / documentRef.current.clientWidth;

                      const y =
                        documentRef.current.clientHeight -
                        (position.y -
                          position.offsetY +
                          25 -
                          documentRef.current.offsetTop +
                          documentContainerRef.current.scrollTop);
                      const x =
                        position.x -
                        135 -
                        position.offsetX -
                        documentRef.current.offsetLeft;

                      // new XY in relation to actual document size
                      const newY =
                        (y * originalHeight) / documentRef.current.clientHeight;
                      const newX =
                        (x * originalWidth) / documentRef.current.clientWidth;

                      const pdfDoc = await PDFDocument.load(pdf);

                      const pages = pdfDoc.getPages();
                      const firstPage = pages[pageNum];

                      const pngImage = await pdfDoc.embedPng(signatureURL);
                      const pngDims = pngImage.scale(scale * 0.3);

                      firstPage.drawImage(pngImage, {
                        x: newX,
                        y: newY,
                        width: pngDims.width,
                        height: pngDims.height,
                      });

                      // if (autoDate) {
                      //   firstPage.drawText(
                      //     `Signed ${dayjs().format("M/d/YYYY HH:mm:ss ZZ")}`,
                      //     {
                      //       x: newX,
                      //       y: newY - 10,
                      //       size: 14 * scale,
                      //       color: rgb(0.074, 0.545, 0.262),
                      //     }
                      //   );
                      // }

                      const pdfBytes = await pdfDoc.save();
                      const blob = new Blob([new Uint8Array(pdfBytes)]);

                      const URL = await blobToURL(blob);
                      setPdf(URL);
                      setPosition(null);
                      setSignatureURL(null);
                    }}
                    onEnd={setPosition}
                  />
                ) : null}
                <Document
                  file={pdf}
                  onLoadSuccess={(data) => {
                    setTotalPages(data.numPages);
                  }}
                >
                  <Page
                    pageNumber={pageNum + 1}
                    width={800}
                    height={1200}
                    onLoadSuccess={(data) => {
                      setPageDetails(data);
                    }}
                  />
                </Document>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div style={styles.footer}>
        <button
          className="btn btn-primary btn-sm"
          //   marginRight={8}
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
    </div>
  );
}

export default DocumentSignaturePage;
