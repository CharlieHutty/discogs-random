import ClientSideFetch from '@/components/ClientFetch';

export default function Home() {
  return (
    <div>
      <div className="h-full w-full overflow-auto">
        <ClientSideFetch />
      </div>
    </div>
  );
}
