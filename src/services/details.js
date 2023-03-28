import * as httpRequest from "../utils/httpRequest";

export const getDetail = async (
  media_type,
  id,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get(`${media_type}/${id}`, {
      params: {
        api_key,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCreadits = async (
  media_type,
  id,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get(`${media_type}/${id}/credits`, {
      params: {
        api_key,
      },
    });
    return res.cast;
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (
  media_type,
  id,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get(`${media_type}/${id}/videos`, {
      params: {
        api_key,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const getSeanson = async (
  id,
  num,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get(`/tv/${id}/season/${num}`, {
      params: {
        api_key,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
