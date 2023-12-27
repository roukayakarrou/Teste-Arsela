import { Home, Delete, Submit, Submissions } from "./pages/index";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Modal from "react-modal";

// fixes react-modal warning about screen readers
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/delete/" element={<Delete/>} />
          <Route path="/view-submissions" element={<Submissions/>} />
          <Route path="/submit-form/:id" element={<Submit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
