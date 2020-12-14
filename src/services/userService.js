import { url } from "./urlRoot";

export const register = (username, password, role, adminKey, name) =>
  fetch(`${url}/api/register`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password, role, adminKey, name }),
    headers: { "content-type": "application/json" },
  }).then((response) => response.json());

export const login = (username, password) =>
  fetch(`${url}/api/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });

export const getSessionUser = () =>
  fetch(`${url}/api/currentUser`, {
    credentials: "include",
  });

export const getUser = (username) =>
  fetch(`${url}/api/users/${username}`, {
    credentials: "include",
  });

export const logOut = () => {
  return fetch(`${url}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const blockUser = (userId) =>
  fetch(`${url}/api/users/block/${userId}`, {
      method: "PUT",
      credentials: "include"
  }).then((response) => response.json());

export const unblockUser = (userId) =>
    fetch(`${url}/api/users/unblock/${userId}`, {
        method: "PUT",
        credentials: "include"
    }).then((response) => response.json());

export const editUser = (user) =>
    fetch(`${url}/api/users`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json",
        }
    }).then((response) => response.json());
