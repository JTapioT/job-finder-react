import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Jobs from "./components/Jobs";
import CompanyInfo from "./components/CompanyInfo";
import Footer from './components/Footer';



function App() {
  return (
  <Router>
    <NavigationBar/>
    <Welcome/>
    <Routes>
    <Route path="/" element={<Jobs/>}/>
    <Route path="/:company" element={<CompanyInfo/>}/>
    </Routes>
  </Router>
  );
}

export default App;
