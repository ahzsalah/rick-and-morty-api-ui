import "./App.css";
import DefaultAppBar from "./features/components/DefaultAppBar";
// import DummyCards from "./features/components/DummyCards";
import FetchedCharacters from "./features/components/FetchedCharacters";
import Home from "./features/components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleCharacter from "./features/components/SingleCharacter";

function App() {
  return (
    <Router>
      <div className="container">
        <DefaultAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<FetchedCharacters />} />
          <Route path="/character/:id" element={<SingleCharacter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
