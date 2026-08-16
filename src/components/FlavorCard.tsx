import React from 'react';
import type { Flavor } from '../types/matcha';

interface FlavorCardProps {
  flavor: Flavor;
  onClick: () => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}

export const FlavorCard: React.FC<FlavorCardProps> = ({
  flavor,
  onClick,
  style,
  isActive,
}) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] md:w-[195px] md:h-[195px] rounded-[28px] sm:rounded-[36px] bg-[#f0eee5] shadow-matcha-card flex items-center justify-center p-3 sm:p-5 cursor-pointer transform-gpu transition-shadow duration-300 hover:shadow-card-hover group ${
        isActive ? 'ring-2 ring-white/30' : ''
      }`}
    >
      {/* Centered Isolated Fruit Asset */}
      <div className="w-full h-full flex items-center justify-center relative pointer-events-none">
        <img
          src={flavor.fruitImage}
          alt={flavor.fruitAlt}
          className="max-w-[76%] max-h-[76%] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
};
