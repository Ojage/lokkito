import React from 'react';
import lokkalokkitoLogo from '../../assets/images/LogoLoka_Lokkito.png';


interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <img
        src={lokkalokkitoLogo}
        alt="Lokka Lokkito Logo"
        className="w-12 h-12 rounded-full"
      />
      <span className="text-xl font-semibold text-gray-900">{title}</span>
    </div>
  );
};