import CountryInfo from "./CountryInfo";

const Countrylist = ({ countries, query, handleQueryChange }) => {
  // 根据 搜索词 筛选包含 搜索词 的 countries
  const filterResults = countries.filter((counrty) =>
    counrty.name.common.toLowerCase().includes(query.toLowerCase())
  );

  if (query === "") {
    return <div></div>;
  }

  // 如果搜索结果 > 10， 显示 "Too many matches,specify another filter"
  if (filterResults.length > 10) {
    return <div>Too many matches,specify another filter</div>;
  }

  // 如果 1 < 搜索结果 <= 10，显示 countries 列表
  if ((filterResults.length > 1) & (filterResults.length <= 10)) {
    return (
      <div>
        {filterResults.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button value={country.name.common} onClick={handleQueryChange}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }

  // 如果搜索结果只有 1 个，显示 country 详情
  if (filterResults.length === 1) {
    return <CountryInfo country={filterResults[0]} />;
  }
};
export default Countrylist;
