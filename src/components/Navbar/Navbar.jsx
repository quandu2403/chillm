import { useState } from "react";
import { Link } from "react-router-dom";
import ModalSearch from "../Modal/ModalSearch";
import { BsSearch } from "react-icons/bs";
function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <nav className="w-full relative min-[280px]:flex lg:hidden left-0 border-b-2 border-slate-700 bg-black-sidebar px-2 py-4">
      <div className="flex h-full flex-row items-center justify-between ">
        <div className="flex w-full flex-row px-4 justify-evenly ">
          <Link className="mr-10" to="/">
            <h1 className="text-cyan-50">Home</h1>
          </Link>
          <Link className="mr-10" to="/movies">
            <h1 className="text-cyan-50">Movies</h1>
          </Link>
          <Link className="mr-10" to="/series">
            <h1 className="text-cyan-50">Series</h1>
          </Link>
        </div>
        <div
          className="  flex h-full cursor-pointer mt-1 items-center rounded-md hover:bg-light-white"
          onClick={() => setOpenModal(true)}
        >
          <BsSearch className={`text-base text-white`} />
        </div>
        <ModalSearch open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </nav>
  );
}

export default Navbar;
