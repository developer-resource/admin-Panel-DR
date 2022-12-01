import "./App.css";
import Panel from "./components/Panel/Panel";
import Add from "./components/Add/Add";
import Home from "./components/Home";
import Data from "./components/Data/Data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Panel />} />
          <Route path="/add" element={<Add />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
