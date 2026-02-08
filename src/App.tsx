import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AnalysisProvider } from './store/AnalysisContext';
import InputPage from './pages/InputPage';
import OutputPage from './pages/OutputPage';
import TrackingPage from './pages/TrackingPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<InputPage />} />
        <Route path="/result" element={<OutputPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AnalysisProvider>
  );
}
