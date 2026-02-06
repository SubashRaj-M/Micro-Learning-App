import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddContent from "./components/AddContent";
import AddQuiz from "./components/AddQuiz";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Study from "./components/Study";
import TakeQuiz from "./components/TakeQuiz";
import UserDashboard from "./components/UserDashboard";
import UserProgress from "./components/UserProgress";

// --- Helper Component for Security ---
const ProtectedRoute = ({ children, roleRequired }) => {
  const userRole = localStorage.getItem("role");
  
  // If role doesn't match, or user isn't logged in, send to Login
  if (!userRole || userRole !== roleRequired) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/create-content" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AddContent />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AddContent />
          </ProtectedRoute>
        } />

        <Route path="/add-quiz/:topicId" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AddQuiz />
          </ProtectedRoute>
        } />

        {/* --- USER ROUTES --- */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute roleRequired="USER">
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/study/:topicId" element={
          <ProtectedRoute roleRequired="USER">
            <Study />
          </ProtectedRoute>
        } />

        <Route path="/take-quiz/:topicId" element={
          <ProtectedRoute roleRequired="USER">
            <TakeQuiz />
          </ProtectedRoute>
        } />

        <Route path="/progress" element={
          <ProtectedRoute roleRequired="USER">
            <UserProgress />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;