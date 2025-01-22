import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={true}
          rtl={false}
        />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
