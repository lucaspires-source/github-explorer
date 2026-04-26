import { Route, Routes } from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import RepoPage from './pages/RepoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      <Navbar />
      <main className="container-xl py-4 px-3">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/repo/:owner/:name" element={<RepoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </LanguageProvider>
    </ThemeProvider>
  );
}
