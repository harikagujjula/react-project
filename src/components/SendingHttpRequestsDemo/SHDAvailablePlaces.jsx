import { useEffect, useState } from 'react';
import SHDPlaces from './SHDPlaces.jsx';

export default function SHDAvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /* Making a Http request and fetching(broswer function) the data from a file
   stored in a different server.

   fetch here simply is GET request thatreturns a promise, so we can use .then()
   to handle the response when the promise is resolved(request or response is
   successful). A promise is a standard javascript object that will yield
   different values dependeing on the state of the promise. To access values,
   we can chain methods like .then() and .catch() to the promise object.

  fetch ('http://localhost:3000/places').then((response) => {
    Function to handle once the response is returned.
  });

  Modern javascript allows us to use async/await syntax to handle promises.
  But we need to use the async keyword in the function definition to use await
  which is not allowed for Component functions as thats a restriction implied by React.
  */

  useEffect(() => {
    const response = fetch ('http://localhost:3000/places').then((response) => {
      // Available methos on response object: json(), text(), blob(), arrayBuffer(), formData().
      // The json() returns another promise, so we can chain another .then() to handle the response.
      return response.json();
    }).then((resData) => {
      // resData is the parsed JSON data from the response.
      // (Check backend > app.js > app.get('/places'.....)

      /* Updating the state with the fetched data here might cause an infinite
        loop as component executes > fetches data > updates state as below >
        re-executes component > fetches ... and so an infintite loop.

        To fix this, we can use useEffect() hook to execute the fetch only once.*/
      setAvailablePlaces(resData.places);
    });
  }, []);

  return (
    <SHDPlaces
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
