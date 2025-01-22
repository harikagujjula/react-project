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
