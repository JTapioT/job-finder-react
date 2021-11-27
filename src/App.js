import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Company from "./components/Company";
import Favorites from "./components/Favorites";
import FavoriteCompanies from "./components/FavoriteCompanies";
import Error from "../src/components/Error";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/:company" element={<Company />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
