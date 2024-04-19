import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import UploadCSV from "./components/uploadCSV";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LicensePlate from "./licensePlates";

function App() {
  return (
    <>
      <Header />
      <main className="middle-content">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<UploadCSV />} />
            <Route exact path="/licensePlates" element={<LicensePlate />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}

export default App;
