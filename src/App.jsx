import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import About from "./Pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
