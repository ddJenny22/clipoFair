import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetStatus from './VisitorTrackingDashboard';
import VisitorStats from './VisitorStats';
import { VisitorProvider } from './VisitorContext'; // Context Provider 추가

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
