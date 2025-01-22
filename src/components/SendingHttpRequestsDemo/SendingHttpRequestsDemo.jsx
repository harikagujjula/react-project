import { useRef, useState, useCallback } from 'react';

import SHDPlaces from './SHDPlaces.jsx';
import SHDModal from './SHDModal.jsx';
import SHDDeleteConfirmation from './SHDDeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import SHDAvailablePlaces from './SHDAvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';
import Error from './Error.jsx';

function SendingHttpRequestsDemo() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // Saving the selected places back to the server.

    // Note that userPlaces is not still updated with the new place and will
    //  only be updated after the component re-executes. So we manually add the
    //  new place along with prevplaces/prev state.

    // Since this operation may take some time to complete, we can use async/await.

    // Also adding try/catch block to handle any errors that might occur during the update request.
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    }
    catch (error) {
      // If the error occurs while PUT request, the userplaces in the UI should also not be updated. So we can revert the state.
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to update user places.'});
      console.error(error);
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    // Sending http request to update the user places after removing the selected place.
    try {
      await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
    }
    catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to Delete user places.'});
      console.error(error);
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  return (
    <>
      <SHDModal open={errorUpdatingPlaces} onClose={() => setErrorUpdatingPlaces(null)}>
        {errorUpdatingPlaces && (
          <Error
          title="An error occured"
          message={errorUpdatingPlaces.message}
          onConfirm={() => setErrorUpdatingPlaces(null)}
          />
        )}
      </SHDModal>
      <SHDModal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <SHDDeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </SHDModal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <SHDPlaces
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <SHDAvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default SendingHttpRequestsDemo;
