import { useState } from "react";
import { Link } from "react-router-dom";
import ModalSearch from "../Modal/ModalSearch";
import { BsSearch } from "react-icons/bs";
function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <nav className="w-[90%] relative left-48 border-b-2 border-slate-700 bg-black-sidebar px-2 py-5">
      <div className="flex h-full flex-row items-center justify-between ">
        <div className="flex w-1/4 flex-row justify-evenly ">
          <Link className="" to="/movies">
            <h1 className="text-cyan-50">Movies</h1>
          </Link>
          <Link className="" to="/series">
            <h1 className="text-cyan-50">Series</h1>
          </Link>
          <Link className="" to="/tvshows">
            <h1 className="text-cyan-50">TV Shows</h1>
          </Link>
        </div>
        <div
          className=" mr-14 flex h-2/4 cursor-pointer items-center rounded-md px-4 py-1 hover:bg-light-white"
          onClick={() => setOpenModal(true)}
        >
          <BsSearch className={`text-2xl text-white`} />
        </div>
        <ModalSearch open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </nav>
  );
}

export default Navbar;
