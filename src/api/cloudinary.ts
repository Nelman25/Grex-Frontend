import axios from "axios";

export const uploadImageToCloudinary = async (imageData: FormData) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    imageData
  );
  return data;
};

export const uploadFileToCloudinary = async (fileData: FormData) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
    fileData
  );
  return data;
};
