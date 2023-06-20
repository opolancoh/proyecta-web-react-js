import './App.css';
import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RiskIndex from './modules/Risk';
import RiskDetails from './modules/Risk/Details';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Error from './pages/Error';
import UserIndex from './modules/User';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { GlobalContext } from './contexts/isAuthenticatedContext';
import { isAuthenticated } from './helpers/auth-helper';

const initialState = isAuthenticated;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  const globalContextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated]
  );

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={globalContextValue}>
        <Header />
        <div className="container">
          <main role="main" className="pb-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/risks">
                <Route index element={<RiskIndex />} />
                <Route path="details/:riskId" element={<RiskDetails />} />
              </Route>
              <Route path="/users">
                <Route index element={<UserIndex />} />
                <Route path="details/:userId" element={<RiskDetails />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
