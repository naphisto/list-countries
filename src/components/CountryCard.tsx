import React from 'react';
import { Link } from '@reach/router';

interface CountryCardProps {
  link: string,
  alpha2Code: string,
  name: string,
  population: number,
}

const CountryCard: React.FC<CountryCardProps> = ({
  link, alpha2Code, name, population,
}) => (
  <Link to={link}>
    <div className="cursor-pointer border-4 border-white hover:border-indigo-500 bg-white flex p-5 rounded-lg w-full transition duration-200 ease-in-out">
      <div className="w-14 h-14 sm:w-20 sm:h-20 mr-4 sm:mr-6 bg-indigo-100 rounded-md flex justify-center items-center">
        <span className="text-xl sm:text-2xl font-semibold">
          {alpha2Code}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
          {name}
        </span>
        <span className="text-sm sm:text-base font-semibold text-gray-300">
          {`Population: ${population}`}
        </span>
      </div>
    </div>
  </Link>
);

export default CountryCard;
