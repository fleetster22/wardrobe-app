import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeForm from "./ShoeForm";
import ShoeList from "./ShoeList";
import HatList from "./HatList";
import HatForm from "./HatForm";
import "./App.css";

function App(props) {
  if (props.shoes === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shoes" element={<ShoeList shoes={props.shoes} />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/hats" element={<HatList hats={props.hats} />} />
          <Route path="/hats/new" element={<HatForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
