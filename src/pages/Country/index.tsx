import React from 'react';
import { Link } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import Loader from '../../components/Loader';

interface DetailCardProps {
  title: string,
  value: any,
}

const DetailCard: React.FC<DetailCardProps> = ({ title, value }) => {
  if (value === undefined || value === '') return null;

  return (
    <div className="flex-1 p-5 rounded-lg border border-gray-300">
      <span className="block text-xl font-semibold mb-1 sm:mb-2">{title}</span>
      <span>
        {value}
      </span>
    </div>
  );
};

interface CountryProps {
  path: string,
  country?: string,
}

const GET_COUNTRY = gql`
  query Country($country: String!) {
    Country (alpha2Code:$country) {
      _id,
      name,
      alpha2Code,
      population,
      populationDensity,
      demonym,
      capital,
      area,
      nativeName,
    }
  }
`;

const CountryDetail: React.FC<CountryProps> = ({ country }) => {
  const { data, loading } = useQuery(GET_COUNTRY, {
    variables: {
      country,
    },
  });

  if (loading) return <Loader />;

  if (data?.Country.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-xl sm:text-4xl">
          This country does not exist
        </h1>
      </div>
    );
  }

  const [countryData] = data?.Country;
  const {
    alpha2Code, name, population, populationDensity, demonym, capital, area, nativeName,
  } = countryData;

  return (
    <div className="bg-white rounded-lg p-8 md:mb-5">
      <div className="flex items-center mb-5">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">
            {name}
            <span className="text-gray-400 font-semibold">{` (${alpha2Code})`}</span>
          </h1>
        </div>
        <Link to="/">
          <span className="material-icons text-3xl">close</span>
        </Link>
      </div>
      <div className="flex flex-wrap gap-6">
        <DetailCard title="Demonym" value={demonym} />
        <DetailCard title="Capital" value={capital} />
        <DetailCard title="Population" value={population} />
        <DetailCard title="Density" value={populationDensity} />
        <DetailCard title="Area" value={area} />
        <DetailCard title="Native Name" value={nativeName} />
      </div>
    </div>
  );
};

export default CountryDetail;
