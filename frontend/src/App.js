import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import OrderKuota from './pages/OrderKuota';
import Saweria from './pages/Saweria';
import ApiStatus from './pages/ApiStatus';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>api-shinnouw.vercel.app</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/orderkuota">OrderKuota</Link>
            <Link to="/saweria">Saweria</Link>
            <Link to="/status">API Status</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orderkuota" element={<OrderKuota />} />
            <Route path="/saweria" element={<Saweria />} />
            <Route path="/status" element={<ApiStatus />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} api-shinnouw.vercel.app</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;