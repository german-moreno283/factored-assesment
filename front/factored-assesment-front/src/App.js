import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import "./App.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path = "/detail" element = {<Detail/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
