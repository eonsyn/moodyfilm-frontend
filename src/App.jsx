import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MovieEdit from "./AdminComponent/MovieEdit";
import MovieForm from "./AdminComponent/MovieForm";
import AdminLogin from "./AdminComponent/AdminLogin.jsx";
import MovieUpdate from "./AdminComponent/MovieUpdate";
import RequestMovie from "./Component/RequestMovie.jsx";
import "./App.css";
import Home from "./Component/Home";
import MovieDetail from "./Component/MovieDetail";
import Navbar from "./Component/Navbar";
import { SearchProvider } from "./context/SearchContext";
function App() {
  return (
    <Router>
      <SearchProvider>
        <Navbar />
        <div className="pt-16">
          {" "}
          {/* Added padding to prevent content from hiding under navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/requestMovie" element={<RequestMovie />} />
            <Route path="/admin/MovieForm" element={<MovieForm />} />
            <Route path="/admin/MovieEdit/:id" element={<MovieEdit />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/MovieUpdate" element={<MovieUpdate />} />
          </Routes>
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;