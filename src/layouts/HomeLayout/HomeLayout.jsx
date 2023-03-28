import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Navbar from "../../components/Navbar/Navbar";
function HomeLayout({ children }) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-black">
        {/* <Navbar /> */}
        <div className="flex-1 relative left-[88px] w-[90%] overflow-y-auto m-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
