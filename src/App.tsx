import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import Posts from "@/pages/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;