import StoreMap from '@/components/common/StoreMap';

export default function MapContainer({ location }: { location: string }) {
  return (
    <div className='w-full mt-16 max-md:hidden'>
      <StoreMap address={location} $applicationDetail />
    </div>
  );
}
