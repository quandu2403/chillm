import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as details from "../../services/details";

function ModalWacth({ open, onClose, params, seasons }) {
  if (!open) return null;
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState(1);
  const [listEpisode, setListEpisode] = useState([]);
  const [episode, setEpisode] = useState(1);
  const [scr, setScr] = useState();

  params.category === "tv" &&
    useEffect(() => {
      const fetchApi = async () => {
        const result = await details.getSeanson(params.id, season);
        setListEpisode(result.episodes);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      };
      fetchApi();
    }, [season]);

  useEffect(() => {
    const handleScr = () => {
      params.category === "movie"
        ? setScr(
            `https://2embed.org//embed/${params.category}?tmdb=${params.id}`
          )
        : setScr(
            `https://2embed.org//embed/series?tmdb=${params.id}&s=${season}&e=${episode}`
          );
    };
    handleScr();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [season, episode]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-80 backdrop-blur-sm">
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl " />
      ) : (
        <>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-3/4">
              <span
                className="text-white cursor-pointer text-4xl flex justify-end relative left-full w-4 hover:text-slate-500 "
                onClick={onClose}
              >
                &times;
              </span>
              <iframe
                className="w-full h-[600px] rounded-xl"
                id="iframe"
                src={scr}
                allowFullScreen
                frameborder="0"
              ></iframe>
            </div>
            {seasons !== undefined && (
              <>
                {console.log(seasons)}
                <div className="flex my-3 w-3/4 items-center flex-row  ">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2 mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-300"
                    value={season}
                    onChange={(e) => {
                      setEpisode(1);
                      setSeason(e.target.value);
                    }}
                  >
                    {seasons.map((item) => (
                      <option value={item.season_number}>{item.name}</option>
                    ))}
                  </select>

                  {listEpisode.length > 0 && (
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-300 "
                      value={episode}
                      onChange={(e) => {
                        setEpisode(e.target.value);
                      }}
                    >
                      {listEpisode.map((episode) => (
                        <option value={episode.episode_number}>
                          Episode {episode.episode_number}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>,
    document.getElementById("modal")
  );
}

export default ModalWacth;
