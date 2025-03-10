import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
const uploadImage = async (imageFile) => {
  const formDta = new FormData();
  //append imageFile to form data
  formDta.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formDta,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error upload the image", error);
    throw error;
  }
};
export default uploadImage;
