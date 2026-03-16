import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import { useAuth } from "./useAuth"; 
import LoadingScreen from "../components/ui/loadingScreen";
import NotFound from "../components/ui/notFound";

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />; 

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard view="lists"/> : <Navigate to="/login" />}
      />
       <Route path="/create-list" element={user ? <Dashboard view="create" /> : <Navigate to="/login" />} />
      <Route path="/list/:id" element={user ? <Dashboard view="details" /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
