import React from 'react';
import { useRouter } from 'next/navigation';
import AlbumTitleFormatter from '@/lib/formatter/AlbumTitleFormatter';

const Card = ({ imageUrl, title, description }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/album/${AlbumTitleFormatter(title)}`);
  };

  return (
    <div
      className="max-w-sm transform overflow-hidden rounded-2xl shadow-md shadow-gray-600/50 transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm brightness-[80%]">{description}</p>
      </div>
    </div>
  );
};

export default Card;
