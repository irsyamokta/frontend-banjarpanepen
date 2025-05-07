import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";

import GuestRoute from "./routes/GuestRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import AdminRoute from "./routes/AdminRoutes";

import SignIn from "./pages/Auth/SignIn";
// import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Admin/Home";
import TourPackage from "./pages/Admin/TourPackage";
import Event from "./pages/Admin/Event";
import NotFound from "./pages/Errors/NotFound";
import UserProfiles from "./pages/Admin/UserProfiles";
import Gallery from "./pages/Admin/Gallery";
import Article from "./pages/Admin/Article";
import Tour from "./pages/Admin/Tour";

import ClientLayout from "./layout/ClientLayout";
import Homepage from "./pages/Client/Homepage";
import ClientTour from "./pages/Client/ClientTour";
import ClientEvent from "./pages/Client/ClientEvent";
import ClientArticle from "./pages/Client/ClientArticle";
import ClientGallery from "./pages/Client/ClientGallery";
import TourDetailPage from "./pages/Client/TourDetail";
import EventDetailPage from "./pages/Client/EventDetail";
import ArticleDetailPage from "./pages/Client/ArticleDetail";

import ClientHome from "./pages/Client/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer
            style={{ zIndex: 9999 }}
            position="top-center"
            autoClose={3000}
          />
          <ScrollToTop />
          <Routes>
            {/* Route Public */}
<<<<<<< HEAD
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<ClientHome />} />
            </Route>

            {/* Route Admin */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                </PrivateRoute>
              }
            >
              <Route index path="dashboard" element={<Home />} />
=======
            <Route path="/" element={<ClientLayout />} >
              <Route index element={<Homepage />} />
              <Route path="/wisata" element={<ClientTour />} />
              <Route path="/agenda" element={<ClientEvent />} />
              <Route path="/artikel" element={<ClientArticle />} />
              <Route path="/galeri" element={<ClientGallery />} />

              <Route path="/wisata/:id" element={<TourDetailPage />} />
              <Route path="/agenda/:id" element={<EventDetailPage />} />
              <Route path="/artikel/:id" element={<ArticleDetailPage />} />
            </Route>

            {/* Route Admin */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </PrivateRoute>
            }>

              <Route index element={<Home />} />
              <Route path="wisata" element={<Tour />} />
>>>>>>> e3e3f24c08b9d4dea76765d5b17723588a7f98a9
              <Route path="paket-wisata" element={<TourPackage />} />
              <Route path="artikel" element={<Article />} />
              <Route path="agenda-desa" element={<Event />} />
              <Route path="galeri" element={<Gallery />} />

              <Route path="profile" element={<UserProfiles />} />
            </Route>

            {/* Route Guest */}
            <Route path="/" element={<GuestRoute />}>
              <Route path="signin" element={<SignIn />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
