import { Button } from "./components/ui/button"
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <><Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
