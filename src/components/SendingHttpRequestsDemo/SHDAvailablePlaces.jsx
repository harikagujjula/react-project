import SHDPlaces from './SHDPlaces.jsx';

export default function SHDAvailablePlaces({ onSelectPlace }) {
  return (
    <SHDPlaces
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
