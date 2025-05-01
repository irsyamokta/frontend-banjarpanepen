import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from "./layout/AdminLayout";

import GuestRoute from "./routes/GuestRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import AdminRoute from "./routes/AdminRoutes";

import SignIn from "./pages/Auth/SignIn";
// import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Admin/Home";
import TourPackage from "./pages/Admin/TourPackage";
import Event from "./pages/Admin/Event";
import NotFound from "./pages/Errors/NotFound";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer style={{ zIndex: 9999 }} position="top-center" autoClose={3000} />
          <ScrollToTop />
          <Routes>
            {/* Route Public */}

            {/* Route Admin */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </PrivateRoute>
            }>


              <Route index path="dashboard" element={<Home />} />
              <Route path="paket-wisata" element={<TourPackage />} />
              <Route path="agenda-desa" element={<Event />} />
            </Route>

            {/* Route Guest */}
            <Route path="/" element={<GuestRoute />}>
              <Route index element={<h1>Home</h1>} />
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
