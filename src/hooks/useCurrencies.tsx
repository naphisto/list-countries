import { gql, useQuery } from '@apollo/client';

interface Currency {
  _id: string,
  code: string,
  name: string,
  symbol: string,
}

interface UseCurrencies {
  currencies: Array<Currency>,
  loading: boolean,
}

const GET_CURRENCIES = gql`
  {
    Currency {
      _id,
      code,
      name,
      symbol,
    }
  }
`;

const useCurrencies = (): UseCurrencies => {
  const { data, loading } = useQuery(GET_CURRENCIES);

  return {
    currencies: data?.Currency,
    loading,
  };
};

export default useCurrencies;
