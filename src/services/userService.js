export const register = (username, password, role, adminKey, name) =>
  fetch("http://localhost:8080/api/register", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password, role, adminKey, name }),
    headers: { "content-type": "application/json" },
  }).then((response) => response.json());

export const login = (username, password) =>
  fetch("http://localhost:8080/api/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });

export const getSessionUser = () =>
  fetch("http://localhost:8080/api/currentUser", {
    credentials: "include",
  });

export const getUser = (username) =>
  fetch(`http://localhost:8080/api/users/${username}`, {
    credentials: "include",
  });

export const logOut = () => {
  fetch(`http://localhost:8080/api/logout`, {
    method: "POST",
    credentials: "include",
  });
};
