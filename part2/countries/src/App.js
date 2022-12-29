import { useState, useEffect } from "react";
import axios from "axios";
import Countrylist from "./components/Countrylist";
import SearchInput from "./components/SearchInput";

const App = () => {
  // 储存所有国家信息
  const [countries, setCountries] = useState([]);
  // 储存用户搜索关键词
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  // 从 服务器 获取数据，并更新 countries
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <SearchInput query={query} handleQueryChange={handleQueryChange}/>
      <Countrylist
        countries={countries}
        query={query}
        handleQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default App;
