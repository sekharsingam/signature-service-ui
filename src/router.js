import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import DocumentSignaturePage from "./pages/DocumentSignaturePage";
import DocumentSignatureSuccess from "./pages/DocumentSignatureSuccess";
import HomeLayout from "./pages/HomeLayout";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import UploadDocumentPage from "./pages/uploadDocument/UploadDocumentPage";

export default function Router() {
  const routes = useRoutes([
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "/suchi",
      element: <HomeLayout />,
      children: [
        { element: <Navigate to="/suchi/home" />, index: true },
        { path: "home", element: <Dashboard /> },
        { path: "/suchi/document/upload", element: <UploadDocumentPage /> },
        {
          path: "/suchi/document/signature",
          element: <DocumentSignaturePage />,
        },
        {
          path: "/suchi/document/signature/:accessCode",
          element: <DocumentSignaturePage />,
        },
        {
          path: "/suchi/document/signature/:accessCode/done",
          element: <DocumentSignatureSuccess />,
        },
        {
          path: "*",
          element: <Page404 />,
        },
      ],
    },
    {
      path: "/document/signature/:accessCode",
      element: <DocumentSignaturePage />,
    },
    {
      path: "/document/signature/:accessCode/done",
      element: <DocumentSignatureSuccess />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
}
