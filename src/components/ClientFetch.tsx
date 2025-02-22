'use client';
import { useEffect, useState } from 'react';

export default function ClientSideFetch() {
  interface ApiResponse {
    releases: Release[];
  }

  interface Release {
    id: number;
    basic_information: {
      title: string;
      year: number;
    };
  }

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/collection')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <ul>
          {data?.releases.map((release: Release) => (
            <li key={release.basic_information.title}>{release.basic_information.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
