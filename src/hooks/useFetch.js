
/* The function name/custom hook function should start with "use" and so the file name, as in React
  the functions that start with "use" are called hooks. And React projects
  enforce certain rules on such functions. (Like React hooks cannot be used in
  nested code.) So if we rename the function as fetch(), we might see an error
  for useEffect that it can only be used in a component function or a custom hook function.
  */

import { useEffect } from 'react';

export function useFetch(fetchFn, initialValue) {
  // Using the state variables needed by useEffect and generalizing the
  // names/variables along with initial values for the state.
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);

  // Returning object with the state variables, update functions so the the component can use them.
  return {
    fetchedData,
    isFetching,
    error,
    setFetchedData
  };
}

