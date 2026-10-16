import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import NewsFeed from './pages/NewsFeed.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>

        {/* Default Fallback */}
        <Route path="*" element={<Navigate to="/news" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;