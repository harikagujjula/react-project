// Improving code structure by moving the HTTP request code to a separate file as a util function.
export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  // Throw error if no response is received.
  if (!response.ok) {
    throw new Error(resData.message || "Failed to fetch places.");
  }
  return resData.places;
}

// Function to fetch the user selected places.
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  // Throw error if no response is received.
  if (!response.ok) {
    throw new Error(resData.message || "Failed to fetch user places.");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    // Request body of outgoing request should be stringified and match the accepted format by the server.
    body: JSON.stringify({ places: places }),
    // Extra metadata to inform the server that the incoming request body is JSON.
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Failed to update user places.");
  }
  // As the update function is returning a message.
  return resData.message;
}
