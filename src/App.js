import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Jobs from "./components/Jobs";
import CompanyInfo from "./components/CompanyInfo";
import FavoriteCompanies from './components/FavoriteCompanies';
import Error from "../src/components/Error"
import {useState} from "react";



function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setSearch] = useState(true);
  const [category, setCategory] = useState("");

  return (
    <>
      <Router>
      <NavigationBar />
      <Welcome
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearch={setSearch}
        isSearch={isSearch}
        setCategory={setCategory}
      />
      {/* <FavoriteCompanies/> */}
        <Routes>
          <Route
            path="/"
            element={
              <Jobs
                searchValue={searchValue}
                isSearch={isSearch}
                category={category}
                setCategory={setCategory}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/favorites" element={<FavoriteCompanies />} />
          <Route path="/:company" element={<CompanyInfo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
