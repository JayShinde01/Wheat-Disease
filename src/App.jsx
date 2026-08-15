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
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import JotformChatbot from "./component/JotformChatbot";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

<Route
    path="/reset-password"
    element={<ResetPassword />}
/>

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                     <>
        <MainLayout />
        <JotformChatbot />
      </>
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;