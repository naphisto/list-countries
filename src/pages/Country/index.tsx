import React from 'react';

interface CountryProps {
  path: string,
  country?: string,
}

const Country: React.FC<CountryProps> = ({ country = '' }) => {
  const test = 'test';

  return (
    <div>
      {country}
      {test}
    </div>
  );
};

export default Country;
