'use client';
import {useEffect, useState } from 'react';
import Image from 'next/image';
import { Release } from '@/lib/types/Release';

export default function RandomRelease() {
  const [randomRelease, setRandomRelease] = useState<Release | null>(null);

  useEffect(() => {
    const collection = sessionStorage.getItem('collection');
    if (collection) {
        const parsed = JSON.parse(collection);
        console.log('Parsed collection:', parsed);
        const releases = parsed.releases || [];
        if (releases.length > 0) {
          const random: Release = releases[Math.floor(Math.random() * releases.length)];
          setRandomRelease(random);
        }
    }
  }, []);

  if (!randomRelease) return <p>No releases found.</p>;
  return (
      <Image
        src={randomRelease.basic_information.cover_image}
        alt={randomRelease.basic_information.title}
        width={1000}
        height={1000}
        className="w-full h-full object-cover animate-spin-slow"
        unoptimized
        />
  );
}