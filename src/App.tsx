import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from "./layout/AdminLayout";

import PublicRoute from "./routes/PublicRoutes";
import GuestRoute from "./routes/GuestRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import AdminRoute from "./routes/AdminRoutes";

import SignIn from "./pages/Auth/SignIn";
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

import AOS from "aos";
import "aos/dist/aos.css";
import Settings from "./pages/Admin/Settings";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer style={{ zIndex: 9999 }} position="top-center" autoClose={3000} />
          <ScrollToTop />
          <Routes>
            {/* Route Public */}
            <Route path="/" element={<PublicRoute />}>
              <Route element={<ClientLayout />}>
                <Route index element={<Homepage />} />
                <Route path="wisata" element={<ClientTour />} />
                <Route path="agenda" element={<ClientEvent />} />
                <Route path="artikel" element={<ClientArticle />} />
                <Route path="galeri" element={<ClientGallery />} />

                <Route path="wisata/:id" element={<TourDetailPage />} />
                <Route path="agenda/:id" element={<EventDetailPage />} />
                <Route path="artikel/:id" element={<ArticleDetailPage />} />
              </Route>
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
              <Route path="paket-wisata" element={<TourPackage />} />
              <Route path="artikel" element={<Article />} />
              <Route path="agenda-desa" element={<Event />} />
              <Route path="galeri" element={<Gallery />} />
              <Route path="pengaturan" element={<Settings />} />

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

export default App