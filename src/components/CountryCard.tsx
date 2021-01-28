import React from 'react';
import { Link } from '@reach/router';

interface CountryCardProps {
  link: string,
  alpha2Code: string,
  name: string,
}

const CountryCard: React.FC<CountryCardProps> = ({
  link, alpha2Code, name,
}) => (
  <Link to={link}>
    <div className="flex flex-col cursor-pointer p-8 rounded-3xl w-full hover:shadow-xl shadow-lg transition duration-200 ease-in-out">
      <span className="text-lg font-semibold mb-1">
        {name}
      </span>
      <span className="text-sm">
        {alpha2Code}
      </span>
    </div>
  </Link>
);

export default CountryCard;
