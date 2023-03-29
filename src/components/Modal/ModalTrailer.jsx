import { createPortal } from "react-dom";

function ModalTrailer({ open, onClose, id }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 backdrop-blur-sm ">
      <div className="flex flex-col items-end cursor-pointer ">
        <span
          className="text-white text-4xl md:left-10 relative cursor-pointer  hover:text-slate-500 "
          onClick={onClose}
        >
          &times;
        </span>
        <iframe
          className="lg:w-[1080px] md:w-[720px] min-[280px]:w-[360px]  aspect-video"
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
