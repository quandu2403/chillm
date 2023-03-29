import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Navbar from "../../components/Navbar/Navbar";
function HomeLayout({ children }) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-black">
        <Navbar />
        <div className="flex-1 relative lg:left-[12rem] min-[280px]:left-0 w-full overflow-y-auto overflow-x-hidden m-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
