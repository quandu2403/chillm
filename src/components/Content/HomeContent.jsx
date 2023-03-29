import { useState, useEffect, useRef } from "react";
import * as servicesMovies from "../../services/servicesMovies";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function HomeContent() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [clickPoster, setClickPoseter] = useState(false);
  let movie = movies[0];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await servicesMovies.getPopular();
      setMovies(result);
      console.log(result);
    };
    fetchApi();
    setIsLoading(false);
  }, []);

  const handleWheel = (event) => {
    const container = event.target;
    const delta = event.deltaY || event.deltaX;

    container.scrollLeft += delta;
    setScrollLeft(container.scrollLeft);
  };

  const listRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(0);

  const handleClickScroll = (index) => {
    setSelectedItem(index);
    const list = listRef.current;
    const listItem = list.children[index];
    const scrollLeft =
      listItem.offsetLeft - list.offsetWidth / 2 + listItem.offsetWidth / 2;
    list.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const [banner, setBanner] = useState([]);

  const handleSetBanner = (item) => {
    setBanner(item);
  };
  return (
    <>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl relative left-[50%] top-[50%]" />
      ) : (
        <div className="relative h-[600px] w-auto text-white mb-[5.5rem]">
          <div className="absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[90%] border-2 rounded-xl border-transparent">
            <div className="h-full w-full ">
              <>
                <div
                  className={`w-full h-[600px] duration-300 ${
                    clickPoster ? "active: animate-fade-in" : ""
                  } `}
                  onAnimationEnd={() => {
                    setClickPoseter(false);
                  }}
                >
                  <div className="absolute flex justify-start w-full h-[600px] bg-gradient-to-r from-black/90"></div>
                  <img
                    className={`object-cover w-full h-full rounded-xl   `}
                    src={`https://image.tmdb.org/t/p/original${
                      banner.backdrop_path
                        ? banner.backdrop_path
                        : movie?.backdrop_path
                    }`}
                    alt={banner?.title}
                  />
                </div>

                <div className="absolute w-full top-[15%] p-4 md:p-8 flex flex-col justify-start">
                  <h1 className="text-2xl md:text-4xl min-[280px]:w-[16rem] md:w-[26rem] font-bold  h-[4rem]  my-4">
                    {banner.title ? banner.title : movie?.title}
                  </h1>
                  <p className="text-gray-500 text-base my-4">
                    {banner.release_date
                      ? (banner?.release_date).slice(0, -6)
                      : movie?.release_date &&
                        (movie?.release_date).slice(0, -6)}
                  </p>
                  <p className="w-full md:max-w-[70%] lg:max-w-[50%]  text-gray-300 md:my-4 min-[280px]:my-2  h-[5rem]">
                    {truncateString(
                      banner.overview ? banner.overview : movie?.overview,
                      150
                    )}
                  </p>

                  <div className=" rounded-lg lg:text-xl min-[280px]:text-sm  md:my-2 min-[280px]:my-6  ">
                    <button
                      className="bg-red-700 hover:bg-red-500 text-white font-semibold py-2 px-4 border  border-transparent duration-200 rounded-lg shadow"
                      onClick={() => {
                        navigate(`/movie/${banner?.id || movie?.id}`);
                      }}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>

                <div className="fixed lg:w-[400px] min-[280px]:w-[300px]  h-[200px] bottom-[-90px] right-0 rounded-xl">
                  <ul
                    className=" p-10 h-full flex flex-row overflow-x-scroll scroll-smooth scrollbar-none "
                    ref={listRef}
                    onWheel={handleWheel}
                  >
                    {movies.map((item, index) => (
                      <li
                        key={item.id}
                        className={`ml-3 w-full flex items-center duration-300 `}
                        onClick={() => {
                          if (item.id === banner.id) {
                            return; // Do nothing if clicked on the already active movie
                          }
                          handleClickScroll(index);
                          handleClick(index);
                          handleSetBanner(item);
                          setClickPoseter(true);
                        }}
                      >
                        <div className="w-24 duration-300">
                          <img
                            className={` object-cover w-full rounded-xl border-2 hover:scale-110 duration-300 ${
                              selectedItem === index
                                ? " border-white"
                                : "brightness-50 border-transparent"
                            }`}
                            src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                            alt="test"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeContent;
