import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetStatus from './visitor/VisitorTrackingDashboard';
import VisitorStats from './visitor/VisitorStats';
import { VisitorProvider } from './visitor/VisitorContext'; // Context Provider 추가

function App() {
  return (
    <VisitorProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SetStatus />} />
          <Route path="/visitors" element={<VisitorStats />} />
        </Routes>
      </Router>
    </VisitorProvider>
  );
}

export default App;
