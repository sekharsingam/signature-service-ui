import { useRoutes } from "react-router-dom";
import DocumentSignaturePage from "./pages/DocumentSignaturePage";
import Page404 from "./pages/Page404";
import UploadDocumentPage from "./pages/UploadDocumentPage";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/document/upload",
      element: <UploadDocumentPage />,
    },
    {
      path: "/document/signature",
      element: <DocumentSignaturePage />,
    },
    {
        path: '*',
        element: <Page404 />
    }
  ]);

  return routes;
}
