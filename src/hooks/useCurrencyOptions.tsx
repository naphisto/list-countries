import { gql, useQuery } from '@apollo/client';

interface Option {
  value: string,
  label: string,
}

interface Currency {
  _id: string,
  code: string,
  name: string,
}

interface UseCurrencies {
  currencyOptions: Array<Option>,
  currencyOptionsLoading: boolean,
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

const useCurrencyOptions = (): UseCurrencies => {
  const { data, loading: currencyOptionsLoading } = useQuery(GET_CURRENCIES);

  const currencyOptions = data?.Currency.map(({ code, name }: Currency) => ({
    label: name,
    value: code,
  }));

  return {
    currencyOptions,
    currencyOptionsLoading,
  };
};

export default useCurrencyOptions;
