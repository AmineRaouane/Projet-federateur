import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Classes from "./pages/Classes/Classes";
import Trainers from "./pages/Trainers/Trainers";
import Contact from "./pages/Contact/Contact";
import ServicesCard from "./assets/components/ServicesCard/ServicesCard";
import TeamCard from "./assets/components/TeamCard/TeamCard";
import Footer from "./assets/components/Footer/Footer";
import Commandes from "./assets/components/TopProducts/Commandes";
import TopProducts from "./assets/components/TopProducts/TopProducts";
import ShoppingCart from "./assets/components/TopProducts/ShoppingCart";
import Profile from "./pages/Profile/Profile";
import Paiment from "./pages/Paiment/Paiment";

import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import NotFound from "./pages/Login/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home ServicesCard={ServicesCard} TeamCard={TeamCard} />}
          />
          <Route
            path="/about"
            element={<About ServicesCard={ServicesCard} TeamCard={TeamCard} />}
          />

          <Route path="/TopProducts" element={<TopProducts />} />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/Paiment" element={<Paiment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Commandes"
            element={
              <ProtectedRoute>
                <Commandes />
              </ProtectedRoute>
            }
          />
          <Route path="/classes" element={<Classes />} />
          <Route path="/trainers" element={<Trainers TeamCard={TeamCard} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
