import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marketplace from "./components/Marketplace";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Marketplace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
