import { baseUrl, tokenKey } from "../constants";

export async function getTasks() {
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await fetch(baseUrl + "/tasks", options);

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.assign(window.location);
    return;
  }

  if (response.ok) {
    return response.json();
  } else {
    const body = await response.json();
    const error =
      body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    return Promise.reject(new Error(error));
  }
}

export async function createTask(taskData) {
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(baseUrl + "/tasks", options);

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.assign(window.location);
    return;
  }

  if (response.ok) {
    return response.json();
  } else {
    const body = await response.json();
    const error =
      body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    return Promise.reject(new Error(error));
  }
}

export async function editTask(id, editData) {
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "PATCH",
    body: JSON.stringify(editData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(baseUrl + `/tasks/${id}`, options);

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.assign(window.location);
    return;
  }

  if (response.ok) {
    return response.json();
  } else {
    const body = await response.json();
    const error =
      body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    return Promise.reject(new Error(error));
  }
}

export async function deleteTask(id) {
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseUrl + `/tasks/${id}`, options);

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.assign(window.location);
    return;
  }

  if (response.ok) {
    return;
  } else {
    const body = await response.json();
    const error =
      body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    return Promise.reject(new Error(error));
  }
}