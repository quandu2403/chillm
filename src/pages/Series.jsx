import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as servicesMovies from "../services/servicesMovies";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Series() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await servicesMovies.discoverSeries(page);
      setMovies((prevMovies) => {
        // Filter out any new movies that already exist in the array
        const newMovies = result.filter(
          (movie) =>
            !prevMovies.some((existingMovie) => existingMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });
    };
    fetchApi();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl relative left-[50%] top-[50%]" />
      ) : (
        <div className="flex flex-col justify-center">
          <div class="flex items-center py-2 my-6 ">
            <span class="flex-shrink text-4xl px-2 text-white  font-bold lg:ml-10">
              All Series
            </span>
            <div className="flex-grow h-px bg-gray-400 opacity-30"></div>
          </div>
          <div className="xl:w-[95%] w-full xl:px-20 md:px-15">
            <div className="scrollbar-none relative h-full w-full overflow-y-hidden scroll-smooth ">
              {movies.map((item, index) => (
                <div
                  key={index}
                  className=" relative inline-block xl:w-[240px] lg:w-[230px] md:w-[240px] min-[280px]:w-[180px] min-[1180px]:w-[200px] min-[1024px]:w-[210px] cursor-pointer p-6 hover:scale-110 duration-300 overflow-hidden"
                  onClick={() =>
                    navigate(`/${item?.media_type || "tv"}/${item.id}`)
                  }
                >
                  <img
                    className="block h-auto rounded-xl"
                    src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                    alt={item?.name}
                  />
                  <div className="relative top-0 left-0 h-full w-full text-white mt-2   ">
                    <p className="flex text-lg font-bold truncate ...">
                      {truncateString(item?.name, 15)}
                    </p>
                    <div className="text-white flex flex-row justify-between items-center mt-1">
                      <div className="flex flex-row items-center">
                        <BsStarFill className="text-yellow-300 text-xs mr-1 " />
                        <div className=" bg-slate-500 px-[2px] h-full rounded-sm text-[10px] opacity-85 font-bold">
                          <p>{(item?.vote_average).toFixed(1)}</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center">
                        <p className="font-bold">
                          {item?.first_air_date?.slice(0, -6)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={loadMore}
            className="w-[150px] bg-slate-200/70 relative left-5 lg:left-24 p-2 my-2 rounded-xl duration-300 opacity-50 hover:opacity-100"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default Series;
