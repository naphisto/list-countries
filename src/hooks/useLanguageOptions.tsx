/* eslint-disable camelcase */
import { gql, useQuery } from '@apollo/client';

interface Option {
  value: string,
  label: string,
}

interface Language {
  _id: string,
  name: string,
  iso639_2: string,
}

interface UseLanguages {
  languageOptions: Array<Option>,
  languageOptionsLoading: boolean,
}

const GET_LANGUAGES = gql`
  {
    Language {
      _id,
      name,
      iso639_2,
    }
  }
`;

const useLanguages = (): UseLanguages => {
  const { data, loading: languageOptionsLoading } = useQuery(GET_LANGUAGES);

  const languageOptions = data?.Language.map(({ name, iso639_2 }: Language) => ({
    label: name,
    value: iso639_2,
  }));

  return {
    languageOptions,
    languageOptionsLoading,
  };
};

export default useLanguages;
