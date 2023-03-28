import * as httpRequest from "../utils/httpRequest";

export const searchMovies = async (
  query = "",
  api_key = "27368db08294b4b5dd1db45c2039ce61",
  page = 1
) => {
  try {
    const res = await httpRequest.get("search/multi", {
      params: {
        api_key,
        query,
        page,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTrending = async (
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get("trending/all/day", {
      params: {
        api_key,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRate = async (
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get("movie/top_rated", {
      params: {
        api_key,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopular = async (
  api_key = "27368db08294b4b5dd1db45c2039ce61",
  page = 1
) => {
  try {
    const res = await httpRequest.get("movie/popular", {
      params: {
        api_key,
        page,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const getUpComming = async (
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get("movie/upcoming", {
      params: {
        api_key,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const discoverMovies = async (
  page = 1,
  api_key = "27368db08294b4b5dd1db45c2039ce61"
) => {
  try {
    const res = await httpRequest.get("discover/movie", {
      params: {
        api_key,
        page,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const discoverSeries = async (
  page = 1,
  api_key = "27368db08294b4b5dd1db45c2039ce61",
  sort_by = "popularity.desc"
) => {
  try {
    const res = await httpRequest.get("discover/tv", {
      params: {
        api_key,
        page,
        sort_by,
      },
    });
    return res.results;
  } catch (error) {
    console.log(error);
  }
};
