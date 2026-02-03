import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Notes from "./pages/Notes.jsx";
import Register from "./pages/Register.jsx";

function PrivateRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loading />;
  if (isAuthenticated) return <Navigate to="/notes" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
