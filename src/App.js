import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RiskIndex from './modules/Risk';
import RiskDetails from './modules/Risk/Details';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import AppInfo from './pages/InformationApp';
import ApiServerInfo from './pages/InformationApiServer';
import ApiSystemInfo from './pages/InformationApiSystem';
import Error from './pages/Error';
import UserIndex from './modules/User';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import Forbidden from './pages/Forbidden';
import UserDetails from './modules/User/Details';
import UserAddOrUpdate from './modules/User/AddOrUpdate';
import UserRemove from './modules/User/Remove';
import RiskAddOrUpdate from './modules/Risk/AddOrUpdate';
import RiskRemove from './modules/Risk/Remove';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container">
          <main role="main" className="pb-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/risks">
                <Route index element={<RiskIndex />} />
                <Route path="new" element={<RiskAddOrUpdate />} /> 
                <Route path=":entityId" element={<RiskDetails />} />
                <Route path=":entityId/edit" element={<RiskAddOrUpdate />} /> 
                <Route path=":entityId/remove" element={<RiskRemove />} />   
              </Route>
              <Route path="/users">
                <Route index element={<UserIndex />} />
                <Route path="new" element={<UserAddOrUpdate />} />
                <Route path=":entityId" element={<UserDetails />} />    
                <Route path=":entityId/edit" element={<UserAddOrUpdate />} />                            
                <Route path=":entityId/remove" element={<UserRemove />} />                
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/app-info" element={<AppInfo />} />
              <Route path="/api-server-info" element={<ApiServerInfo />} />
              <Route path="/api-system-info" element={<ApiSystemInfo />} />
              <Route path="/error" element={<Error />} />
              <Route path="/forbidden" element={<Forbidden />} />
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
