import { requestWithToken } from "./apiService";

export const getUserProfile = async () => {
  try {
    const data = await requestWithToken({
      url: "user",
      method: "GET",
    });
    if (!data) return;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (user) => {
  try {
    const data = await requestWithToken({
      url: "/patient/profile",
      method: "PUT",
      body: user,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
