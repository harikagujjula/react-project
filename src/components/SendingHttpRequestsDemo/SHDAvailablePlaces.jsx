import { useEffect, useState } from 'react';
import SHDPlaces from './SHDPlaces.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from './SHDloc.js';
import { fetchAvailablePlaces } from './http.js';

export default function SHDAvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();


  /* Making a Http request and fetching(broswer function) the data from a file
   stored in a different server.

   fetch here simply is GET request that returns a promise, so we can use .then()
   to handle the response when the promise is resolved(request or response is
   successful). A promise is a standard javascript object that will yield
   different values depending on the state of the promise. To access values,
   we can chain methods like .then() and .catch() to the promise object.

  fetch ('http://localhost:3000/places').then((response) => {
    Function to handle once the response is returned.
  });

  Modern javascript allows us to use async/await syntax to handle promises.
  But we need to use the async keyword in the function definition to use await
  which is not allowed for Component functions as thats a restriction implied by React.
  */

  // useEffect(() => {
  //   const response = fetch ('http://localhost:3000/places').then((response) => {
  //     // Available methos on response object: json(), text(), blob(), arrayBuffer(), formData().
  //     // The json() returns another promise, so we can chain another .then() to handle the response.
  //     return response.json();
  //   }).then((resData) => {
  //     // resData is the parsed JSON data from the response.
  //     // (Check backend > app.js > app.get('/places'.....)

  //     /* Updating the state with the fetched data here might cause an infinite
  //       loop as component executes > fetches data > updates state as below >
  //       re-executes component > fetches ... and so an infintite loop.

  //       To fix this, we can use useEffect() hook to execute the fetch only once.*/
  //     setAvailablePlaces(resData.places);
  //   });
  // }, []);

  useEffect(() => {
    // Using async/await syntax to handle promises. Note that componnent
    // functions cannot be async. So we can define an async function inside.
    async function fetchPlaces() {

      // There could be chances of the request sent failing due to network issues or
      //  server crash and receiving no response or error response. So using try/ctach.
      try {
        const places = await fetchAvailablePlaces();

        // Fetching users location using browser's geolocation API.
        navigator.geolocation.getCurrentPosition((position) => {
          // This again is might take some time to fetch the location, so we are
          //  using this callback pattern to handle the data.

          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          // setAvailablePlaces should be inside try block so that we set only when we have the data.
          setAvailablePlaces(places);
        });
      }
      catch (error) {
        setError({message: error.message || 'Failed to fetch places.'});
      }
    }

    // Calling fetchPlaces().
    fetchPlaces();
  }, []);

  // Handling/Showing any errors that might have occured during the fetch.
  if (error) {
    return <Error title="An error occured" message={error.message}/>;
  }

  return (
    <SHDPlaces
      title="Available Places"
      places={availablePlaces}
      // Adding a Loading text to show while the data is being fetched for good user experience.
      isLoading={availablePlaces.length === 0}
      loadingText="Fetching available places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
