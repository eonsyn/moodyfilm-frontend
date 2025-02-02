import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./AdminComponent/AdminLogin.jsx";
import MovieEdit from "./AdminComponent/MovieEdit";
import MovieForm from "./AdminComponent/MovieForm";
import MovieUpdate from "./AdminComponent/MovieUpdate";
import Footer from "./Component/Footer.jsx";
import Home from "./Component/Home";
import MovieDetail from "./Component/MovieDetail";
import Navbar from "./Component/Navbar";
import OnlineWatch from "./Component/OnlineWatch.jsx";
import Watchondailymotion from "./Component/Watchondailymotion.jsx";
import RequestMovie from "./Component/RequestMovie.jsx";
import RequestedMovies from "./Component/RequestedMovies.jsx";
import WatchMovie from "./Component/WatchMovie.jsx";
import { SearchProvider } from "./context/SearchContext";
import Login from "./UserComponent/UserLogin.jsx";
import Signup from "./UserComponent/UserSignup.jsx";
function App() {
  return (
    <Router>
      <SearchProvider>
        <Helmet>
          <title>MoodyFilms - Home</title>
          <meta name="url" content={`https://moodyfilm.netlify.app/`} />
          <meta
            name="description"
            content="MoodyFilms - Discover and download movies, explore trailers, read synopses, and enjoy personalized AI-powered movie recommendations based on your mood. A retro-inspired platform for true film lovers."
          />
        </Helmet>
        <Navbar />

        <div className="pt-16">
          {/* Padding to prevent content from hiding under navbar */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route
              path="/watchondailymotion/:id"
              element={<Watchondailymotion />}
            />
            <Route path="/OnlineWatch" element={<OnlineWatch />} />
            <Route path="/requestMovie" element={<RequestMovie />} />

            {/* User routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/MovieForm" element={<MovieForm />} />
            <Route path="/admin/MovieEdit/:id" element={<MovieEdit />} />
            <Route path="/admin/MovieUpdate" element={<MovieUpdate />} />
            <Route
              path="/admin/RequestedMovies"
              element={<RequestedMovies />}
            />
          </Routes>
        </div>
        <Footer />
      </SearchProvider>
    </Router>
  );
}

export default App;
