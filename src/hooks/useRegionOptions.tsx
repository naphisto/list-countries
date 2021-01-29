import { gql, useQuery } from '@apollo/client';

interface Option {
  value: string,
  label: string,
}

interface Region {
  _id: string,
  name: string,
}

interface UseRegions {
  regionOptions: Array<Option>,
  regionOptionsLoading: boolean,
}

const GET_REGIONS = gql`
  {
    Region {
      _id,
      name,
    }
  }
`;

const useRegionOptions = (): UseRegions => {
  const { data, loading: regionOptionsLoading } = useQuery(GET_REGIONS);

  const regionOptions = data?.Region.map(({ name }: Region) => ({
    label: name,
    value: name,
  }));

  return {
    regionOptions,
    regionOptionsLoading,
  };
};

export default useRegionOptions;
