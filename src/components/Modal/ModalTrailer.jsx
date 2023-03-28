import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useDebounce from "../../hooks/useDebounce";
import * as servicesMovies from "../../services/servicesMovies";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
function ModalTrailer({ open, onClose, id }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 backdrop-blur-sm ">
      <div className="flex flex-col items-end cursor-pointer ">
        <span
          className="text-white text-4xl left-10 relative cursor-pointer  hover:text-slate-500 "
          onClick={onClose}
        >
          &times;
        </span>
        <iframe
          className="w-full aspect-video"
          width="1080"
          height="720"
          allowFullScreen
          allow="autoplay"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        ></iframe>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ModalTrailer;
