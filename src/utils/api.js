import Header from "../components/Header/Header";

const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

const addItem = ({ name, weather, imageUrl }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const removeItem = (_id) => {
  console.log("Deleting item with _id:", _id);
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateUserData = (username, avatarUrl) => {
 return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, avatarUrl }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setCurrentUser(data); 
      setActiveModal(""); 
    })
    .catch((error) => console.error("Failed to update user data:", error));
};

export { getItems, addItem, removeItem, updateUserData };
