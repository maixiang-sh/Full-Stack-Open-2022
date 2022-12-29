import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>{`capital: ${country.capital}`}</div>
      <div>{`area: ${country.area}`}</div>
      <br></br>
      <div>
        <strong>languages:</strong>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width="30%"
        />
      </div>
      <Weather commonName={country.name.common} lat={country.latlng[0]} lon={country.latlng[1]}/>
    </div>
  );
};
export default CountryInfo;
