import { requestWithToken, fileRequestWithToken } from "./apiService";

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

export const updateUserProfile = async (user, image) => {
  try {
    const data = await requestWithToken({
      url: "patient/profile",
      method: "PUT",
      body: user,
    });
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const imageData = await fileRequestWithToken({
        url: "user/image",
        method: "post",
        body: formData,
      });
      data.imageUrl = imageData.fileUrl;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
