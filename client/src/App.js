import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./redux/posts/postsThunks";
import { useEffect } from "react";
import Dossier from "./pages/Dossier";
import toast from "react-hot-toast";

function App() {
  // Loading posts from the server to the Redux store
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
       />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/dossier" element={<Dossier />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
