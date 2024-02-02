import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/login/AuthContext';
import Login from './components/login/login';
import Body from './components/body/body';
import './globals';


function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" />;
}

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<PrivateRoute><Body /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Body /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;
