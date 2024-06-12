import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/contoso-university/Header';
import Footer from './components/contoso-university/Footer';
import About from './pages/About';
import AppInfo from './pages/InformationApp';
import ApiServerInfo from './pages/InformationApiServer';
import ApiSystemInfo from './pages/InformationApiSystem';
import Error from './pages/Error';
import UserIndex from './modules/User/UserIndex';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import Forbidden from './pages/Forbidden';
import UserDetails from './modules/User/Details/UserDetails';
import UserAddOrUpdate from './modules/User/AddOrUpdate/UserAddOrUpdate';
import UserRemove from './modules/User/Remove/UserRemove';
import RiskIndex from './modules/Risk/RiskIndex';
import RiskDetails from './modules/Risk/Details/RiskDetails';
import RiskAddOrUpdate from './modules/Risk/AddOrUpdate/RiskAddOrUpdate';
import RiskRemove from './modules/Risk/Remove/RiskRemove';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container">
          <main role="main" className="pb-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="risks">
                <Route index element={<RiskIndex />} />
                <Route path="new" element={<RiskAddOrUpdate />} />
                <Route path=":entityId">
                  <Route index element={<RiskDetails />} />
                  <Route path="edit" element={<RiskAddOrUpdate />} />
                  <Route path="remove" element={<RiskRemove />} />
                </Route>
              </Route>
              <Route path="users">
                <Route index element={<UserIndex />} />
                <Route path="new" element={<UserAddOrUpdate />} />
                <Route path=":entityId">
                  <Route index element={<UserDetails />} />
                  <Route path="edit" element={<UserAddOrUpdate />} />
                  <Route path="remove" element={<UserRemove />} />
                </Route>
              </Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
              <Route path="app-info" element={<AppInfo />} />
              <Route path="api-server-info" element={<ApiServerInfo />} />
              <Route path="api-system-info" element={<ApiSystemInfo />} />
              <Route path="error" element={<Error />} />
              <Route path="forbidden" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
