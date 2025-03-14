import { BrowserRouter as Router, Routes, Route as ReactRoute, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import GetProducts from "./Components/GetProducts";
import AddProducts from "./Components/AddProduct";
import Dashboard from "./Components/Dashboard";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoute from "./Components/Route"; // Renamed import
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import a CSS file for styling

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Shadow Net - It's all about speed</h1>
          </header>
          <Routes>
            {/* Redirect root path ("/") to "/SignUp" */}
            <ReactRoute path="/" element={<Navigate to="/SignUp" replace />} />

            {/* Public Routes */}
            <ReactRoute path="/SignUp" element={<SignUp />} />
            <ReactRoute path="/SignIn" element={<SignIn />} />

            {/* Protected Routes */}
            <ReactRoute
              path="/GetProducts"
              element={
                <ProtectedRoute>
                  <GetProducts />
                </ProtectedRoute>
              }
            />
            <ReactRoute
              path="/AddProduct"
              element={
                <ProtectedRoute>
                  <AddProducts />
                </ProtectedRoute>
              }
            />
            <ReactRoute
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;