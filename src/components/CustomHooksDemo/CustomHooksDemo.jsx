import { useRef, useState, useCallback } from 'react';

import CHDPlaces from './CHDPlaces.jsx';
import CHDModal from './CHDModal.jsx';
import CHDDeleteConfirmation from './CHDDeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import CHDAvailablePlaces from './CHDAvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import CHDError from './CHDError.jsx';
import './CustomHooksDemo.css';
import { useFetch } from '../../hooks/useFetch.js';

function CustomHooksDemo() {
  const selectedPlace = useRef();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Moving useEffect to a custom hook along with the state variables and
  // calling the custom hook with the fetchUserPlaces() and initial state value
  // for data as params.
  const {fetchedData: userPlaces, isFetching, error, setFetchedData: setUserPlaces} = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places.',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <CHDModal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <CHDError
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </CHDModal>

      <CHDModal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <CHDDeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </CHDModal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <CHDError title="An error occurred!" message={error.message} />}
        {!error && (
          <CHDPlaces
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <CHDAvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default CustomHooksDemo;

