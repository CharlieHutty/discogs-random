'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Release } from '@/lib/types/Release';
import Card from '@/components/Card';

export default function ClientSideFetch() {
  const { data: session } = useSession();
  interface ApiResponse {
    releases: Release[];
  }

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/collection', { cache: 'force-cache' })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (!session) return <p>Sign in to view your collection</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data?.releases.map((release: Release) => {
        return (
          <Card
            imageUrl={release.basic_information.cover_image}
            title={release.basic_information.title}
            description={release.basic_information.artists[0].name}
            key={release.id}
          />
        );
      })}
    </div>
  );
}
