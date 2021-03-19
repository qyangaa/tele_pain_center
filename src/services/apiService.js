import firebase from "firebase/app";

export const requestWithToken = async ({ url, method, body }) => {
  try {
    if (body) body = JSON.stringify(body);
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body,
    });
    if (res.status == 500) throw new Error(data.error);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fileRequestWithToken = async ({ url, method, body }) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
      },
      body,
    });
    if (res.status == 500) throw new Error(data.error);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
