import React, { useEffect, useState } from 'react';
import CountryCard from '../../components/CountryCard';
import useCountries from '../../hooks/useCountries';
import useCurrencies from '../../hooks/useCurrencies';

interface CountriesProps {
  path: string,
}

interface Country {
  _id: string,
  name: string,
  alpha2Code: string,
}

const Countries: React.FC<CountriesProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [displayCountries, setDisplayCountries] = useState<Array<Country>>([]);

  const {
    countries,
    countriesByFilter,
    loading: countriesLoading,
    searchByFilter,
  } = useCountries();
  const { currencies, loading: currenciesLoading } = useCurrencies();
  console.log(currencies, currenciesLoading, 'countriesLoading', countriesLoading);

  // Set the countries displayed
  useEffect(() => {
    if (countriesLoading || currenciesLoading) return;

    if (searchText === '') {
      setDisplayCountries(countries);
    } else {
      setDisplayCountries(countriesByFilter);
    }
  }, [countriesLoading, currenciesLoading, searchText]);

  // Search by filter
  useEffect(() => {
    searchByFilter({
      searchText,
    });
  }, [searchText]);

  return (
    <div>
      {`${countriesLoading} `}
      <div>
        <input className="p-1" placeholder="Search country" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      {!countriesLoading && !currenciesLoading && (
        <div className="grid grid-cols-1 gap-6">
          {displayCountries?.map(({ _id, name, alpha2Code }) => (
            <CountryCard
              key={_id}
              alpha2Code={alpha2Code}
              name={name}
              link={`/${alpha2Code}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
