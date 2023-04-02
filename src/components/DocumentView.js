import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf";
import { blobToURL } from "src/utils/Utils";
import DraggableSignature from "./DraggableSignature";
import PagingControl from "./PagingControl";

function DocumentView({
  pdf,
  signatureURL,
  setSignatureOnPdf,
  setSignatureURL,
}) {
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);

  const [position, setPosition] = useState(null);

  const documentContainerRef = useRef(null);
  const documentRef = useRef(null);

  const styles = {
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
  };

  return pdf ? (
    <div>
      <div style={styles.controls}>
        <PagingControl
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
        />
      </div>
      <div
        ref={documentContainerRef}
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <div ref={documentRef} style={styles.documentBlock}>
          {signatureURL ? (
            <DraggableSignature
              url={signatureURL}
              onCancel={() => {
                // setSignatureURL(null);
              }}
              onSet={async () => {
                const { originalHeight, originalWidth } = pageDetails;
                const scale = originalWidth / documentRef.current.clientWidth;

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

                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([new Uint8Array(pdfBytes)]);

                const URL = await blobToURL(blob);
                setSignatureOnPdf(URL);
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
            {/* {[...Array(totalPages)].map((page, ind) => {
                      return (
                        <>
                          <Page
                            pageNumber={ind + 1}
                            width={800}
                            height={1200}
                            onLoadSuccess={(data) => {
                              console.log(data)
                              setPageDetails(data);
                            }}
                          />
                          <div style={{ margin: 5, textAlign: "right" }}>
                            Sekhar
                          </div>
                        </>
                      );
                    })} */}
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
  ) : null;
}

export default DocumentView;
