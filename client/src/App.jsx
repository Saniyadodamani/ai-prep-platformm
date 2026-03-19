import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Prep from "./pages/Prep";
import DSA from "./pages/Dsa";
import SystemDesign from "./pages/SystemDesign";
import Theory from "./pages/Theory";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AiChat from "./components/AiChat";


const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};




function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  const hideChat = ["/", "/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const uId = localStorage.getItem('userId');
    if (uId && uId !== 'guest') {
      const keys = ["userStats", "recentActivity", "bookmarkedQuestions", "companyWiseProgress", "loginDates"];
      keys.forEach(k => {
        if (!localStorage.getItem(`${k}_${uId}`)) {
          let legacyData = localStorage.getItem(`${k}_guest`) || localStorage.getItem(k);
          if (legacyData) {
            localStorage.setItem(`${k}_${uId}`, legacyData);
          }
        }
      });
    }
  }, [location.pathname]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prep" element={<Prep />} />
        <Route path="/dsa" element={<DSA />} />
       <Route path="/system-design" element={<SystemDesign />} />
      <Route path="/theory" element={<Theory />} />
        <Route path="/profile" element={<Profile />} />
      <Route
  path="/prep"
  element={
    <PrivateRoute>
      <Prep />
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/prep"
  element={
    <ProtectedRoute>
      <Prep />
    </ProtectedRoute>
  }
/>




      </Routes>
      {!hideChat && <AiChat />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
