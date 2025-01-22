# Tasks
  * Using the same placepicker setup but now fetching data from another backend
    server (Node.js) rather than a constant or from a file on same server.
  * Fetching data via http.
  * Usage of await/async.
  * Handling fetch using try/catch, Handling loading of data, Handling error response.
  * Store the places picked in the backend server by POST request rather than
    using local storage, so that the selected places remain showing up even after
    reloading the page.
  * Deleting/updating the places from the selected places and notice the data
    folder getting updated on successfull request.
# Goal: How to connect to a Database?
  * Initial setup: This folder provides the same Placepicker but this time with data from
    another server accessed through HTTP requests. The backend folder here has the
    code to connect to the database written in nodejs to fetch data requested.
  Notes:
  * Since the react code runs on browser(client-side application) and can be
    viewed by the end user, it is not secure to connect and manage the data
    directly in the application, as these would be exposed.
  * You communicate with the backend (API) via HTTP requests.
  * REST API is a web server (like Database server) that exposes pre-defined
    routes/urls to which you can send Http requests & data and recieve back data.
  * To fetch the data, can make use of fetch()
    ```
    fetch ('http://localhost:3000/places').then((response) => {
      Function to handle once the response is returned.
    });
    ```
  * fetch() returns a promise, meaning a Http request takes some time to fetch
    and return the response, so the response is not yet present but will be there.
  * A promise is a standard javascript object that will yield
    different values depending on the state of the promise. To access values,
    we can chain methods like .then() and .catch() to the promise object.
  * With Modern javascript another way of handling promisses is using await, async.
    * await should be used in conjuction with async.
    * React does not allow having the component functions defined as async. Hence
      we can create an async function inside the component function.
  * Ensure a loading state, Error state and Data state are all captured/handled
    in a component dealing with HTTP requests.
      * While fetching data, show a text that could say loading.
      * Show error if the fetch fails.
      * Show data once response is received.
  * Make use of try/catch blocks as fetching data could sometimes fail and so we
    let the user know about the failure.


