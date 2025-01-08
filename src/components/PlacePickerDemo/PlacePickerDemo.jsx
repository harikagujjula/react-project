import { useEffect, useRef, useState } from 'react';

import PPPlaces from './PPPlaces.jsx';
import { AVAILABLE_PLACES } from './placePickerData.js';
import PPModal from './PPModal.jsx';
import PPDeleteConfirmation from './PPDeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';
import './PlacePickerDemo.css';

export default function PlacePickerDemo() {
  // Getting the selected places from the local storage so that on Page reload the selected places are not lost.
  // Note commenting this for now as it seems to break.
  // const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  // const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

  // Deleting this ref and using state.
  // const modal = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // Get the user's current location.
  // This code here is called a side effect as this does not directly affect the UI and is not part of the render cycle.
  // Also, this code takes some time as it depends on Users acceptance of location access.

  // navigator.geolocation.getCurrentPosition((position) => {
  //   const sortedPlaces = sortPlacesByDistance(
  //     AVAILABLE_PLACES,
  //     position.coords.latitude,
  //     position.coords.longitude
  //   );

  //   // Calling setAvailablePlaces to update the state with the sorted places.
  //   setAvailablePlaces(sortedPlaces);
  // });

  /* Demo usage of useEffect() hook.

    - This above code causes infinite loop as setAvailablePlaces updates the
    state and so the component PlacePickerDemo re-executes which inturn calls
    the setAvailablePlaces() and so on. Hence we use useEffect() hook to ensure
    such code will be executed only after the whole component execution is completed.

    - useEffect() hook accepts 2 arguments, one - function that causes side effect
    and 2.dependencies. Each time there is a change in the dependencies, the
    useEffect() hook re-executes. If there is not change in the dependencies or
    it is empty, the code inside useEffect will execute only once.

    - Also note that, not all Side effects can make use of useEffect(). As this
    will be an extra execution cycle after the component execution is done.
  */
  useEffect(() => {
    // navigator provided by the browser to get the current location of the user.
    navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );

    // Calling setAvailablePlaces to update the state with the sorted places.
    setAvailablePlaces(sortedPlaces);
  });
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /* Demo of no useEffect() hook usage.

      - Using Localstorage to store the picked places, so that they are not lost
      even on page reload/close of browser.
      - Note that this does not need usage of useEffect(). As this is not a side
      effect that affects the UI, even though we update the state here.
    */
    const storedIds = localStorage.getItem('selectedPlaces') || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);

    const storedIds = localStorage.getItem('selectedPlaces') || [];
    // selectedPlace.current is the id of the place that is to be removed that is clicked.
    localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter(id => id !== selectedPlace.current)));
  }

  return (
    <>
      <PPModal open={modalIsOpen}>
        <PPDeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </PPModal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <PPPlaces
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <PPPlaces
          title="Available Places"
          places={availablePlaces}
          fallbackText={'Sorting places by Distance. Please ensure location access is enabled.'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

