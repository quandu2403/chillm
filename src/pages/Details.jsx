import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RowDetails from "../components/Row/RowDetails";
import * as details from "../services/details";
import ModalTrailer from "../components/Modal/ModalTrailer";
import ModalWacth from "../components/Modal/ModalWatch";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Details() {
  const [movie, setMovie] = useState([]);
  const [creadits, setCreadits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalWatch, setOpenModalWatch] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const handleThumbnailClick = (videoId) => {
    setSelectedVideoId(videoId);
    setOpenModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      const result1 = await details.getDetail(params.category, params.id);
      const result2 = await details.getCreadits(params.category, params.id);
      const result3 = await details.getVideo(params.category, params.id);
      setMovie(result1);
      setCreadits(result2);
      setVideos(result3);
      console.log(result1);
    };
    fetchApi();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location]);

  let trailer = videos.filter((e) => {
    return e.type === "Trailer";
  });

  console.log(trailer);

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
        <div className="overflow-y-hide w-full flex flex-col">
          <div className="mb-24">
            <div className={`w-full h-[700px] duration-300  `}>
              <div className="absolute flex justify-start w-full h-[720px] bg-gradient-to-t from-black"></div>
              <img
                className={`object-cover w-full h-full`}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie?.title || movie?.name}
              />
            </div>
            <div className="absolute w-full top-[30%] p-[4x] md:p-8 flex flex-row justify-start">
              <div className="ml-32 w-auto ">
                <img
                  className={`object-cover w-[450px] rounded-lg`}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie?.title || movie?.name}
                />
              </div>
              <div className=" flex flex-col justify-center items-start w-full h-full ml-10 ">
                <h1 className="text-6xl  text-white">
                  {movie?.title || movie?.name}
                </h1>
                <div className="flex flex-row text-white  my-10">
                  {movie?.genres &&
                    movie.genres.map((genre, index) => (
                      <div key={index} className="p-2 w-full">
                        {genre.name.length < 10 && (
                          <div className="w-[140px] bg-slate-300/40 p-2 rounded-full font-medium flex justify-center">
                            {genre.name}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <p className="text-gray-500 text-lg p-2">
                  {movie?.release_date?.slice(0, -6) ||
                    movie?.first_air_date?.slice(0, -6)}
                </p>
                <p className="w-full md:max-w-[90%] lg:max-w-[70%] xl:max-w-[65%] text-gray-300 my-4 h-[7rem] p-2 text-xl ">
                  {truncateString(movie?.overview, 250)}
                </p>

                <div className=" rounded-lg text-xl  mt-6 ml-2 ">
                  <button
                    className="bg-red-700 hover:bg-red-500 text-white font-semibold py-2 px-4 border  border-transparent duration-200 rounded-lg shadow"
                    onClick={() => {
                      setOpenModalWatch(true);
                    }}
                  >
                    Watch Now
                  </button>
                  <ModalWacth
                    open={openModalWatch}
                    onClose={() => setOpenModalWatch(false)}
                    params={params}
                    seasons={movie?.seasons}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center py-4">
            <span class="flex-shrink text-4xl text-white px-4  font-bold ml-20">
              Cast
            </span>

            <div class="flex-grow h-px bg-gray-400 opacity-30"></div>
          </div>
          <div className=" flex flex-col justify-evenly bg-black w-auto top-[30%] relative ">
            <div className="flex flex-row w-full justify-around">
              {creadits.slice(0, 3).map((item) => (
                <div className="flex flex-row p-6 hover:bg-slate-400/25 rounded-lg cursor-pointer duration-200">
                  <img
                    className="w-20 h-20 object-cover rounded-full"
                    src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  />
                  <div className="flex flex-col justify-center px-2 text-white">
                    <p>{item.name}</p>
                    <p>{item.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {trailer.length > 0 && (
            <>
              <div class="flex items-center py-4">
                <span class="flex-shrink text-4xl text-white px-4  font-bold ml-20">
                  Trailer
                </span>

                <div class="flex-grow h-px bg-gray-400 opacity-30"></div>
              </div>
              <div className="flex flex-row w-3/4 relative left-24">
                {trailer.map((item) => (
                  <div className="flex flex-row  p-2 hover:bg-slate-400/25 rounded-lg cursor-pointer duration-200">
                    <div
                      className="video-thumbnail"
                      onClick={() => handleThumbnailClick(item.key)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                        alt="YouTube video thumbnail"
                      />
                      <div className="play-button"></div>
                    </div>
                    <ModalTrailer
                      open={openModal}
                      onClose={() => setOpenModal(false)}
                      id={selectedVideoId}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {movie.number_of_seasons > 0 && (
            <div className="overflow-hidden">
              <div class="flex items-center py-4 ">
                <span class="flex-shrink text-4xl text-white px-4  font-bold ml-20">
                  Seasons
                </span>

                <div class="flex-grow h-px bg-gray-400 opacity-30"></div>
              </div>
              <div className="flex flex-row w-full relative left-24 overflow-y-auto scroll-smooth whitespace-nowrap">
                {movie.seasons.map((item) => (
                  <div
                    className="flex flex-col mr-2 p-3 hover:bg-slate-400/25 rounded-lg cursor-pointer duration-200"
                    onClick={() => {
                      setOpenModalWatch(true);
                    }}
                  >
                    <div className="video-thumbnail">
                      <img
                        className={`object-cover w-[150px] h-[235px] rounded-lg`}
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item?.name}
                      />
                    </div>
                    <h1 className="text-white flex justify-center text-lg p-2">
                      {truncateString(item?.name, 10)}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div class="flex items-center py-4">
            <span class="flex-shrink text-4xl text-white px-4  font-bold ml-20">
              You may like
            </span>

            <div class="flex-grow h-px bg-gray-400 opacity-30"></div>
          </div>

          <RowDetails category={params.category} id={params.id} />
        </div>
      )}
    </>
  );
}

export default Details;
