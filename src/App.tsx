import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DisplayPage from './pages/DisplayPage';
import DebuggingPage from './pages/DebuggingPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<DisplayPage />} />
        <Route path="/debugging" element={<DebuggingPage />} />
      </Routes>
    </>
  );
}

export default App;