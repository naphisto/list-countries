import { gql, useQuery } from '@apollo/client';

interface Country {
  _id: string,
  name: string,
  alpha2Code: string,
  population: number,
}

interface UseCountries {
  countriesByFilter: Array<Country>,
  countries: Array<Country>,
  loading: boolean,
  searchByFilter: any,
}

interface Filter {
  searchText: string,
}

const GET_COUNTRIES = gql`
  {
    Country {
      _id,
      name,
      alpha2Code,
      population,
    }
  }
`;

const GET_COUNTRIES_BY_FILTER = gql`
  query Country($currency: String!, $language: String!, $region: String!, $searchText: String!) {
    Country(filter: {
      AND: [
        { currencies: { code_contains: $currency } }
        { officialLanguages: { iso639_2_contains: $language } }
        { subregion: { region: { name_contains: $region } } }
      ]
      OR: [
        { alpha2Code_contains: $searchText }
        { name_contains: $searchText }
      ]
    }) {
      _id,
      name,
      alpha2Code,
      population,
    }
  } 
`;

const useCountries = (): UseCountries => {
  const { data, loading: loadingCountries } = useQuery(GET_COUNTRIES);
  const {
    data: dataByFilter,
    loading: loadingCountriesByFilter,
    refetch: refetchDataByFilter,
  } = useQuery(GET_COUNTRIES_BY_FILTER, {
    variables: {
      searchText: '',
      currency: '',
      language: '',
      region: '',
    },
  });

  const searchByFilter = (filters: Filter) => {
    refetchDataByFilter(filters);
  };

  return {
    countriesByFilter: dataByFilter?.Country,
    countries: data?.Country,
    loading: loadingCountries || loadingCountriesByFilter,
    searchByFilter,
  };
};

export default useCountries;
