import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import * as similar from "../../services/similar";
function RowDetails({ category, id }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result3 = await similar.getSimilar(category, id);

      setMovies(result3);
      console.log(result3);
    };
    fetchApi();
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="mt-2 lg:ml-16">
      <div className="group  flex w-auto  flex-grow flex-col  justify-center items-center overflow-hidden">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-20  z-10  hidden cursor-pointer rounded-full bg-white opacity-50 group-hover:block hover:opacity-100"
          size={40}
        />
        <div
          id={id}
          className="scrollbar-none relative h-full w-full overflow-y-hidden scroll-smooth whitespace-nowrap"
        >
          {movies.map((item, index) => (
            <div
              key={index}
              className=" relative inline-block w-[200px] cursor-pointer p-6 hover:scale-110 duration-300 overflow-hidden"
              onClick={() => {
                navigate(`/${category}/${item.id}`);
              }}
            >
              <img
                className="block h-[230px] w-[160px] rounded-xl object-scale-down"
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.title || item?.name}
              />
              <div className="relative top-0 left-0 h-full w-full text-white mt-2   ">
                <p className="flex text-lg font-bold truncate ...">
                  {truncateString(item?.title || item?.name, 10)}
                </p>
                <div className="text-white flex flex-row justify-between items-center mt-1">
                  <div className="flex flex-row items-center">
                    <BsStarFill className="text-yellow-300 text-xs mr-1 " />
                    <div className=" bg-slate-500 px-[2px] h-full rounded-sm text-[10px] opacity-85 font-bold">
                      <p>{item?.vote_average?.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="font-bold">
                      {item?.release_date?.slice(0, -6) ||
                        item?.first_air_date?.slice(0, -6) ||
                        "2024"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-48  z-10 hidden cursor-pointer rounded-full bg-white opacity-50 group-hover:block hover:opacity-100"
          size={40}
        />
      </div>
    </div>
  );
}

export default RowDetails;
