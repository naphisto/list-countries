import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CountryCard from '../../components/CountryCard';
import Loader from '../../components/Loader';
import useCountries from '../../hooks/useCountries';
import useCurrencyOptions from '../../hooks/useCurrencyOptions';
import useLanguageOptions from '../../hooks/useLanguageOptions';
import useRegionOptions from '../../hooks/useRegionOptions';

interface CountriesProps {
  path: string,
}

interface Country {
  _id: string,
  name: string,
  alpha2Code: string,
  population: number,
}

const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: '100%',
    borderColor: '#D1D5DB',
    borderRadius: '.375rem',
  }),
};

const Countries: React.FC<CountriesProps> = () => {
  const [filters, setFilters] = useState({
    searchText: '',
    currency: '',
    language: '',
    region: '',
  });
  const [displayCountries, setDisplayCountries] = useState<Array<Country>>([]);

  const { currencyOptions, currencyOptionsLoading } = useCurrencyOptions();
  const { languageOptions, languageOptionsLoading } = useLanguageOptions();
  const { regionOptions, regionOptionsLoading } = useRegionOptions();

  const {
    countries,
    countriesByFilter,
    loading: countriesLoading,
    searchByFilter,
  } = useCountries();

  // Set the countries displayed
  useEffect(() => {
    if (countriesLoading) return;

    if (filters.searchText === '' && filters.currency === '' && filters.language === '' && filters.region === '') {
      setDisplayCountries(countries);
    } else {
      setDisplayCountries(countriesByFilter);
    }
  }, [countries, countriesByFilter, countriesLoading, filters.searchText]);

  // Search by filter
  useEffect(() => {
    searchByFilter(filters);
  }, [filters]);

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <input
          onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
          className="p-4 border-gray-300 col-span-3 sm:col-span-4 lg:col-span-2 text-base rounded-lg border outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search country"
        />
        <Select
          options={currencyOptions}
          isLoading={currencyOptionsLoading}
          isClearable
          onChange={(option) => setFilters({ ...filters, currency: option?.value || '' })}
          placeholder="Select a currency"
          styles={selectStyles}
          className="w-full hidden lg:block"
        />
        <Select
          options={languageOptions}
          isLoading={languageOptionsLoading}
          isClearable
          onChange={(option) => setFilters({ ...filters, language: option?.value || '' })}
          placeholder="Select a language"
          styles={selectStyles}
          className="w-full hidden lg:block"
        />
        <Select
          options={regionOptions}
          isLoading={regionOptionsLoading}
          isClearable
          onChange={(option) => setFilters({ ...filters, region: option?.value || '' })}
          placeholder="Select a region"
          styles={selectStyles}
          className="w-full hidden lg:block"
        />
        <button
          className="lg:hidden bg-white h-full col-span-1 sm:col-span-1 p-3 rounded-lg border border-gray-300 flex justify-center items-center cursor-pointer hover:bg-gray-100"
          type="button"
        >
          <span className="material-icons">filter_list</span>
        </button>
      </div>
      {!countriesLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {displayCountries?.map(({
            _id, name, alpha2Code, population,
          }) => (
            <CountryCard
              key={_id}
              alpha2Code={alpha2Code}
              name={name}
              link={`/${alpha2Code}`}
              population={population}
            />
          ))}
        </div>
      ) : <Loader />}
    </div>
  );
};

export default Countries;
