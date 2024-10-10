import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface ProviderMapProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const ProviderMap: React.FC<ProviderMapProps> = ({ latitude, longitude }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Store your API key in .env.local
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default ProviderMap;
