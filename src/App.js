import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RiskIndex from "./modules/Risk";
import RiskDetails from "./modules/Risk/Details";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <main role="main" className="pb-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/risks">
              <Route index element={<RiskIndex />} />
              <Route path="details/:riskId" element={<RiskDetails />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
