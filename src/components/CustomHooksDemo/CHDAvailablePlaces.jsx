import CHDPlaces from './CHDPlaces.jsx';
import CHDError from './CHDError.jsx';
import { sortPlacesByDistance } from './loc.js';
import { fetchAvailablePlaces } from './http.js';
import { useFetch } from '../../hooks/useFetch.js';

// Creating a seperate function to get sorted places by distance from the user's
//  location, so that we can use it in the custom hook. This is part of code
//  present in useEffect() in this component.
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  // Since fetchFn() is using await, we are returning the promise here.
  // i.e. fetchFn() is expecting a promise and so we are creating a new promise here.
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      // Once we have the sorted places, we are resolving the promise, i.e
      //  letting know the fetchFn() that we have the data.
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {

  // Replacing useEffect() code with a custom hook useFetch() and passing the
  // fetchSortedPlaces() function, initial state value as params.
  const {fetchedData: availablePlaces, isFetching, error } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <CHDError title="An error occurred!" message={error.message} />;
  }

  return (
    <CHDPlaces
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
