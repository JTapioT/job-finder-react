import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Jobs from "./components/Jobs";
import CompanyInfo from "./components/CompanyInfo";
import {useState} from "react";



function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setSearch] = useState(true);
  const [category, setCategory] = useState("");


  return (
    <>
      <NavigationBar />
      <Welcome searchValue={searchValue} setSearchValue={setSearchValue} setSearch={setSearch} isSearch={isSearch} setCategory={setCategory}/>
      <Router>
        <Routes>
          <Route path="/" element={<Jobs searchValue={searchValue} isSearch={isSearch} category={category} setCategory={setCategory} setSearch={setSearch}/>}
          />
          <Route path="/:company" element={<CompanyInfo />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
