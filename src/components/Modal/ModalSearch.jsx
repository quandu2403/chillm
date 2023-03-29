import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useDebounce from "../../hooks/useDebounce";
import * as servicesMovies from "../../services/servicesMovies";
import { BsSearch, BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function ModalSearch({ open, onClose }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await servicesMovies.searchMovies(debouncedValue);
      setSearchResult(result);
      console.log("test");
      console.log(result);
      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const closeModal = () => {
    setSearchValue("");
    setSearchResult([]);
    onClose();
  };

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 backdrop-blur-sm ">
      <div class=" h-[90vh] lg:w-1/3 min-[280px]:w-full  ">
        {
          <div class="relative rounded-lg bg-white shadow dark:bg-black-sidebar">
            <div class="flex items-center justify-between  p-4 dark:border-gray-600">
              <div className="mr-2 flex w-full items-center rounded-md bg-light-white py-1 px-4 ">
                <BsSearch className="float-left block cursor-pointer text-lg text-white" />
                <input
                  className=" ml-2 w-full bg-transparent text-base text-white focus:outline-none"
                  ref={inputRef}
                  value={searchValue}
                  onChange={handleChange}
                />
                {searchValue.length > 0 && (
                  <>
                    {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin text-sm  text-white cursor-pointer " />
                    ) : (
                      <AiOutlineClose
                        className=" text-sm rounded-full border-2 text-white cursor-pointer"
                        onClick={handleClear}
                      />
                    )}
                  </>
                )}
              </div>
              <button
                type="button"
                class="ml-auto flex items-center justify-end rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <AiOutlineClose className="text-xl text-white" />
              </button>
            </div>
            {Object.keys(searchResult).length > 0 && (
              <div className="flex h-[38rem] w-full duration-300">
                <ul className="h-full overflow-y-scroll scrollbar-thin scrollbar-track-black-sidebar scrollbar-thumb-light-white">
                  {searchResult.map((item, index) => (
                    <li
                      key={index}
                      className="flex w-full content-center border-t-2 border-light-white px-4 py-2.5 text-white"
                    >
                      <img
                        className="w-48 shrink-0 rounded-sm border-2 border-light-white bg-gray-500 object-cover"
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt={item.original_title || item.original_name}
                      />
                      <div className="flex flex-col items-start justify-evenly">
                        <h1 className=" ml-7 flex p-1 text-2xl min-[280px]:text-xl">
                          {item.original_title || item.original_name}
                        </h1>

                        <span className=" ml-8 flex text-base text-gray-500 min-[280px]:text-sm">
                          {item.title || item.name} (
                          {(item?.release_date &&
                            item.release_date.slice(0, -6)) ||
                            (item?.first_air_date &&
                              item.first_air_date.slice(0, -6))}
                          )
                        </span>

                        <span className=" border-sm  ml-8 flex w-14  flex-row justify-center items-center rounded-lg border-2 border-gray-500">
                          <BsStarFill className="text-yellow-300 text-xs mr-1 " />
                          <span className="text-sm text-slate-200">
                            {item?.vote_average && item.vote_average.toFixed(1)}
                          </span>
                        </span>

                        <button
                          className="ml-8 flex h-10 w-32 items-center justify-center rounded-lg bg-red-700 text-lg text-slate-100 hover:bg-red-400 duration-300"
                          onClick={() => {
                            navigate(`/${item?.media_type}/${item.id}`);
                            closeModal();
                          }}
                        >
                          Watch Now
                        </button>
                      </div>
                      <div className="w-6"></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        }
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ModalSearch;
