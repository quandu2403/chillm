import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ModalSearch from "../Modal/ModalSearch";
import { ImFilm } from "react-icons/im";
import {
  MdHomeFilled,
  MdSportsSoccer,
  MdAccountCircle,
  MdAttachMoney,
  MdOutlineHelpOutline,
  MdOutlineLogout,
  MdSearch,
  MdOutlineMovie,
} from "react-icons/md";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const { logOut } = UserAuth();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const Menus = [
    { title: "Home", icon: <MdHomeFilled />, gap: true, link: "/" },
    { title: "Movies", icon: <MdOutlineMovie />, link: "/movies" },
    { title: "Series", icon: <ImFilm />, link: "/series" },
    { title: "Search", icon: <MdSearch />, onClick: handleOpenModal },

    { title: "Account", icon: <MdAccountCircle />, gap: true },
    { title: "Donate", icon: <MdAttachMoney /> },
    { title: "Help", icon: <MdOutlineHelpOutline /> },
    {
      title: "Logout ",
      icon: <MdOutlineLogout />,
      gap: true,
      onClick: handleLogout,
    },
  ];
  return (
    <aside
      className={`lg:w-48 min-[280px]:hidden lg:block fixed top-0 left-0 h-screen bg-black-sidebar lg:p-5 lg:pt-8  `}
    >
      <div
        className="  flex items-center gap-x-4"
        onClick={() => setOpen(!open)}
      >
        <img
          src={logo}
          alt="Logo"
          className={` w-9 cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={` origin-left font-mono text-2xl font-medium text-white duration-300 min-[320px]:scale-0 lg:scale-100 `}
        >
          ChillM
        </h1>
      </div>

      <div className="pt-2">
        {Menus.map((Menu, index) => (
          <Link className="w-full" to={Menu.link}>
            <button
              key={index}
              className={` flex w-full cursor-pointer items-center gap-x-4 rounded-md  min-[320px]:py-2 text-sm text-gray-300 hover:bg-light-white focus:bg-light-white ${
                Menu.gap ? "mt-12" : "mt-2 "
              }`}
              onClick={Menu.onClick}
            >
              <span className="flex text-2xl min-[320px]:ml-2 ">
                {Menu.icon ? Menu.icon : <MdSportsSoccer />}
              </span>
              <span
                className={` text-base font-medium duration-200 min-[320px]:scale-0 lg:scale-100`}
              >
                {Menu.title}
              </span>
            </button>
          </Link>
        ))}
      </div>
      <ModalSearch open={openModal} onClose={() => setOpenModal(false)} />
    </aside>
  );
}

export default Sidebar;
