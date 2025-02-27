import React from 'react';

const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-md">
      <div className="w-1/3">
        <img src={imageUrl} alt={title} className="object-cover" />
      </div>
      <div className="w-2/3 p-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
