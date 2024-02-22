/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../../Components/Sidebar";
import MessageContainer from "../../Components/MessageContainer";

const Home = () => {
  return (
    <>
      <div className="flex  sm:h-full md:h-full w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-slate-300/10 ">

        <Sidebar/>

       <MessageContainer/>

      </div>
    </>
  );
};

export default Home;

