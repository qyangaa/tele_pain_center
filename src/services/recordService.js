import { requestWithToken, fileRequestWithToken } from "./apiService";

export const getRecords = async (patientUid) => {
  try {
    const data = await requestWithToken({
      url: `records/${patientUid}`,
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
      url: "/patient/profile",
      method: "PUT",
      body: user,
    });
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const imageData = await fileRequestWithToken({
        url: "/user/image",
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

export const getFileUrl = async (patientUid, fileName) => {
  try {
    const data = await requestWithToken({
      url: `url/${patientUid}`,
      method: "POST",
      body: { filename: fileName },
    });

    if (!data) return;
    return data.url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadRecordFile = async (patientUid, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const fileData = await fileRequestWithToken({
      url: `/file/${patientUid}`,
      method: "POST",
      body: formData,
    });
    return fileData.fileName;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadRecord = async (patientUid, record) => {
  try {
    const res = await requestWithToken({
      url: `/records/${patientUid}`,
      method: "POST",
      body: record,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRecord = async (patientUid, recordId) => {
  try {
    const res = await requestWithToken({
      url: `/records/${patientUid}`,
      method: "DELETE",
      body: { recordId },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
