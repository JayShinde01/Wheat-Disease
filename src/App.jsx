import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OAuthSuccess from "./pages/OAuthSuccess";

import HomePage from "./pages/HomePage";
import Detection from "./pages/Detection";
import Community from "./pages/Community";
import Info from "./pages/Info";

import ProtectedRoute from "./component/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/community" element={<Community />} />
          <Route path="/info" element={<Info />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;