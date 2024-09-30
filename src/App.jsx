import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InconvenienceAllPage from "./Components/InconvenienceAllPage/InconvenienceAllPage";
import InconvenienceAll from "./Components/OvertimePage/InconvenienceAll";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { AuthProvider } from "./Context/AuthContext";
import FormContextProvider from "./Context/FormContext";
import EditPage from "./Components/EditPage/EditPage";
import PreviewPage from "./Components/PreviewPage/PreviewPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/homePage",
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/inconvenience-allowance",
    element: (
      <ProtectedRoutes>
        <InconvenienceAll />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/inconvenience-allowance/form",
    element: (
      <ProtectedRoutes>
        <InconvenienceAllPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: `/inconvenience-allowance/:id`,
    element: (
      <ProtectedRoutes>
        <PreviewPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: `/inconvenience-allowance/edit/:id`,
    element: (
      <ProtectedRoutes>
        <EditPage />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <FormContextProvider>
        <RouterProvider router={router} />
      </FormContextProvider>
    </AuthProvider>
  );
}

export default App;

// <Header />
{
  /* {test ? <InconvenienceAll /> : <InconvenienceAllForm />} */
}
{
  /* <StatusBar />  */
}
{
  /* <InconvenienceAllPage /> */
}
{
  /* <SettingsPage /> */
}
{
  /* <Table /> */
}
{
  /* <FormPreviewPage /> */
}
