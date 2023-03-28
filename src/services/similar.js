import * as httpRequest from "../utils/httpRequest";

export const getSimilar = async (
  media_type,
  id,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get(`${media_type}/${id}/similar`, {
      params: {
        api_key,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};
